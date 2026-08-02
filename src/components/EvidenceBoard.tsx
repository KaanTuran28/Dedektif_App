"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import type { CaseData } from "@/types/case";
import { getBoardState, setBoardState, connectionKey, type BoardPosition } from "@/lib/board";
import { playPaper, playTick } from "@/lib/sound";

const TYPE_ICON: Record<string, string> = {
  resmi_rapor: "📄",
  whatsapp: "💬",
  telefon_dokumu: "☎️",
  bilet_kaydi: "🎫",
  gunluk_log: "📓",
  ifade: "🗒️",
};

const CANVAS_W = 1040;
const CANVAS_H = 640;
const COLS = 4;
const CELL_W = CANVAS_W / COLS;
const CELL_H = 155;

function hash(str: string, salt: number) {
  let h = salt;
  for (let i = 0; i < str.length; i++) h = (h * 33 + str.charCodeAt(i)) >>> 0;
  return h;
}

function defaultPosition(id: string, index: number): BoardPosition {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const jx = ((hash(id, 17) % 200) - 100) / 100; // -1..1
  const jy = ((hash(id, 91) % 200) - 100) / 100;
  return {
    x: col * CELL_W + CELL_W / 2 - 60 + jx * 18,
    y: row * CELL_H + 50 + jy * 14,
  };
}

interface BoardNode {
  id: string;
  kind: "suspect" | "document";
  label: string;
  sub: string;
}

export function EvidenceBoard({ data }: { data: CaseData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, BoardPosition>>({});
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const nodes: BoardNode[] = useMemo(
    () => [
      ...data.suspects.map((s) => ({
        id: s.id,
        kind: "suspect" as const,
        label: s.name,
        sub: s.role,
      })),
      ...data.documents.map((d) => ({
        id: d.id,
        kind: "document" as const,
        label: d.title,
        sub: TYPE_ICON[d.type] ?? "📄",
      })),
    ],
    [data]
  );

  useEffect(() => {
    const saved = getBoardState(data.id);
    const initial: Record<string, BoardPosition> = {};
    nodes.forEach((n, i) => {
      initial[n.id] = saved.positions[n.id] ?? defaultPosition(n.id, i);
    });
    setPositions(initial);
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
      persist(positions, connections, next);
      return next;
    });
  }

  function handleTap(id: string) {
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
    persist(positions, next);
    setAnchor(null);
    playTick();
  }

  function handleDrag(id: string, dx: number, dy: number) {
    setPositions((prev) => {
      const base = prev[id] ?? { x: 0, y: 0 };
      const next = { ...prev, [id]: { x: base.x + dx, y: base.y + dy } };
      return next;
    });
  }

  function handleDragEnd() {
    persist(positions, connections);
  }

  function resetBoard() {
    const fresh: Record<string, BoardPosition> = {};
    nodes.forEach((n, i) => (fresh[n.id] = defaultPosition(n.id, i)));
    setPositions(fresh);
    setConnections([]);
    setNotes({});
    setEditingNote(null);
    persist(fresh, [], {});
    playPaper();
  }

  const lines = connections
    .map(([a, b]) => {
      const pa = positions[a];
      const pb = positions[b];
      if (!pa || !pb) return null;
      return { a, b, x1: pa.x + 60, y1: pa.y + 30, x2: pb.x + 60, y2: pb.y + 30 };
    })
    .filter(Boolean) as { a: string; b: string; x1: number; y1: number; x2: number; y2: number }[];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-text-dim text-sm">
          Kartları sürükleyip düzenle. Bağlamak için iki kartı sırayla tıkla —
          aralarına kırmızı iplik gerilsin.
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

      <div className="relative w-full overflow-auto rounded-sm cork-texture select-none">
        <div
          ref={containerRef}
          className="relative"
          style={{ width: CANVAS_W, height: CANVAS_H }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            width={CANVAS_W}
            height={CANVAS_H}
          >
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="var(--accent-red-bright)"
                strokeWidth={2}
                opacity={0.8}
              />
            ))}
          </svg>

          {loaded &&
            nodes.map((n) => {
              const pos = positions[n.id] ?? { x: 0, y: 0 };
              const selected = anchor === n.id;
              const editing = editingNote === n.id;
              const hasNote = !!notes[n.id]?.trim();
              return (
                <motion.div
                  key={n.id}
                  drag
                  dragMomentum={false}
                  dragConstraints={containerRef}
                  onDrag={(_e, info) => handleDrag(n.id, info.delta.x, info.delta.y)}
                  onDragEnd={handleDragEnd}
                  onTap={() => handleTap(n.id)}
                  whileDrag={{ scale: 1.06, zIndex: 30 }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={`${n.label}${hasNote ? " (notlu)" : ""} — bağlamak için etkinleştir`}
                  className={`absolute cursor-grab active:cursor-grabbing select-none rounded-sm border px-2.5 py-2 text-xs bg-panel shadow-lg transition-[width] focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none ${
                    editing ? "w-[200px] z-20" : "w-[120px]"
                  } ${selected ? "border-accent-gold ring-2 ring-accent-gold" : "border-white/15"}`}
                  style={{ left: pos.x, top: pos.y }}
                >
                  <div className="pin" />
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
