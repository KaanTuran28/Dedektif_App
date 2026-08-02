"use client";

import { useEffect, useState } from "react";
import type { CaseData } from "@/types/case";
import { getCaseProgress } from "@/lib/progress";
import { ALL_ACHIEVEMENTS, getUnlockedAchievements } from "@/lib/achievements";

export function StatsPanel({ cases }: { cases: CaseData[] }) {
  const [ready, setReady] = useState(false);
  const [solved, setSolved] = useState(0);
  const [avgPoints, setAvgPoints] = useState(0);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const progresses = cases.map((c) => getCaseProgress(c.id));
    const solvedList = progresses.filter((p) => p.solved && typeof p.bestPoints === "number");
    setSolved(progresses.filter((p) => p.solved).length);
    setAvgPoints(
      solvedList.length
        ? Math.round(solvedList.reduce((sum, p) => sum + (p.bestPoints ?? 0), 0) / solvedList.length)
        : 0
    );
    setUnlocked(getUnlockedAchievements());
    setReady(true);
  }, [cases]);

  if (!ready) return null;

  return (
    <div className="w-full max-w-3xl mt-10 rounded-sm border border-white/10 bg-panel/60 p-5">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center mb-4">
        <div>
          <p className="font-display text-2xl font-bold text-accent-gold">
            {solved}/{cases.length}
          </p>
          <p className="text-text-dim text-[11px] font-mono-doc uppercase tracking-widest">Vaka Çözüldü</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-accent-gold">{avgPoints}</p>
          <p className="text-text-dim text-[11px] font-mono-doc uppercase tracking-widest">Ortalama Puan</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-accent-gold">
            {unlocked.length}/{ALL_ACHIEVEMENTS.length}
          </p>
          <p className="text-text-dim text-[11px] font-mono-doc uppercase tracking-widest">Rozet</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {ALL_ACHIEVEMENTS.map((a) => {
          const has = unlocked.includes(a.id);
          return (
            <span
              key={a.id}
              title={a.description}
              className={`text-[11px] font-mono-doc px-2.5 py-1 rounded-full border ${
                has
                  ? "border-accent-gold text-accent-gold bg-accent-gold/10"
                  : "border-white/10 text-text-dim/50"
              }`}
            >
              {has ? "🏅" : "🔒"} {a.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
