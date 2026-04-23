"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Menu, Search, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a14]">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Desktop topbar */}
        <header className="hidden md:flex h-14 shrink-0 items-center gap-4 border-b border-white/5 bg-[#0d0d18] px-6">
          {/* Search */}
          <div className="flex flex-1 items-center gap-2 max-w-xs rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs text-white/30 hover:border-white/10 hover:text-white/50 transition-colors cursor-pointer">
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1">Search pages, templates…</span>
            <span className="rounded border border-white/10 px-1 py-0.5 text-[10px] leading-none">⌘K</span>
          </div>

          <div className="flex-1" />

          {/* Credits badge */}
          <div className="flex items-center gap-1.5 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">2,450</span>
            <span className="text-xs text-violet-400/60">credits</span>
          </div>

          {/* Plan badge */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-white/60">Pro</span>
          </div>

          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity">
            U
          </div>
        </header>

        {/* Mobile topbar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/5 bg-[#0d0d18] px-4 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-blue-600">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold text-white text-sm">AIPageBuilder</span>
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 rounded-xl border border-violet-500/20 bg-violet-500/10 px-2.5 py-1.5">
            <Zap className="h-3 w-3 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">2,450</span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white text-[10px] font-bold">
            U
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
