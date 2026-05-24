"use client";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { Sparkles, Compass, User, AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockUser } from "@/lib/mockUser";

export default function HomePage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-20 h-full overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-xs text-stone-500 font-medium">Good morning,</div>
            <div className="font-display text-2xl font-semibold">{mockUser.firstName}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
            <User size={18} className="text-stone-600" />
          </div>
        </div>

        <div
          className="relative rounded-3xl p-5 mb-5 overflow-hidden cursor-pointer"
          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d1517 100%)" }}
          onClick={() => router.push("/compass")}
        >
          <div
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(236,17,26,0.3) 0%, transparent 70%)" }}
          ></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={16} className="text-red-400" />
              <span className="text-xs uppercase tracking-widest text-red-400 font-semibold">
                Scotia Due North
              </span>
            </div>
            <h2 className="font-display text-white text-xl leading-tight mb-3">
              Got advice from a friend or TikTok?
            </h2>
            <p className="text-stone-300 text-sm mb-4 leading-relaxed">
              Paste it in. We&apos;ll tell you if it&apos;s legit — and what to do about it.
            </p>
            <button className="w-full bg-white text-black font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 pulse-ring">
              <Sparkles size={16} />
              Check advice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="border border-stone-200 rounded-2xl p-4">
            <div className="text-xs text-stone-500 mb-1">Chequing</div>
            <div className="font-display text-xl font-semibold">
              ${mockUser.accounts.chequing.balance.toLocaleString()}
            </div>
          </div>
          <div className="border border-stone-200 rounded-2xl p-4">
            <div className="text-xs text-stone-500 mb-1">TFSA Room</div>
            <div className="font-display text-xl font-semibold">
              ${mockUser.accounts.tfsa.room.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">
            Recent Checks
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={14} className="text-amber-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">&quot;Buy NVDA at all costs&quot;</div>
                <div className="text-xs text-stone-500">Reddit · 2 days ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={14} className="text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">&quot;Max your FHSA first&quot;</div>
                <div className="text-xs text-stone-500">Dad&apos;s text · 5 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}