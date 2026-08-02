"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Suspect } from "@/types/case";
import { tiltFor } from "@/lib/tilt";
import { suspectColorFor } from "@/lib/suspectColor";
import { playPaper } from "@/lib/sound";

export function SuspectCard({
  suspect,
  index,
  onOpen,
}: {
  suspect: Suspect;
  index: number;
  onOpen?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tilt = tiltFor(suspect.id);
  const tag = `Ş-${String(index + 1).padStart(2, "0")}`;
  const color = suspectColorFor(suspect.id);

  return (
    <motion.div
      animate={{ rotate: open ? 0 : tilt }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative rounded-sm border border-white/10 bg-panel overflow-hidden"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <div className="pin" />
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.(suspect.id);
          playPaper();
        }}
        className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div
          className="relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-sm overflow-hidden border-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)",
            backgroundColor: "#0f0d0d",
            borderColor: `${color}80`,
          }}
        >
          <svg
            viewBox="0 0 64 64"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85%] w-[85%] text-white/25"
            fill="currentColor"
            aria-hidden
          >
            <circle cx="32" cy="20" r="14" />
            <path d="M6 62c0-16 11.6-26 26-26s26 10 26 26" />
          </svg>
          <span className="absolute top-1 left-1 rounded bg-accent-gold text-black text-[9px] font-mono-doc font-bold px-1">
            {tag}
          </span>
        </div>

        <div className="min-w-0">
          <p className="font-display text-lg sm:text-xl font-bold truncate">
            {suspect.name}
          </p>
          <p className="text-text-dim text-xs mt-0.5 font-mono-doc">
            {suspect.role} · {suspect.age} yaşında
          </p>
        </div>

        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto shrink-0 text-accent-red-bright text-xl"
        >
          ›
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
            className="border-t border-white/10 px-4 sm:px-5 py-4 space-y-3 text-sm sm:text-base"
          >
            <p>
              <span className="text-accent-gold text-xs uppercase tracking-widest block mb-1 font-mono-doc">
                Motiv
              </span>
              {suspect.motive}
            </p>
            <p>
              <span className="text-accent-gold text-xs uppercase tracking-widest block mb-1 font-mono-doc">
                Fırsat
              </span>
              {suspect.opportunity}
            </p>
            <div>
              <span className="text-accent-gold text-xs uppercase tracking-widest block mb-1 font-mono-doc">
                İfade
              </span>
              <p className="italic text-text-dim leading-relaxed whitespace-pre-wrap">
                {suspect.statementIntro}
              </p>
            </div>
            {suspect.statementQA.length > 0 && (
              <div>
                <span className="text-accent-gold text-xs uppercase tracking-widest block mb-2 font-mono-doc">
                  Sorgu Tutanağı
                </span>
                <div className="space-y-3 rounded-sm border border-white/10 bg-background/40 px-3 py-3">
                  {suspect.statementQA.map((qa, i) => (
                    <div key={i} className="text-sm leading-relaxed font-mono-doc">
                      <p>
                        <span className="font-semibold text-accent-red">Polis:</span>{" "}
                        {qa.question}
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold text-accent-gold">
                          {suspect.name.split(" ")[0]}:
                        </span>{" "}
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
