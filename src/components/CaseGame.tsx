"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { CaseData } from "@/types/case";
import { DocumentCard } from "@/components/DocumentCard";
import { SuspectCard } from "@/components/SuspectCard";
import { Notebook } from "@/components/Notebook";
import { recordAccusation } from "@/lib/progress";

type Step = "giris" | "kanitlar" | "supheliler" | "notlar" | "suclama" | "sonuc";

const TABS: { id: Step; label: string }[] = [
  { id: "giris", label: "Vaka" },
  { id: "kanitlar", label: "Kanıtlar" },
  { id: "supheliler", label: "Şüpheliler" },
  { id: "notlar", label: "Notlar" },
];

export function CaseGame({ data }: { data: CaseData }) {
  const [step, setStep] = useState<Step>("giris");
  const [accusedId, setAccusedId] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  function handleAccuse() {
    if (!accusedId) return;
    const correct = accusedId === data.solution.killerId;
    recordAccusation(data.id, accusedId, correct);
    setResult(correct);
    setStep("sonuc");
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b border-white/10 bg-panel/70 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-accent-gold text-xs uppercase tracking-widest hover:underline font-mono-doc">
              ← Vaka Seçimi
            </Link>
            <h1 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
              {data.title}
            </h1>
          </div>
          {step !== "sonuc" && (
            <button
              onClick={() => setStep("suclama")}
              className="shrink-0 rounded-sm bg-accent-red-bright px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
            >
              Katili Suçla
            </button>
          )}
        </div>

        {step !== "sonuc" && (
          <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = step === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setStep(t.id)}
                  aria-current={active}
                  className={`relative shrink-0 px-4 sm:px-5 pt-2 pb-2.5 text-sm font-mono-doc transition-colors ${
                    active ? "text-black" : "text-text-dim hover:text-text"
                  }`}
                  style={{
                    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
                    backgroundColor: active ? "var(--accent-gold)" : "transparent",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === "giris" && (
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-text-dim leading-relaxed text-base sm:text-lg"
                >
                  {data.synopsis}
                </motion.p>
                <div className="relative paper-card paper-torn rounded-sm p-5">
                  <p className="text-xs uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                    Kurban
                  </p>
                  <p className="font-display text-xl font-bold">
                    {data.victim.name} ({data.victim.age})
                  </p>
                  <p className="text-paper-ink/70 text-sm mt-1">{data.victim.description}</p>
                </div>
                <button
                  onClick={() => setStep("kanitlar")}
                  className="w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
                >
                  Soruşturmaya Başla
                </button>
              </div>
            )}

            {step === "kanitlar" && (
              <div className="space-y-5">
                {data.documents.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            )}

            {step === "supheliler" && (
              <div className="space-y-5">
                {data.suspects.map((s, i) => (
                  <SuspectCard key={s.id} suspect={s} index={i} />
                ))}
              </div>
            )}

            {step === "notlar" && <Notebook caseId={data.id} />}

            {step === "suclama" && (
              <AccusationLineup
                data={data}
                accusedId={accusedId}
                onSelect={setAccusedId}
                onConfirm={handleAccuse}
              />
            )}

            {step === "sonuc" && result !== null && (
              <ResultReveal data={data} result={result} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function AccusationLineup({
  data,
  accusedId,
  onSelect,
  onConfirm,
}: {
  data: CaseData;
  accusedId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-5">
      <p className="text-text-dim">
        Kanıtları ve ifadeleri değerlendirdin. Şimdi katili seç — bu geri
        alınamaz bir suçlama.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {data.suspects.map((s) => {
          const selected = accusedId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              aria-pressed={selected}
              className={`relative rounded-sm border p-3 text-left transition-colors ${
                selected
                  ? "border-accent-red-bright bg-accent-red-bright/10"
                  : "border-white/10 bg-panel hover:border-white/25"
              }`}
            >
              <div
                className="relative mx-auto mb-2 h-16 w-16 rounded-sm overflow-hidden border border-white/15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)",
                  backgroundColor: "#0f0d0d",
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
                {selected && (
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-1 rounded-full border-[3px] border-accent-red-bright"
                  />
                )}
              </div>
              <p className="font-display font-bold text-sm text-center truncate">
                {s.name}
              </p>
              <p className="text-text-dim text-[11px] text-center font-mono-doc">
                {s.role}
              </p>
            </button>
          );
        })}
      </div>
      <button
        onClick={onConfirm}
        disabled={!accusedId}
        className="w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Dosyayı Kapat
      </button>
    </div>
  );
}

function ResultReveal({ data, result }: { data: CaseData; result: boolean }) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center py-4">
        <motion.p
          initial={{ scale: 2.6, opacity: 0, rotate: -14 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className={`stamp text-2xl sm:text-4xl font-black ${
            result ? "text-accent-gold" : "text-accent-red-bright"
          }`}
        >
          {result ? "Çözüldü" : "Yanlış Şüpheli"}
        </motion.p>
      </div>
      <p className="text-text-dim">
        {result
          ? "Doğru şüpheliyi işaret ettin."
          : `Suçladığın kişi katil değildi. Gerçek katil: ${
              data.suspects.find((s) => s.id === data.solution.killerId)?.name
            }.`}
      </p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="paper-card paper-torn rounded-sm p-5 text-left"
      >
        <p className="text-xs uppercase tracking-widest text-accent-red font-mono-doc mb-2">
          Çözüm
        </p>
        <p className="leading-relaxed text-sm sm:text-base">{data.solution.explanation}</p>
      </motion.div>
      <Link
        href="/"
        className="inline-block rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
      >
        Vaka Seçimine Dön
      </Link>
    </div>
  );
}
