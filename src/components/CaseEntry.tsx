"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { CaseData } from "@/types/case";
import { CaseGame, IntroCinematic } from "@/components/CaseGame";
import { RoomCaseGame } from "@/components/RoomCaseGame";

type Mode = "choice" | "solo" | "room";

/** Vaka sayfasının giriş noktası: açılış sinematiğini bir kez gösterir,
 * ardından "Tek Başına Oyna" (mevcut CaseGame, hiç değişmedi) ile
 * "Arkadaşlarınla Oyna" (yeni RoomCaseGame) arasında seçim sunar. */
export function CaseEntry({ data }: { data: CaseData }) {
  const [introDone, setIntroDone] = useState(false);
  const [mode, setMode] = useState<Mode>("choice");
  const reducedMotion = useReducedMotion();

  if (!introDone) {
    return (
      <IntroCinematic
        title={data.title}
        order={data.order}
        skip={!!reducedMotion}
        onDone={() => setIntroDone(true)}
      />
    );
  }

  if (mode === "solo") {
    return <CaseGame data={data} skipIntro />;
  }

  if (mode === "room") {
    return <RoomCaseGame data={data} />;
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center space-y-5">
        <div>
          <p className="text-accent-gold text-xs uppercase tracking-widest font-mono-doc mb-1">
            Dosya No: {String(data.order).padStart(2, "0")}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{data.title}</h1>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setMode("solo")}
            className="w-full rounded-sm bg-accent-red-bright px-6 py-4 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
          >
            Tek Başına Oyna
          </button>
          <button
            onClick={() => setMode("room")}
            className="w-full rounded-sm border border-accent-gold/50 text-accent-gold px-6 py-4 font-semibold uppercase tracking-wide hover:bg-accent-gold/10 transition-colors"
          >
            👥 Arkadaşlarınla Oyna
          </button>
        </div>
      </div>
    </div>
  );
}
