import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  limit,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getCaseById } from "@/data/cases";
import { rankFor, type DetectiveRank } from "@/lib/rank";
import { CASE_TIME_LIMIT_MS } from "@/lib/progress";
import { setChatIdentity } from "@/lib/chat";

/** Oda odalarının ne kadar süre sonra terk edilmiş sayılıp otomatik
 * temizleneceği — Firestore'un ücretsiz TTL (time-to-live) özelliğiyle,
 * Cloud Functions'a gerek kalmadan. Gerçek bir oyun 1 saati aşmayacağı
 * için 24 saat cömert bir yedek pencere. */
export const ROOM_TTL_MS = 24 * 60 * 60 * 1000;

export type RoomPhase =
  | "voting-case"
  | "investigating"
  | "voting-killer"
  | "voting-motive"
  | "voting-method"
  | "revealed"
  | "timed-out";

export interface RoomResult {
  correct: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  coverage: number;
  rank: DetectiveRank;
}

export interface RoomDoc {
  /** Oda kurulduğunda henüz belli değil — "voting-case" turu oybirliğiyle
   * sonuçlanınca atanır. Kimse belirli bir vakanın sayfasından oda kurmuyor,
   * herkes /oda'da buluşup hangi vakayı oynayacaklarına birlikte karar veriyor. */
  caseId: string | null;
  phase: RoomPhase;
  hostParticipantId: string;
  /** Soruşturmanın senkron başladığı an (Date.now()) — vaka oylaması
   * oybirliğiyle bitince otomatik set edilir, solo moddaki gibi client
   * saatiyle tutuluyor (serverTimestamp() yerine — aynı 1 saatlik pencere
   * için birkaç saniyelik sapma önemsiz, ve `tryResolvePhase` saf bir
   * fonksiyon olduğu için serverTimestamp() sentinel'ını kullanmak
   * zaten uygun değil). */
  startedAt: number | null;
  hintsUsed: number;
  votes: Record<string, string>;
  viewedDocIds: string[];
  viewedSuspectIds: string[];
  accusedId: string | null;
  motiveCorrect: boolean | null;
  methodCorrect: boolean | null;
  result: RoomResult | null;
  participantCount: number;
}

export interface ParticipantDoc {
  name: string;
  colorHue: number;
}

export interface BoardPosition {
  x: number;
  y: number;
}

export interface BoardDoc {
  positions: Record<string, BoardPosition>;
  connections: { a: string; b: string }[];
  notes: Record<string, string>;
}

export interface RoomChatMessage {
  id: string;
  authorId: string;
  name: string;
  text: string;
  colorHue: number;
  editedAt: boolean;
}

function isBrowser() {
  return typeof window !== "undefined";
}

const PARTICIPANT_ID_KEY = "supheli:oda:katilimci-id";
const ROOM_CODE_KEY = "supheli:oda:aktif-kod";
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // O/0, I/1 karışmasın diye çıkarıldı

export function getOrCreateParticipantId(): string {
  if (!isBrowser()) return "";
  let id = window.localStorage.getItem(PARTICIPANT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(PARTICIPANT_ID_KEY, id);
  }
  return id;
}

export function getStoredRoomCode(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ROOM_CODE_KEY);
}

export function setStoredRoomCode(code: string | null) {
  if (!isBrowser()) return;
  if (code) window.localStorage.setItem(ROOM_CODE_KEY, code);
  else window.localStorage.removeItem(ROOM_CODE_KEY);
}

export function generateRoomCode(): string {
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

function roomRef(roomCode: string) {
  return doc(db, "caseRooms", roomCode);
}

function participantRef(roomCode: string, participantId: string) {
  return doc(db, "caseRooms", roomCode, "participants", participantId);
}

function boardRef(roomCode: string) {
  return doc(db, "caseRooms", roomCode, "board", "state");
}

/** Yeni oda kurar — henüz hiçbir vaka seçilmemiştir, faz "voting-case"
 * olarak başlar. Benzersiz bir kod üretmeye çalışır (çakışma ihtimali çok
 * düşük ama yine de kontrol edilir), oda + kurucunun katılımcı kaydını yazar. */
export async function createRoom(hostName: string): Promise<string> {
  const participantId = getOrCreateParticipantId();
  const identity = setChatIdentity(hostName);

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateRoomCode();
    const ref = roomRef(code);
    const existing = await getDoc(ref);
    if (existing.exists()) continue;

    await setDoc(ref, {
      caseId: null,
      phase: "voting-case",
      hostParticipantId: participantId,
      startedAt: null,
      hintsUsed: 0,
      votes: {},
      viewedDocIds: [],
      viewedSuspectIds: [],
      accusedId: null,
      motiveCorrect: null,
      methodCorrect: null,
      result: null,
      participantCount: 1,
      createdAt: serverTimestamp(),
      expiresAt: Timestamp.fromMillis(Date.now() + ROOM_TTL_MS),
    });
    await setDoc(participantRef(code, participantId), {
      name: identity.name,
      colorHue: identity.colorHue,
      joinedAt: serverTimestamp(),
    });
    setStoredRoomCode(code);
    return code;
  }
  throw new Error("Oda kodu üretilemedi, tekrar dene.");
}

/** Var olan bir odaya katılır. Aynı participantId zaten katılmışsa (sayfa
 * yenilendiyse) katılımcı sayısını tekrar artırmadan sessizce devam eder. */
export async function joinRoom(roomCode: string, name: string): Promise<void> {
  const participantId = getOrCreateParticipantId();
  const identity = setChatIdentity(name);
  const ref = roomRef(roomCode);
  const pRef = participantRef(roomCode, participantId);

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(ref);
    if (!roomSnap.exists()) throw new Error("Bu kodla bir oda bulunamadı.");
    const participantSnap = await tx.get(pRef);
    if (participantSnap.exists()) return;
    const room = roomSnap.data() as RoomDoc;
    tx.set(pRef, {
      name: identity.name,
      colorHue: identity.colorHue,
      joinedAt: serverTimestamp(),
    });
    tx.update(ref, { participantCount: (room.participantCount ?? 0) + 1 });
  });

  setStoredRoomCode(roomCode);
}

/** Odadan ayrılır: katılımcı kaydını siler, sayacı düşürür, varsa aktif
 * oylamadaki oyunu da temizler. Kalan katılımcıların oyu bu ayrılışla birlikte
 * zaten oybirliğine ulaşmış olabilir (örn. 3 kişiden 2'si aynı şeyi oyladı,
 * anlaşmayan 3. kişi ayrıldı) — bu yüzden ayrılma sonrası da aynı çözümleme
 * mantığı (`tryResolvePhase`) çalıştırılır, yoksa tur birinin tekrar oy
 * vermesini bekleyerek gereksiz yere kilitli kalırdı.
 *
 * Odada kimse kalmazsa (participantCount 0'a düşerse) oda dokümanı ve
 * onunla ilişkili pano/mesaj verileri hemen silinir — Firestore TTL
 * politikası (bkz. `ROOM_TTL_MS`) sadece kimsenin düzgünce ayrılmadığı
 * (sekmeyi kapatıp giden) terk edilmiş odalar için bir yedek. */
export async function leaveRoom(roomCode: string): Promise<void> {
  const participantId = getOrCreateParticipantId();
  const ref = roomRef(roomCode);
  const pRef = participantRef(roomCode, participantId);

  const roomNowEmpty = await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(ref);
    if (!roomSnap.exists()) {
      tx.delete(pRef);
      return false;
    }
    const room = roomSnap.data() as RoomDoc;
    const nextVotes = { ...room.votes };
    delete nextVotes[participantId];
    const participantCount = Math.max(0, (room.participantCount ?? 1) - 1);

    if (participantCount <= 0) {
      tx.delete(ref);
      tx.delete(pRef);
      return true;
    }

    const resolved = tryResolvePhase({ ...room, votes: nextVotes, participantCount }, room.phase);
    tx.update(ref, { participantCount, ...(resolved ?? { votes: nextVotes }) });
    tx.delete(pRef);
    return false;
  });

  if (roomNowEmpty) {
    await cleanupRoomSubcollections(roomCode);
  }
}

async function cleanupRoomSubcollections(roomCode: string): Promise<void> {
  try {
    const messagesSnap = await getDocs(collection(db, "caseRooms", roomCode, "messages"));
    await Promise.all(messagesSnap.docs.map((d) => deleteDoc(d.ref)));
    await deleteDoc(boardRef(roomCode));
  } catch {
    // Sessizce yut — oda dokümanı zaten silindi, kalan kırıntılar TTL ile temizlenir.
  }
}

export function subscribeRoom(
  roomCode: string,
  cb: (room: (RoomDoc & { id: string }) | null) => void
): Unsubscribe {
  return onSnapshot(roomRef(roomCode), (snap) => {
    if (!snap.exists()) {
      cb(null);
      return;
    }
    cb({ id: snap.id, ...(snap.data() as RoomDoc) });
  });
}

export function subscribeParticipants(
  roomCode: string,
  cb: (participants: (ParticipantDoc & { id: string })[]) => void
): Unsubscribe {
  return onSnapshot(collection(db, "caseRooms", roomCode, "participants"), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ParticipantDoc) })));
  });
}

export function subscribeBoard(roomCode: string, cb: (board: BoardDoc) => void): Unsubscribe {
  return onSnapshot(boardRef(roomCode), (snap) => {
    const data = snap.data() as BoardDoc | undefined;
    cb(data ?? { positions: {}, connections: [], notes: {} });
  });
}

export async function updateBoardShared(roomCode: string, board: BoardDoc): Promise<void> {
  await setDoc(boardRef(roomCode), board);
}

export function subscribeMessages(
  roomCode: string,
  cb: (messages: RoomChatMessage[]) => void
): Unsubscribe {
  const q = query(
    collection(db, "caseRooms", roomCode, "messages"),
    orderBy("createdAt", "asc"),
    limit(200)
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          authorId: data.authorId ?? "",
          name: data.name,
          text: data.text,
          colorHue: data.colorHue,
          editedAt: !!data.editedAt,
        };
      })
    );
  });
}

export async function sendRoomMessage(
  roomCode: string,
  authorId: string,
  name: string,
  text: string,
  colorHue: number
): Promise<void> {
  await addDoc(collection(db, "caseRooms", roomCode, "messages"), {
    authorId,
    name,
    text,
    colorHue,
    createdAt: serverTimestamp(),
  });
}

export async function editRoomMessage(roomCode: string, messageId: string, text: string): Promise<void> {
  await updateDoc(doc(db, "caseRooms", roomCode, "messages", messageId), {
    text,
    editedAt: serverTimestamp(),
  });
}

export async function deleteRoomMessage(roomCode: string, messageId: string): Promise<void> {
  await deleteDoc(doc(db, "caseRooms", roomCode, "messages", messageId));
}

/** Herhangi bir katılımcı "Katili Suçla"ya basınca herkesi katil oylama
 * ekranına geçirir — bu adımın kendisi bir oy değil, sadece ekran geçişidir. */
export async function openAccusation(roomCode: string): Promise<void> {
  await updateDoc(roomRef(roomCode), { phase: "voting-killer" });
}

/** Katil oylama ekranından "hayır, kanıtlara bakalım" diyip soruşturmaya
 * dönmek için — oylar da sıfırlanır ki eski turdan kalan oylar yeni
 * suçlamayı yanlışlıkla hemen sonuçlandırmasın. */
export async function backToInvestigating(roomCode: string): Promise<void> {
  await updateDoc(roomRef(roomCode), { phase: "investigating", votes: {} });
}

export async function markDocViewedShared(roomCode: string, docId: string): Promise<void> {
  await updateDoc(roomRef(roomCode), { viewedDocIds: arrayUnion(docId) });
}

export async function markSuspectViewedShared(roomCode: string, suspectId: string): Promise<void> {
  await updateDoc(roomRef(roomCode), { viewedSuspectIds: arrayUnion(suspectId) });
}

export async function useSharedHint(roomCode: string, totalHints: number): Promise<void> {
  const ref = roomRef(roomCode);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const used = (snap.data() as RoomDoc).hintsUsed ?? 0;
    if (used >= totalHints) return;
    tx.update(ref, { hintsUsed: used + 1 });
  });
}

function coverageFor(room: RoomDoc, docCount: number, suspectCount: number): number {
  return (
    (room.viewedDocIds.length / Math.max(docCount, 1) +
      room.viewedSuspectIds.length / Math.max(suspectCount, 1)) /
    2
  );
}

/** Vaka seçimi, katil/motiv/yöntem oylamasının hepsi aynı jenerik mekanizmayı
 * paylaşır: herkes oy verene kadar bekle, oybirliği varsa bir sonraki tura
 * geç, herkes oy verdi ama anlaşamadıysa turu sıfırla. Saf bir fonksiyon
 * olarak yazılmasının nedeni hem `castVote` hem `leaveRoom` transaction'larından
 * çağrılabilmesi — biri odadan ayrıldığında da (oy sayısı/katılımcı sayısı
 * değiştiği için) aynı çözümlemenin tekrar denenmesi gerekiyor, yoksa kalan
 * oylar zaten oybirliğine ulaşmış olsa bile tur gereksiz yere kilitli kalır. */
function tryResolvePhase(
  room: RoomDoc,
  phase: RoomPhase
): Partial<RoomDoc> | null {
  if (room.phase !== phase) return null;

  const values = Object.values(room.votes);
  const voteCount = values.length;
  if (voteCount === 0 || voteCount < room.participantCount) return null;

  const allSame = values.every((v) => v === values[0]);
  if (!allSame) return { votes: {} };
  const choice = values[0];

  // Vaka seçimi: oybirliği sağlanınca hem hangi vakanın oynanacağı belli
  // olur hem de soruşturma senkron şekilde başlamış olur — ayrı bir
  // "başlat" düğmesine gerek yok.
  if (phase === "voting-case") {
    return { votes: {}, phase: "investigating", caseId: choice, startedAt: Date.now() };
  }

  if (phase !== "voting-killer" && phase !== "voting-motive" && phase !== "voting-method") return null;

  const caseData = room.caseId ? getCaseById(room.caseId) : undefined;
  if (!caseData) return null;
  const coverage = coverageFor(room, caseData.documents.length, caseData.suspects.length);

  if (phase === "voting-killer") {
    const correct = choice === caseData.solution.killerId;
    if (!correct) {
      const rank = rankFor({
        correctSuspect: false,
        motiveCorrect: false,
        methodCorrect: false,
        coverage,
        hintsUsed: room.hintsUsed,
        difficulty: caseData.difficulty,
      });
      return {
        votes: {},
        phase: "revealed",
        accusedId: choice,
        result: { correct: false, motiveCorrect: false, methodCorrect: false, coverage, rank },
      };
    }
    return { votes: {}, phase: "voting-motive", accusedId: choice };
  }

  if (phase === "voting-motive") {
    const motiveCorrect = caseData.motiveQuestion.options.find((o) => o.id === choice)?.correct ?? false;
    return { votes: {}, phase: "voting-method", motiveCorrect };
  }

  // phase === "voting-method"
  const methodCorrect = caseData.methodQuestion.options.find((o) => o.id === choice)?.correct ?? false;
  const motiveCorrect = room.motiveCorrect ?? false;
  const rank = rankFor({
    correctSuspect: true,
    motiveCorrect,
    methodCorrect,
    coverage,
    hintsUsed: room.hintsUsed,
    difficulty: caseData.difficulty,
  });
  return {
    votes: {},
    phase: "revealed",
    methodCorrect,
    result: { correct: true, motiveCorrect, methodCorrect, coverage, rank },
  };
}

/** Paylaşımlı 1 saatlik süre dolunca herhangi bir katılımcının istemcisi
 * bunu çağırır. Oda zaten sonuçlanmış (revealed) ya da zaten timed-out
 * ise dokunmaz — bir client'ın gecikmiş sayacı, gerçek sonucu ezmesin. */
export async function markRoomTimedOut(roomCode: string): Promise<void> {
  const ref = roomRef(roomCode);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const room = snap.data() as RoomDoc;
    if (room.phase === "revealed" || room.phase === "timed-out") return;
    tx.update(ref, { phase: "timed-out" });
  });
}

export async function castVote(roomCode: string, phase: RoomPhase, choice: string): Promise<void> {
  const participantId = getOrCreateParticipantId();
  const ref = roomRef(roomCode);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const room = snap.data() as RoomDoc;
    if (room.phase !== phase) return; // ekran zaten değişmiş, bayat tıklama

    const nextVotes = { ...room.votes, [participantId]: choice };
    const resolved = tryResolvePhase({ ...room, votes: nextVotes }, phase);
    tx.update(ref, resolved ?? { votes: nextVotes });
  });
}
