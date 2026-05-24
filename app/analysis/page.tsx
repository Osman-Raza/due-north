"use client";

import PhoneFrame from "@/components/PhoneFrame";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, AlertTriangle, CheckCircle2, XCircle, Zap, PieChart, TrendingUp, ArrowRight, MessageCircle, Shield } from "lucide-react";

type Recommendation = {
  productId: string;
  productName: string;
  reason: string;
};

type AnalysisResult = {
  verdict: "legit" | "mostly_legit" | "misleading" | "false";
  summary: string;
  explanation: string;
  whyItMatters: string;
  recommendations: Recommendation[];
};

const verdictStyles = {
  legit: {
    label: "Solid Advice",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
    icon: CheckCircle2,
    iconColor: "text-green-700",
  },
  mostly_legit: {
    label: "Mostly Right",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    icon: CheckCircle2,
    iconColor: "text-emerald-700",
  },
  misleading: {
    label: "Mostly Misleading",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    icon: AlertTriangle,
    iconColor: "text-amber-700",
  },
  false: {
    label: "False",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    icon: XCircle,
    iconColor: "text-red-700",
  },
};

export default function AnalysisPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const advice = sessionStorage.getItem("compass_advice");
    const image = sessionStorage.getItem("compass_image");

    if (!advice && !image) {
      router.push("/compass");
      return;
    }

    const cached = sessionStorage.getItem("compass_result");
    if (cached) {
      setResult(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ advice, image }),
    })
      .then(async (r) => {
        if (!r.ok) {
          const e = await r.json();
          throw new Error(e.error || "Analysis failed");
        }
        return r.json();
      })
      .then((data: AnalysisResult) => {
        setResult(data);
        sessionStorage.setItem("compass_result", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <PhoneFrame>
        <div className="px-5 pt-3 pb-4 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => router.push("/compass")}>
              <ChevronLeft size={24} />
            </button>
            <div className="font-display text-lg">Due North Verdict</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#E8E8E8] border-t-[#EC111A] animate-spin mb-4"></div>
            <div className="font-display text-lg">Analyzing...</div>
            <div className="text-xs text-[#6B6B6B] mt-2 text-center px-8">
              Cross-checking against Scotia research and your account profile
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (error || !result) {
    return (
      <PhoneFrame>
        <div className="px-5 pt-3 pb-4 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => router.push("/compass")}>
              <ChevronLeft size={24} />
            </button>
            <div className="font-display text-lg">Error</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <XCircle size={40} className="text-red-500 mb-3" />
            <div className="text-sm text-[#231F20] mb-4">{error || "Something went wrong."}</div>
            <button
              onClick={() => router.push("/compass")}
              className="text-white px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#EC111A" }}
            >
              Try again
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const style = verdictStyles[result.verdict];
  const Icon = style.icon;

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-4 h-full overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push("/compass")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg">Due North Verdict</div>
        </div>

        <div className={`fade-up rounded-2xl p-4 mb-4 ${style.bg} ${style.border} border`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className={style.iconColor} />
            <span className={`font-semibold text-sm ${style.text}`}>{style.label}</span>
          </div>
          <p className={`text-sm leading-relaxed font-semibold mb-2 ${style.text}`}>
            {result.summary}
          </p>
          <p className={`text-sm leading-relaxed ${style.text}`}>
            {result.explanation}
          </p>
        </div>

        <div className="fade-up mb-4" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mb-2">
            Personalized using your Scotia data
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F5F5F5] rounded-xl p-3">
                <div className="text-xs text-[#6B6B6B] mb-1">Your income</div>
                <div className="text-sm font-bold text-[#231F20]">$58,000</div>
                <div className="text-xs text-[#6B6B6B]">tax bracket: 20.5%</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-3">
                <div className="text-xs text-[#6B6B6B] mb-1">TFSA room</div>
                <div className="text-sm font-bold text-green-600">$12,400</div>
                <div className="text-xs text-[#6B6B6B]">unused · earning 0%</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-3">
                <div className="text-xs text-[#6B6B6B] mb-1">FHSA room</div>
                <div className="text-sm font-bold text-green-600">$8,000</div>
                <div className="text-xs text-[#6B6B6B]">home buyer eligible</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-3">
                <div className="text-xs text-[#6B6B6B] mb-1">Chequing idle</div>
                <div className="text-sm font-bold text-amber-600">$3,847</div>
                <div className="text-xs text-[#6B6B6B]">could be working harder</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#6B6B6B]">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Live from your Scotia accounts
            </div>
          </div>
        </div>

        <div className="fade-up mb-4" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mb-2">
            Why this matters for you
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} style={{ color: "#EC111A" }} />
              <span className="text-sm font-semibold text-[#231F20]">Your situation</span>
            </div>
            <p className="text-sm text-[#231F20] leading-relaxed">{result.whyItMatters}</p>
          </div>
        </div>

        {result.recommendations && result.recommendations.length > 0 && (
          <div className="fade-up mb-4" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mb-2">
              Suggested for you
            </div>
            <div className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EC111A" }}>
                    {i === 0 ? (
                      <PieChart size={18} className="text-white" />
                    ) : (
                      <TrendingUp size={18} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#231F20] mb-1">{rec.productName}</div>
                    <div className="text-xs text-[#6B6B6B] leading-relaxed">{rec.reason}</div>
                  </div>
                  <ArrowRight size={16} className="text-[#6B6B6B] flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="fade-up space-y-2" style={{ animationDelay: "0.9s", opacity: 0 }}>
          <button
            onClick={() => router.push("/advisor")}
            className="w-full rounded-2xl p-4 flex items-center gap-3 text-left bg-[#231F20]"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#3a3a3a] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#231F20]"></div>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Chat with Due North AI</div>
              <div className="text-[#6B6B6B] text-xs">Instant · Free · Always available</div>
            </div>
            <MessageCircle size={18} className="text-white" />
          </button>

          <button
            onClick={() => router.push("/queue")}
            className="w-full rounded-2xl p-4 flex items-center gap-3 text-left bg-white shadow-sm"
            style={{ border: "2px solid #EC111A" }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EC111A" }}>
                <span className="text-white text-sm font-semibold">P</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: "#EC111A" }}>Talk to a real human</div>
              <div className="text-[#6B6B6B] text-xs">Priya is online · free for clients under 34</div>
            </div>
            <ArrowRight size={18} style={{ color: "#EC111A" }} />
          </button>
        </div>

        <div className="mt-4 mb-4 flex items-center gap-2 text-xs text-[#6B6B6B] justify-center">
          <Shield size={10} />
          <span>Verified against Scotia research · CIRO-aligned</span>
        </div>
      </div>
    </PhoneFrame>
  );
}