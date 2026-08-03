function isBrowser() {
  return typeof window !== "undefined";
}

function hash(input: string): number {
  let h = 5;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

export function hueForName(name: string): number {
  return hash(name) % 360;
}

export function colorForHue(hue: number): string {
  return `hsl(${hue}, 65%, 52%)`;
}

export interface ChatIdentity {
  name: string;
  colorHue: number;
}

const IDENTITY_KEY = "supheli:chat:kimlik";

export function getChatIdentity(): ChatIdentity | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(IDENTITY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChatIdentity;
  } catch {
    return null;
  }
}

export function setChatIdentity(name: string): ChatIdentity {
  const identity: ChatIdentity = { name, colorHue: hueForName(name) };
  if (isBrowser()) window.localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  return identity;
}

const ROOM_KEY_PREFIX = "supheli:chat:oda:";

/** Aynı vakayı açan herkes varsayılan olarak aynı odada buluşsun diye vaka
 * id'sinden kısa, deterministik bir oda kodu türetilir — kod vaka id'sinin
 * kendisi DEĞİL, ayrı bir kavram, çünkü kullanıcı isterse farklı bir kod
 * girip aynı vakayı oynayan başka bir arkadaş grubuyla karışmayan özel bir
 * odaya geçebilmeli. */
export function defaultRoomCodeFor(caseId: string): string {
  return hash(caseId).toString(36).slice(0, 5).toUpperCase();
}

export function getStoredRoomCode(caseId: string): string {
  if (!isBrowser()) return defaultRoomCodeFor(caseId);
  return window.localStorage.getItem(ROOM_KEY_PREFIX + caseId) ?? defaultRoomCodeFor(caseId);
}

export function setStoredRoomCode(caseId: string, roomCode: string) {
  if (isBrowser()) window.localStorage.setItem(ROOM_KEY_PREFIX + caseId, roomCode);
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}
