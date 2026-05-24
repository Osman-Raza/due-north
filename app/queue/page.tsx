"use client";

import PhoneFrame from "@/components/PhoneFrame";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, Shield, CheckCircle2 } from "lucide-react";

export default function QueuePage() {
  const router = useRouter();
  const [queuePosition, setQueuePosition] = useState(3);
  const [stage, setStage] = useState<"connecting" | "queued" | "matched">("connecting");
  const [secondsWaited, setSecondsWaited] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("queued"), 1500);
    const t2 = setTimeout(() => setQueuePosition(2), 3500);
    const t3 = setTimeout(() => setQueuePosition(1), 5500);
    const t4 = setTimeout(() => setStage("matched"), 7500);
    const t5 = setTimeout(() => router.push("/advisor?human=true"), 9500);

    const interval = setInterval(() => setSecondsWaited((s) => s + 1), 1000);

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-4 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.push("/analysis")}>
            <ChevronLeft size={24} />
          </button>
          <div className="font-display text-lg font-semibold">Connecting to advisor</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {stage === "connecting" && (
            <div className="text-center fade-up">
              <div className="w-20 h-20 rounded-full border-4 border-stone-200 border-t-scotia-red animate-spin mx-auto mb-6"></div>
              <div className="font-display text-xl font-semibold mb-2">Finding an advisor...</div>
              <div className="text-sm text-stone-500">Matching you with the right person</div>
            </div>
          )}

          {stage === "queued" && (
            <div className="text-center fade-up w-full">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-amber-100 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-4xl font-bold text-amber-700">
                    {queuePosition}
                  </div>
                </div>
              </div>
              <div className="font-display text-xl font-semibold mb-1">
                You&apos;re #{queuePosition} in queue
              </div>
              <div className="text-sm text-stone-500 mb-6">
                Estimated wait: under 1 min
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 text-left mb-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
                  While you wait
                </div>
                <div className="text-sm text-stone-700 leading-relaxed">
                  Your advisor will see your Due North verdict, your Scotia account info, and the original advice you flagged. No need to repeat anything.
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                <Shield size={10} />
                <span>All advisors are CIRO-licensed Scotia employees</span>
              </div>
            </div>
          )}

          {stage === "matched" && (
            <div className="text-center fade-up">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 fade-up">
                <CheckCircle2 size={36} className="text-green-600" />
              </div>
              <div className="font-display text-xl font-semibold mb-2">Matched with Priya!</div>
              <div className="text-sm text-stone-500 mb-4">
                Priya Sharma · CIRO Licensed Advisor
              </div>
              <div className="text-xs text-stone-500">Connecting...</div>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-stone-400 pb-2">
          Wait time: {secondsWaited}s
        </div>
      </div>
    </PhoneFrame>
  );
}