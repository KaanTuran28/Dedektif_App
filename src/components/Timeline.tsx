"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "motion/react";
import type { Suspect, TimelineEvent } from "@/types/case";
import { getSolvedContradictions, markContradictionSolved } from "@/lib/timelinePuzzle";
import { unlockContradictionHunter } from "@/lib/achievements";
import { playMatch, playMismatch } from "@/lib/sound";

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
  const [loaded, setLoaded] = useState(false);
  const [shake, setShake] = useState<number | null>(null);
  const zoneRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const puzzleEvents = events.filter((e) => e.contradicts);
  const totalPuzzles = puzzleEvents.length;

  useEffect(() => {
    setSolved(getSolvedContradictions(caseId));
    setLoaded(true);
  }, [caseId]);

  const suspectById = (id: string) => suspects.find((s) => s.id === id);
  const trayChips = suspects.filter(
    (s) => puzzleEvents.some((e) => e.contradicts === s.id) && !solved.includes(s.id)
  );

  function handleDrop(suspectId: string, info: PanInfo) {
    let matchedIndex: number | null = null;
    for (const [idxStr, el] of Object.entries(zoneRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      ) {
        matchedIndex = Number(idxStr);
        break;
      }
    }
    if (matchedIndex === null) return;

    const zoneEvent = events[matchedIndex];
    if (zoneEvent.contradicts === suspectId) {
      const next = markContradictionSolved(caseId, suspectId);
      setSolved(next);
      playMatch();
      if (next.length === totalPuzzles) unlockContradictionHunter();
    } else {
      playMismatch();
      setShake(matchedIndex);
      setTimeout(() => setShake(null), 400);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-text-dim text-sm">
        Vakada bilinen olayların kronolojik şeridi.
        {totalPuzzles > 0 && (
          <>
            {" "}Bazı olaylar bir şüphelinin ifadesiyle çelişiyor — o şüpheliyi
            aşağıdan sürükleyip ilgili olaya bırak.
          </>
        )}
      </p>

      {totalPuzzles > 0 && (
        <div className="rounded-sm border border-white/10 bg-panel p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
              Şüpheliler
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
              {trayChips.map((s) => (
                <motion.div
                  key={s.id}
                  drag
                  dragSnapToOrigin
                  dragElastic={0.15}
                  whileDrag={{ scale: 1.08, zIndex: 50 }}
                  onDragEnd={(_e, info) => handleDrop(s.id, info)}
                  className="cursor-grab active:cursor-grabbing select-none rounded-sm border border-white/15 bg-background px-3 py-2 flex items-center gap-2 shadow-lg"
                  style={{ touchAction: "none" }}
                >
                  <div className="h-7 w-7 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 64 64" className="h-5 w-5 text-white/40" fill="currentColor" aria-hidden>
                      <circle cx="32" cy="20" r="14" />
                      <path d="M6 62c0-16 11.6-26 26-26s26 10 26 26" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap">{s.name}</span>
                </motion.div>
              ))}
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
                <div
                  ref={isZone ? (el) => { zoneRefs.current[i] = el; } : undefined}
                  className={
                    isZone
                      ? `mt-1 rounded-sm border-2 border-dashed px-3 py-2 transition-colors ${
                          isSolved
                            ? "border-accent-gold/70 bg-accent-gold/10"
                            : "border-accent-red-bright/50 bg-accent-red-bright/5"
                        }`
                      : undefined
                  }
                >
                  <p className="text-text leading-relaxed">{e.description}</p>
                  {isSolved && matchedSuspect && (
                    <p className="text-accent-gold text-xs font-mono-doc mt-1.5">
                      ✓ {matchedSuspect.name} ile eşleşti
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
