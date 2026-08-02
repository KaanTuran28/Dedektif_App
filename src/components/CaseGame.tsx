"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseData, FollowUpQuestion } from "@/types/case";
import { DocumentCard } from "@/components/DocumentCard";
import { SuspectCard } from "@/components/SuspectCard";
import { Notebook } from "@/components/Notebook";
import { EvidenceBoard } from "@/components/EvidenceBoard";
import { Timeline } from "@/components/Timeline";
import { HintPanel } from "@/components/HintPanel";
import {
  endCaseManually,
  formatRemaining,
  getCaseProgress,
  getHintsUsed,
  getRemainingMs,
  markDocViewed,
  markSuspectViewed,
  markTimedOut,
  recordAccusation,
  startCase,
} from "@/lib/progress";
import { rankFor, type DetectiveRank } from "@/lib/rank";
import { isSoundEnabled, playStamp, playTick, setSoundEnabled } from "@/lib/sound";
import { checkAchievements } from "@/lib/achievements";
import { allCases } from "@/data/cases";
import { generateShareCard } from "@/lib/shareCard";

type Step =
  | "giris"
  | "kanitlar"
  | "supheliler"
  | "pano"
  | "zaman"
  | "notlar"
  | "suclama"
  | "motiv-sorusu"
  | "yontem-sorusu"
  | "sonuc";

const TABS: { id: Step; label: string }[] = [
  { id: "giris", label: "Vaka" },
  { id: "kanitlar", label: "Kanıtlar" },
  { id: "supheliler", label: "Şüpheliler" },
  { id: "zaman", label: "Zaman" },
  { id: "pano", label: "Pano" },
  { id: "notlar", label: "Notlar" },
];

type EndReason = "suclama" | "sure-doldu" | "vazgecildi";

interface FinalResult {
  correct: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  rank: DetectiveRank;
  reason: EndReason;
}

function zeroRank(data: CaseData): DetectiveRank {
  return rankFor({
    correctSuspect: false,
    motiveCorrect: false,
    methodCorrect: false,
    coverage: 0,
    hintsUsed: 0,
    difficulty: data.difficulty,
  });
}

export function CaseGame({ data }: { data: CaseData }) {
  const [step, setStep] = useState<Step>("giris");
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [accusedId, setAccusedId] = useState<string | null>(null);
  const [motiveCorrect, setMotiveCorrect] = useState(false);
  const [final, setFinal] = useState<FinalResult | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [viewedDocs, setViewedDocs] = useState<Set<string>>(new Set());
  const [viewedSuspects, setViewedSuspects] = useState<Set<string>>(new Set());
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [endConfirming, setEndConfirming] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Sayfa açıldığında: devam eden bir oturum var mı, süresi dolmuş mu, hiç başlamamış mı?
  useEffect(() => {
    const progress = getCaseProgress(data.id);
    if (progress.inProgress && progress.startedAt) {
      const remaining = getRemainingMs(progress);
      if (remaining !== null && remaining <= 0) {
        markTimedOut(data.id);
        setStarted(true);
        setIntroDone(true);
        setFinal({ correct: false, motiveCorrect: false, methodCorrect: false, rank: zeroRank(data), reason: "sure-doldu" });
        setStep("sonuc");
      } else {
        setStarted(true);
        setIntroDone(true);
        setStep("kanitlar");
        setViewedDocs(new Set(progress.viewedDocIds ?? []));
        setViewedSuspects(new Set(progress.viewedSuspectIds ?? []));
      }
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  // Canlı geri sayım — her saniye kontrol eder, süre dolarsa otomatik sonlandırır
  useEffect(() => {
    if (!started) return;
    function tick() {
      const progress = getCaseProgress(data.id);
      if (!progress.inProgress || !progress.startedAt) {
        setRemainingMs(null);
        return;
      }
      const rem = getRemainingMs(progress);
      setRemainingMs(rem);
      if (rem !== null && rem <= 0) {
        markTimedOut(data.id);
        setFinal({ correct: false, motiveCorrect: false, methodCorrect: false, rank: zeroRank(data), reason: "sure-doldu" });
        setStep("sonuc");
      }
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [started, data.id]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  }

  function finishIntro() {
    setIntroDone(true);
  }

  function goStep(next: Step) {
    if (next !== "giris" && !started) return;
    playTick();
    setStep(next);
  }

  function startInvestigation() {
    startCase(data.id);
    setStarted(true);
    playTick();
    setStep("kanitlar");
  }

  function handleEndCase() {
    endCaseManually(data.id);
    setEndConfirming(false);
    setFinal({ correct: false, motiveCorrect: false, methodCorrect: false, rank: zeroRank(data), reason: "vazgecildi" });
    setStep("sonuc");
  }

  const coverage =
    (viewedDocs.size / Math.max(data.documents.length, 1) +
      viewedSuspects.size / Math.max(data.suspects.length, 1)) /
    2;

  const inInvestigation = TABS.some((t) => t.id === step);

  function handleAccuse() {
    if (!accusedId) return;
    const correct = accusedId === data.solution.killerId;
    if (!correct) {
      finalize(correct, false, false);
      return;
    }
    setStep("motiv-sorusu");
  }

  function handleMotiveAnswer(_optionId: string, correct: boolean) {
    setMotiveCorrect(correct);
    setStep("yontem-sorusu");
  }

  function handleMethodAnswer(_optionId: string, correct: boolean) {
    finalize(true, motiveCorrect, correct);
  }

  function finalize(correct: boolean, motiveWasCorrect: boolean, methodCorrect: boolean) {
    const hintsUsed = getHintsUsed(data.id);
    const rank = rankFor({
      correctSuspect: correct,
      motiveCorrect: motiveWasCorrect,
      methodCorrect,
      coverage,
      hintsUsed,
      difficulty: data.difficulty,
    });
    recordAccusation(data.id, accusedId ?? "", correct, rank.points, rank.label);
    const solvedCasesCount = allCases.filter((c) => getCaseProgress(c.id).solved).length;
    checkAchievements({
      caseId: data.id,
      correct,
      coverage,
      hintsUsed,
      motiveCorrect: motiveWasCorrect,
      methodCorrect,
      solvedCasesCount,
    });
    setFinal({ correct, motiveCorrect: motiveWasCorrect, methodCorrect, rank, reason: "suclama" });
    setStep("sonuc");
  }

  if (!ready) return null;

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
            {started && inInvestigation && remainingMs !== null && (
              <p
                title="Vaka için kalan süre"
                className={`hidden sm:block text-[11px] font-mono-doc border rounded-sm px-2 py-1.5 ${
                  remainingMs < 5 * 60 * 1000
                    ? "border-accent-red-bright text-accent-red-bright"
                    : "border-white/10 text-text-dim"
                }`}
              >
                ⏱ {formatRemaining(remainingMs)}
              </p>
            )}
            {started && inInvestigation && (
              <p
                title="İncelenen kanıt + şüpheli oranı — dedektif rütbeni etkiler"
                className="hidden sm:block text-text-dim text-[11px] font-mono-doc border border-white/10 rounded-sm px-2 py-1.5"
              >
                🔍 %{Math.round(coverage * 100)} incelendi
              </p>
            )}
            {started && inInvestigation && <HintPanel caseId={data.id} hints={data.hints} />}
            <button
              onClick={toggleSound}
              aria-label={soundOn ? "Sesi kapat" : "Sesi aç"}
              className="rounded-sm border border-white/15 h-9 w-9 flex items-center justify-center text-text-dim hover:text-text hover:border-white/30 transition-colors"
            >
              {soundOn ? "🔊" : "🔇"}
            </button>
            {started && inInvestigation && (
              <button
                onClick={() => setEndConfirming(true)}
                className="hidden sm:block rounded-sm border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text-dim hover:text-text hover:border-white/30 transition-colors"
              >
                Vazgeç
              </button>
            )}
            {started && inInvestigation && (
              <button
                onClick={() => goStep("suclama")}
                className="rounded-sm bg-accent-red-bright px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
              >
                Katili Suçla
              </button>
            )}
          </div>
        </div>

        {inInvestigation && (
          <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = step === t.id;
              const locked = t.id !== "giris" && !started;
              return (
                <button
                  key={t.id}
                  onClick={() => goStep(t.id)}
                  disabled={locked}
                  aria-current={active}
                  aria-disabled={locked}
                  title={locked ? "Önce soruşturmayı başlat" : undefined}
                  className={`relative shrink-0 px-4 sm:px-5 pt-2 pb-2.5 text-sm font-mono-doc transition-colors ${
                    locked
                      ? "text-text-dim/30 cursor-not-allowed"
                      : active
                        ? "text-black"
                        : "text-text-dim hover:text-text"
                  }`}
                  style={{
                    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
                    backgroundColor: active && !locked ? "var(--accent-gold)" : "transparent",
                  }}
                >
                  {locked ? "🔒 " : ""}
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
                {started && (
                  <div className="rounded-sm border border-accent-gold/40 bg-accent-gold/10 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-sm font-semibold">🕵️ Vaka devam ediyor</p>
                    {remainingMs !== null && (
                      <p className="font-mono-doc text-sm text-accent-gold">
                        ⏱ Kalan süre: {formatRemaining(remainingMs)}
                      </p>
                    )}
                  </div>
                )}
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
                {!started && (
                  <button
                    onClick={startInvestigation}
                    className="w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
                  >
                    Soruşturmaya Başla
                  </button>
                )}
              </div>
            )}

            {step === "kanitlar" && (
              <div className="space-y-5">
                {data.documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    onOpen={(id) => {
                      setViewedDocs((prev) => new Set(prev).add(id));
                      markDocViewed(data.id, id);
                    }}
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
                    onOpen={(id) => {
                      setViewedSuspects((prev) => new Set(prev).add(id));
                      markSuspectViewed(data.id, id);
                    }}
                  />
                ))}
              </div>
            )}

            {step === "zaman" && (
              <Timeline events={data.timeline} suspects={data.suspects} caseId={data.id} />
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

            {step === "motiv-sorusu" && (
              <FollowUpQuestionScreen
                title="Motiv"
                question={data.motiveQuestion}
                onAnswer={handleMotiveAnswer}
              />
            )}

            {step === "yontem-sorusu" && (
              <FollowUpQuestionScreen
                title="Yöntem"
                question={data.methodQuestion}
                onAnswer={handleMethodAnswer}
              />
            )}

            {step === "sonuc" && final && (
              <ResultReveal data={data} final={final} coverage={coverage} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {endConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setEndConfirming(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-md border border-accent-red-bright/50 bg-panel p-6 shadow-2xl"
            >
              <p className="font-display text-lg font-bold mb-2">Vakadan Vazgeç?</p>
              <p className="text-text-dim text-sm mb-5">
                Bu vaka <strong>başarısız</strong> olarak kapanacak ve çözümü
                göreceksin. Geri dönüşü yok.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setEndConfirming(false)}
                  className="flex-1 rounded-sm border border-white/20 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-text-dim hover:text-text hover:border-white/40 transition-colors"
                >
                  Devam Et
                </button>
                <button
                  onClick={handleEndCase}
                  className="flex-1 rounded-sm bg-accent-red-bright px-4 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
                >
                  Evet, Vazgeç
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      autoFocus
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-left cursor-pointer focus-visible:outline-accent-gold"
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
  const [confirming, setConfirming] = useState(false);
  const accused = data.suspects.find((s) => s.id === accusedId);

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
              onClick={() => {
                onSelect(s.id);
                setConfirming(false);
              }}
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
      {!confirming && (
        <button
          onClick={() => setConfirming(true)}
          disabled={!accusedId}
          className="w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Dosyayı Kapat
        </button>
      )}

      <AnimatePresence>
        {confirming && accused && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-sm border border-accent-red-bright bg-accent-red-bright/10 p-4 space-y-3"
          >
            <p className="text-sm">
              <strong>{accused.name}</strong> adlı kişiyi suçlamak üzeresin.
              Bu karar <strong>geri alınamaz</strong>, emin misin?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-sm border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-text-dim hover:text-text hover:border-white/40 transition-colors"
              >
                Vazgeç
              </button>
              <button
                onClick={onConfirm}
                className="rounded-sm bg-accent-red-bright px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
              >
                Evet, Suçla
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FollowUpQuestionScreen({
  title,
  question,
  onAnswer,
}: {
  title: string;
  question: FollowUpQuestion;
  onAnswer: (optionId: string, correct: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-widest text-accent-gold font-mono-doc">
        Son Soru · {title}
      </p>
      <p className="font-display text-xl sm:text-2xl font-bold">{question.prompt}</p>
      <div className="grid gap-3">
        {question.options.map((o) => (
          <button
            key={o.id}
            onClick={() => onAnswer(o.id, o.correct)}
            className="text-left rounded-sm border border-white/10 bg-panel px-4 py-3 hover:border-accent-gold/60 hover:bg-white/[0.03] transition-colors"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultReveal({
  data,
  final,
  coverage,
}: {
  data: CaseData;
  final: FinalResult;
  coverage: number;
}) {
  const { correct, rank, reason } = final;
  const [sharing, setSharing] = useState(false);
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => playStamp(), 150);
    return () => clearTimeout(t);
  }, []);

  async function handleShare() {
    setSharing(true);
    try {
      const blob = await generateShareCard({
        caseTitle: data.title,
        rankLabel: rank.label,
        points: rank.points,
        correct,
      });
      if (!blob) return;
      const file = new File([blob], `supheli-${data.id}.png`, { type: "image/png" });
      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files: File[]; title?: string; text?: string }) => Promise<void>;
      };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({ files: [file], title: "ŞÜPHELİ", text: `${data.title} — ${rank.label}` });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `supheli-${data.id}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setSharing(false);
    }
  }

  function handleClose() {
    playStamp();
    setClosing(true);
    setTimeout(() => router.push("/"), 650);
  }

  return (
    <div className="space-y-6 text-center relative">
      <AnimatePresence>
        {closing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.p
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
              className="stamp text-accent-red text-2xl sm:text-3xl"
            >
              Dosya Kapatıldı
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center py-4">
        <motion.p
          initial={{ scale: 2.6, opacity: 0, rotate: -14 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className={`stamp text-2xl sm:text-4xl font-black ${
            correct ? "text-accent-gold" : "text-accent-red-bright"
          }`}
        >
          {correct
            ? "Çözüldü"
            : reason === "sure-doldu"
              ? "Süre Doldu"
              : reason === "vazgecildi"
                ? "Vazgeçildi"
                : "Yanlış Şüpheli"}
        </motion.p>
      </div>
      <p className="text-text-dim">
        {correct
          ? "Doğru şüpheliyi işaret ettin."
          : reason === "sure-doldu"
            ? `1 saat içinde vakayı çözemedin. Gerçek katil: ${
                data.suspects.find((s) => s.id === data.solution.killerId)?.name
              }.`
            : reason === "vazgecildi"
              ? `Vakadan vazgeçtin. Gerçek katil: ${
                  data.suspects.find((s) => s.id === data.solution.killerId)?.name
                }.`
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
          Dedektif Rütbesi · {rank.points}/{rank.maxPoints} puan
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

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handleShare}
          disabled={sharing}
          className="rounded-sm border border-accent-gold/50 text-accent-gold px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-gold/10 transition-colors disabled:opacity-50"
        >
          {sharing ? "Hazırlanıyor..." : "Sonucu Paylaş"}
        </button>
        <button
          onClick={handleClose}
          className="rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
        >
          Vaka Seçimine Dön
        </button>
      </div>
    </div>
  );
}
