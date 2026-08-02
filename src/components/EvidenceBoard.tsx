"use client";

import { useMemo, useRef, useState, useEffect, type MouseEvent } from "react";
import { motion, motionValue, useTransform, type MotionValue } from "motion/react";
import type { CaseData } from "@/types/case";
import { getBoardState, setBoardState, connectionKey, type BoardPosition } from "@/lib/board";
import { docColorFor } from "@/lib/docColor";
import { suspectColorFor } from "@/lib/suspectColor";
import { playPaper, playTick } from "@/lib/sound";

const TYPE_ICON: Record<string, string> = {
  resmi_rapor: "📄",
  whatsapp: "💬",
  telefon_dokumu: "☎️",
  bilet_kaydi: "🎫",
  gunluk_log: "📓",
  ifade: "🗒️",
  eposta: "✉️",
  guvenlik_kamerasi: "🎥",
  sosyal_medya: "📱",
  haber_kupuru: "📰",
  ses_kaydi: "🎙️",
};

const CANVAS_W = 1040;
const CANVAS_H = 640;
const CARD_W = 120;
const CARD_H = 60;
const CARD_CENTER_X = 60;
const CARD_CENTER_Y = 30;
const PULLBACK = 58;

interface BoardNode {
  id: string;
  kind: "suspect" | "document";
  label: string;
  sub: string;
  color: string;
}

type MotionPair = { x: MotionValue<number>; y: MotionValue<number> };

export function EvidenceBoard({ data }: { data: CaseData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRefs = useRef<Record<string, MotionPair>>({});
  const positionsRef = useRef<Record<string, BoardPosition>>({});
  const [placedIds, setPlacedIds] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<string | null>(null);
  const [armed, setArmed] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const nodes: BoardNode[] = useMemo(
    () => [
      ...data.suspects.map((s) => ({
        id: s.id,
        kind: "suspect" as const,
        label: s.name,
        sub: s.role,
        color: suspectColorFor(s.id),
      })),
      ...data.documents.map((d) => ({
        id: d.id,
        kind: "document" as const,
        label: d.title,
        sub: TYPE_ICON[d.type] ?? "📄",
        color: docColorFor(d.type).border,
      })),
    ],
    [data]
  );
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  function ensurePair(id: string, initial: BoardPosition): MotionPair {
    let pair = motionRefs.current[id];
    if (!pair) {
      pair = { x: motionValue(initial.x), y: motionValue(initial.y) };
      motionRefs.current[id] = pair;
    }
    return pair;
  }

  useEffect(() => {
    const saved = getBoardState(data.id);
    const initial: Record<string, BoardPosition> = {};
    Object.entries(saved.positions).forEach(([id, pos]) => {
      if (!nodeById.has(id)) return;
      initial[id] = pos;
      const pair = ensurePair(id, pos);
      pair.x.set(pos.x);
      pair.y.set(pos.y);
    });
    positionsRef.current = initial;
    setPlacedIds(new Set(Object.keys(initial)));
    setConnections(saved.connections);
    setNotes(saved.notes);
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  function persist(
    nextPositions: Record<string, BoardPosition>,
    nextConnections: [string, string][],
    nextNotes: Record<string, string> = notes
  ) {
    setBoardState(data.id, { positions: nextPositions, connections: nextConnections, notes: nextNotes });
  }

  function updateNote(id: string, text: string) {
    setNotes((prev) => {
      const next = { ...prev, [id]: text };
      persist(positionsRef.current, connections, next);
      return next;
    });
  }

  function handleTap(id: string) {
    if (armed) setArmed(null);
    if (!anchor) {
      setAnchor(id);
      playTick();
      return;
    }
    if (anchor === id) {
      setAnchor(null);
      return;
    }
    const key = connectionKey(anchor, id);
    const exists = connections.some((c) => connectionKey(c[0], c[1]) === key);
    const next: [string, string][] = exists
      ? connections.filter((c) => connectionKey(c[0], c[1]) !== key)
      : [...connections, [anchor, id]];
    setConnections(next);
    persist(positionsRef.current, next);
    setAnchor(null);
    playTick();
  }

  function handleDragEnd(id: string) {
    const pair = motionRefs.current[id];
    if (!pair) return;
    positionsRef.current = { ...positionsRef.current, [id]: { x: pair.x.get(), y: pair.y.get() } };
    persist(positionsRef.current, connections, notes);
  }

  function placeNode(id: string, pos: BoardPosition) {
    const pair = ensurePair(id, pos);
    pair.x.set(pos.x);
    pair.y.set(pos.y);
    const nextPositions = { ...positionsRef.current, [id]: pos };
    positionsRef.current = nextPositions;
    setPlacedIds(new Set(Object.keys(nextPositions)));
    persist(nextPositions, connections, notes);
    setArmed(null);
    playPaper();
  }

  function unplaceNode(id: string) {
    const rest = { ...positionsRef.current };
    delete rest[id];
    positionsRef.current = rest;
    setPlacedIds(new Set(Object.keys(rest)));
    const nextConnections = connections.filter((c) => c[0] !== id && c[1] !== id);
    setConnections(nextConnections);
    if (editingNote === id) setEditingNote(null);
    if (anchor === id) setAnchor(null);
    persist(rest, nextConnections, notes);
    playTick();
  }

  function handleCanvasClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (!armed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - CARD_CENTER_X;
    const rawY = e.clientY - rect.top - CARD_CENTER_Y;
    const x = Math.max(0, Math.min(CANVAS_W - CARD_W, rawX));
    const y = Math.max(0, Math.min(CANVAS_H - CARD_H, rawY));
    placeNode(armed, { x, y });
  }

  function resetBoard() {
    positionsRef.current = {};
    setPlacedIds(new Set());
    setConnections([]);
    setNotes({});
    setEditingNote(null);
    setAnchor(null);
    setArmed(null);
    persist({}, [], {});
    playPaper();
  }

  const trayNodes = nodes.filter((n) => !placedIds.has(n.id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-text-dim text-sm">
          Aşağıdaki kutudan bir ismi seç, sonra panoda yerleştirmek istediğin
          yere dokun. Yerleştirilmiş iki kartı sırayla tıklayarak bağla —
          aynı ikiliyi tekrar seçersen ip kalkar.
          {armed && (
            <span className="text-accent-gold"> Şimdi panoda bir yer seç…</span>
          )}
          {anchor && (
            <span className="text-accent-gold"> Şimdi ikinci kartı seç…</span>
          )}
        </p>
        <button
          onClick={resetBoard}
          className="shrink-0 rounded-sm border border-white/15 px-3 py-1.5 text-xs uppercase tracking-wide text-text-dim hover:text-text hover:border-white/30 transition-colors font-mono-doc"
        >
          Panoyu Sıfırla
        </button>
      </div>

      {trayNodes.length > 0 && (
        <div className="rounded-sm border border-white/10 bg-panel p-2.5">
          <p className="text-[10px] uppercase tracking-widest text-text-dim font-mono-doc mb-2">
            Yerleştirilmemiş kartlar
          </p>
          <div className="flex flex-wrap gap-2">
            {trayNodes.map((n) => {
              const isArmed = armed === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    setAnchor(null);
                    setArmed((prev) => (prev === n.id ? null : n.id));
                    playTick();
                  }}
                  aria-pressed={isArmed}
                  className={`select-none rounded-sm border px-2.5 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${
                    isArmed
                      ? "border-accent-gold ring-2 ring-accent-gold bg-accent-gold/10"
                      : "border-white/15 bg-background hover:border-white/30"
                  }`}
                  style={{ borderLeftWidth: 3, borderLeftColor: n.color }}
                >
                  {n.kind === "document" && <span>{n.sub}</span>}
                  <span className="font-semibold truncate max-w-[110px]">{n.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative w-full overflow-auto rounded-sm cork-texture select-none">
        <div
          ref={containerRef}
          onClick={handleCanvasClick}
          className={`relative ${armed ? "cursor-crosshair" : ""}`}
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            outline: armed ? "2px dashed var(--accent-gold)" : "none",
            outlineOffset: "-4px",
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            width={CANVAS_W}
            height={CANVAS_H}
          >
            <defs>
              <marker
                id="board-arrowhead"
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-red-bright)" />
              </marker>
            </defs>
            {loaded &&
              connections.map(([a, b], i) => {
                const pairA = motionRefs.current[a];
                const pairB = motionRefs.current[b];
                if (!pairA || !pairB) return null;
                return <ConnectionLine key={i} pairA={pairA} pairB={pairB} />;
              })}
          </svg>

          {loaded &&
            nodes
              .filter((n) => placedIds.has(n.id))
              .map((n) => {
                const pos = positionsRef.current[n.id];
                if (!pos) return null;
                const pair = ensurePair(n.id, pos);
                const selected = anchor === n.id;
                const editing = editingNote === n.id;
                const hasNote = !!notes[n.id]?.trim();
                return (
                  <motion.div
                    key={n.id}
                    drag
                    dragMomentum={false}
                    dragConstraints={containerRef}
                    style={{ x: pair.x, y: pair.y, left: 0, top: 0, borderColor: selected ? "var(--accent-gold)" : `${n.color}99` }}
                    onDragEnd={() => handleDragEnd(n.id)}
                    onTap={() => handleTap(n.id)}
                    whileDrag={{ scale: 1.06, zIndex: 30 }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    aria-label={`${n.label}${hasNote ? " (notlu)" : ""} — bağlamak için etkinleştir`}
                    className={`absolute cursor-grab active:cursor-grabbing select-none rounded-sm border-2 px-2.5 py-2 text-xs bg-panel shadow-lg transition-[width] focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none ${
                      editing ? "w-[200px] z-20" : "w-[120px]"
                    } ${selected ? "ring-2 ring-accent-gold" : ""}`}
                  >
                    <div className="pin" />
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        unplaceNode(n.id);
                      }}
                      className="absolute -top-1.5 -left-1.5 h-5 w-5 rounded-full bg-panel border border-white/20 text-text-dim text-[10px] flex items-center justify-center shadow hover:text-text"
                      aria-label="Trayye geri gönder"
                      title="Trayye geri gönder"
                    >
                      ↩
                    </button>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNote(editing ? null : n.id);
                        playTick();
                      }}
                      className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-accent-gold text-black text-[10px] flex items-center justify-center shadow"
                      aria-label="Not ekle"
                    >
                      {hasNote ? "●" : "✎"}
                    </button>
                    {n.kind === "suspect" ? (
                      <>
                        <p className="font-display font-bold leading-tight truncate">
                          {n.label}
                        </p>
                        <p className="text-text-dim text-[10px] font-mono-doc truncate">
                          {n.sub}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-base leading-none mb-1">{n.sub}</p>
                        <p className="leading-tight text-[11px] font-mono-doc line-clamp-2">
                          {n.label}
                        </p>
                      </>
                    )}
                    {editing ? (
                      <textarea
                        autoFocus
                        value={notes[n.id] ?? ""}
                        onPointerDown={(e) => e.stopPropagation()}
                        onChange={(e) => updateNote(n.id, e.target.value)}
                        onBlur={() => setEditingNote(null)}
                        placeholder="Kısa bir not..."
                        rows={3}
                        className="mt-1.5 w-full resize-none rounded-sm border border-accent-gold/40 bg-background px-1.5 py-1 text-[11px] text-text outline-none focus:ring-2 focus:ring-accent-gold/60"
                      />
                    ) : (
                      hasNote && (
                        <p className="mt-1 text-[10px] text-accent-gold/90 italic line-clamp-2">
                          {notes[n.id]}
                        </p>
                      )
                    )}
                  </motion.div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

/** İki karta bağlı ok — kartlar sürüklenirken React re-render tetiklemeden,
 * doğrudan motion value'lar üzerinden canlı takip eder (performans için). */
function ConnectionLine({ pairA, pairB }: { pairA: MotionPair; pairB: MotionPair }) {
  const x1 = useTransform(pairA.x, (v) => v + CARD_CENTER_X);
  const y1 = useTransform(pairA.y, (v) => v + CARD_CENTER_Y);
  const x2raw = useTransform(pairB.x, (v) => v + CARD_CENTER_X);
  const y2raw = useTransform(pairB.y, (v) => v + CARD_CENTER_Y);

  const x2 = useTransform([x1, y1, x2raw, y2raw], (latest) => {
    const [X1, Y1, X2, Y2] = latest as number[];
    const dx = X2 - X1;
    const dy = Y2 - Y1;
    const dist = Math.hypot(dx, dy) || 1;
    return dist > PULLBACK ? X2 - (dx / dist) * PULLBACK : X2;
  });
  const y2 = useTransform([x1, y1, x2raw, y2raw], (latest) => {
    const [X1, Y1, X2, Y2] = latest as number[];
    const dx = X2 - X1;
    const dy = Y2 - Y1;
    const dist = Math.hypot(dx, dy) || 1;
    return dist > PULLBACK ? Y2 - (dy / dist) * PULLBACK : Y2;
  });

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--accent-red-bright)"
      strokeWidth={2}
      opacity={0.85}
      markerEnd="url(#board-arrowhead)"
    />
  );
}
