"use client";

import PhoneFrame from "@/components/PhoneFrame";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, Plus, Shield, ArrowRight } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AdvisorPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey Maya! 👋 I'm your Compass AI. Saw you just ran that TikTok through the analyzer. Got any questions about it, or anything else investing-related?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"ai" | "human">("ai");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");

    if (mode === "human") {
      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "Hey! Priya here 👋 I just read through your Compass thread. Let me know what you'd like to dig into and I can pull up some options for you.",
          },
        ]);
      }, 1200);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply || "Sorry, I had trouble responding." }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I hit an error. Try again?" },
      ]);
    }
    setLoading(false);
  };

  const escalate = () => {
    setMode("human");
    setMessages([
      ...messages,
      {
        role: "assistant",
        content: "Connecting you to Priya, a CIRO-licensed Scotia advisor. One sec...",
      },
    ]);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col" style={{ background: "#f7f5f2" }}>
        <div className="px-5 pt-3 pb-3 bg-white border-b border-stone-200 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => router.push("/analysis")}>
            <ChevronLeft size={24} />
          </button>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {mode === "ai" ? "AI" : "P"}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">
              {mode === "ai" ? "Compass AI" : "Priya Sharma"}
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1">
              <Shield size={10} />
              {mode === "ai"
                ? "AI Assistant · Trained on Scotia research"
                : "CIRO Licensed · Scotia Advisor"}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
          <div className="text-center text-xs text-stone-500 my-2">Today, 9:42 AM</div>

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 fade-up ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-semibold">
                    {mode === "ai" ? "AI" : "P"}
                  </span>
                </div>
              )}
              <div
                className={`rounded-2xl p-3 max-w-[75%] ${m.role === "user" ? "bg-scotia-red text-white rounded-tr-sm" : "bg-white text-stone-900 rounded-tl-sm shadow-sm"}`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">
                  {mode === "ai" ? "AI" : "P"}
                </span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}

          {mode === "ai" && messages.length >= 3 && (
            <div className="pt-2">
              <button
                onClick={escalate}
                className="w-full bg-white border-2 border-scotia-red rounded-2xl p-3 flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-scotia-red">Talk to a real human</div>
                  <div className="text-xs text-stone-500">Priya is online · free for clients under 34</div>
                </div>
                <ArrowRight size={18} className="text-scotia-red" />
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="bg-white border-t border-stone-200 p-3 flex items-center gap-2 flex-shrink-0">
          <button className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
            <Plus size={18} className="text-stone-600" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={mode === "ai" ? "Ask Compass AI..." : "Message Priya..."}
            className="flex-1 bg-stone-100 rounded-full px-4 py-2.5 text-sm focus:outline-none"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-9 h-9 rounded-full bg-scotia-red flex items-center justify-center flex-shrink-0 disabled:opacity-50"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
