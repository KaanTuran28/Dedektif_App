"use client";

import { useState } from "react";
import type { Suspect } from "@/types/case";

export function SuspectCard({ suspect }: { suspect: Suspect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-panel overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
      >
        <div>
          <p className="font-display text-lg sm:text-xl font-bold">{suspect.name}</p>
          <p className="text-text-dim text-xs mt-0.5">
            {suspect.role} · {suspect.age} yaşında
          </p>
        </div>
        <span
          className={`shrink-0 text-accent-red-bright text-xl transition-transform ${
            open ? "rotate-90" : ""
          }`}
        >
          ›
        </span>
      </button>

      {open && (
        <div className="border-t border-white/10 px-4 sm:px-5 py-4 space-y-3 text-sm sm:text-base">
          <p>
            <span className="text-accent-gold text-xs uppercase tracking-widest block mb-1">
              Motiv
            </span>
            {suspect.motive}
          </p>
          <p>
            <span className="text-accent-gold text-xs uppercase tracking-widest block mb-1">
              Fırsat
            </span>
            {suspect.opportunity}
          </p>
          <p className="italic text-text-dim">
            <span className="text-accent-gold text-xs uppercase tracking-widest not-italic block mb-1">
              İfade
            </span>
            {suspect.statement}
          </p>
        </div>
      )}
    </div>
  );
}
