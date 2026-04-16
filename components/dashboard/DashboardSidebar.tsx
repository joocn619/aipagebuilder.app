"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(auth)/actions";
import {
  LayoutDashboard, FileText, Layers, MessageSquare, BarChart3,
  Users, MessageCircle, Settings, CreditCard, LogOut, Zap,
  ChevronDown, Bell, Search, Globe, Sparkles, X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pages", href: "/pages", icon: FileText, badge: null },
  { label: "Templates", href: "/templates", icon: Layers },
  { label: "Popups", href: "/popups", icon: MessageSquare },
  { label: "Funnels", href: "/funnels", icon: Zap },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Comments", href: "/comments", icon: MessageCircle, badge: 2 },
];

const SETTINGS_ITEMS = [
  { label: "Profile", href: "/settings/profile", icon: Settings },
  { label: "Billing", href: "/settings/billing", icon: CreditCard },
  { label: "Team", href: "/settings/team", icon: Users },
  { label: "Integrations", href: "/settings/integrations", icon: Globe },
  { label: "Domains", href: "/settings/domains", icon: Globe },
];

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ mobileOpen = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(
    SETTINGS_ITEMS.some((i) => pathname.startsWith(i.href))
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-white/5 bg-[#0d0d18]",
        // Desktop: always visible, static
        "md:relative md:translate-x-0",
        // Mobile: fixed overlay, slides in/out
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:transition-none",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo + Workspace */}
      <div className="flex h-14 items-center justify-between border-b border-white/5 px-4">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={handleNavClick}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-white text-sm">AIPageBuilder</span>
        </Link>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 rounded-md p-1.5 text-white/40 hover:bg-white/5 hover:text-white transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-md p-1.5 text-white/40 hover:bg-white/5 hover:text-white transition-colors md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1">
        <button className="flex w-full items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-white/30 hover:border-white/10 hover:text-white/50 transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span>Search...</span>
          <span className="ml-auto rounded border border-white/10 px-1 py-0.5 text-[10px]">⌘K</span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-violet-500/15 text-white font-medium"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", active ? "text-violet-400" : "text-white/40 group-hover:text-white/70")} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge className="h-4 min-w-4 px-1 text-[10px] bg-violet-500 text-white border-0">
                    {item.badge}
                  </Badge>
                )}
                {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />}
              </Link>
            );
          })}
        </div>

        {/* Settings group */}
        <div className="mt-4">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
          >
            Settings
            <ChevronDown className={cn("ml-auto h-3 w-3 transition-transform", settingsOpen ? "rotate-180" : "")} />
          </button>

          {settingsOpen && (
            <div className="mt-0.5 space-y-0.5">
              {SETTINGS_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                      active
                        ? "bg-violet-500/15 text-white font-medium"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-violet-400" : "text-white/40 group-hover:text-white/70")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User + Signout */}
      <div className="border-t border-white/5 p-3 space-y-1">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white text-xs font-bold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">My Workspace</p>
            <p className="text-[10px] text-white/30 truncate">Pro Plan</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
