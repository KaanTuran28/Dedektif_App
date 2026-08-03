import { unlockAchievement } from "@/lib/achievements";

export interface CipherState {
  solved: boolean;
  hintsUsed: number;
}

const STORAGE_PREFIX = "supheli:sifreli:";

function isBrowser() {
  return typeof window !== "undefined";
}

function key(caseId: string, docId: string) {
  return `${STORAGE_PREFIX}${caseId}:${docId}`;
}

function getState(caseId: string, docId: string): CipherState {
  if (!isBrowser()) return { solved: false, hintsUsed: 0 };
  try {
    const raw = window.localStorage.getItem(key(caseId, docId));
    if (!raw) return { solved: false, hintsUsed: 0 };
    const parsed = JSON.parse(raw) as CipherState;
    return { solved: !!parsed.solved, hintsUsed: parsed.hintsUsed ?? 0 };
  } catch {
    return { solved: false, hintsUsed: 0 };
  }
}

function setState(caseId: string, docId: string, state: CipherState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key(caseId, docId), JSON.stringify(state));
}

export function isCipherSolved(caseId: string, docId: string): boolean {
  return getState(caseId, docId).solved;
}

export function markCipherSolved(caseId: string, docId: string) {
  const current = getState(caseId, docId);
  if (current.solved) return;
  setState(caseId, docId, { ...current, solved: true });
  unlockAchievement("kod-kirici");
}

export function getCipherHintsUsed(caseId: string, docId: string): number {
  return getState(caseId, docId).hintsUsed;
}

export function useNextCipherHint(caseId: string, docId: string, totalHints: number): number {
  const current = getState(caseId, docId);
  const next = Math.min(current.hintsUsed + 1, totalHints);
  setState(caseId, docId, { ...current, hintsUsed: next });
  return next;
}
