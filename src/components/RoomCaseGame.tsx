"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseData, FollowUpQuestion } from "@/types/case";
import { DocumentCard } from "@/components/DocumentCard";
import { SuspectCard } from "@/components/SuspectCard";
import { IntroCinematic, QuickClose } from "@/components/CaseGame";
import { Notebook } from "@/components/Notebook";
import { Timeline } from "@/components/Timeline";
import { CaseChat } from "@/components/CaseChat";
import { RoomEvidenceBoard } from "@/components/RoomEvidenceBoard";
import { suspectColorFor } from "@/lib/suspectColor";
import { groupDocumentsByCategory } from "@/lib/docCategories";
import { playStamp, playTick } from "@/lib/sound";
import { checkAchievements } from "@/lib/achievements";
import { recordAccusation, getCaseProgress, CASE_TIME_LIMIT_MS, formatRemaining } from "@/lib/progress";
import { allCases, getCaseById } from "@/data/cases";
import { getChatIdentity, colorForHue } from "@/lib/chat";
import {
  backToInvestigating,
  castVote,
  createRoom,
  getOrCreateParticipantId,
  getStoredRoomCode,
  joinRoom,
  leaveRoom,
  markRoomTimedOut,
  normalizeRoomCode,
  openAccusation,
  setStoredRoomCode,
  subscribeParticipants,
  subscribeRoom,
  markDocViewedShared,
  markSuspectViewedShared,
  useSharedHint,
  type ParticipantDoc,
  type RoomDoc,
  type RoomPhase,
} from "@/lib/room";

type Participant = ParticipantDoc & { id: string };
type Room = RoomDoc & { id: string };
type Step = "giris" | "kanitlar" | "supheliler" | "zaman" | "pano" | "notlar";

const TABS: { id: Step; label: string }[] = [
  { id: "giris", label: "Vaka" },
  { id: "kanitlar", label: "Kanıtlar" },
  { id: "supheliler", label: "Şüpheliler" },
  { id: "zaman", label: "Zaman" },
  { id: "pano", label: "Pano" },
  { id: "notlar", label: "Notlar" },
];

/** /oda sayfasının içeriği — hiçbir vakaya bağlı değil. Oda kurulunca hangi
 * vakanın oynanacağı henüz belli değildir; katılımcılar "voting-case"
 * fazında ortak oy birliğiyle karar verir, karar verilir verilmez soruşturma
 * herkes için aynı anda (senkron) başlar. Solo mod (CaseGame.tsx,
 * progress.ts, board.ts) bu dosyaya hiç dokunmadan aynen çalışmaya devam
 * ediyor. */
export function RoomCaseGame() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [step, setStep] = useState<Step>("giris");
  const [introShown, setIntroShown] = useState(false);
  const initialPhaseRef = useRef<RoomPhase | null>(null);
  const participantId = useMemo(() => getOrCreateParticipantId(), []);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setRoomCode(getStoredRoomCode());
    setCheckedStorage(true);
  }, []);

  useEffect(() => {
    if (!roomCode) {
      setRoom(null);
      return;
    }
    return subscribeRoom(roomCode, setRoom);
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode) {
      setParticipants([]);
      return;
    }
    return subscribeParticipants(roomCode, setParticipants);
  }, [roomCode]);

  const data = useMemo(() => (room?.caseId ? getCaseById(room.caseId) ?? null : null), [room?.caseId]);

  // Odaya YENİ katılan biri (ya da vaka oylaması yeni bitmiş biri) için
  // solo moddaki gibi bir "Dosya Açılıyor" sinematiği oynatılır — ama
  // sayfa yenilenip devam eden bir soruşturmaya dönülüyorsa (ilk görülen
  // faz zaten "voting-case"in ötesindeyse) sinematik tekrar oynatılmaz,
  // tıpkı solo modun devam eden vakada intro'yu atlaması gibi.
  useEffect(() => {
    if (!room || initialPhaseRef.current !== null) return;
    initialPhaseRef.current = room.phase;
    if (room.phase !== "voting-case") setIntroShown(true);
  }, [room]);

  function handleJoined(code: string) {
    setRoomCode(code);
  }

  function handleLeave() {
    if (roomCode) leaveRoom(roomCode);
    setStoredRoomCode(null);
    setRoomCode(null);
    setRoom(null);
    setStep("giris");
  }

  if (!checkedStorage) return null;

  if (!roomCode) {
    return <RoomJoinForm onJoined={handleJoined} />;
  }

  if (!room) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center py-24">
        <p className="text-text-dim">Odaya bağlanılıyor...</p>
        <button onClick={handleLeave} className="mt-4 text-xs text-text-dim underline">
          Vazgeç
        </button>
      </div>
    );
  }

  if (room.phase === "voting-case") {
    return (
      <RoomCaseVoting
        roomCode={roomCode}
        participantId={participantId}
        room={room}
        participants={participants}
        onLeave={handleLeave}
      />
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center py-24">
        <p className="text-text-dim">Vaka verisi yüklenemedi.</p>
        <button onClick={handleLeave} className="mt-4 text-xs text-text-dim underline">
          Odadan Ayrıl
        </button>
      </div>
    );
  }

  if (!introShown) {
    return (
      <IntroCinematic
        title={data.title}
        order={data.order}
        skip={!!reducedMotion}
        onDone={() => setIntroShown(true)}
      />
    );
  }

  return (
    <RoomGameShell
      data={data}
      roomCode={roomCode}
      participantId={participantId}
      room={room}
      participants={participants}
      step={step}
      setStep={setStep}
      onLeave={handleLeave}
    />
  );
}

function RoomJoinForm({ onJoined }: { onJoined: (code: string) => void }) {
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [name, setName] = useState(() => getChatIdentity()?.name ?? "");
  const [codeInput, setCodeInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      const code = await createRoom(trimmed);
      onJoined(code);
    } catch {
      setError("Oda kurulamadı, tekrar dene.");
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 40);
    const code = normalizeRoomCode(codeInput);
    if (!trimmed || !code) return;
    setBusy(true);
    setError(null);
    try {
      await joinRoom(code, trimmed);
      onJoined(code);
    } catch {
      setError("Bu kodla bir oda bulunamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-panel p-6">
        <Link
          href="/"
          className="inline-block text-accent-gold text-xs uppercase tracking-widest hover:underline font-mono-doc mb-4"
        >
          ← Ana Sayfaya Dön
        </Link>
        <p className="text-xs uppercase tracking-widest text-accent-gold mb-4">Arkadaşlarınla Oyna</p>
        {mode === "choose" && (
          <div className="space-y-3">
            <button
              onClick={() => setMode("create")}
              className="w-full rounded-sm bg-accent-red-bright px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
            >
              Oda Kur
            </button>
            <button
              onClick={() => setMode("join")}
              className="w-full rounded-sm border border-white/20 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-text-dim hover:text-text hover:border-white/40 transition-colors"
            >
              Kod ile Katıl
            </button>
          </div>
        )}
        {(mode === "create" || mode === "join") && (
          <form onSubmit={mode === "create" ? handleCreate : handleJoin} className="space-y-3">
            <div>
              <label className="text-[11px] text-text-dim uppercase tracking-wide block mb-1" htmlFor="room-name">
                Adın
              </label>
              <input
                id="room-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="Örn. Kaan"
                className="w-full rounded-md paper-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-red-bright/60"
              />
            </div>
            {mode === "join" && (
              <div>
                <label className="text-[11px] text-text-dim uppercase tracking-wide block mb-1" htmlFor="room-code">
                  Oda Kodu
                </label>
                <input
                  id="room-code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(normalizeRoomCode(e.target.value))}
                  maxLength={8}
                  className="w-full rounded-md paper-card px-3 py-2 text-sm font-mono-doc tracking-widest outline-none focus:ring-2 focus:ring-accent-red-bright/60"
                />
              </div>
            )}
            {error && <p className="text-accent-red-bright text-xs">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("choose")}
                className="rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-dim hover:text-text hover:border-white/40 transition-colors"
              >
                Geri
              </button>
              <button
                type="submit"
                disabled={busy || !name.trim() || (mode === "join" && !codeInput)}
                className="flex-1 rounded-sm bg-accent-red-bright px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {busy ? "..." : mode === "create" ? "Oda Kur" : "Katıl"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function RoomCaseVoting({
  roomCode,
  participantId,
  room,
  participants,
  onLeave,
}: {
  roomCode: string;
  participantId: string;
  room: Room;
  participants: Participant[];
  onLeave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const myVote = room.votes[participantId];
  const playable = allCases.filter((c) => c.available);

  function handleCopy() {
    navigator.clipboard?.writeText(roomCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function vote(caseId: string) {
    castVote(roomCode, "voting-case", caseId);
    playTick();
  }

  return (
    <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="text-center space-y-3">
        <p className="text-text-dim text-sm">Bu kodu arkadaşlarınla paylaş, katılsınlar</p>
        <button
          onClick={handleCopy}
          aria-label={`Oda kodu ${roomCode}, kopyalamak için tıkla`}
          className="w-full rounded-sm border-2 border-dashed border-accent-gold/50 py-4 font-mono-doc text-3xl tracking-[0.3em] text-accent-gold hover:bg-accent-gold/5 transition-colors"
        >
          {roomCode}
        </button>
        {copied && <p className="text-accent-gold text-xs">Kopyalandı!</p>}
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-widest text-text-dim mb-2">
          Odadakiler ({participants.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <span key={p.id} className="text-sm flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: colorForHue(p.colorHue) }} />
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-widest text-accent-gold mb-2">
          Hangi vakayı oynayalım? · {Object.keys(room.votes).length}/{participants.length} oy verdi
        </p>
        <p className="text-text-dim text-xs mb-3">
          Herkes aynı vakayı seçmeden soruşturma başlamaz — oy verdikten sonra fikrini değiştirebilirsin.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {playable.map((c) => {
            const voters = participants.filter((p) => room.votes[p.id] === c.id);
            const selected = myVote === c.id;
            return (
              <button
                key={c.id}
                onClick={() => vote(c.id)}
                aria-pressed={selected}
                className={`text-left rounded-sm border p-4 transition-colors ${
                  selected
                    ? "border-accent-red-bright bg-accent-red-bright/10"
                    : "border-white/10 bg-panel hover:border-white/25"
                }`}
              >
                <p className="text-[10px] uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                  Vaka {String(c.order).padStart(2, "0")} · {c.difficulty}
                </p>
                <p className="font-display text-lg font-bold">{c.title}</p>
                <p className="text-text-dim text-xs mt-1">{c.tagline}</p>
                {voters.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {voters.map((v) => (
                      <span
                        key={v.id}
                        className="text-[9px] px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${colorForHue(v.colorHue)}30`, color: colorForHue(v.colorHue) }}
                      >
                        {v.name}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button onClick={onLeave} className="text-xs text-text-dim hover:text-text underline">
          Odadan Ayrıl
        </button>
      </div>
    </div>
  );
}

function RoomGameShell({
  data,
  roomCode,
  participantId,
  room,
  participants,
  step,
  setStep,
  onLeave,
}: {
  data: CaseData;
  roomCode: string;
  participantId: string;
  room: Room;
  participants: Participant[];
  step: Step;
  setStep: (s: Step) => void;
  onLeave: () => void;
}) {
  const identity = useMemo(() => getChatIdentity(), []);
  const docGroups = useMemo(() => groupDocumentsByCategory(data.documents), [data.documents]);
  const isInvestigating = room.phase === "investigating";
  const gameOver = room.phase === "revealed" || room.phase === "timed-out";
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [leavingEarly, setLeavingEarly] = useState(false);
  const router = useRouter();
  const coverage =
    (room.viewedDocIds.length / Math.max(data.documents.length, 1) +
      room.viewedSuspectIds.length / Math.max(data.suspects.length, 1)) /
    2;

  // Paylaşımlı geri sayım — odadaki herkes aynı `startedAt`'ı görüyor, o
  // yüzden herkesin sayacı senkron ilerliyor. Süre dolduğunda herhangi bir
  // katılımcının istemcisi `markRoomTimedOut` çağırır; fonksiyon zaten oda
  // sonuçlanmışsa (revealed) hiçbir şey yapmadığı için birden fazla
  // client'ın aynı anda tetiklemesi zararsız.
  useEffect(() => {
    if (!room.startedAt || gameOver) {
      setRemainingMs(null);
      return;
    }
    function tick() {
      const rem = CASE_TIME_LIMIT_MS - (Date.now() - room.startedAt!);
      setRemainingMs(rem);
      if (rem <= 0) markRoomTimedOut(roomCode);
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [room.startedAt, gameOver, roomCode]);

  function goStep(next: Step) {
    playTick();
    setStep(next);
  }

  function handleLeaveEarly() {
    setLeavingEarly(true);
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b border-white/10 bg-panel/70 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-accent-gold text-xs uppercase tracking-widest font-mono-doc">
              Oda {roomCode} · {participants.length} kişi
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold mt-0.5">{data.title}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isInvestigating && remainingMs !== null && (
              <p
                title="Oda için kalan süre"
                className={`hidden sm:block text-[11px] font-mono-doc border rounded-sm px-2 py-1.5 ${
                  remainingMs < 5 * 60 * 1000
                    ? "border-accent-red-bright text-accent-red-bright"
                    : "border-white/10 text-text-dim"
                }`}
              >
                ⏱ {formatRemaining(remainingMs)}
              </p>
            )}
            {isInvestigating && (
              <p className="hidden sm:block text-[11px] font-mono-doc border border-white/10 rounded-sm px-2 py-1.5 text-text-dim">
                🔍 %{Math.round(coverage * 100)} incelendi
              </p>
            )}
            {isInvestigating && (
              <RoomHintPanel roomCode={roomCode} hintsUsed={room.hintsUsed} hints={data.hints} />
            )}
            {!gameOver && (
              <button
                onClick={handleLeaveEarly}
                className="hidden sm:block rounded-sm border border-white/15 px-3 py-2 text-xs uppercase tracking-wide text-text-dim hover:text-text hover:border-white/30 transition-colors"
              >
                Odadan Ayrıl
              </button>
            )}
            {isInvestigating && (
              <button
                onClick={() => openAccusation(roomCode)}
                className="rounded-sm bg-accent-red-bright px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
              >
                Katili Suçla
              </button>
            )}
          </div>
        </div>

        {isInvestigating && (
          <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = step === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => goStep(t.id)}
                  aria-current={active}
                  className={`relative shrink-0 px-4 sm:px-5 pt-2 pb-2.5 text-sm font-mono-doc transition-colors ${
                    active ? "text-black" : "text-text-dim hover:text-text"
                  }`}
                  style={{
                    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
                    backgroundColor: active ? "var(--accent-gold)" : "transparent",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isInvestigating ? step : room.phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {isInvestigating && step === "giris" && (
              <div className="space-y-6">
                <p className="text-text-dim leading-relaxed text-base sm:text-lg whitespace-pre-line">
                  {data.synopsis}
                </p>
                <div className="relative paper-card paper-torn rounded-sm p-5">
                  <p className="text-xs uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                    Kurban
                  </p>
                  <p className="font-display text-xl font-bold">
                    {data.victim.name} ({data.victim.age})
                  </p>
                  <p className="text-paper-ink/70 text-sm mt-1">{data.victim.description}</p>
                </div>
              </div>
            )}

            {isInvestigating && step === "kanitlar" && (
              <div className="space-y-8">
                {docGroups.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <p className="shrink-0 text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
                        {group.label}
                      </p>
                      <div className="h-px flex-1 bg-white/10" />
                      <p className="shrink-0 text-text-dim text-[11px] font-mono-doc">
                        {group.documents.length}
                      </p>
                    </div>
                    <div className="space-y-5">
                      {group.documents.map((doc) => (
                        <DocumentCard
                          key={doc.id}
                          doc={doc}
                          onOpen={(id) => markDocViewedShared(roomCode, id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isInvestigating && step === "supheliler" && (
              <div className="space-y-5">
                {data.suspects.map((s, i) => (
                  <SuspectCard
                    key={s.id}
                    suspect={s}
                    index={i}
                    onOpen={(id) => markSuspectViewedShared(roomCode, id)}
                  />
                ))}
              </div>
            )}

            {isInvestigating && step === "zaman" && <Timeline events={data.timeline} />}

            {isInvestigating && step === "pano" && <RoomEvidenceBoard data={data} roomCode={roomCode} />}

            {isInvestigating && step === "notlar" && (
              <div className="grid gap-6 sm:grid-cols-2 items-start">
                <Notebook caseId={data.id} />
                {identity && (
                  <CaseChat
                    roomCode={roomCode}
                    participantId={participantId}
                    name={identity.name}
                    colorHue={identity.colorHue}
                  />
                )}
              </div>
            )}

            {room.phase === "voting-killer" && (
              <RoomAccusationVoting
                data={data}
                roomCode={roomCode}
                participantId={participantId}
                room={room}
                participants={participants}
              />
            )}

            {room.phase === "voting-motive" && (
              <RoomFollowUpVoting
                title="Motiv"
                question={data.motiveQuestion}
                roomCode={roomCode}
                phase="voting-motive"
                participantId={participantId}
                room={room}
                participants={participants}
              />
            )}

            {room.phase === "voting-method" && (
              <RoomFollowUpVoting
                title="Yöntem"
                question={data.methodQuestion}
                roomCode={roomCode}
                phase="voting-method"
                participantId={participantId}
                room={room}
                participants={participants}
              />
            )}

            {room.phase === "revealed" && (
              <RoomResultReveal data={data} room={room} onLeave={onLeave} />
            )}

            {room.phase === "timed-out" && (
              <QuickClose
                label="Süre Doldu"
                onDone={() => {
                  onLeave();
                  router.push("/");
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {leavingEarly && (
          <QuickClose
            onDone={() => {
              onLeave();
              router.push("/");
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function RoomHintPanel({
  roomCode,
  hintsUsed,
  hints,
}: {
  roomCode: string;
  hintsUsed: number;
  hints: string[];
}) {
  const [open, setOpen] = useState(false);

  function revealNext() {
    useSharedHint(roomCode, hints.length);
    playTick();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-sm border border-white/15 h-9 px-3 flex items-center gap-1.5 text-text-dim hover:text-text hover:border-white/30 transition-colors text-xs font-mono-doc"
      >
        💡 {hintsUsed}/{hints.length}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-sm border border-accent-gold/40 bg-panel p-4 shadow-xl z-20"
          >
            <p className="text-xs uppercase tracking-widest text-accent-gold font-mono-doc mb-2">
              İpuçları (Takım Ortak)
            </p>
            <p className="text-text-dim text-[11px] mb-3">
              İpucu kullanmak TÜM takımın rütbesini biraz düşürür.
            </p>
            <div className="space-y-2 mb-3">
              {hints.slice(0, hintsUsed).map((h, i) => (
                <p key={i} className="text-sm leading-relaxed border-l-2 border-accent-gold/50 pl-3">
                  {h}
                </p>
              ))}
              {hintsUsed === 0 && (
                <p className="text-text-dim text-sm italic">Henüz ipucu alınmadı.</p>
              )}
            </div>
            <button
              onClick={revealNext}
              disabled={hintsUsed >= hints.length}
              className="w-full rounded-sm bg-accent-gold text-black px-3 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {hintsUsed >= hints.length ? "Tüm ipuçları açıldı" : "Sonraki İpucu"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoomAccusationVoting({
  data,
  roomCode,
  participantId,
  room,
  participants,
}: {
  data: CaseData;
  roomCode: string;
  participantId: string;
  room: Room;
  participants: Participant[];
}) {
  const myVote = room.votes[participantId];

  function vote(suspectId: string) {
    castVote(roomCode, "voting-killer", suspectId);
    playTick();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-text-dim">
          Herkes aynı şüpheliyi seçmeden suçlama sonuçlanmaz. Oy verdikten sonra
          fikrini değiştirebilirsin.
        </p>
        <button
          onClick={() => backToInvestigating(roomCode)}
          className="shrink-0 text-xs text-text-dim hover:text-text underline whitespace-nowrap"
        >
          ← Soruşturmaya Dön
        </button>
      </div>
      <p className="text-xs font-mono-doc text-accent-gold">
        {Object.keys(room.votes).length}/{participants.length} oy verdi
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {data.suspects.map((s) => {
          const voters = participants.filter((p) => room.votes[p.id] === s.id);
          const selected = myVote === s.id;
          const color = suspectColorFor(s.id);
          return (
            <button
              key={s.id}
              onClick={() => vote(s.id)}
              aria-pressed={selected}
              className={`relative rounded-sm border p-3 text-left transition-colors ${
                selected
                  ? "border-accent-red-bright bg-accent-red-bright/10"
                  : "border-white/10 bg-panel hover:border-white/25"
              }`}
            >
              <div
                className="relative mx-auto mb-2 h-16 w-16 rounded-sm overflow-hidden border-2"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)",
                  backgroundColor: "#0f0d0d",
                  borderColor: selected ? "var(--accent-red-bright)" : `${color}80`,
                }}
              >
                <svg
                  viewBox="0 0 64 64"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85%] w-[85%] text-white/25"
                  fill="currentColor"
                  aria-hidden
                >
                  <circle cx="32" cy="20" r="14" />
                  <path d="M6 62c0-16 11.6-26 26-26s26 10 26 26" />
                </svg>
              </div>
              <p className="font-display font-bold text-sm text-center truncate">{s.name}</p>
              <p className="text-text-dim text-[11px] text-center font-mono-doc">{s.role}</p>
              {voters.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mt-1.5">
                  {voters.map((v) => (
                    <span
                      key={v.id}
                      className="text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${colorForHue(v.colorHue)}30`, color: colorForHue(v.colorHue) }}
                    >
                      {v.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoomFollowUpVoting({
  title,
  question,
  roomCode,
  phase,
  participantId,
  room,
  participants,
}: {
  title: string;
  question: FollowUpQuestion;
  roomCode: string;
  phase: RoomPhase;
  participantId: string;
  room: Room;
  participants: Participant[];
}) {
  const myVote = room.votes[participantId];

  function vote(optionId: string) {
    castVote(roomCode, phase, optionId);
    playTick();
  }

  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-widest text-accent-gold font-mono-doc">
        Son Soru · {title} (Takım Oyu)
      </p>
      <p className="font-display text-xl sm:text-2xl font-bold">{question.prompt}</p>
      <p className="text-xs font-mono-doc text-accent-gold">
        {Object.keys(room.votes).length}/{participants.length} oy verdi
      </p>
      <div className="grid gap-3">
        {question.options.map((o) => {
          const voters = participants.filter((p) => room.votes[p.id] === o.id);
          const selected = myVote === o.id;
          return (
            <button
              key={o.id}
              onClick={() => vote(o.id)}
              className={`text-left rounded-sm border px-4 py-3 transition-colors ${
                selected
                  ? "border-accent-gold bg-accent-gold/10"
                  : "border-white/10 bg-panel hover:border-accent-gold/60 hover:bg-white/[0.03]"
              }`}
            >
              <p>{o.label}</p>
              {voters.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {voters.map((v) => (
                    <span
                      key={v.id}
                      className="text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${colorForHue(v.colorHue)}30`, color: colorForHue(v.colorHue) }}
                    >
                      {v.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoomResultReveal({
  data,
  room,
  onLeave,
}: {
  data: CaseData;
  room: Room;
  onLeave: () => void;
}) {
  const recordedRef = useRef(false);
  const router = useRouter();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (recordedRef.current || !room.result) return;
    recordedRef.current = true;
    const t = setTimeout(() => playStamp(), 150);
    recordAccusation(
      data.id,
      room.accusedId ?? "",
      room.result.correct,
      room.result.rank.points,
      room.result.rank.label
    );
    const solvedCasesCount = allCases.filter((c) => getCaseProgress(c.id).solved).length;
    checkAchievements({
      caseId: data.id,
      correct: room.result.correct,
      coverage: room.result.coverage,
      hintsUsed: room.hintsUsed,
      motiveCorrect: room.result.motiveCorrect,
      methodCorrect: room.result.methodCorrect,
      solvedCasesCount,
    });
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.result]);

  if (!room.result) return null;
  const { correct, rank } = room.result;

  function handleClose() {
    playStamp();
    setClosing(true);
    onLeave();
    setTimeout(() => router.push("/"), 650);
  }

  return (
    <div className="space-y-6 text-center relative">
      <AnimatePresence>
        {closing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.p
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
              className="stamp text-accent-red text-2xl sm:text-3xl"
            >
              Dosya Kapatıldı
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center py-4">
        <motion.p
          initial={{ scale: 2.6, opacity: 0, rotate: -14 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className={`stamp text-2xl sm:text-4xl font-black ${
            correct ? "text-accent-gold" : "text-accent-red-bright"
          }`}
        >
          {correct ? "Çözüldü" : "Yanlış Şüpheli"}
        </motion.p>
      </div>
      <p className="text-text-dim">
        {correct
          ? "Takım doğru şüpheliyi işaret etti."
          : `Suçladığınız kişi katil değildi. Gerçek katil: ${
              data.suspects.find((s) => s.id === data.solution.killerId)?.name
            }.`}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="inline-flex flex-col items-center gap-1 rounded-sm border border-accent-gold/40 bg-panel px-6 py-3"
      >
        <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
          Takım Rütbesi · {rank.points}/{rank.maxPoints} puan
        </p>
        <p className="font-display text-xl font-bold">{rank.label}</p>
        <p className="text-text-dim text-xs max-w-xs">{rank.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="paper-card paper-torn rounded-sm p-5 text-left"
      >
        <p className="text-xs uppercase tracking-widest text-accent-red font-mono-doc mb-2">Çözüm</p>
        <p className="leading-relaxed text-sm sm:text-base">{data.solution.explanation}</p>
      </motion.div>

      <button
        onClick={handleClose}
        className="rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
      >
        Vaka Seçimine Dön
      </button>
    </div>
  );
}
