/** id'den kararlı (deterministic), hydration-safe küçük bir eğim üretir — "iğneyle tutturulmuş" his için */
export function tiltFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return ((h % 240) - 120) / 100; // -1.2deg .. 1.2deg
}
