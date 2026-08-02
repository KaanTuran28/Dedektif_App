"use client";

import { useState } from "react";
import Link from "next/link";
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
      <header className="border-b border-white/10 bg-panel/60 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-accent-gold text-xs uppercase tracking-widest hover:underline">
              ← Vaka Seçimi
            </Link>
            <h1 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
              {data.title}
            </h1>
          </div>
          {step !== "sonuc" && (
            <button
              onClick={() => setStep("suclama")}
              className="shrink-0 rounded-md bg-accent-red-bright px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition"
            >
              Katili Suçla
            </button>
          )}
        </div>

        {step !== "sonuc" && (
          <nav className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto pb-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setStep(t.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition ${
                  step === t.id
                    ? "bg-accent-gold text-black font-semibold"
                    : "text-text-dim hover:text-text"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        {step === "giris" && (
          <div className="space-y-6">
            <p className="text-text-dim leading-relaxed text-base sm:text-lg">
              {data.synopsis}
            </p>
            <div className="rounded-lg border border-white/10 bg-panel p-5">
              <p className="text-xs uppercase tracking-widest text-accent-gold mb-1">
                Kurban
              </p>
              <p className="font-display text-xl font-bold">
                {data.victim.name} ({data.victim.age})
              </p>
              <p className="text-text-dim text-sm mt-1">{data.victim.description}</p>
            </div>
            <button
              onClick={() => setStep("kanitlar")}
              className="w-full sm:w-auto rounded-md bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition"
            >
              Soruşturmaya Başla
            </button>
          </div>
        )}

        {step === "kanitlar" && (
          <div className="space-y-4">
            {data.documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {step === "supheliler" && (
          <div className="space-y-4">
            {data.suspects.map((s) => (
              <SuspectCard key={s.id} suspect={s} />
            ))}
          </div>
        )}

        {step === "notlar" && <Notebook caseId={data.id} />}

        {step === "suclama" && (
          <div className="space-y-5">
            <p className="text-text-dim">
              Kanıtları ve ifadeleri değerlendirdin. Şimdi katili seç — bu geri
              alınamaz bir suçlama.
            </p>
            <div className="grid gap-3">
              {data.suspects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setAccusedId(s.id)}
                  className={`text-left rounded-lg border px-4 py-3 transition ${
                    accusedId === s.id
                      ? "border-accent-red-bright bg-accent-red-bright/10"
                      : "border-white/10 bg-panel hover:border-white/25"
                  }`}
                >
                  <p className="font-display font-bold">{s.name}</p>
                  <p className="text-text-dim text-xs">{s.role}</p>
                </button>
              ))}
            </div>
            <button
              onClick={handleAccuse}
              disabled={!accusedId}
              className="w-full sm:w-auto rounded-md bg-accent-red-bright px-6 py-3 font-semibold uppercase tracking-wide hover:bg-accent-red transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suçlamayı Onayla
            </button>
          </div>
        )}

        {step === "sonuc" && result !== null && (
          <div className="space-y-6 text-center">
            <p
              className={`font-display text-3xl sm:text-4xl font-black ${
                result ? "text-accent-gold" : "text-accent-red-bright"
              }`}
            >
              {result ? "Vakayı Çözdün" : "Yanlış İz"}
            </p>
            <p className="text-text-dim">
              {result
                ? "Doğru şüpheliyi işaret ettin."
                : `Suçladığın kişi katil değildi. Gerçek katil: ${
                    data.suspects.find((s) => s.id === data.solution.killerId)?.name
                  }.`}
            </p>
            <div className="rounded-lg border border-white/10 bg-panel p-5 text-left">
              <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">
                Çözüm
              </p>
              <p className="leading-relaxed text-sm sm:text-base">
                {data.solution.explanation}
              </p>
            </div>
            <Link
              href="/"
              className="inline-block rounded-md bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition"
            >
              Vaka Seçimine Dön
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
