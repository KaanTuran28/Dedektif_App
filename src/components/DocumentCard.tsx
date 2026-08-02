"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CaseDocument } from "@/types/case";
import { tiltFor } from "@/lib/tilt";
import { playPaper } from "@/lib/sound";

const TYPE_LABELS: Record<CaseDocument["type"], string> = {
  resmi_rapor: "Resmi Rapor",
  whatsapp: "Mesaj Dökümü",
  telefon_dokumu: "Telefon Dökümü",
  bilet_kaydi: "Kayıt",
  gunluk_log: "Günlük / Log",
  ifade: "İfade",
  eposta: "E-posta",
};

function signatureFromMeta(meta?: string) {
  if (!meta) return null;
  const first = meta.split("·")[0]?.trim();
  return first || null;
}

export function DocumentCard({
  doc,
  onOpen,
}: {
  doc: CaseDocument;
  onOpen?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tilt = tiltFor(doc.id);

  return (
    <div
      className="relative rounded-sm border border-white/10 bg-panel overflow-hidden"
      style={{ transform: open ? "none" : `rotate(${tilt}deg)` }}
    >
      <div className="pin" />
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.(doc.id);
          playPaper();
        }}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="text-[11px] uppercase tracking-widest text-accent-gold mb-1 font-mono-doc">
            {TYPE_LABELS[doc.type]}
          </p>
          <p className="font-display text-lg sm:text-xl font-bold">{doc.title}</p>
          {doc.meta && <p className="text-text-dim text-xs mt-1">{doc.meta}</p>}
        </div>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-accent-red-bright text-xl"
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
            className="border-t border-white/10"
          >
            <DocumentBody doc={doc} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentBody({ doc }: { doc: CaseDocument }) {
  if (doc.type === "whatsapp") {
    return (
      <div className="paper-card paper-card--plain relative px-4 sm:px-6 py-5">
        <span className="absolute top-3 right-3 text-[10px] font-mono-doc uppercase tracking-widest text-paper-ink/40 rotate-3 border border-paper-ink/25 rounded px-1.5 py-0.5">
          Ekran Görüntüsü
        </span>
        <div className="mx-auto max-w-sm rounded-[1.5rem] bg-[#1b1b1b] p-2 shadow-lg">
          <div className="flex items-center justify-center gap-1 py-1.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="rounded-[1.1rem] bg-[#0c0c0c] px-3 py-3 space-y-2 max-h-96 overflow-y-auto">
            {doc.messages?.map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] rounded-xl px-3 py-2 text-sm ${
                  m.self
                    ? "ml-auto bg-accent-red-bright/25 text-text"
                    : "bg-white/10 text-text"
                }`}
              >
                <p className="text-[11px] font-semibold opacity-60 mb-0.5">
                  {m.sender} <span className="font-normal">· {m.time}</span>
                </p>
                <p className="leading-snug">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (doc.type === "bilet_kaydi") {
    return (
      <div className="paper-card paper-torn relative px-4 sm:px-6 py-5 font-mono-doc text-sm">
        <div className="flex items-center gap-2 mb-3 text-accent-red text-xs uppercase tracking-[0.2em]">
          <span>✂ Bilet Sureti</span>
        </div>
        {doc.body && (
          <p className="whitespace-pre-wrap leading-loose">{doc.body}</p>
        )}
      </div>
    );
  }

  if (doc.type === "telefon_dokumu") {
    return (
      <div className="paper-card paper-torn relative px-4 sm:px-6 py-5">
        <div className="flex items-center gap-2 mb-4 text-accent-red text-xs uppercase tracking-widest font-mono-doc">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red-bright opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-red-bright" />
          </span>
          Kayıt Dökümü
        </div>
        <div className="space-y-3">
          {doc.dialogue?.map((line, i) => (
            <p key={i} className="text-sm sm:text-base leading-relaxed font-mono-doc">
              <span className="font-semibold">{line.speaker}:</span>{" "}
              <span className="italic">&ldquo;{line.text}&rdquo;</span>
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (doc.type === "ifade") {
    const sig = signatureFromMeta(doc.meta);
    return (
      <div className="paper-card paper-torn relative px-4 sm:px-6 py-6">
        <span
          aria-hidden
          className="absolute -top-2 left-6 text-2xl rotate-[-18deg] opacity-70 select-none"
        >
          📎
        </span>
        {doc.body && (
          <p className="whitespace-pre-wrap italic leading-relaxed text-sm sm:text-base">
            {doc.body}
          </p>
        )}
        {sig && (
          <p className="font-hand text-2xl mt-5 text-right text-paper-ink/80">
            {sig}
          </p>
        )}
      </div>
    );
  }

  if (doc.type === "eposta") {
    const h = doc.emailHeader;
    return (
      <div className="paper-card paper-torn relative px-4 sm:px-6 py-5">
        {h && (
          <div className="mb-4 pb-3 border-b border-paper-ink/15 font-mono-doc text-xs sm:text-sm space-y-0.5">
            <p><span className="text-accent-red">Kimden:</span> {h.from}</p>
            <p><span className="text-accent-red">Kime:</span> {h.to}</p>
            <p><span className="text-accent-red">Konu:</span> {h.subject}</p>
            <p><span className="text-accent-red">Tarih:</span> {h.date}</p>
          </div>
        )}
        {doc.body && (
          <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {doc.body}
          </p>
        )}
      </div>
    );
  }

  // resmi_rapor & gunluk_log
  return (
    <div className="paper-card paper-torn relative px-4 sm:px-6 py-5">
      <span
        aria-hidden
        className="absolute top-3 right-3 sm:top-4 sm:right-5 stamp text-accent-red text-[10px] sm:text-xs rotate-[-10deg]"
      >
        {doc.type === "gunluk_log" ? "El Yazısı" : "Resmî"}
      </span>
      {doc.body && (
        <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base font-mono-doc pr-16">
          {doc.body}
        </p>
      )}
    </div>
  );
}
