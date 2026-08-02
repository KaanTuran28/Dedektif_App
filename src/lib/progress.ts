export const CASE_TIME_LIMIT_MS = 60 * 60 * 1000; // 1 saat

export interface CaseProgress {
  solved: boolean;
  /** Süre doldu veya oyuncu vazgeçti (yanlış suçlamadan farklı — o zaten solved:false ile anlaşılıyor) */
  failed?: boolean;
  lastAccusedId?: string;
  notes?: string;
  hintsUsed?: number;
  bestPoints?: number;
  bestRankLabel?: string;
  /** Soruşturmanın başlatıldığı an (Date.now()) — süre sayacı buradan hesaplanır */
  startedAt?: number;
  /** Aktif, henüz sonuçlanmamış bir oturum var mı */
  inProgress?: boolean;
  /** Kapsam (coverage) hesaplamasının oturumlar arası doğru kalması için */
  viewedDocIds?: string[];
  viewedSuspectIds?: string[];
}

const STORAGE_PREFIX = "supheli:vaka:";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCaseProgress(caseId: string): CaseProgress {
  if (!isBrowser()) return { solved: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + caseId);
    if (!raw) return { solved: false };
    return JSON.parse(raw) as CaseProgress;
  } catch {
    return { solved: false };
  }
}

export function setCaseProgress(caseId: string, progress: CaseProgress) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_PREFIX + caseId, JSON.stringify(progress));
}

export function saveNote(caseId: string, notes: string) {
  const current = getCaseProgress(caseId);
  setCaseProgress(caseId, { ...current, notes });
}

export function recordAccusation(
  caseId: string,
  accusedId: string,
  correct: boolean,
  points: number,
  rankLabel: string
) {
  const current = getCaseProgress(caseId);
  const solved = current.solved || correct;
  const bestPoints = correct ? Math.max(current.bestPoints ?? 0, points) : current.bestPoints;
  const bestRankLabel = correct && points >= (current.bestPoints ?? -1) ? rankLabel : current.bestRankLabel;
  setCaseProgress(caseId, {
    ...current,
    lastAccusedId: accusedId,
    solved,
    bestPoints,
    bestRankLabel,
    inProgress: false,
  });
}

export function getHintsUsed(caseId: string): number {
  return getCaseProgress(caseId).hintsUsed ?? 0;
}

export function useNextHint(caseId: string, totalHints: number): number {
  const current = getCaseProgress(caseId);
  const used = Math.min((current.hintsUsed ?? 0) + 1, totalHints);
  setCaseProgress(caseId, { ...current, hintsUsed: used });
  return used;
}

export function allCaseProgress(caseIds: string[]): Record<string, CaseProgress> {
  const out: Record<string, CaseProgress> = {};
  for (const id of caseIds) out[id] = getCaseProgress(id);
  return out;
}

/** Soruşturmayı başlatır (ya da devam eden birini korur). startedAt zaten
 * varsa ve süresi dolmamışsa dokunmaz — sadece inProgress'i garanti eder. */
export function startCase(caseId: string): number {
  const current = getCaseProgress(caseId);
  const alreadyRunning =
    current.inProgress && current.startedAt && Date.now() - current.startedAt < CASE_TIME_LIMIT_MS;
  const startedAt = alreadyRunning ? current.startedAt! : Date.now();
  setCaseProgress(caseId, {
    ...current,
    startedAt,
    inProgress: true,
    failed: false,
  });
  return startedAt;
}

export function getRemainingMs(progress: CaseProgress): number | null {
  if (!progress.inProgress || !progress.startedAt) return null;
  return CASE_TIME_LIMIT_MS - (Date.now() - progress.startedAt);
}

export function isExpired(progress: CaseProgress): boolean {
  const remaining = getRemainingMs(progress);
  return remaining !== null && remaining <= 0;
}

export function endCaseManually(caseId: string) {
  const current = getCaseProgress(caseId);
  setCaseProgress(caseId, { ...current, inProgress: false, failed: true, solved: false });
}

export function markTimedOut(caseId: string) {
  const current = getCaseProgress(caseId);
  setCaseProgress(caseId, { ...current, inProgress: false, failed: true, solved: false });
}

export function markDocViewed(caseId: string, docId: string) {
  const current = getCaseProgress(caseId);
  const ids = current.viewedDocIds ?? [];
  if (ids.includes(docId)) return;
  setCaseProgress(caseId, { ...current, viewedDocIds: [...ids, docId] });
}

export function markSuspectViewed(caseId: string, suspectId: string) {
  const current = getCaseProgress(caseId);
  const ids = current.viewedSuspectIds ?? [];
  if (ids.includes(suspectId)) return;
  setCaseProgress(caseId, { ...current, viewedSuspectIds: [...ids, suspectId] });
}

export function formatRemaining(ms: number): string {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
