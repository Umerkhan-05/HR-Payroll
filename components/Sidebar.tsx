"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Wallet, Settings, Zap } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/payroll", label: "Payroll", icon: Wallet },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-400/10 border border-cyan-400/30">
          <Zap className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-wide text-white">NEVZORA</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">HR &amp; Payroll</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150",
                active
                  ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 shadow-neon"
                  : "text-white/60 border border-transparent hover:bg-white/5 hover:text-white hover:border-white/10",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[11px] text-white/30">Nevzora Systems © 2026</p>
      </div>
    </aside>
  );
}
