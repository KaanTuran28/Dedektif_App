"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseData } from "@/types/case";
import { DocumentCard } from "@/components/DocumentCard";
import { SuspectCard } from "@/components/SuspectCard";
import { Notebook } from "@/components/Notebook";
import { EvidenceBoard } from "@/components/EvidenceBoard";
import { recordAccusation } from "@/lib/progress";
import { rankFor } from "@/lib/rank";
import {
  isSoundEnabled,
  playStamp,
  playTick,
  setSoundEnabled,
  startAmbient,
  stopAmbient,
} from "@/lib/sound";

type Step = "giris" | "kanitlar" | "supheliler" | "pano" | "notlar" | "suclama" | "sonuc";

const TABS: { id: Step; label: string }[] = [
  { id: "giris", label: "Vaka" },
  { id: "kanitlar", label: "Kanıtlar" },
  { id: "supheliler", label: "Şüpheliler" },
  { id: "pano", label: "Pano" },
  { id: "notlar", label: "Notlar" },
];

export function CaseGame({ data }: { data: CaseData }) {
  const [step, setStep] = useState<Step>("giris");
  const [accusedId, setAccusedId] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [viewedDocs, setViewedDocs] = useState<Set<string>>(new Set());
  const [viewedSuspects, setViewedSuspects] = useState<Set<string>>(new Set());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next && introDone) startAmbient();
    if (!next) stopAmbient();
  }

  function finishIntro() {
    setIntroDone(true);
    if (isSoundEnabled()) startAmbient();
  }

  function goStep(next: Step) {
    playTick();
    setStep(next);
  }

  function handleAccuse() {
    if (!accusedId) return;
    const correct = accusedId === data.solution.killerId;
    recordAccusation(data.id, accusedId, correct);
    setResult(correct);
    setStep("sonuc");
  }

  const coverage =
    (viewedDocs.size / Math.max(data.documents.length, 1) +
      viewedSuspects.size / Math.max(data.suspects.length, 1)) /
    2;

  if (!introDone) {
    return (
      <IntroCinematic
        title={data.title}
        order={data.order}
        skip={!!reducedMotion}
        onDone={finishIntro}
      />
    );
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
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSound}
              aria-label={soundOn ? "Sesi kapat" : "Sesi aç"}
              className="rounded-sm border border-white/15 h-9 w-9 flex items-center justify-center text-text-dim hover:text-text hover:border-white/30 transition-colors"
            >
              {soundOn ? "🔊" : "🔇"}
            </button>
            {step !== "sonuc" && (
              <button
                onClick={() => goStep("suclama")}
                className="rounded-sm bg-accent-red-bright px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
              >
                Katili Suçla
              </button>
            )}
          </div>
        </div>

        {step !== "sonuc" && (
          <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = step === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => goStep(t.id)}
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
                  onClick={() => goStep("kanitlar")}
                  className="w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
                >
                  Soruşturmaya Başla
                </button>
              </div>
            )}

            {step === "kanitlar" && (
              <div className="space-y-5">
                {data.documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    onOpen={(id) => setViewedDocs((prev) => new Set(prev).add(id))}
                  />
                ))}
              </div>
            )}

            {step === "supheliler" && (
              <div className="space-y-5">
                {data.suspects.map((s, i) => (
                  <SuspectCard
                    key={s.id}
                    suspect={s}
                    index={i}
                    onOpen={(id) => setViewedSuspects((prev) => new Set(prev).add(id))}
                  />
                ))}
              </div>
            )}

            {step === "pano" && <EvidenceBoard data={data} />}

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
              <ResultReveal data={data} result={result} coverage={coverage} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function IntroCinematic({
  title,
  order,
  skip,
  onDone,
}: {
  title: string;
  order: number;
  skip: boolean;
  onDone: () => void;
}) {
  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (skip) return null;

  return (
    <button
      onClick={onDone}
      aria-label="Girişi atla"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-left cursor-pointer"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 0.8 }}
        className="text-accent-gold text-xs sm:text-sm uppercase font-mono-doc mb-4"
      >
        Dosya No: {String(order).padStart(2, "0")}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="font-display text-3xl sm:text-5xl font-black text-center px-6"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 2, rotate: -14 }}
        animate={{ opacity: 0.95, scale: 1, rotate: -8 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 1.1 }}
        className="stamp text-accent-red text-lg sm:text-2xl mt-8"
      >
        Dosya Açılıyor
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="text-text-dim text-xs mt-10 font-mono-doc"
      >
        Devam etmek için dokun
      </motion.p>
    </button>
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

function ResultReveal({
  data,
  result,
  coverage,
}: {
  data: CaseData;
  result: boolean;
  coverage: number;
}) {
  const rank = rankFor(result, coverage);

  useEffect(() => {
    const t = setTimeout(() => playStamp(), 150);
    return () => clearTimeout(t);
  }, []);

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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="inline-flex flex-col items-center gap-1 rounded-sm border border-accent-gold/40 bg-panel px-6 py-3"
      >
        <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
          Dedektif Rütbesi
        </p>
        <p className="font-display text-xl font-bold">{rank.label}</p>
        <p className="text-text-dim text-xs max-w-xs">{rank.description}</p>
        <p className="text-text-dim text-[11px] font-mono-doc mt-1">
          İncelenen kanıt/şüpheli oranı: %{Math.round(coverage * 100)}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
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
