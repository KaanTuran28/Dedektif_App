"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import type { CaseData } from "@/types/case";
import { CaseGame, IntroCinematic } from "@/components/CaseGame";
import { RoomCaseGame } from "@/components/RoomCaseGame";
import { getCaseProgress } from "@/lib/progress";
import { getStoredRoomCode } from "@/lib/room";

type Mode = "choice" | "solo" | "room";

/** Vaka sayfasının giriş noktası: açılış sinematiğini bir kez gösterir,
 * ardından "Tek Başına Oyna" (mevcut CaseGame, bu vakaya kilitli) ile
 * "Arkadaşlarınla Oyna" (case-agnostic RoomCaseGame — hangi vakanın
 * oynanacağı bu sayfadaki vaka ile sınırlı DEĞİL, katılımcılar odada
 * ortak oylamayla karar veriyor, tıpkı /oda'dan girilmiş gibi) arasında
 * seçim sunar.
 *
 * Sayfa yenilenince bu bileşenin state'i sıfırlanır — devam eden bir solo
 * oyun ya da katılınmış bir oda varsa kullanıcıyı tekrar seçim ekranına
 * (ve sinematiğe) düşürmemek için mount olurken localStorage'a bakıp hangi
 * modda kaldığını tespit eder. */
export function CaseEntry({ data }: { data: CaseData }) {
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [mode, setMode] = useState<Mode>("choice");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (getStoredRoomCode()) {
      setMode("room");
      setIntroDone(true);
    } else if (getCaseProgress(data.id).inProgress) {
      setMode("solo");
      setIntroDone(true);
    }
    setReady(true);
  }, [data.id]);

  if (!ready) return null;

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
    return <RoomCaseGame />;
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center space-y-5">
        <Link
          href="/"
          className="inline-block text-accent-gold text-xs uppercase tracking-widest hover:underline font-mono-doc"
        >
          ← Vaka Seçimine Dön
        </Link>
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
