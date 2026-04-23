"use client";

import Link from "next/link";
import {
  FileText, Layers, Zap, BarChart3, Users, MessageCircle,
  MessageSquare, Globe, FlaskConical, Sparkles, CreditCard,
  ArrowRight, TrendingUp, Eye, Plus,
} from "lucide-react";

const STATS = [
  { label: "Total Pages", value: "12", sub: "+3 this week", icon: FileText, color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  { label: "Published", value: "8", sub: "4 drafts", icon: TrendingUp, color: "#059669", bg: "rgba(5,150,105,0.12)" },
  { label: "Total Funnels", value: "3", sub: "2 active", icon: Zap, color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  { label: "Total Views", value: "3,842", sub: "+18% last month", icon: Eye, color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
];

const TOOLS_CORE = [
  { label: "Pages", desc: "Build landing pages visually", icon: FileText, href: "/pages", color: "#7c3aed" },
  { label: "Funnels", desc: "Multi-step conversion funnels", icon: Zap, href: "/funnels", color: "#d97706" },
  { label: "Templates", desc: "18 professionally designed templates", icon: Layers, href: "/templates", color: "#0891b2" },
];

const TOOLS_READY = [
  { label: "Analytics", desc: "Track visitors & conversions", icon: BarChart3, href: "/analytics", color: "#7c3aed" },
  { label: "Leads", desc: "Capture & manage contacts", icon: Users, href: "/leads", color: "#059669" },
  { label: "Popups", desc: "Exit-intent & timed overlays", icon: MessageSquare, href: "/popups", color: "#e11d48" },
  { label: "Comments", desc: "Team review & feedback", icon: MessageCircle, href: "/comments", color: "#0891b2", badge: 2 },
];

const TOOLS_SOON = [
  { label: "A/B Testing", desc: "Split test variants automatically", icon: FlaskConical, color: "#7c3aed" },
  { label: "Personalization", desc: "Dynamic content per visitor", icon: Sparkles, color: "#059669" },
  { label: "White Label", desc: "Brand the builder as your own", icon: Globe, color: "#d97706" },
  { label: "Integrations", desc: "Connect 100+ tools via Zapier", icon: CreditCard, color: "#2563eb", href: "/settings/integrations" },
];

const RECENT_PAGES = [
  { id: "p1", title: "Homepage", slug: "home", status: "published", views: 1842, ago: "2h ago" },
  { id: "p2", title: "Pricing Page", slug: "pricing", status: "published", views: 967, ago: "1d ago" },
  { id: "p3", title: "Free Trial Landing", slug: "trial", status: "draft", views: 0, ago: "2d ago" },
  { id: "p4", title: "Agency Services", slug: "services", status: "published", views: 543, ago: "3d ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-sm text-white/40 mt-0.5">Here&apos;s what&apos;s happening with your pages</p>
        </div>
        <Link href="/pages/new"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}>
          <Plus className="h-4 w-4" />
          Create Page
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{s.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: s.bg }}>
                  <Icon className="h-4 w-4" style={{ color: s.color }} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white tabular-nums">{s.value}</p>
                <p className="text-xs text-white/30 mt-1">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ALL TOOLS */}
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/20">All Tools</p>

        {/* CORE */}
        <div className="mb-1 mt-3 flex items-center gap-2">
          <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">Core</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TOOLS_CORE.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.label} href={t.href}
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-white/10 hover:bg-white/[0.06] hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: t.color + "20" }}>
                  <Icon className="h-5 w-5" style={{ color: t.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{t.label}</p>
                  <p className="text-xs text-white/35 mt-0.5 truncate">{t.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50" />
              </Link>
            );
          })}
        </div>

        {/* READY */}
        <div className="mb-1 mt-5 flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Ready</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS_READY.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.label} href={t.href}
                className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-white/10 hover:bg-white/[0.06] hover:-translate-y-0.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: t.color + "20" }}>
                  <Icon className="h-4 w-4" style={{ color: t.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white">{t.label}</p>
                    {t.badge && (
                      <span className="rounded-full bg-violet-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">{t.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/35 mt-0.5 truncate">{t.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* COMING SOON */}
        <div className="mb-1 mt-5 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/30">Coming Soon</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS_SOON.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.015] p-4 opacity-50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: t.color + "15" }}>
                  <Icon className="h-4 w-4" style={{ color: t.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/60">{t.label}</p>
                  <p className="text-xs text-white/25 mt-0.5 truncate">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent pages */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/20">Recent Pages</p>
          <Link href="/pages" className="text-xs text-white/30 hover:text-white/60 transition-colors">View all →</Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]">
          {RECENT_PAGES.map((page, i) => (
            <div key={page.id}
              className={`flex items-center justify-between px-5 py-3.5 ${i < RECENT_PAGES.length - 1 ? "border-b border-white/5" : ""}`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-white/40">
                  {page.title[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{page.title}</p>
                  <p className="text-xs text-white/30">/{page.slug} · {page.ago}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 shrink-0">
                <span className="hidden text-xs text-white/25 sm:block">{page.views.toLocaleString()} views</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${page.status === "published" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-white/30"}`}>
                  {page.status}
                </span>
                <Link href={`/editor/${page.id}`}
                  className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white/50 hover:border-white/20 hover:text-white transition-colors">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg,#1e1040 0%,#0f172a 50%,#1a1040 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #7c3aed44, transparent 60%), radial-gradient(circle at 70% 50%, #4f46e544, transparent 60%)" }} />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">Get Started</p>
          <h2 className="text-2xl font-extrabold text-white mb-2">Ready to build your first page?</h2>
          <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
            Pick a template or start from scratch. Publish in minutes, no code needed.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/pages/new"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
              <Plus className="h-4 w-4" />
              Create New Page
            </Link>
            <Link href="/templates"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-semibold text-white/70 hover:border-white/20 hover:text-white transition-all">
              Browse Templates
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
