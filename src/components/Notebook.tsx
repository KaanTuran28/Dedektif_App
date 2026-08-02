"use client";

import { useEffect, useState } from "react";
import { getCaseProgress, saveNote } from "@/lib/progress";

export function Notebook({ caseId }: { caseId: string }) {
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setValue(getCaseProgress(caseId).notes ?? "");
    setLoaded(true);
  }, [caseId]);

  return (
    <div className="rounded-lg border border-white/10 bg-panel p-4 sm:p-5">
      <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">
        Dedektif Not Defteri
      </p>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          saveNote(caseId, e.target.value);
        }}
        placeholder="İpuçlarını, şüphelerini ve bağlantılarını buraya yaz..."
        aria-label="Dedektif not defteri"
        disabled={!loaded}
        rows={10}
        className="w-full resize-y rounded-md paper-card px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-accent-red-bright/60"
      />
      <p className="text-text-dim text-[11px] mt-2">
        Notların bu cihazda otomatik kaydedilir.
      </p>
    </div>
  );
}
