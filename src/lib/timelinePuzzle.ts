const STORAGE_PREFIX = "supheli:zaman-bulmaca:";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getSolvedContradictions(caseId: string): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + caseId);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markContradictionSolved(caseId: string, suspectId: string): string[] {
  const current = getSolvedContradictions(caseId);
  if (current.includes(suspectId)) return current;
  const next = [...current, suspectId];
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_PREFIX + caseId, JSON.stringify(next));
  }
  return next;
}
