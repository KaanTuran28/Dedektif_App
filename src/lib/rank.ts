export interface DetectiveRank {
  label: string;
  description: string;
}

/** coverage: 0..1 — incelenen kanıt+şüpheli oranı. Yalnızca doğru suçlamada anlamlı. */
export function rankFor(correct: boolean, coverage: number): DetectiveRank {
  if (!correct) {
    return {
      label: "Vaka Kapandı",
      description: "Yanlış kişi tutuklandı, gerçek katil serbest kaldı.",
    };
  }
  if (coverage >= 0.9) {
    return {
      label: "A Sınıfı Dedektif",
      description: "Hiçbir ayrıntıyı kaçırmadın — tam bir soruşturma.",
    };
  }
  if (coverage >= 0.5) {
    return {
      label: "B Sınıfı Dedektif",
      description: "Sağlam bir soruşturma yürüttün.",
    };
  }
  return {
    label: "Şanslı Tahmin",
    description: "Doğru bildin ama kanıtların çoğunu hiç incelemedin.",
  };
}
