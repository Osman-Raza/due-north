"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const showHomeButton = pathname !== "/";

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="relative w-[380px] h-[780px] bg-black rounded-[44px] p-2 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>
        <div className="w-full h-full bg-white rounded-[38px] overflow-hidden relative flex flex-col">
          <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold flex-shrink-0">
            <span>9:41</span>
            <span className="flex gap-1 items-center">
              <span>●●●●</span>
              <span className="ml-1">100%</span>
            </span>
          </div>
          <div className="flex-1 overflow-hidden">{children}</div>
          {showHomeButton && (
            <button
              onClick={() => router.push("/")}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black shadow-lg flex items-center justify-center z-50"
            >
              <Home size={18} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}