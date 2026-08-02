export interface CaseProgress {
  solved: boolean;
  lastAccusedId?: string;
  notes?: string;
  hintsUsed?: number;
  bestPoints?: number;
  bestRankLabel?: string;
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
  setCaseProgress(caseId, { ...current, lastAccusedId: accusedId, solved, bestPoints, bestRankLabel });
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
