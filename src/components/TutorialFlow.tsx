"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DocumentCard } from "@/components/DocumentCard";
import { SuspectCard } from "@/components/SuspectCard";
import { Timeline } from "@/components/Timeline";
import { EvidenceBoard } from "@/components/EvidenceBoard";
import { TUTORIAL_CASE } from "@/data/tutorialCase";
import { suspectColorFor } from "@/lib/suspectColor";
import { playStamp, playTick } from "@/lib/sound";

type Step = "karsilama" | "giris" | "kanitlar" | "supheliler" | "zaman" | "pano" | "suclama" | "sonuc";

const STEP_ORDER: Step[] = ["giris", "kanitlar", "supheliler", "zaman", "pano", "suclama"];

export function TutorialFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("karsilama");
  const [accusedId, setAccusedId] = useState<string | null>(null);

  function handleClose() {
    setStep("karsilama");
    setAccusedId(null);
    onClose();
  }

  function goNext() {
    playTick();
    const idx = STEP_ORDER.indexOf(step);
    if (step === "karsilama") {
      setStep("giris");
      return;
    }
    if (idx === -1 || idx >= STEP_ORDER.length - 1) return;
    setStep(STEP_ORDER[idx + 1]);
  }

  function goBack() {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= 0) {
      setStep("karsilama");
      return;
    }
    setStep(STEP_ORDER[idx - 1]);
  }

  function confirmAccusation() {
    if (!accusedId) return;
    playStamp();
    setStep("sonuc");
  }

  if (!open) return null;

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-background"
      >
        <header className="border-b border-white/10 bg-panel/70 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc">
              Alıştırma Dosyası
            </p>
            <p className="font-display font-bold text-sm sm:text-base">
              {step === "karsilama" || step === "sonuc"
                ? "Nasıl Oynanır?"
                : `Adım ${stepIndex + 1}/${STEP_ORDER.length}`}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="shrink-0 rounded-sm border border-white/15 px-3 py-2 text-xs uppercase tracking-wide text-text-dim hover:text-text hover:border-white/30 transition-colors font-mono-doc"
          >
            Kılavuzu Kapat
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === "karsilama" && (
                  <div className="space-y-5 text-center py-10">
                    <p className="text-5xl">🕵️</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">
                      Kısa bir alıştırma yapalım
                    </h2>
                    <p className="text-text-dim max-w-md mx-auto leading-relaxed">
                      Gerçek bir vaka gibi ama çok daha küçük: birkaç dakikada
                      kanıtları inceleyecek, panoda bağlantı kuracak ve bir
                      suçlama yapacaksın. Hazır olduğunda gerçek vakalara
                      geçebilirsin.
                    </p>
                    <button
                      onClick={goNext}
                      className="rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                    >
                      Başlayalım
                    </button>
                  </div>
                )}

                {step === "giris" && (
                  <StepShell instruction="Her vaka böyle kısa bir özetle başlar. Oku ve devam et.">
                    <p className="text-text-dim leading-relaxed text-base sm:text-lg">
                      {TUTORIAL_CASE.synopsis}
                    </p>
                  </StepShell>
                )}

                {step === "kanitlar" && (
                  <StepShell instruction="Bir belgeye dokun, aç ve oku.">
                    <div className="space-y-5">
                      {TUTORIAL_CASE.documents.map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === "supheliler" && (
                  <StepShell instruction="Bir şüpheliye dokunup detaylarını oku.">
                    <div className="space-y-5">
                      {TUTORIAL_CASE.suspects.map((s, i) => (
                        <SuspectCard key={s.id} suspect={s} index={i} />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === "zaman" && (
                  <StepShell instruction="Zaman çizelgesi olayları sıraya koyar — kim ne zaman neredeydi diye bakmana yardım eder.">
                    <Timeline events={TUTORIAL_CASE.timeline} />
                  </StepShell>
                )}

                {step === "pano" && (
                  <StepShell instruction="Bu, gerçek vakalardaki pano ile birebir aynı. Aşağıdaki talimatı takip ederek bir kartı yerleştirip bir başkasına bağla.">
                    <EvidenceBoard data={TUTORIAL_CASE} />
                  </StepShell>
                )}

                {step === "suclama" && (
                  <StepShell instruction="Şimdi kimin aldığını düşünüyorsan seç. Bu sadece alıştırma, yanlış yapsan da sorun değil.">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md">
                      {TUTORIAL_CASE.suspects.map((s) => {
                        const selected = accusedId === s.id;
                        const color = suspectColorFor(s.id);
                        return (
                          <button
                            key={s.id}
                            onClick={() => {
                              setAccusedId(s.id);
                              playTick();
                            }}
                            aria-pressed={selected}
                            className={`relative rounded-sm border p-3 text-left transition-colors ${
                              selected
                                ? "border-accent-red-bright bg-accent-red-bright/10"
                                : "border-white/10 bg-panel hover:border-white/25"
                            }`}
                          >
                            <div
                              className="relative mx-auto mb-2 h-14 w-14 rounded-sm overflow-hidden border-2"
                              style={{
                                backgroundColor: "#0f0d0d",
                                borderColor: selected ? "var(--accent-red-bright)" : `${color}80`,
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
                            </div>
                            <p className="font-display font-bold text-sm text-center truncate">
                              {s.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={confirmAccusation}
                      disabled={!accusedId}
                      className="mt-6 w-full sm:w-auto rounded-sm bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Suçla
                    </button>
                  </StepShell>
                )}

                {step === "sonuc" && (
                  <div className="space-y-6 text-center py-6">
                    <p className="text-5xl">🎉</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">
                      Alıştırma tamamlandı
                    </h2>
                    <p className="text-text-dim max-w-md mx-auto leading-relaxed">
                      {accusedId === TUTORIAL_CASE.solution.killerId
                        ? "Doğru kişiyi buldun! "
                        : "Bu sefer tam isabet olmadı ama önemli değil — "}
                      {TUTORIAL_CASE.solution.explanation}
                    </p>
                    <p className="text-text-dim text-sm max-w-md mx-auto">
                      Artık kanıt inceleme, pano ve suçlama mekaniklerini
                      biliyorsun. Gerçek vakalarda 1 saatlik süre sınırı
                      olacak ve sonuçlar kalıcı — hazır olduğunda başla.
                    </p>
                    <button
                      onClick={handleClose}
                      className="rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                    >
                      Gerçek Vakalara Geç
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {step !== "karsilama" && step !== "sonuc" && (
          <footer className="border-t border-white/10 bg-panel/70 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
            <button
              onClick={goBack}
              className="rounded-sm border border-white/15 px-4 py-2 text-xs uppercase tracking-wide text-text-dim hover:text-text hover:border-white/30 transition-colors font-mono-doc"
            >
              ← Geri
            </button>
            {step !== "suclama" && (
              <button
                onClick={goNext}
                className="rounded-sm bg-accent-gold text-black px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                İleri →
              </button>
            )}
          </footer>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function StepShell({ instruction, children }: { instruction: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-accent-gold/40 bg-accent-gold/10 px-4 py-3">
        <p className="text-sm font-semibold">👉 {instruction}</p>
      </div>
      {children}
    </div>
  );
}
