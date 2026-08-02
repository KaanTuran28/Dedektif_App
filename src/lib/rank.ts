export interface DetectiveRank {
  label: string;
  description: string;
  points: number;
}

export interface RankInput {
  correctSuspect: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  /** 0..1 — incelenen kanıt+şüpheli oranı */
  coverage: number;
  hintsUsed: number;
}

export function rankFor(input: RankInput): DetectiveRank {
  if (!input.correctSuspect) {
    return {
      label: "Vaka Kapandı",
      description: "Yanlış kişi tutuklandı, gerçek katil serbest kaldı.",
      points: 0,
    };
  }

  let points = 40;
  points += Math.round(input.coverage * 30);
  points += input.motiveCorrect ? 15 : 0;
  points += input.methodCorrect ? 15 : 0;
  points -= input.hintsUsed * 5;
  points = Math.max(0, Math.min(100, points));

  if (points >= 85) {
    return {
      label: "A Sınıfı Dedektif",
      description: "Hiçbir ayrıntıyı kaçırmadın — tam bir soruşturma.",
      points,
    };
  }
  if (points >= 60) {
    return {
      label: "B Sınıfı Dedektif",
      description: "Sağlam bir soruşturma yürüttün.",
      points,
    };
  }
  return {
    label: "Şanslı Tahmin",
    description: "Doğru bildin ama detaylarda zorlandın.",
    points,
  };
}
