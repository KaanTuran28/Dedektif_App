"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { colorForHue } from "@/lib/chat";
import { sendRoomMessage, subscribeMessages, type RoomChatMessage } from "@/lib/room";

const MAX_MESSAGE_LENGTH = 500;

/** Odaya bağlı sohbet kutusu — kimlik ve oda kodu zaten oda kurma/katılma
 * akışında belirlendiği için burada ayrıca bir "katıl" formu yok, direkt
 * mesajlaşmaya başlar. */
export function CaseChat({
  roomCode,
  name,
  colorHue,
}: {
  roomCode: string;
  name: string;
  colorHue: number;
}) {
  const [messages, setMessages] = useState<RoomChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeMessages(roomCode, setMessages);
  }, [roomCode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || sending) return;
    setSending(true);
    setDraft("");
    try {
      await sendRoomMessage(roomCode, name, text, colorHue);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-panel p-4 sm:p-5 flex flex-col h-[420px]">
      <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">Ortak Sohbet</p>
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
