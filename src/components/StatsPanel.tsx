"use client";

import { useEffect, useState } from "react";
import type { CaseData } from "@/types/case";
import { getCaseProgress, type CaseProgress } from "@/lib/progress";
import { ALL_ACHIEVEMENTS, getUnlockedAchievements } from "@/lib/achievements";

export function StatsPanel({ cases }: { cases: CaseData[] }) {
  const [ready, setReady] = useState(false);
  const [progressByCase, setProgressByCase] = useState<Record<string, CaseProgress>>({});
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const map: Record<string, CaseProgress> = {};
    for (const c of cases) map[c.id] = getCaseProgress(c.id);
    setProgressByCase(map);
    setUnlocked(getUnlockedAchievements());
    setReady(true);
  }, [cases]);

  if (!ready) return null;

  const progresses = cases.map((c) => progressByCase[c.id]);
  const solved = progresses.filter((p) => p.solved).length;
  const solvedList = progresses.filter((p) => p.solved && typeof p.bestPoints === "number");
  const avgPoints = solvedList.length
    ? Math.round(solvedList.reduce((sum, p) => sum + (p.bestPoints ?? 0), 0) / solvedList.length)
    : 0;

  return (
    <div className="w-full max-w-3xl mt-10 rounded-sm border border-white/10 bg-panel/60 p-5">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center mb-5">
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

      <div className="mb-5 space-y-1.5">
        <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc mb-2">
          Dedektif Dosyası
        </p>
        {cases.map((c) => {
          const p = progressByCase[c.id];
          const closed = p?.solved || p?.failed;
          return (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-sm border border-white/10 bg-background/40 px-3 py-2 text-sm"
            >
              <span className="truncate">{c.title}</span>
              {p?.solved ? (
                <span className="shrink-0 text-accent-gold font-mono-doc text-xs">
                  ✓ {p.bestRankLabel} · {p.bestPoints}p
                </span>
              ) : closed ? (
                <span className="shrink-0 text-accent-red-bright font-mono-doc text-xs">
                  ✕ Başarısız
                </span>
              ) : (
                <span className="shrink-0 text-text-dim/60 font-mono-doc text-xs">
                  Henüz çözülmedi
                </span>
              )}
            </div>
          );
        })}
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
