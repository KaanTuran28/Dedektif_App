"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { colorForHue } from "@/lib/chat";
import {
  deleteRoomMessage,
  editRoomMessage,
  sendRoomMessage,
  subscribeMessages,
  type RoomChatMessage,
} from "@/lib/room";
import { playTick } from "@/lib/sound";

const MAX_MESSAGE_LENGTH = 500;

/** Odaya bağlı sohbet kutusu — kimlik ve oda kodu zaten oda kurma/katılma
 * akışında belirlendiği için burada ayrıca bir "katıl" formu yok, direkt
 * mesajlaşmaya başlar. Kendi mesajlarını düzenleyebilir/silebilirsin. */
export function CaseChat({
  roomCode,
  participantId,
  name,
  colorHue,
}: {
  roomCode: string;
  participantId: string;
  name: string;
  colorHue: number;
}) {
  const [messages, setMessages] = useState<RoomChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
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
      await sendRoomMessage(roomCode, participantId, name, text, colorHue);
    } finally {
      setSending(false);
    }
  }

  function startEdit(m: RoomChatMessage) {
    setEditingId(m.id);
    setEditDraft(m.text);
    playTick();
  }

  async function submitEdit(e: FormEvent) {
    e.preventDefault();
    const text = editDraft.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || !editingId) return;
    const id = editingId;
    setEditingId(null);
    await editRoomMessage(roomCode, id, text);
  }

  async function handleDelete(messageId: string) {
    if (editingId === messageId) setEditingId(null);
    await deleteRoomMessage(roomCode, messageId);
  }

  return (
    <div className="rounded-lg border border-white/10 bg-panel p-4 sm:p-5 flex flex-col h-[420px]">
      <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">Ortak Sohbet</p>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3">
        {messages.length === 0 && (
          <p className="text-text-dim text-xs italic">Henüz mesaj yok. İlk mesajı sen yaz.</p>
        )}
        {messages.map((m) => {
          const mine = m.authorId === participantId;
          const editing = editingId === m.id;
          return (
            <div key={m.id} className="group text-sm leading-snug flex items-start gap-1.5">
              <div className="flex-1 min-w-0">
                <span className="font-semibold" style={{ color: colorForHue(m.colorHue) }}>
                  {m.name}
                </span>
                <span className="text-text-dim">: </span>
                {editing ? (
                  <form onSubmit={submitEdit} className="inline-flex gap-1.5 mt-1 w-full">
                    <input
                      autoFocus
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value)}
                      maxLength={MAX_MESSAGE_LENGTH}
                      aria-label="Mesajı düzenle"
                      className="flex-1 rounded-md paper-card px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-accent-red-bright/60"
                    />
                    <button
                      type="submit"
                      className="text-xs text-accent-gold hover:underline shrink-0"
                    >
                      Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-xs text-text-dim hover:underline shrink-0"
                    >
                      Vazgeç
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="break-words">{m.text}</span>
                    {m.editedAt && (
                      <span className="text-text-dim text-[10px] italic"> (düzenlendi)</span>
                    )}
                  </>
                )}
              </div>
              {mine && !editing && (
                <div className="flex items-center gap-1.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(m)}
                    aria-label="Mesajı düzenle"
                    title="Düzenle"
                    className="text-text-dim hover:text-text text-xs"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    aria-label="Mesajı sil"
                    title="Sil"
                    className="text-text-dim hover:text-accent-red-bright text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
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
