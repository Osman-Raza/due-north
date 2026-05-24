"use client";

import PhoneFrame from "@/components/PhoneFrame";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, Image as ImageIcon, X } from "lucide-react";
import { useState, useRef } from "react";

const EXAMPLE_ADVICE =
  "RRSPs are a SCAM 🚨 the government just wants to tax you later. Just throw it all into Bitcoin or NVDA. Trust me bro, I made 40% last year.";

export default function CompassPage() {
  const router = useRouter();
  const [advice, setAdvice] = useState(EXAMPLE_ADVICE);
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageData(result);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageData(null);
    setImageName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const analyze = () => {
    setLoading(true);
    sessionStorage.setItem("compass_advice", advice);
    if (imageData) {
      sessionStorage.setItem("compass_image", imageData);
    } else {
      sessionStorage.removeItem("compass_image");
    }
    sessionStorage.removeItem("compass_result");
    router.push("/analysis");
  };

  const canAnalyze = (advice.trim().length > 0 || imageData) && !loading;

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

          {imageData ? (
            <div className="relative mb-3">
              <img
                src={imageData}
                alt="Uploaded screenshot"
                className="w-full rounded-2xl border border-stone-200"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center"
              >
                <X size={16} className="text-white" />
              </button>
              <div className="text-xs text-stone-500 mt-2 truncate">📎 {imageName}</div>
            </div>
          ) : (
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
          )}

          <div className="text-xs text-stone-500 leading-relaxed">
            Due North will fact-check this against Scotia&apos;s research, your financial profile, and CIRO-licensed sources.
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-stone-200 rounded-2xl py-3 text-sm font-medium flex items-center justify-center gap-2 mb-3"
        >
          <ImageIcon size={14} />
          {imageData ? "Replace screenshot" : "Upload screenshot"}
        </button>

        <button
          onClick={analyze}
          disabled={!canAnalyze}
          className="w-full bg-scotia-red text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles size={16} />
          {loading ? "Analyzing..." : "Analyze with Due North"}
        </button>
      </div>
    </PhoneFrame>
  );
}