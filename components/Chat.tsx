"use client";

import { useRef, useState } from "react";
import type { ChatMessage, ToolCallLog } from "@/lib/types";

interface DisplayMessage extends ChatMessage {
  toolCalls?: ToolCallLog[];
  error?: boolean;
}

const STARTERS = [
  "Pitch me a cutting-edge idea for LEO debris removal.",
  "What's an underexplored angle on pulsar-based deep space navigation?",
  "Is asteroid mining actually viable in the next decade?",
  "What upcoming launches should I be watching this month?",
];

export default function Chat() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: DisplayMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error ?? "Something went wrong.", error: true },
        ]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, toolCalls: data.toolCalls },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Request failed: ${err.message}`, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-line bg-panel/60">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-slate-300 hover:border-accent hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-accent/10 border border-accent/30 px-4 py-2.5 text-sm text-slate-100"
                  : `max-w-[85%] rounded-2xl rounded-tl-sm border px-4 py-2.5 text-sm whitespace-pre-wrap ${
                      m.error
                        ? "border-red-500/30 bg-red-500/10 text-red-300"
                        : "border-line bg-void/60 text-slate-200"
                    }`
              }
            >
              {m.content}
              {m.toolCalls && m.toolCalls.length > 0 && (
                <details className="mt-2 text-xs text-slate-500">
                  <summary className="cursor-pointer text-accent2 hover:underline">
                    {m.toolCalls.length} live lookup{m.toolCalls.length > 1 ? "s" : ""} used
                  </summary>
                  <div className="mt-2 space-y-2">
                    {m.toolCalls.map((tc, j) => (
                      <div key={j} className="rounded border border-line bg-black/30 p-2">
                        <div className="font-mono text-accent2">{tc.name}</div>
                        <div className="mt-1 font-mono opacity-70">
                          {JSON.stringify(tc.input)}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm border border-line bg-void/60 px-4 py-2.5 text-sm text-slate-500">
              thinking…
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Pitch an idea, ask for a sanity check, or ask what's launching soon…"
            className="flex-1 resize-none rounded-lg border border-line bg-void/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-accent focus:outline-none"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-void disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
