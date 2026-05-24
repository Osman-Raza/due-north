"use client";

import { Home, Compass, PieChart, Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "compass", label: "Compass", icon: Compass, path: "/compass" },
    { id: "cohort", label: "Cohort", icon: Users, path: "/cohort" },
    { id: "invest", label: "Invest", icon: PieChart, path: "/sprint" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex justify-around py-2 z-40">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.path;
        return (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center gap-0.5 py-1 px-3"
          >
            <Icon
              size={20}
              className={active ? "text-scotia-red" : "text-stone-400"}
            />
            <span
              className={`text-[10px] ${active ? "text-scotia-red font-semibold" : "text-stone-400"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
