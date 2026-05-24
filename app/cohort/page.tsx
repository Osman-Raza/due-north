"use client";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { ChevronLeft, Users, Trophy, MessageSquare, TrendingUp } from "lucide-react";

const cohortMembers = [
  { name: "Maya", initials: "M", color: "bg-rose-400", milestone: "Opened FHSA" },
  { name: "Jordan", initials: "J", color: "bg-blue-400", milestone: "First $50 deposit" },
  { name: "Aisha", initials: "A", color: "bg-emerald-400", milestone: "Set up auto-deposit" },
  { name: "Tyler", initials: "T", color: "bg-amber-400", milestone: "Asked Priya a Q" },
  { name: "Priya (Mentor)", initials: "P", color: "bg-scotia-red", milestone: "CIRO Licensed Advisor" },
];

const activity = [
  { who: "Jordan", action: "made their first $50 deposit into their TFSA 🎉", time: "2h ago" },
  { who: "Priya", action: "shared: \"Why your TFSA beats your chequing account this week\"", time: "5h ago" },
  { who: "Aisha", action: "asked the group about FHSA vs RRSP for a first home", time: "1d ago" },
  { who: "Tyler", action: "joined the cohort 👋", time: "2d ago" },
];

export default function CohortPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-20 h-full overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.push("/")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg font-semibold">Your Cohort</div>
        </div>

        <div className="rounded-3xl p-5 mb-5 bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} />
            <span className="text-xs uppercase tracking-widest font-semibold">First Investor Cohort</span>
          </div>
          <h2 className="font-display text-xl leading-tight mb-2">
            You&apos;re not figuring this out alone.
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            8 first-time investors. 6-week journey. 1 licensed Scotia advisor as your mentor.
          </p>
          <div className="mt-4 bg-white/20 rounded-xl p-3 backdrop-blur">
            <div className="text-xs text-white/80">Week 2 of 6</div>
            <div className="text-sm font-semibold">Open your first registered account</div>
            <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "33%" }}></div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">
            Members
          </div>
          <div className="space-y-2">
            {cohortMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50">
                <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-semibold">{m.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-stone-500">{m.milestone}</div>
                </div>
                {m.name.includes("Priya") && (
                  <Trophy size={14} className="text-amber-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">
            Activity
          </div>
          <div className="space-y-2">
            {activity.map((a, i) => (
              <div key={i} className="border border-stone-200 rounded-2xl p-3">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{a.who}</span> {a.action}
                </p>
                <div className="text-xs text-stone-500 mt-1">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-scotia-red text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
          <MessageSquare size={16} />
          Open Cohort Chat
        </button>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
