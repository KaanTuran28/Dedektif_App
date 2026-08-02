"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getHintsUsed, useNextHint } from "@/lib/progress";
import { playTick } from "@/lib/sound";

export function HintPanel({ caseId, hints }: { caseId: string; hints: string[] }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    setUsed(getHintsUsed(caseId));
  }, [caseId]);

  function revealNext() {
    const next = useNextHint(caseId, hints.length);
    setUsed(next);
    playTick();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-sm border border-white/15 h-9 px-3 flex items-center gap-1.5 text-text-dim hover:text-text hover:border-white/30 transition-colors text-xs font-mono-doc"
      >
        💡 {used}/{hints.length}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-sm border border-accent-gold/40 bg-panel p-4 shadow-xl z-20"
          >
            <p className="text-xs uppercase tracking-widest text-accent-gold font-mono-doc mb-2">
              İpuçları
            </p>
            <p className="text-text-dim text-[11px] mb-3">
              İpucu kullanmak dedektif rütbeni biraz düşürür ama vazgeçmekten
              iyidir.
            </p>
            <div className="space-y-2 mb-3">
              {hints.slice(0, used).map((h, i) => (
                <p key={i} className="text-sm leading-relaxed border-l-2 border-accent-gold/50 pl-3">
                  {h}
                </p>
              ))}
              {used === 0 && (
                <p className="text-text-dim text-sm italic">Henüz ipucu almadın.</p>
              )}
            </div>
            <button
              onClick={revealNext}
              disabled={used >= hints.length}
              className="w-full rounded-sm bg-accent-gold text-black px-3 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {used >= hints.length ? "Tüm ipuçları açıldı" : "Sonraki İpucu"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
