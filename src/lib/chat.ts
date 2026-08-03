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
