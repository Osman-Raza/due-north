"use client";

import PhoneFrame from "@/components/PhoneFrame";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, Image as ImageIcon, Mic } from "lucide-react";
import { useState } from "react";

const EXAMPLE_ADVICE =
  "RRSPs are a SCAM 🚨 the government just wants to tax you later. Just throw it all into Bitcoin or NVDA. Trust me bro, I made 40% last year.";

export default function CompassPage() {
  const router = useRouter();
  const [advice, setAdvice] = useState(EXAMPLE_ADVICE);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      sessionStorage.setItem("compass_advice", advice);
      sessionStorage.removeItem("compass_result");
      router.push("/analysis");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-4 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.push("/")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg font-semibold">Check Advice</div>
        </div>

        <div className="bg-stone-50 rounded-3xl p-4 mb-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">
            What you saw
          </div>
          <div className="bg-black rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              <div className="text-white text-xs font-semibold">@finance_bro_27</div>
            </div>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full bg-transparent text-white text-sm leading-relaxed resize-none focus:outline-none min-h-[100px]"
              placeholder="Paste the advice here..."
            />
            <div className="text-stone-400 text-xs mt-2">2.3M views · 89K likes</div>
          </div>
          <div className="text-xs text-stone-500 leading-relaxed">
            Compass will fact-check this against Scotia&apos;s research, your financial profile, and CIRO-licensed sources.
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <button className="flex-1 border border-stone-200 rounded-2xl py-3 text-sm font-medium flex items-center justify-center gap-2">
            <ImageIcon size={14} /> Screenshot
          </button>
          <button className="flex-1 border border-stone-200 rounded-2xl py-3 text-sm font-medium flex items-center justify-center gap-2">
            <Mic size={14} /> Voice
          </button>
        </div>

        <button
          onClick={analyze}
          disabled={loading || !advice.trim()}
          className="w-full bg-scotia-red text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles size={16} />
          {loading ? "Analyzing..." : "Analyze with Compass"}
        </button>
      </div>
    </PhoneFrame>
  );
}
