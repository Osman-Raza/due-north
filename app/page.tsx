"use client";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { Sparkles, Compass, User, AlertTriangle, CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";
import { mockUser } from "@/lib/mockUser";

export default function HomePage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="h-full overflow-y-auto scrollbar-hide bg-[#F5F5F5]">
        {/* Scotia-style top header */}
        <div className="bg-white px-5 pt-2 pb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xs text-[#6B6B6B] font-medium">Good morning,</div>
              <div className="text-2xl font-bold text-[#231F20]">{mockUser.firstName}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EC111A" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" fillOpacity="0.3"/>
                  <path d="M15.5 8.5c0-1.5-1.5-2.5-3.5-2.5S8.5 7 8.5 8.5c0 2 4 2.5 4 4.5 0 1-1 1.5-1.5 1.5s-2-.5-2-1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#E8E8E8] flex items-center justify-center">
                <User size={16} className="text-[#6B6B6B]" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-[#F5F5F5] rounded-xl p-3">
              <div className="text-xs text-[#6B6B6B] mb-1">Chequing</div>
              <div className="text-lg font-bold text-[#231F20]">
                ${mockUser.accounts.chequing.balance.toLocaleString()}
              </div>
            </div>
            <div className="flex-1 bg-[#F5F5F5] rounded-xl p-3">
              <div className="text-xs text-[#6B6B6B] mb-1">TFSA Room</div>
              <div className="text-lg font-bold text-[#231F20]">
                ${mockUser.accounts.tfsa.room.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pt-4 pb-20">
          {/* Due North card */}
          <div
            className="relative rounded-2xl p-5 mb-4 overflow-hidden cursor-pointer"
            style={{ backgroundColor: "#EC111A" }}
            onClick={() => router.push("/compass")}
          >
            <div
              className="absolute -right-6 -top-6 w-28 h-28 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
            ></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Compass size={14} className="text-white/80" />
                <span className="text-xs uppercase tracking-widest text-white/80 font-semibold">
                  Due North
                </span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight mb-2">
                Got advice from TikTok or a friend?
              </h2>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                Paste it in. We&apos;ll tell you if it&apos;s legit.
              </p>
              <button className="w-full bg-white text-[#EC111A] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 pulse-ring text-sm">
                <Sparkles size={14} />
                Check advice
              </button>
            </div>
          </div>

          {/* Trending card */}
          <div
            className="bg-white rounded-2xl p-4 mb-4 cursor-pointer flex items-center gap-3 shadow-sm"
            onClick={() => router.push("/trending")}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FFF0F0" }}>
              <TrendingUp size={18} style={{ color: "#EC111A" }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#231F20]">Trending on FinTok</div>
              <div className="text-xs text-[#6B6B6B]">NVDA · VFV · BTC · 6 stocks trending</div>
            </div>
            <ChevronRight size={18} className="text-[#6B6B6B]" />
          </div>

          {/* Recent checks */}
          <div className="mb-3">
            <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mb-3">
              Recent Checks
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={14} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#231F20] truncate">&quot;Buy NVDA at all costs&quot;</div>
                  <div className="text-xs text-[#6B6B6B]">Reddit · 2 days ago</div>
                </div>
                <ChevronRight size={16} className="text-[#6B6B6B]" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={14} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#231F20] truncate">&quot;Max your FHSA first&quot;</div>
                  <div className="text-xs text-[#6B6B6B]">Dad&apos;s text · 5 days ago</div>
                </div>
                <ChevronRight size={16} className="text-[#6B6B6B]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}