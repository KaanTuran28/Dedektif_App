export interface CaseProgress {
  solved: boolean;
  lastAccusedId?: string;
  notes?: string;
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

export function recordAccusation(caseId: string, accusedId: string, correct: boolean) {
  const current = getCaseProgress(caseId);
  setCaseProgress(caseId, { ...current, lastAccusedId: accusedId, solved: current.solved || correct });
}
