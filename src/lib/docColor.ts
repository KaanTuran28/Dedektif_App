import type { DocumentType } from "@/types/case";

export interface DocColor {
  border: string;
  text: string;
  bg: string;
}

/** Kanıt türüne göre sabit, anlamlı renk paleti — resmi belgeler kırmızı/ağır,
 * hafif kayıtlar (ses, bilet, günlük) sarı/amber tonlarında. */
export const DOC_COLORS: Record<DocumentType, DocColor> = {
  resmi_rapor: { border: "#b3231c", text: "#e0796f", bg: "rgba(179,35,28,0.10)" },
  gunluk_log: { border: "#a9762f", text: "#d1a35c", bg: "rgba(169,118,47,0.10)" },
  ifade: { border: "#3f6fd1", text: "#82a4ea", bg: "rgba(63,111,209,0.10)" },
  telefon_dokumu: { border: "#e0793c", text: "#f0a06c", bg: "rgba(224,121,60,0.10)" },
  bilet_kaydi: { border: "#c9a53a", text: "#e0c56a", bg: "rgba(201,165,58,0.10)" },
  whatsapp: { border: "#3fae74", text: "#77d9a4", bg: "rgba(63,174,116,0.10)" },
  eposta: { border: "#2fa8ad", text: "#70d0d4", bg: "rgba(47,168,173,0.10)" },
  guvenlik_kamerasi: { border: "#7c5fd1", text: "#a891ec", bg: "rgba(124,95,209,0.10)" },
  sosyal_medya: { border: "#d1568f", text: "#e88fb7", bg: "rgba(209,86,143,0.10)" },
  haber_kupuru: { border: "#5a63c4", text: "#8f96e3", bg: "rgba(90,99,196,0.10)" },
  ses_kaydi: { border: "#dcc24a", text: "#efdd8a", bg: "rgba(220,194,74,0.10)" },
};

export function docColorFor(type: DocumentType): DocColor {
  return DOC_COLORS[type];
}
