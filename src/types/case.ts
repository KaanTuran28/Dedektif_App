export type DocumentType =
  | "resmi_rapor"
  | "whatsapp"
  | "telefon_dokumu"
  | "bilet_kaydi"
  | "gunluk_log"
  | "ifade";

export interface ChatMessage {
  sender: string;
  time: string;
  text: string;
  self?: boolean;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface CaseDocument {
  id: string;
  type: DocumentType;
  title: string;
  meta?: string;
  /** Düz metin / markdown-benzeri gövde (resmi_rapor, gunluk_log, ifade, bilet_kaydi) */
  body?: string;
  /** whatsapp tipi için mesaj listesi */
  messages?: ChatMessage[];
  /** telefon_dokumu tipi için diyalog satırları */
  dialogue?: DialogueLine[];
}

export interface Suspect {
  id: string;
  name: string;
  age: number;
  role: string;
  motive: string;
  opportunity: string;
  statement: string;
}

export type Difficulty = "kolay" | "orta" | "zor";

export interface CaseData {
  id: string;
  order: number;
  title: string;
  difficulty: Difficulty;
  tagline: string;
  synopsis: string;
  victim: {
    name: string;
    age: number;
    description: string;
  };
  suspects: Suspect[];
  documents: CaseDocument[];
  solution: {
    killerId: string;
    explanation: string;
  };
}
