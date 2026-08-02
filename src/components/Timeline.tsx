"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Suspect, TimelineEvent } from "@/types/case";
import { getSolvedContradictions, markContradictionSolved } from "@/lib/timelinePuzzle";
import { unlockContradictionHunter } from "@/lib/achievements";
import { playMatch, playMismatch, playTick } from "@/lib/sound";

export function Timeline({
  events,
  suspects,
  caseId,
}: {
  events: TimelineEvent[];
  suspects: Suspect[];
  caseId: string;
}) {
  const [solved, setSolved] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<number | null>(null);

  const puzzleEvents = events.filter((e) => e.contradicts);
  const totalPuzzles = puzzleEvents.length;

  useEffect(() => {
    setSolved(getSolvedContradictions(caseId));
  }, [caseId]);

  const suspectById = (id: string) => suspects.find((s) => s.id === id);
  const trayChips = suspects.filter(
    (s) => puzzleEvents.some((e) => e.contradicts === s.id) && !solved.includes(s.id)
  );

  function handleChipTap(suspectId: string) {
    setSelected((prev) => (prev === suspectId ? null : suspectId));
    playTick();
  }

  function handleZoneTap(index: number) {
    if (!selected) return;
    const zoneEvent = events[index];
    if (zoneEvent.contradicts === selected) {
      const next = markContradictionSolved(caseId, selected);
      setSolved(next);
      setSelected(null);
      playMatch();
      if (next.length === totalPuzzles) unlockContradictionHunter();
    } else {
      playMismatch();
      setShake(index);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-text-dim text-sm">
        Vakada bilinen olayların kronolojik şeridi.
        {totalPuzzles > 0 && (
          <>
            {" "}Bazı olaylar bir şüphelinin ifadesiyle çelişiyor — önce bir
            şüpheliye, sonra ilgili olaya dokun.
          </>
        )}
      </p>

      {totalPuzzles > 0 && (
        <div className="rounded-sm border border-white/10 bg-panel p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
              Şüpheliler
              {selected && (
                <span className="text-text-dim normal-case tracking-normal font-sans">
                  {" "}— şimdi olayı seç
                </span>
              )}
            </p>
            <p className="text-text-dim text-[11px] font-mono-doc">
              {solved.length}/{totalPuzzles} çelişki yakalandı
            </p>
          </div>
          {trayChips.length === 0 ? (
            <p className="text-text-dim text-sm italic">
              Tüm çelişkileri yakaladın. 🎉
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {trayChips.map((s) => {
                const isSelected = selected === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleChipTap(s.id)}
                    aria-pressed={isSelected}
                    className={`select-none rounded-sm border px-3 py-2 flex items-center gap-2 shadow-lg transition-colors ${
                      isSelected
                        ? "border-accent-gold bg-accent-gold/10 ring-2 ring-accent-gold"
                        : "border-white/15 bg-background hover:border-white/30"
                    }`}
                  >
                    <div className="h-7 w-7 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="h-5 w-5 text-white/40" fill="currentColor" aria-hidden>
                        <circle cx="32" cy="20" r="14" />
                        <path d="M6 62c0-16 11.6-26 26-26s26 10 26 26" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap">{s.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-accent-red-bright/40" />
        <div className="space-y-6">
          {events.map((e, i) => {
            const isZone = !!e.contradicts;
            const isSolved = isZone && solved.includes(e.contradicts!);
            const matchedSuspect = isSolved ? suspectById(e.contradicts!) : null;
            const clickable = isZone && !isSolved && !!selected;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: 1,
                  x: shake === i ? [0, -6, 6, -4, 4, 0] : 0,
                }}
                transition={{ duration: shake === i ? 0.4 : 0.3, delay: shake === i ? 0 : Math.min(i * 0.05, 0.6) }}
                className="relative"
              >
                <span
                  className={`absolute -left-6 sm:-left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-background ${
                    isZone ? (isSolved ? "bg-accent-gold" : "bg-accent-red-bright") : "bg-accent-gold"
                  }`}
                />
                <p className="font-mono-doc text-accent-gold text-sm font-semibold">{e.time}</p>
                <button
                  onClick={isZone && !isSolved ? () => handleZoneTap(i) : undefined}
                  disabled={!isZone || isSolved}
                  className={
                    isZone
                      ? `mt-1 w-full text-left rounded-sm border-2 border-dashed px-3 py-2 transition-colors ${
                          isSolved
                            ? "border-accent-gold/70 bg-accent-gold/10 cursor-default"
                            : clickable
                              ? "border-accent-gold bg-accent-gold/5 cursor-pointer animate-pulse"
                              : "border-accent-red-bright/50 bg-accent-red-bright/5 cursor-default"
                        }`
                      : "mt-1 w-full text-left cursor-default"
                  }
                >
                  <p className="text-text leading-relaxed">{e.description}</p>
                  {isSolved && matchedSuspect && (
                    <p className="text-accent-gold text-xs font-mono-doc mt-1.5">
                      ✓ {matchedSuspect.name} ile eşleşti
                    </p>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
