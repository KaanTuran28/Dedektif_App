import type { Difficulty } from "@/types/case";

export interface DetectiveRank {
  label: string;
  description: string;
  points: number;
  maxPoints: number;
}

export interface RankInput {
  correctSuspect: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  /** 0..1 — incelenen kanıt+şüpheli oranı */
  coverage: number;
  hintsUsed: number;
  difficulty: Difficulty;
}

/** Zorluk arttıkça maksimum puan da artar — aynı performans, daha zor
 * vakada daha çok puana denk gelir. */
const MAX_POINTS: Record<Difficulty, number> = {
  kolay: 100,
  orta: 150,
  zor: 200,
};

export function rankFor(input: RankInput): DetectiveRank {
  const maxPoints = MAX_POINTS[input.difficulty];

  if (!input.correctSuspect) {
    return {
      label: "Vaka Kapandı",
      description: "Yanlış kişi tutuklandı, gerçek katil serbest kaldı.",
      points: 0,
      maxPoints,
    };
  }

  // 0-100 arası bir performans yüzdesi hesapla, sonra zorluğun tavan puanına ölçekle
  let percent = 40;
  percent += Math.round(input.coverage * 30);
  percent += input.motiveCorrect ? 15 : 0;
  percent += input.methodCorrect ? 15 : 0;
  percent -= input.hintsUsed * 5;
  percent = Math.max(0, Math.min(100, percent));

  const points = Math.round((percent / 100) * maxPoints);

  if (percent >= 85) {
    return {
      label: "A Sınıfı Dedektif",
      description: "Hiçbir ayrıntıyı kaçırmadın — tam bir soruşturma.",
      points,
      maxPoints,
    };
  }
  if (percent >= 60) {
    return {
      label: "B Sınıfı Dedektif",
      description: "Sağlam bir soruşturma yürüttün.",
      points,
      maxPoints,
    };
  }
  return {
    label: "Şanslı Tahmin",
    description: "Doğru bildin ama detaylarda zorlandın.",
    points,
    maxPoints,
  };
}
