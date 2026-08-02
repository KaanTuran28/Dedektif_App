export interface Achievement {
  id: string;
  label: string;
  description: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "titiz-dedektif",
    label: "Titiz Dedektif",
    description: "Bir vakada kanıtların en az %90'ını inceleyip doğru çözdün.",
  },
  {
    id: "ilk-bakista",
    label: "İlk Bakışta",
    description: "Hiç ipucu kullanmadan bir vakayı doğru çözdün.",
  },
  {
    id: "tam-isabet",
    label: "Tam İsabet",
    description: "Katili, motivini ve yöntemini eksiksiz doğru bildin.",
  },
  {
    id: "seri-dedektif",
    label: "Seri Dedektif",
    description: "İki veya daha fazla vakayı çözdün.",
  },
  {
    id: "celiski-avcisi",
    label: "Çelişki Avcısı",
    description: "Bir vakanın zaman çizelgesindeki tüm çelişkileri yakaladın.",
  },
];

const STORAGE_KEY = "supheli:basarimlar";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getUnlockedAchievements(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function unlock(id: string) {
  const current = getUnlockedAchievements();
  if (!current.includes(id)) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
  }
}

export function unlockContradictionHunter() {
  if (!isBrowser()) return;
  unlock("celiski-avcisi");
}

export function checkAchievements(input: {
  caseId: string;
  correct: boolean;
  coverage: number;
  hintsUsed: number;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  solvedCasesCount: number;
}) {
  if (!isBrowser() || !input.correct) return;
  if (input.coverage >= 0.9) unlock("titiz-dedektif");
  if (input.hintsUsed === 0) unlock("ilk-bakista");
  if (input.motiveCorrect && input.methodCorrect) unlock("tam-isabet");
  if (input.solvedCasesCount >= 2) unlock("seri-dedektif");
}
