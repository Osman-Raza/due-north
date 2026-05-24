"use client";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle2, Circle, Zap } from "lucide-react";
import { useState } from "react";

const days = [
  { day: 1, title: "Pick your goal", desc: "Home? Travel? Just growing money? Take 2 min to decide." },
  { day: 2, title: "Open your FHSA", desc: "Tax deductible AND tax-free. 1-tap open via Compass." },
  { day: 3, title: "Set up $20/week auto-deposit", desc: "The boring habit that quietly compounds." },
  { day: 4, title: "Buy your first ETF", desc: "$VFV in iTRADE. $0 commission. Takes 30 seconds." },
  { day: 5, title: "Ask Priya one question", desc: "Anything. She's free and licensed." },
  { day: 6, title: "Share a win in your cohort", desc: "Your first deposit is worth celebrating." },
  { day: 7, title: "Reflect + set next step", desc: "What habit do you want to keep?" },
];

export default function SprintPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([1]);

  const toggle = (day: number) => {
    setCompleted((c) =>
      c.includes(day) ? c.filter((d) => d !== day) : [...c, day]
    );
  };

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-20 h-full overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.push("/")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg font-semibold">First Trade Sprint</div>
        </div>

        <div className="rounded-3xl p-5 mb-5 bg-gradient-to-br from-stone-900 to-rose-900 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-300" />
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
              7-Day Sprint
            </span>
          </div>
          <h2 className="font-display text-2xl leading-tight mb-2">
            From zero to your first investment.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            One small action a day. By the end of the week, you&apos;re actually investing — not just thinking about it.
          </p>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/70">Progress</span>
              <span className="font-semibold">{completed.length}/7 days</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-300 rounded-full transition-all"
                style={{ width: `${(completed.length / 7) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {days.map((d) => {
            const done = completed.includes(d.day);
            return (
              <button
                key={d.day}
                onClick={() => toggle(d.day)}
                className={`w-full text-left rounded-2xl p-4 flex items-start gap-3 transition-all ${done ? "bg-green-50 border-green-200" : "bg-white border-stone-200"} border`}
              >
                {done ? (
                  <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle size={20} className="text-stone-300 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-stone-500 font-semibold mb-0.5">
                    Day {d.day}
                  </div>
                  <div className={`text-sm font-semibold ${done ? "line-through text-stone-400" : ""}`}>
                    {d.title}
                  </div>
                  <div className="text-xs text-stone-600 mt-1 leading-relaxed">{d.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Why this works:</strong> 20% of Canadians without an investment plan said they
            don&apos;t know where to begin — not that they lack the funds. This sprint gets you past
            the starting line.
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
