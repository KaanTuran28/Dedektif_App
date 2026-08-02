"use client";

import { useState } from "react";
import type { CaseDocument } from "@/types/case";

const TYPE_LABELS: Record<CaseDocument["type"], string> = {
  resmi_rapor: "Resmi Rapor",
  whatsapp: "Mesaj Dökümü",
  telefon_dokumu: "Telefon Dökümü",
  bilet_kaydi: "Kayıt",
  gunluk_log: "Günlük / Log",
  ifade: "İfade",
};

export function DocumentCard({ doc }: { doc: CaseDocument }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-panel overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
      >
        <div>
          <p className="text-[11px] uppercase tracking-widest text-accent-gold mb-1">
            {TYPE_LABELS[doc.type]}
          </p>
          <p className="font-display text-lg sm:text-xl font-bold">{doc.title}</p>
          {doc.meta && <p className="text-text-dim text-xs mt-1">{doc.meta}</p>}
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
        <div className="border-t border-white/10 paper-card">
          <div className="px-4 sm:px-6 py-5">
            {doc.body && (
              <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {doc.body}
              </p>
            )}

            {doc.dialogue && (
              <div className="space-y-3">
                {doc.dialogue.map((line, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed">
                    <span className="font-semibold">{line.speaker}:</span>{" "}
                    <span className="italic">&ldquo;{line.text}&rdquo;</span>
                  </p>
                ))}
              </div>
            )}

            {doc.messages && (
              <div className="space-y-2">
                {doc.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-2 text-sm sm:text-base ${
                      m.self
                        ? "ml-auto bg-accent-red-bright/15"
                        : "bg-black/[0.06]"
                    }`}
                  >
                    <p className="text-xs font-semibold opacity-70 mb-0.5">
                      {m.sender} <span className="font-normal">· {m.time}</span>
                    </p>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
