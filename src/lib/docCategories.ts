import type { CaseDocument, DocumentType } from "@/types/case";

interface DocCategory {
  label: string;
  types: DocumentType[];
}

const CATEGORIES: DocCategory[] = [
  { label: "🔐 Kilitli Kayıtlar", types: ["sifreli_kayit", "kilitli_kasa"] },
  { label: "Resmi Belgeler", types: ["resmi_rapor", "guvenlik_kamerasi", "bilet_kaydi"] },
  { label: "İletişim ve Yazışmalar", types: ["whatsapp", "telefon_dokumu", "eposta"] },
  { label: "Kişisel Kayıtlar", types: ["gunluk_log", "ifade", "ses_kaydi"] },
  { label: "Basın ve Sosyal Medya", types: ["sosyal_medya", "haber_kupuru"] },
];

export interface GroupedDocuments {
  label: string;
  documents: CaseDocument[];
}

/** Kanıtlar sekmesini tür bazlı bölümlere ayırır — düz bir liste yerine
 * "Resmi Belgeler / İletişim / Kişisel Kayıtlar / Basın" gibi derli toplu gruplar. */
export function groupDocumentsByCategory(documents: CaseDocument[]): GroupedDocuments[] {
  const groups: GroupedDocuments[] = CATEGORIES.map((c) => ({
    label: c.label,
    documents: documents.filter((d) => c.types.includes(d.type)),
  })).filter((g) => g.documents.length > 0);

  const categorized = new Set(groups.flatMap((g) => g.documents.map((d) => d.id)));
  const rest = documents.filter((d) => !categorized.has(d.id));
  if (rest.length > 0) groups.push({ label: "Diğer", documents: rest });

  return groups;
}
