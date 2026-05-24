"use client";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { ChevronLeft, TrendingUp, Flame, ArrowRight, ExternalLink } from "lucide-react";

const trendingItems = [
  {
    rank: 1,
    ticker: "NVDA",
    name: "NVIDIA Corp",
    mentions: "142K mentions",
    sentiment: "bullish",
    sentimentPct: 78,
    source: "Reddit · TikTok · X",
    change: "+4.2%",
    snippet: "\"NVDA to the moon, AI is eating the world 🚀\"",
  },
  {
    rank: 2,
    ticker: "VFV",
    name: "Vanguard S&P 500 ETF",
    mentions: "89K mentions",
    sentiment: "bullish",
    sentimentPct: 92,
    source: "Reddit · YouTube",
    change: "+0.8%",
    snippet: "\"Just DCA into VFV and forget about it for 30 years\"",
  },
  {
    rank: 3,
    ticker: "GME",
    name: "GameStop Corp",
    mentions: "67K mentions",
    sentiment: "mixed",
    sentimentPct: 51,
    source: "Reddit · TikTok",
    change: "-2.1%",
    snippet: "\"Diamond hands forever 💎🙌 or is this cope?\"",
  },
  {
    rank: 4,
    ticker: "BTC",
    name: "Bitcoin",
    mentions: "201K mentions",
    sentiment: "bullish",
    sentimentPct: 71,
    source: "TikTok · X · YouTube",
    change: "+1.9%",
    snippet: "\"Bitcoin to 200K by end of year, trust me bro\"",
  },
  {
    rank: 5,
    ticker: "XEQT",
    name: "iShares All-Equity ETF",
    mentions: "34K mentions",
    sentiment: "bullish",
    sentimentPct: 95,
    source: "Reddit · YouTube",
    change: "+0.5%",
    snippet: "\"The only ETF you'll ever need in your TFSA\"",
  },
  {
    rank: 6,
    ticker: "TSLA",
    name: "Tesla Inc",
    mentions: "156K mentions",
    sentiment: "mixed",
    sentimentPct: 48,
    source: "TikTok · X · Reddit",
    change: "-3.4%",
    snippet: "\"TSLA is either going to 500 or 50, no in between\"",
  },
];

const sentimentColor = (s: string) => {
  if (s === "bullish") return "text-green-600 bg-green-50";
  if (s === "bearish") return "text-red-600 bg-red-50";
  return "text-amber-600 bg-amber-50";
};

export default function TrendingPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-20 h-full overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push("/")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg font-semibold">Trending on FinTok</div>
        </div>

        <div className="rounded-2xl p-4 mb-5 bg-gradient-to-br from-stone-900 to-rose-900 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-orange-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-orange-400">
              Live Social Pulse
            </span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            What young Canadians are talking about on TikTok, Reddit, and X right now. Tap any stock to fact-check the hype with Due North.
          </p>
        </div>

        <div className="space-y-3">
          {trendingItems.map((item) => (
            <button
              key={item.ticker}
              onClick={() => {
                sessionStorage.setItem("compass_advice", item.snippet);
                sessionStorage.removeItem("compass_result");
                sessionStorage.removeItem("compass_image");
                router.push("/analysis");
              }}
              className="w-full text-left bg-white border border-stone-200 rounded-2xl p-4 hover:border-stone-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-stone-700">
                      #{item.rank}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.ticker}</span>
                      <span className={`text-xs font-semibold ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                        {item.change}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500">{item.name}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${sentimentColor(item.sentiment)}`}>
                  {item.sentimentPct}% {item.sentiment}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 mb-2">
                <p className="text-xs text-stone-600 italic leading-relaxed">{item.snippet}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <TrendingUp size={10} />
                  <span>{item.mentions}</span>
                  <span>·</span>
                  <span>{item.source}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-scotia-red font-semibold">
                  Fact-check <ArrowRight size={12} />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>⚠️ Social media sentiment is not investment advice.</strong> These trends show what people are talking about, not what you should buy. Tap any stock to have Due North fact-check the claims using your real Scotia data.
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}