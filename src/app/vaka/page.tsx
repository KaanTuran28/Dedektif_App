"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { allCases } from "@/data/cases";
import { tiltFor } from "@/lib/tilt";
import { StatsPanel } from "@/components/StatsPanel";
import { formatRemaining, getCaseProgress, getRemainingMs, type CaseProgress } from "@/lib/progress";

export default function VakaSecimPage() {
  const [progressMap, setProgressMap] = useState<Record<string, CaseProgress>>({});

  useEffect(() => {
    function refresh() {
      const map: Record<string, CaseProgress> = {};
      for (const c of allCases) map[c.id] = getCaseProgress(c.id);
      setProgressMap(map);
    }
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="w-full max-w-3xl mb-4">
        <Link
          href="/"
          className="inline-block text-accent-gold text-xs uppercase tracking-widest hover:underline font-mono-doc"
        >
          ← Ana Sayfaya Dön
        </Link>
      </div>

      <div className="relative w-full max-w-3xl cork-texture rounded-md px-4 sm:px-10 py-12 sm:py-16 overflow-hidden">
        <p className="relative text-center uppercase tracking-[0.3em] text-accent-gold text-xs sm:text-sm mb-8 sm:mb-10 font-mono-doc">
          Hangi Dosyayı Açıyorsun?
        </p>

        <div className="relative w-full grid gap-6 sm:gap-8 sm:grid-cols-2">
          {allCases.map((c, i) => {
            const tilt = tiltFor(c.id);
            const progress = progressMap[c.id];
            const remaining = progress ? getRemainingMs(progress) : null;
            const inProgress = !!progress?.inProgress && remaining !== null && remaining > 0;
            const alreadyPlayed = !inProgress && !!progress && (progress.solved || !!progress.failed);
            const playedStamp = alreadyPlayed ? (progress!.solved ? "Çözüldü" : "Başarısız") : null;

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 18, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: tilt }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                whileHover={c.available ? { rotate: 0, y: -3 } : undefined}
                className="relative"
              >
                {c.available ? (
                  <Link
                    href={`/vaka/${c.id}`}
                    className="group relative block paper-card rounded-sm p-5 sm:p-6 shadow-xl"
                  >
                    <div className="pin" />
                    {playedStamp && (
                      <motion.span
                        aria-hidden
                        initial={{ scale: 2.4, opacity: 0, rotate: -25 }}
                        animate={{ scale: 1, opacity: 1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.3 + i * 0.08 }}
                        className={`stamp absolute -top-2 -right-2 sm:top-1 sm:right-1 text-[10px] sm:text-xs pointer-events-none ${
                          playedStamp === "Çözüldü" ? "text-accent-gold" : "text-accent-red-bright"
                        }`}
                      >
                        {playedStamp}
                      </motion.span>
                    )}
                    <p className="text-[11px] uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                      Vaka {String(c.order).padStart(2, "0")} · {c.difficulty}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-paper-ink">
                      {c.title}
                    </h2>
                    <p className="text-paper-ink/70 mt-2 text-sm sm:text-base">
                      {c.tagline}
                    </p>
                    {inProgress ? (
                      <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-accent-red text-sm font-semibold uppercase tracking-wide">
                          ▶ Kaldığın Yerden Devam Et
                        </span>
                        <span className="font-mono-doc text-xs text-paper-ink/60">
                          ⏱ {formatRemaining(remaining!)}
                        </span>
                      </div>
                    ) : (
                      <span className="mt-3 inline-flex items-center gap-1 text-accent-red text-sm font-semibold uppercase tracking-wide">
                        Dosyayı Aç
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    )}
                  </Link>
                ) : (
                  <div className="relative block paper-card rounded-sm p-5 sm:p-6 shadow-xl opacity-60 grayscale-[40%] cursor-not-allowed select-none">
                    <div className="pin" />
                    <p className="text-[11px] uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                      Vaka {String(c.order).padStart(2, "0")} · {c.difficulty}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-paper-ink">
                      {c.title}
                    </h2>
                    <p className="text-paper-ink/70 mt-2 text-sm sm:text-base">
                      {c.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-paper-ink/50 text-sm font-semibold uppercase tracking-wide">
                      🔒 Yakında Açılacak
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <StatsPanel cases={allCases.filter((c) => c.available)} />
    </main>
  );
}
