export interface BoardPosition {
  x: number;
  y: number;
}

export interface BoardState {
  positions: Record<string, BoardPosition>;
  connections: [string, string][];
}

const STORAGE_PREFIX = "supheli:pano:";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getBoardState(caseId: string): BoardState {
  if (!isBrowser()) return { positions: {}, connections: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + caseId);
    if (!raw) return { positions: {}, connections: [] };
    const parsed = JSON.parse(raw) as BoardState;
    return { positions: parsed.positions ?? {}, connections: parsed.connections ?? [] };
  } catch {
    return { positions: {}, connections: [] };
  }
}

export function setBoardState(caseId: string, state: BoardState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_PREFIX + caseId, JSON.stringify(state));
}

export function connectionKey(a: string, b: string) {
  return [a, b].sort().join("::");
}
