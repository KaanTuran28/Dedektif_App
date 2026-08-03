"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  colorForHue,
  defaultRoomCodeFor,
  getChatIdentity,
  getStoredRoomCode,
  normalizeRoomCode,
  setChatIdentity,
  setStoredRoomCode,
} from "@/lib/chat";

interface ChatMessage {
  id: string;
  name: string;
  text: string;
  colorHue: number;
  createdAt: Timestamp | null;
}

const MAX_MESSAGE_LENGTH = 500;

export function CaseChat({ caseId }: { caseId: string }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const identity = getChatIdentity();
    if (identity) setName(identity.name);
    setRoomCode(getStoredRoomCode(caseId));
  }, [caseId]);

  useEffect(() => {
    if (!joined || !roomCode) return;
    const q = query(
      collection(db, "rooms", roomCode, "messages"),
      orderBy("createdAt", "asc"),
      limit(200)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<ChatMessage, "id">) }))
      );
    });
    return unsubscribe;
  }, [joined, roomCode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function handleJoin(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 40);
    if (!trimmedName) return;
    const code = normalizeRoomCode(roomCode) || defaultRoomCodeFor(caseId);
    setChatIdentity(trimmedName);
    setStoredRoomCode(caseId, code);
    setRoomCode(code);
    setJoined(true);
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const identity = getChatIdentity();
    const text = draft.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!identity || !text || !roomCode || sending) return;
    setSending(true);
    setDraft("");
    try {
      await addDoc(collection(db, "rooms", roomCode, "messages"), {
        name: identity.name,
        text,
        colorHue: identity.colorHue,
        createdAt: serverTimestamp(),
      });
    } finally {
      setSending(false);
    }
  }

  if (!joined) {
    return (
      <div className="rounded-lg border border-white/10 bg-panel p-4 sm:p-5">
        <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">
          Ortak Sohbet
        </p>
        <p className="text-text-dim text-xs mb-3">
          Aynı vakayı oynayan bir arkadaşınla aynı odaya gir, birlikte tartışın.
        </p>
        <form onSubmit={handleJoin} className="space-y-3">
          <div>
            <label
              className="text-[11px] text-text-dim uppercase tracking-wide block mb-1"
              htmlFor="chat-name"
            >
              Adın
            </label>
            <input
              id="chat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder="Örn. Kaan"
              className="w-full rounded-md paper-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-red-bright/60"
            />
          </div>
          <div>
            <label
              className="text-[11px] text-text-dim uppercase tracking-wide block mb-1"
              htmlFor="chat-room"
            >
              Oda Kodu
            </label>
            <input
              id="chat-room"
              value={roomCode}
              onChange={(e) => setRoomCode(normalizeRoomCode(e.target.value))}
              maxLength={12}
              className="w-full rounded-md paper-card px-3 py-2 text-sm font-mono-doc outline-none focus:ring-2 focus:ring-accent-red-bright/60"
            />
            <p className="text-text-dim text-[11px] mt-1">
              Bu vakayı açan herkes varsayılan olarak aynı odaya düşer. Farklı bir kod
              girersen kendi özel odana geçersin.
            </p>
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full rounded-sm bg-accent-red-bright px-4 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Odaya Katıl
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-panel p-4 sm:p-5 flex flex-col h-[420px]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-widest text-accent-gold">
          Ortak Sohbet · Oda {roomCode}
        </p>
        <button
          onClick={() => setJoined(false)}
          className="text-[11px] text-text-dim hover:text-text underline"
        >
          Odadan Ayrıl
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3">
        {messages.length === 0 && (
          <p className="text-text-dim text-xs italic">Henüz mesaj yok. İlk mesajı sen yaz.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="text-sm leading-snug">
            <span className="font-semibold" style={{ color: colorForHue(m.colorHue) }}>
              {m.name}
            </span>
            <span className="text-text-dim">: </span>
            <span className="break-words">{m.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Mesaj yaz..."
          aria-label="Sohbet mesajı"
          className="flex-1 rounded-md paper-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-red-bright/60"
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending}
          className="rounded-sm bg-accent-red-bright px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
