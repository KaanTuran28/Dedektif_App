export interface BoardPosition {
  x: number;
  y: number;
}

export type ConnectionTag = "motiv" | "firsat" | "celiski" | "diger";

export interface BoardState {
  positions: Record<string, BoardPosition>;
  connections: [string, string][];
  notes: Record<string, string>;
  /** Panodaki "Ana Şüpheli" çapa yuvasına yerleştirilen şüphelinin id'si */
  anchorId?: string;
  /** connectionKey(a,b) -> etiket, bağlantının ne tür bir akıl yürütme olduğunu işaretler */
  connectionTags?: Record<string, ConnectionTag>;
}

const STORAGE_PREFIX = "supheli:pano:";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getBoardState(caseId: string): BoardState {
  if (!isBrowser()) return { positions: {}, connections: [], notes: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + caseId);
    if (!raw) return { positions: {}, connections: [], notes: {} };
    const parsed = JSON.parse(raw) as BoardState;
    return {
      positions: parsed.positions ?? {},
      connections: parsed.connections ?? [],
      notes: parsed.notes ?? {},
      anchorId: parsed.anchorId,
      connectionTags: parsed.connectionTags ?? {},
    };
  } catch {
    return { positions: {}, connections: [], notes: {} };
  }
}

export function setBoardState(caseId: string, state: BoardState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_PREFIX + caseId, JSON.stringify(state));
}

export function connectionKey(a: string, b: string) {
  return [a, b].sort().join("::");
}
