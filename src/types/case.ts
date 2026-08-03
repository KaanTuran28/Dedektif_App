export type DocumentType =
  | "resmi_rapor"
  | "whatsapp"
  | "telefon_dokumu"
  | "bilet_kaydi"
  | "gunluk_log"
  | "ifade"
  | "eposta"
  | "guvenlik_kamerasi"
  | "sosyal_medya"
  | "haber_kupuru"
  | "ses_kaydi"
  | "sifreli_kayit"
  | "kilitli_kasa";

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

export interface EmailHeader {
  from: string;
  to: string;
  subject: string;
  date: string;
}

export interface SocialPost {
  author: string;
  handle: string;
  time: string;
  text: string;
  likes?: number;
  comments?: number;
}

export interface NewsHeader {
  publication: string;
  headline: string;
  byline?: string;
  date: string;
}

export interface CaseDocument {
  id: string;
  type: DocumentType;
  title: string;
  meta?: string;
  /** Düz metin / markdown-benzeri gövde (resmi_rapor, gunluk_log, ifade, bilet_kaydi, eposta, güvenlik kamerası gözlem notu, ses kaydı özeti, haber küpürü metni) */
  body?: string;
  /** whatsapp tipi için mesaj listesi */
  messages?: ChatMessage[];
  /** telefon_dokumu tipi için diyalog satırları */
  dialogue?: DialogueLine[];
  /** eposta tipi için başlık alanları */
  emailHeader?: EmailHeader;
  /** sosyal_medya tipi için gönderi bilgileri */
  socialPost?: SocialPost;
  /** haber_kupuru tipi için başlık alanları (gövde metni `body`'de) */
  newsHeader?: NewsHeader;
  /** guvenlik_kamerasi tipi için ekranda yanan zaman damgası */
  cameraTimestamp?: string;
  /** ses_kaydi tipi için süre göstergesi */
  audioDuration?: string;
  /** sifreli_kayit tipi için oyuncuya gösterilen şifreli ham metin */
  cipherEncoded?: string;
  /** sifreli_kayit tipi için beklenen çözüm (karşılaştırma normalize edilerek yapılır) */
  cipherAnswer?: string;
  /** sifreli_kayit tipi için çözülünce açığa çıkan asıl içerik */
  cipherReveal?: string;
  /** sifreli_kayit tipi için sırayla açılan, bu bulmacaya özel ipucu zinciri (genel hints[]'ten ayrı, rütbeyi etkilemez) */
  cipherHints?: string[];
  /** kilitli_kasa tipi için kombinasyon kilidinin hane sayısı (genelde 3) */
  lockDigits?: number;
  /** kilitli_kasa tipi için beklenen kod (rakamlar, karşılaştırma rakam-dışı karakterleri yok sayar) */
  lockAnswer?: string;
  /** kilitli_kasa tipi için doğru kod girilince açığa çıkan içerik */
  lockReveal?: string;
  /** kilitli_kasa tipi için sırayla açılan ipucu zinciri */
  lockHints?: string[];
}

export interface StatementExchange {
  question: string;
  answer: string;
}

export interface Suspect {
  id: string;
  name: string;
  age: number;
  role: string;
  motive: string;
  opportunity: string;
  /** Şüphelinin olayı kendi ağzından anlattığı, ifadenin giriş bölümü */
  statementIntro: string;
  /** Girişten sonraki polis sorgu-cevap kısmı */
  statementQA: StatementExchange[];
}

export type Difficulty = "kolay" | "orta" | "zor";

export interface TimelineEvent {
  time: string;
  description: string;
  /** Bu olayın ilişkili olduğu şüpheli — ileride vaka içeriğinde referans için tutulur */
  contradicts?: string;
}

export interface AccusationOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface FollowUpQuestion {
  prompt: string;
  options: AccusationOption[];
}

export interface CaseData {
  id: string;
  order: number;
  title: string;
  difficulty: Difficulty;
  tagline: string;
  /** false ise vaka "Yakında Açılacak" olarak kilitli gösterilir, oynanamaz */
  available: boolean;
  synopsis: string;
  victim: {
    name: string;
    age: number;
    description: string;
  };
  suspects: Suspect[];
  documents: CaseDocument[];
  /** Kronolojik olay şeridi — Zaman Çizelgesi aracında gösterilir */
  timeline: TimelineEvent[];
  /** Takılan oyuncu için sırayla açılan ipucu metinleri (genelde 3 tane) */
  hints: string[];
  /** Suçlama sonrası sorulan "neden" takip sorusu, rütbeye katkı sağlar */
  motiveQuestion: FollowUpQuestion;
  /** Suçlama sonrası sorulan "nasıl" takip sorusu, rütbeye katkı sağlar */
  methodQuestion: FollowUpQuestion;
  solution: {
    killerId: string;
    explanation: string;
  };
}
