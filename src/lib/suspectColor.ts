const PALETTE = [
  "#4f8fe0", // mavi
  "#e0793c", // turuncu
  "#5fbf7a", // yeşil
  "#c25fd1", // mor
  "#d1a23f", // hardal
  "#e0567a", // gül
  "#4fbfc7", // camgöbeği
  "#a3c25f", // fıstık yeşili
];

/** id'den kararlı (deterministic), hydration-safe kimlik rengi — aynı şüpheli
 * kanıtlar/pano/şüpheliler sekmelerinde hep aynı renkte görünür. */
export function suspectColorFor(id: string): string {
  let h = 5;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
