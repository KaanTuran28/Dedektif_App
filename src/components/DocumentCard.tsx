"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CaseDocument } from "@/types/case";
import { tiltFor } from "@/lib/tilt";
import { docColorFor } from "@/lib/docColor";
import { playPaper, playMatch, playMismatch, playTick } from "@/lib/sound";
import { answersMatch, digitsMatch } from "@/lib/cipher";
import {
  getCipherHintsUsed,
  isCipherSolved,
  markCipherSolved,
  useNextCipherHint,
} from "@/lib/cipherPuzzle";

const TYPE_LABELS: Record<CaseDocument["type"], string> = {
  resmi_rapor: "Resmi Rapor",
  whatsapp: "Mesaj Dökümü",
  telefon_dokumu: "Telefon Dökümü",
  bilet_kaydi: "Kayıt",
  gunluk_log: "Günlük / Log",
  ifade: "İfade",
  eposta: "E-posta",
  guvenlik_kamerasi: "Güvenlik Kamerası",
  sosyal_medya: "Sosyal Medya",
  haber_kupuru: "Haber Küpürü",
  ses_kaydi: "Ses Kaydı",
  sifreli_kayit: "Şifreli Kayıt",
  kilitli_kasa: "Kilitli Kasa",
};

function signatureFromMeta(meta?: string) {
  if (!meta) return null;
  const first = meta.split("·")[0]?.trim();
  return first || null;
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function waveformBars(seed: string, count: number) {
  let h = 7;
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    h = (h * 33 + seed.charCodeAt(i % seed.length) + i) >>> 0;
    bars.push(0.2 + (h % 100) / 100);
  }
  return bars;
}

export function DocumentCard({
  doc,
  caseId,
  onOpen,
}: {
  doc: CaseDocument;
  caseId?: string;
  onOpen?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tilt = tiltFor(doc.id);
  const color = docColorFor(doc.type);
  const isCipher = doc.type === "sifreli_kayit" || doc.type === "kilitli_kasa";

  return (
    <motion.div
      animate={{ rotate: open ? 0 : tilt }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative rounded-sm border border-white/10 bg-panel overflow-hidden"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: color.border,
      }}
    >
      <div className="pin" />
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          // Şifreli kayıtlar için "incelendi" sayılmak çözülmeyi gerektirir —
          // sadece açmak yeterli değil (bkz. SifreliKayitBody'nin kendi onOpen çağrısı).
          if (next && !isCipher) onOpen?.(doc.id);
          playPaper();
        }}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <p
            className="text-[11px] uppercase tracking-widest mb-1 font-mono-doc"
            style={{ color: color.text }}
          >
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
            <DocumentBody doc={doc} caseId={caseId} onOpen={onOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DocumentBody({
  doc,
  caseId,
  onOpen,
}: {
  doc: CaseDocument;
  caseId?: string;
  onOpen?: (id: string) => void;
}) {
  if (doc.type === "sifreli_kayit") {
    return <SifreliKayitBody doc={doc} caseId={caseId} onOpen={onOpen} />;
  }

  if (doc.type === "kilitli_kasa") {
    return <KilitliKasaBody doc={doc} caseId={caseId} onOpen={onOpen} />;
  }

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

  if (doc.type === "guvenlik_kamerasi") {
    return (
      <div className="px-4 sm:px-6 py-5 space-y-4">
        <div className="relative aspect-video w-full max-w-md mx-auto rounded-sm overflow-hidden bg-black border border-white/10">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 3px)",
            }}
          />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-red-500 text-[10px] font-mono-doc">
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            REC
          </div>
          {doc.cameraTimestamp && (
            <div className="absolute bottom-2 right-2 text-white/80 text-[10px] font-mono-doc bg-black/40 px-1.5 py-0.5">
              {doc.cameraTimestamp}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-xl">
              ▶
            </div>
          </div>
        </div>
        {doc.body && (
          <div className="paper-card paper-card--plain rounded-sm px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-accent-red font-mono-doc mb-1.5">
              Gözlem Notu
            </p>
            <p className="whitespace-pre-wrap leading-relaxed text-sm font-mono-doc">{doc.body}</p>
          </div>
        )}
      </div>
    );
  }

  if (doc.type === "ses_kaydi") {
    const bars = waveformBars(doc.id, 48);
    return (
      <div className="px-4 sm:px-6 py-5 space-y-4">
        <div className="flex items-center gap-3 rounded-sm bg-black/40 border border-white/10 px-4 py-4">
          <div className="h-9 w-9 shrink-0 rounded-full bg-accent-red-bright/80 flex items-center justify-center text-sm">
            ▶
          </div>
          <div className="flex items-end gap-[2px] h-10 flex-1 overflow-hidden">
            {bars.map((b, i) => (
              <span
                key={i}
                className="w-[3px] shrink-0 rounded-full bg-accent-gold/70"
                style={{ height: `${Math.round(b * 100)}%` }}
              />
            ))}
          </div>
          {doc.audioDuration && (
            <span className="text-text-dim text-xs font-mono-doc shrink-0">{doc.audioDuration}</span>
          )}
        </div>
        {doc.body && (
          <div className="paper-card paper-card--plain rounded-sm px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-accent-red font-mono-doc mb-1.5">
              Döküm
            </p>
            <p className="whitespace-pre-wrap leading-relaxed text-sm">{doc.body}</p>
          </div>
        )}
      </div>
    );
  }

  if (doc.type === "sosyal_medya") {
    const p = doc.socialPost;
    if (!p) return null;
    return (
      <div className="px-4 sm:px-6 py-5">
        <div className="max-w-md mx-auto rounded-lg border border-white/10 bg-[#111] p-4">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold text-xs font-bold">
              {initialsFromName(p.author)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{p.author}</p>
              <p className="text-text-dim text-xs truncate">
                {p.handle} · {p.time}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-3">{p.text}</p>
          <div className="flex items-center gap-5 text-text-dim text-xs font-mono-doc">
            <span>♡ {p.likes ?? 0}</span>
            <span>💬 {p.comments ?? 0}</span>
          </div>
        </div>
      </div>
    );
  }

  if (doc.type === "haber_kupuru") {
    const h = doc.newsHeader;
    return (
      <div className="paper-card paper-torn relative px-4 sm:px-6 py-5">
        {h && (
          <div className="mb-3 pb-3 border-b-2 border-paper-ink/60">
            <p className="font-display text-lg font-black tracking-wide uppercase">
              {h.publication}
            </p>
            <p className="font-display text-2xl font-bold leading-snug mt-2">{h.headline}</p>
            <p className="text-paper-ink/60 text-xs font-mono-doc mt-1">
              {h.byline ? `${h.byline} · ` : ""}
              {h.date}
            </p>
          </div>
        )}
        {doc.body && (
          <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{doc.body}</p>
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

/** "Şifreli Kayıt" bulmacası: oyuncu şifreli metni kendi başına çözüp cevabı
 * bir input'a yazar — uygulama hiçbir zaman kendisi çözmez/göstermez. Doğru
 * cevap girilince asıl içerik (`cipherReveal`) açığa çıkar ve bu doküman
 * ancak o zaman "incelendi" sayılır (kapsam/rütbe hesabına öyle girer). */
function SifreliKayitBody({
  doc,
  caseId,
  onOpen,
}: {
  doc: CaseDocument;
  caseId?: string;
  onOpen?: (id: string) => void;
}) {
  const [solved, setSolved] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [wrongPulse, setWrongPulse] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    if (!caseId) {
      setChecked(true);
      return;
    }
    const alreadySolved = isCipherSolved(caseId, doc.id);
    setSolved(alreadySolved);
    setHintsUsed(getCipherHintsUsed(caseId, doc.id));
    setChecked(true);
    if (alreadySolved) onOpen?.(doc.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, doc.id]);

  function handleSubmit() {
    if (!doc.cipherAnswer || !input.trim()) return;
    if (answersMatch(input, doc.cipherAnswer)) {
      setSolved(true);
      if (caseId) markCipherSolved(caseId, doc.id);
      onOpen?.(doc.id);
      playMatch();
    } else {
      setWrongPulse((n) => n + 1);
      playMismatch();
    }
  }

  function revealHint() {
    const hints = doc.cipherHints ?? [];
    if (hintsUsed >= hints.length) return;
    const next = caseId ? useNextCipherHint(caseId, doc.id, hints.length) : hintsUsed + 1;
    setHintsUsed(next);
    playTick();
  }

  if (!checked) return null;

  if (solved) {
    return (
      <div className="px-4 sm:px-6 py-5 space-y-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-mono-doc text-[#8af0b8]">
          <span>🔓 Çözüldü</span>
        </div>
        <div className="rounded-sm border border-[#3ddc84]/30 bg-[#3ddc84]/[0.06] px-4 py-3.5 font-mono-doc">
          <p className="whitespace-pre-wrap leading-relaxed text-sm">
            {doc.cipherReveal ?? doc.body}
          </p>
        </div>
      </div>
    );
  }

  const hints = doc.cipherHints ?? [];

  return (
    <div className="px-4 sm:px-6 py-5 space-y-4">
      {doc.body && (
        <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{doc.body}</p>
      )}

      <div className="rounded-sm border border-white/15 bg-black/50 px-4 py-3.5">
        <p className="text-[10px] uppercase tracking-widest text-[#8af0b8]/70 font-mono-doc mb-2">
          🔒 Kilitli İçerik
        </p>
        <p className="font-mono-doc text-xs sm:text-sm leading-relaxed break-all text-[#8af0b8]/90">
          {doc.cipherEncoded}
        </p>
      </div>

      <motion.div
        animate={wrongPulse > 0 ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Çözdüğün metni buraya yaz..."
          aria-label={`${doc.title} için çözüm girişi`}
          className="flex-1 rounded-sm border border-white/15 bg-background px-3 py-2 text-sm text-text outline-none focus:ring-2 focus:ring-accent-gold/60"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="shrink-0 rounded-sm bg-accent-gold text-black px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Çöz
        </button>
      </motion.div>

      {hints.length > 0 && (
        <div className="pt-1">
          <button
            onClick={() => setHintOpen((v) => !v)}
            className="text-[11px] uppercase tracking-widest text-text-dim hover:text-text font-mono-doc"
          >
            💡 İpucu ({hintsUsed}/{hints.length})
          </button>
          <AnimatePresence>
            {hintOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 space-y-2 overflow-hidden"
              >
                {hints.slice(0, hintsUsed).map((h, i) => (
                  <p key={i} className="text-sm leading-relaxed border-l-2 border-accent-gold/50 pl-3">
                    {h}
                  </p>
                ))}
                {hintsUsed === 0 && (
                  <p className="text-text-dim text-sm italic">Henüz ipucu almadın.</p>
                )}
                <button
                  onClick={revealHint}
                  disabled={hintsUsed >= hints.length}
                  className="rounded-sm border border-accent-gold/40 text-accent-gold px-3 py-1.5 text-xs font-semibold uppercase tracking-wide hover:bg-accent-gold/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {hintsUsed >= hints.length ? "Tüm ipuçları açıldı" : "Sonraki İpucu"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/** "Kilitli Kasa" bulmacası: kombinasyon kilidinin haneleri vaka içindeki
 * başka belgelere dağılmış küçük ayrıntılarda saklı. Oyuncu bunları bulup
 * (genelde küçükten büyüğe sıralayarak) kodu kendi başına girer. */
function KilitliKasaBody({
  doc,
  caseId,
  onOpen,
}: {
  doc: CaseDocument;
  caseId?: string;
  onOpen?: (id: string) => void;
}) {
  const [solved, setSolved] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [wrongPulse, setWrongPulse] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    if (!caseId) {
      setChecked(true);
      return;
    }
    const alreadySolved = isCipherSolved(caseId, doc.id);
    setSolved(alreadySolved);
    setHintsUsed(getCipherHintsUsed(caseId, doc.id));
    setChecked(true);
    if (alreadySolved) onOpen?.(doc.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, doc.id]);

  function handleSubmit() {
    if (!doc.lockAnswer || !input.trim()) return;
    if (digitsMatch(input, doc.lockAnswer)) {
      setSolved(true);
      if (caseId) markCipherSolved(caseId, doc.id);
      onOpen?.(doc.id);
      playMatch();
    } else {
      setWrongPulse((n) => n + 1);
      playMismatch();
    }
  }

  function revealHint() {
    const hints = doc.lockHints ?? [];
    if (hintsUsed >= hints.length) return;
    const next = caseId ? useNextCipherHint(caseId, doc.id, hints.length) : hintsUsed + 1;
    setHintsUsed(next);
    playTick();
  }

  if (!checked) return null;

  if (solved) {
    return (
      <div className="px-4 sm:px-6 py-5 space-y-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-mono-doc text-[#e8ac6e]">
          <span>🔓 Açıldı</span>
        </div>
        <div className="rounded-sm border border-[#c9863a]/30 bg-[#c9863a]/[0.06] px-4 py-3.5 font-mono-doc">
          <p className="whitespace-pre-wrap leading-relaxed text-sm">
            {doc.lockReveal ?? doc.body}
          </p>
        </div>
      </div>
    );
  }

  const hints = doc.lockHints ?? [];
  const digits = doc.lockDigits ?? 3;

  return (
    <div className="px-4 sm:px-6 py-5 space-y-4">
      {doc.body && (
        <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{doc.body}</p>
      )}

      <motion.div
        animate={wrongPulse > 0 ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^\d]/g, "").slice(0, digits))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={"•".repeat(digits)}
          aria-label={`${doc.title} için ${digits} haneli kombinasyon`}
          className="w-32 shrink-0 rounded-sm border border-white/15 bg-background px-3 py-2 text-center text-lg tracking-[0.4em] font-mono-doc text-text outline-none focus:ring-2 focus:ring-accent-gold/60"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="shrink-0 rounded-sm bg-accent-gold text-black px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Aç
        </button>
      </motion.div>

      {hints.length > 0 && (
        <div className="pt-1">
          <button
            onClick={() => setHintOpen((v) => !v)}
            className="text-[11px] uppercase tracking-widest text-text-dim hover:text-text font-mono-doc"
          >
            💡 İpucu ({hintsUsed}/{hints.length})
          </button>
          <AnimatePresence>
            {hintOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 space-y-2 overflow-hidden"
              >
                {hints.slice(0, hintsUsed).map((h, i) => (
                  <p key={i} className="text-sm leading-relaxed border-l-2 border-accent-gold/50 pl-3">
                    {h}
                  </p>
                ))}
                {hintsUsed === 0 && (
                  <p className="text-text-dim text-sm italic">Henüz ipucu almadın.</p>
                )}
                <button
                  onClick={revealHint}
                  disabled={hintsUsed >= hints.length}
                  className="rounded-sm border border-accent-gold/40 text-accent-gold px-3 py-1.5 text-xs font-semibold uppercase tracking-wide hover:bg-accent-gold/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {hintsUsed >= hints.length ? "Tüm ipuçları açıldı" : "Sonraki İpucu"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
