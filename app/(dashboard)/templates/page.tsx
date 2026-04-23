"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TEMPLATE_DATA } from "@/lib/constants/templates";

const CATEGORIES = ["All", "SaaS", "Agency", "E-commerce", "Health", "Education", "Local Business", "Finance", "Creator"];

const DESCRIPTIONS: Record<string, string> = {
  "saas-1": "Hero, feature highlights, social proof, pricing teaser, and CTA — optimized for SaaS signups",
  "saas-2": "Pricing table, feature comparison, FAQ, testimonials, and money-back guarantee section",
  "saas-3": "Coming soon hero, waitlist signup form, benefit preview, and early-access countdown",
  "saas-4": "Technical hero, code snippet showcase, API docs preview, GitHub integration, and dev-focused CTA",
  "saas-5": "Extension preview hero, install steps, feature demo, ratings, and Web Store CTA",
  "saas-6": "API overview, code examples, SDK cards, rate limits, and developer signup flow",
  "agency-1": "Portfolio showcase, team intro, services grid, client logos, and project inquiry form",
  "agency-2": "Results-driven hero, case studies, service packages, ROI stats, and consultation CTA",
  "agency-3": "Visual portfolio hero, design process steps, client work gallery, and project brief form",
  "agency-4": "Personal brand hero, skills showcase, project case studies, testimonials, and hire CTA",
  "agency-5": "Showreel hero, production packages, client roster, behind-the-scenes, and booking CTA",
  "ecom-1": "Launch countdown, product feature hero, early bird offer, waitlist, and launch announcement",
  "ecom-2": "Urgency hero with timer, discounted products grid, flash deal highlights, and cart CTA",
  "ecom-3": "App preview hero, feature list, pricing plans, reviews, and App Store install CTA",
  "ecom-4": "Product hero with 3D mockup, benefits, reviews, shipping info, and buy now CTA",
  "ecom-5": "Unboxing hero, monthly curation preview, subscription tiers, and gifting options",
  "health-1": "Transformation hero, coaching packages, client results, schedule, and free consultation CTA",
  "health-2": "Course overview hero, curriculum breakdown, instructor bio, student wins, and enroll CTA",
  "health-3": "Product benefits hero, ingredient breakdown, clinical studies, reviews, and subscribe & save",
  "health-4": "Studio atmosphere hero, class schedule, instructors, membership plans, and trial class CTA",
  "edu-1": "Bootcamp outcomes hero, curriculum, mentor profiles, job placement stats, and apply CTA",
  "edu-2": "Book mockup hero, chapter preview, author credibility, reader reviews, and download CTA",
  "edu-3": "Webinar topic hero, speaker bio, agenda, registration form, and replay access section",
  "edu-4": "Transformation story hero, program modules, coach credentials, application form, and testimonials",
  "local-1": "Ambiance hero, menu highlights, reservation form, location map, and opening hours",
  "local-2": "Property search hero, featured listings, agent bio, sold properties, and contact form",
  "local-3": "Trust-building hero, practice areas, attorney profiles, case results, and free consultation form",
  "local-4": "Smile transformation hero, services menu, before/after gallery, booking form, and insurance info",
  "fin-1": "App mockup hero, key features, security badges, pricing, and app store download CTA",
  "fin-2": "ROI-focused hero, solution overview, client logos, case study, and demo booking form",
  "fin-3": "Expertise hero, service packages, team credentials, client portfolio, and strategy call CTA",
  "creator-1": "Newsletter value hero, sample issue preview, subscriber count, and signup form",
  "creator-2": "Show intro hero, episode player, guest highlights, subscribe links, and Patreon CTA",
  "creator-3": "Community vibe hero, member highlights, benefits, upcoming events, and join CTA",
};

const TEMPLATES = TEMPLATE_DATA.map((t) => ({
  id: t.id, name: t.name, category: t.category,
  description: DESCRIPTIONS[t.id] || t.description,
  blocks: t.blocks.length,
  emoji: t.emoji, tags: t.tags, isPro: t.isPro,
}));

const CAT_COLORS: Record<string, string> = {
  SaaS: "bg-violet-500/10 text-violet-600 border-violet-200 dark:text-violet-400 dark:border-violet-800",
  Agency: "bg-blue-500/10 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800",
  "E-commerce": "bg-orange-500/10 text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800",
  Health: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800",
  Education: "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800",
  "Local Business": "bg-pink-500/10 text-pink-600 border-pink-200 dark:text-pink-400 dark:border-pink-800",
  Finance: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:text-cyan-400 dark:border-cyan-800",
  Creator: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-200 dark:text-fuchsia-400 dark:border-fuchsia-800",
};

// ── Preview Components ────────────────────────────────────────

function PreviewSaaSHero() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0f172a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#7c3aed" }} />
          <div className="h-1.5 w-10 rounded-full bg-white/40" />
        </div>
        <div className="flex gap-2 items-center">
          {[6,6,6].map((w,i) => <div key={i} className="h-1.5 rounded-full bg-white/20" style={{ width: w * 3 }} />)}
          <div className="h-5 w-12 rounded-lg" style={{ background: "#7c3aed" }} />
        </div>
      </div>
      <div className="text-center mb-3 px-2">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2 mx-auto" style={{ background: "#7c3aed20", border: "1px solid #7c3aed50" }}>
          <div className="h-1 w-1 rounded-full animate-pulse" style={{ background: "#7c3aed" }} />
          <div className="h-1 w-10 rounded-full" style={{ background: "#7c3aed80" }} />
        </div>
        <div className="h-4 w-32 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-24 rounded mx-auto mb-2 bg-white/60" />
        <div className="h-1.5 w-36 rounded mx-auto mb-1 bg-white/25" />
        <div className="h-1.5 w-28 rounded mx-auto mb-3 bg-white/20" />
        <div className="flex items-center justify-center gap-2">
          <div className="h-6 w-18 rounded-lg" style={{ background: "#7c3aed", boxShadow: "0 4px 12px #7c3aed60" }} />
          <div className="h-6 w-16 rounded-lg border border-white/25" />
        </div>
      </div>
      <div className="flex justify-center gap-3 mb-3 opacity-40">
        {[9,7,11,8,10].map((w,i) => <div key={i} className="h-1 rounded-full bg-white" style={{ width: w * 3 }} />)}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["#7c3aed","#7c3aed","#7c3aed"].map((c,i) => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#1e293b", border: "1px solid #334155" }}>
            <div className="h-4 w-4 rounded-lg mb-1.5" style={{ background: c + "25" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: c + "80" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/50 mb-1" />
            <div className="h-1 w-4/5 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSaaSPricing() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#f8fafc", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#059669" }} />
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>
        <div className="h-5 w-14 rounded-lg" style={{ background: "#059669" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="h-3 w-28 rounded mx-auto mb-1 bg-slate-700" />
        <div className="h-3 w-20 rounded mx-auto mb-2 bg-slate-500" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { c: "#059669", label: "Free", price: "$0", highlight: false },
          { c: "#059669", label: "Pro", price: "$29", highlight: true },
          { c: "#059669", label: "Biz", price: "$79", highlight: false },
        ].map((p, i) => (
          <div key={i} className="rounded-xl p-2" style={{
            background: p.highlight ? "#059669" : "#ffffff",
            border: p.highlight ? "none" : "1px solid #e2e8f0",
            boxShadow: p.highlight ? "0 6px 20px #05966940" : undefined,
          }}>
            <div className="h-1.5 w-8 rounded mb-1" style={{ background: p.highlight ? "rgba(255,255,255,0.6)" : "#94a3b8" }} />
            <div className="h-3 w-7 rounded mb-2" style={{ background: p.highlight ? "#fff" : "#059669" }} />
            {[0,1,2,3].map(j => (
              <div key={j} className="flex items-center gap-1 mb-0.5">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: p.highlight ? "rgba(255,255,255,0.7)" : "#059669" }} />
                <div className="h-1 flex-1 rounded" style={{ background: p.highlight ? "rgba(255,255,255,0.4)" : "#e2e8f0" }} />
              </div>
            ))}
            <div className="h-4 w-full rounded-lg mt-1.5" style={{ background: p.highlight ? "rgba(255,255,255,0.25)" : "#059669" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSaaSWaitlist() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0c0a09", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#f59e0b" }} />
          <div className="h-1.5 w-12 rounded-full bg-white/30" />
        </div>
        <div className="h-5 w-16 rounded-lg" style={{ background: "#f59e0b" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#f59e0b20", border: "1px solid #f59e0b50" }}>
          <div className="h-1 w-1 rounded-full animate-pulse" style={{ background: "#f59e0b" }} />
          <div className="h-1 w-14 rounded-full" style={{ background: "#f59e0b70" }} />
        </div>
        <div className="h-4 w-32 rounded mx-auto mb-1" style={{ background: "#fef3c7" }} />
        <div className="h-4 w-24 rounded mx-auto mb-2" style={{ background: "#fde68a" }} />
        <div className="h-1.5 w-36 rounded mx-auto mb-3 bg-white/20" />
        <div className="h-6 w-28 rounded-lg mx-auto" style={{ background: "#f59e0b", boxShadow: "0 4px 16px #f59e0b50" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2.5" style={{ background: "#1c1917" }}>
        {["12","05","38","22"].map((v,i) => (
          <div key={i} className="rounded-lg py-1.5 text-center" style={{ background: "#292524" }}>
            <div className="h-3 w-5 rounded mx-auto mb-0.5" style={{ background: "#f59e0b" }} />
            <div className="h-1 w-4 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#1c1917", border: "1px solid #292524" }}>
            <div className="h-4 w-4 rounded-lg mb-1.5" style={{ background: "#f59e0b20" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: "#f59e0b80" }} />
            </div>
            <div className="h-1.5 w-full rounded mb-1" style={{ background: "rgba(254,243,199,0.5)" }} />
            <div className="h-1 w-4/5 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewDevTool() {
  return (
    <div className="h-full w-full overflow-hidden font-mono" style={{ background: "#0a0a0a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#22c55e" }} />
          <div className="h-1.5 w-8 rounded bg-white/30" />
        </div>
        <div className="flex gap-2 items-center">
          {[0,1,2].map(i => <div key={i} className="h-1.5 w-6 rounded bg-white/15" />)}
          <div className="h-5 w-20 rounded" style={{ background: "#22c55e20", border: "1px solid #22c55e60" }}>
            <div className="h-1 w-14 rounded m-1.5" style={{ background: "#22c55e80" }} />
          </div>
        </div>
      </div>
      <div className="mb-2 px-1">
        <div className="h-1.5 w-24 rounded mb-2" style={{ background: "#22c55e30", border: "1px solid #22c55e50" }} />
        <div className="h-4 w-36 rounded mb-1 bg-white/80" />
        <div className="h-4 w-28 rounded mb-2.5 bg-white/60" />
        <div className="flex gap-1.5">
          <div className="h-6 w-20 rounded" style={{ background: "#22c55e", boxShadow: "0 4px 12px #22c55e40" }} />
          <div className="h-6 w-20 rounded" style={{ background: "#22c55e15", border: "1px solid #22c55e50" }}>
            <div className="h-1 w-12 rounded m-2.5" style={{ background: "#22c55e80" }} />
          </div>
        </div>
      </div>
      {/* terminal block */}
      <div className="rounded-xl p-2 mb-2" style={{ background: "#111111", border: "1px solid #1f2937" }}>
        <div className="flex gap-1 mb-1.5">
          {["#ef4444","#f59e0b","#22c55e"].map((c,i) => <div key={i} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
        </div>
        {["$ npm install -g devkit","✓ Installed devkit@2.0","$ devkit init","✓ Project configured","$ devkit deploy","✓ Live at myapp.dev"].map((line,i) => (
          <div key={i} className="flex items-center gap-1 mb-0.5">
            <div className="h-1 rounded" style={{ background: i % 2 === 0 ? "#22c55e" : "#4ade80", width: line.length * 2.2 }} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => <div key={i} className="h-6 rounded" style={{ background: "#111111", border: "1px solid #1f2937" }} />)}
      </div>
    </div>
  );
}

function PreviewChromeExtension() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#1e1b4b", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full" style={{ background: "#4f46e5" }} />
          <div className="h-1.5 w-10 rounded bg-white/40" />
        </div>
        <div className="h-5 w-20 rounded-lg" style={{ background: "#4f46e5", boxShadow: "0 4px 12px #4f46e540" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#f59e0b20", border: "1px solid #f59e0b50" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="h-1 w-16 rounded" style={{ background: "#f59e0b70" }} />
        </div>
        <div className="h-4 w-28 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-22 rounded mx-auto mb-2 bg-white/60" />
        <div className="h-1.5 w-36 rounded mx-auto mb-1 bg-white/20" />
        <div className="h-1.5 w-30 rounded mx-auto mb-3 bg-white/15" />
        <div className="h-6 w-28 rounded-xl mx-auto" style={{ background: "#4f46e5", boxShadow: "0 4px 16px #4f46e560" }} />
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {[
          { label: "14k+ Users", sub: "Active" },
          { label: "4.9/5", sub: "Stars" },
        ].map((s,i) => (
          <div key={i} className="rounded-xl p-2 text-center" style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)" }}>
            <div className="h-3 w-10 rounded mx-auto mb-1" style={{ background: "#e0e7ff" }} />
            <div className="h-1 w-6 rounded mx-auto bg-white/30" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.2)" }}>
            <div className="h-3 w-3 rounded-lg mb-1" style={{ background: "#4f46e530" }}>
              <div className="h-1.5 w-1.5 rounded m-0.5" style={{ background: "#4f46e5" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/40 mb-0.5" />
            <div className="h-1 w-3/4 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewAPIProduct() {
  return (
    <div className="h-full w-full overflow-hidden font-mono" style={{ background: "#020617", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#06b6d4" }} />
          <div className="h-1.5 w-12 rounded bg-white/30" />
        </div>
        <div className="flex gap-2">
          {[0,1,1,1].map((w,i) => <div key={i} className="h-1.5 w-6 rounded bg-white/15" />)}
          <div className="h-5 w-14 rounded" style={{ background: "#06b6d4" }} />
        </div>
      </div>
      <div className="mb-2 px-1">
        <div className="inline-flex items-center gap-1 rounded px-2 py-0.5 mb-2" style={{ background: "#06b6d415", border: "1px solid #06b6d440" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#06b6d4" }} />
          <div className="h-1 w-14 rounded" style={{ background: "#06b6d470" }} />
        </div>
        <div className="h-4 w-32 rounded mb-1 bg-white/80" />
        <div className="h-4 w-24 rounded mb-2 bg-white/50" />
        <div className="flex gap-1.5">
          <div className="h-6 w-20 rounded" style={{ background: "#06b6d4", boxShadow: "0 4px 12px #06b6d440" }} />
          <div className="h-6 w-18 rounded" style={{ background: "#06b6d415", border: "1px solid #06b6d440" }} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 mb-2">
        {["5B+","99.9","28ms","8k+"].map((v,i) => (
          <div key={i} className="rounded-xl p-1.5 text-center" style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
            <div className="h-2.5 w-7 rounded mx-auto mb-0.5" style={{ background: "#06b6d4" }} />
            <div className="h-1 w-5 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="rounded-xl p-2" style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
        {[
          { m: "POST", c: "#06b6d4", label: "/auth/login" },
          { m: "GET",  c: "#22c55e", label: "/users/{id}" },
          { m: "POST", c: "#06b6d4", label: "/pay/charge" },
        ].map((r,i) => (
          <div key={i} className="flex items-center gap-1.5 mb-1 last:mb-0">
            <div className="h-3 w-7 rounded text-center" style={{ background: r.c + "25", border: `1px solid ${r.c}50` }}>
              <div className="h-1 rounded mx-auto mt-1" style={{ background: r.c, width: "70%" }} />
            </div>
            <div className="h-1.5 flex-1 rounded bg-white/25" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCreativeAgency() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0a0a0a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="h-1.5 w-10 rounded bg-white/50" />
        <div className="flex gap-2 items-center">
          {[0,1,2].map(i => <div key={i} className="h-1.5 w-6 rounded bg-white/15" />)}
          <div className="h-5 w-14 rounded-lg" style={{ background: "#f97316" }} />
        </div>
      </div>
      <div className="mb-3 px-1">
        <div className="h-1.5 w-24 rounded mb-2" style={{ background: "#f9731625", border: "1px solid #f9731650" }} />
        <div className="h-5 w-36 rounded mb-1 bg-white/85" />
        <div className="h-5 w-28 rounded mb-2 bg-white/70" />
        <div className="h-1.5 w-40 rounded mb-1 bg-white/25" />
        <div className="h-1.5 w-34 rounded mb-3 bg-white/20" />
        <div className="flex gap-2">
          <div className="h-6 w-18 rounded-lg" style={{ background: "#f97316", boxShadow: "0 4px 12px #f9731650" }} />
          <div className="h-6 w-16 rounded-lg border border-white/25" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#111111" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-8 rounded mx-auto mb-0.5" style={{ background: "#f97316" }} />
            <div className="h-1 w-5 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["#f97316","#f97316","#f97316"].map((c,i) => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#111111", border: "1px solid #222" }}>
            <div className="h-4 w-4 rounded-lg mb-1.5" style={{ background: c + "20" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: c + "80" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/40 mb-1" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewMarketingAgency() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0f172a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#2563eb" }} />
          <div className="h-1.5 w-12 rounded bg-white/40" />
        </div>
        <div className="h-5 w-16 rounded-lg" style={{ background: "#2563eb" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#2563eb20", border: "1px solid #2563eb50" }}>
          <div className="h-1 w-20 rounded" style={{ background: "#2563eb80" }} />
        </div>
        <div className="h-4 w-32 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-24 rounded mx-auto mb-2 bg-white/60" />
        <div className="flex gap-2 justify-center">
          <div className="h-6 w-20 rounded-lg" style={{ background: "#2563eb", boxShadow: "0 4px 12px #2563eb50" }} />
          <div className="h-6 w-18 rounded-lg border border-white/25" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#1e293b" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-9 rounded mx-auto mb-0.5" style={{ background: "#2563eb" }} />
            <div className="h-1 w-6 rounded mx-auto bg-white/25" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#1e293b", border: "1px solid #334155" }}>
            <div className="h-4 w-4 rounded-lg mb-1.5" style={{ background: "#2563eb20" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: "#2563eb" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/40 mb-1" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewDesignStudio() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#ffffff", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-4 px-0.5 pb-3" style={{ borderBottom: "1px solid #e4e4e7" }}>
        <div className="h-1.5 w-20 rounded bg-zinc-800" />
        <div className="flex gap-3 items-center">
          {[0,1,2].map(i => <div key={i} className="h-1.5 w-6 rounded bg-zinc-300" />)}
          <div className="h-5 w-14 rounded" style={{ background: "#18181b" }} />
        </div>
      </div>
      <div className="mb-4 px-1">
        <div className="h-5 w-36 rounded mb-1 bg-zinc-800" />
        <div className="h-5 w-28 rounded mb-1 bg-zinc-800" />
        <div className="h-5 w-32 rounded mb-3 bg-zinc-700" />
        <div className="h-1.5 w-40 rounded mb-1 bg-zinc-300" />
        <div className="h-1.5 w-34 rounded mb-3 bg-zinc-300" />
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-sm bg-zinc-800" />
          <div className="h-6 w-18 rounded-sm border border-zinc-300" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-0.5">
        {["#e4e4e7","#d4d4d8","#f4f4f5"].map((bg, i) => (
          <div key={i} className="rounded" style={{ background: bg, height: 40 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewFreelancer() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#1e1b4b", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="h-1.5 w-18 rounded bg-white/50" />
        <div className="h-5 w-14 rounded-xl" style={{ background: "#8b5cf6" }} />
      </div>
      <div className="mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#22c55e20", border: "1px solid #22c55e50" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#22c55e" }} />
          <div className="h-1 w-12 rounded" style={{ background: "#22c55e70" }} />
        </div>
        <div className="h-4 w-32 rounded mb-1" style={{ background: "#e0e7ff" }} />
        <div className="h-4 w-24 rounded mb-2" style={{ background: "#c7d2fe" }} />
        <div className="h-1.5 w-36 rounded mb-1 bg-white/25" />
        <div className="h-1.5 w-28 rounded mb-3 bg-white/20" />
        <div className="flex gap-2">
          <div className="h-6 w-18 rounded-xl" style={{ background: "#8b5cf6", boxShadow: "0 4px 12px #8b5cf650" }} />
          <div className="h-6 w-16 rounded-xl border border-white/20" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#2e1065" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-7 rounded mx-auto mb-0.5" style={{ background: "#8b5cf6" }} />
            <div className="h-1 w-4 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#2e1065", border: "1px solid #4c1d95" }}>
            <div className="h-1.5 w-full rounded mb-1" style={{ background: "rgba(224,231,255,0.5)" }} />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewVideoProduction() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0a0a0a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="h-1.5 w-12 rounded bg-white/50" />
        <div className="flex gap-2 items-center">
          {[0,1,2,1].map((w,i) => <div key={i} className="h-1.5 w-6 rounded bg-white/15" />)}
          <div className="h-5 w-16 rounded" style={{ background: "#ef4444" }} />
        </div>
      </div>
      <div className="text-center mb-2 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#ef444420", border: "1px solid #ef444450" }}>
          <div className="h-1 w-16 rounded" style={{ background: "#ef444480" }} />
        </div>
        <div className="h-5 w-28 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-5 w-20 rounded mx-auto mb-2 bg-white/60" />
        <div className="flex gap-2 justify-center">
          <div className="h-6 w-20 rounded" style={{ background: "#ef4444", boxShadow: "0 4px 12px #ef444450" }} />
          <div className="h-6 w-18 rounded border border-white/25" />
        </div>
      </div>
      {/* Cinematic widescreen "reel" */}
      <div className="rounded-xl overflow-hidden mb-2" style={{ background: "#111", border: "1px solid #222", aspectRatio: "16/5" }}>
        <div className="h-full w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a0000,#0a0a0a)" }}>
          <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-white/40">
            <div className="h-0 w-0 ml-0.5" style={{ borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid rgba(255,255,255,0.7)" }} />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 opacity-30">
        {[8,6,9,5,7,6].map((w,i) => <div key={i} className="h-1 rounded-full bg-white" style={{ width: w * 3 }} />)}
      </div>
    </div>
  );
}

function PreviewProductLaunch() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0f172a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#7c3aed" }} />
          <div className="h-1.5 w-8 rounded bg-white/40" />
        </div>
        <div className="h-5 w-20 rounded-lg" style={{ background: "#7c3aed", boxShadow: "0 4px 12px #7c3aed50" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#ef444420", border: "1px solid #ef444450" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#ef4444" }} />
          <div className="h-1 w-16 rounded" style={{ background: "#ef444480" }} />
        </div>
        <div className="h-4 w-32 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-24 rounded mx-auto mb-2 bg-white/60" />
        <div className="h-1.5 w-36 rounded mx-auto mb-1 bg-white/25" />
        <div className="h-1.5 w-28 rounded mx-auto mb-3 bg-white/20" />
        <div className="h-6 w-36 rounded-xl mx-auto" style={{ background: "#7c3aed", boxShadow: "0 4px 16px #7c3aed50" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#f8fafc" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-8 rounded mx-auto mb-0.5" style={{ background: "#7c3aed" }} />
            <div className="h-1 w-5 rounded mx-auto bg-slate-300" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#1e293b", border: "1px solid #334155" }}>
            <div className="h-4 w-4 rounded-lg mb-1.5" style={{ background: "#7c3aed20" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: "#7c3aed80" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/40 mb-1" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewFlashSale() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0a0a0a", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-2 px-0.5 py-1.5 rounded-lg" style={{ background: "#ef4444" }}>
        <div className="h-1.5 w-20 rounded bg-white/70" />
        <div className="h-5 w-20 rounded bg-white/25 flex items-center justify-center">
          <div className="h-1 w-14 rounded bg-white/80" />
        </div>
      </div>
      <div className="text-center mb-2 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-1.5" style={{ background: "#ef444420", border: "1px solid #ef444450" }}>
          <div className="h-1 w-14 rounded" style={{ background: "#ef444480" }} />
        </div>
        <div className="h-4 w-28 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-20 rounded mx-auto mb-2.5 bg-white/60" />
        <div className="h-6 w-28 rounded-xl mx-auto" style={{ background: "#ef4444", boxShadow: "0 4px 16px #ef444450" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#111111" }}>
        {["72h","60%","14k+","30d"].map((v,i) => (
          <div key={i} className="text-center">
            <div className="h-3 w-7 rounded mx-auto mb-0.5" style={{ background: "#ef4444" }} />
            <div className="h-1 w-5 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#111111", border: "1px solid #222" }}>
            <div className="h-1.5 w-full rounded bg-white/40 mb-1" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewShopifyApp() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#1a1f36", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded" style={{ background: "#5c6ac4" }} />
          <div className="h-1.5 w-14 rounded bg-white/40" />
        </div>
        <div className="h-5 w-20 rounded-lg" style={{ background: "#5c6ac4" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#f59e0b20", border: "1px solid #f59e0b50" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="h-1 w-18 rounded" style={{ background: "#f59e0b70" }} />
        </div>
        <div className="h-4 w-30 rounded mx-auto mb-1 bg-white/80" />
        <div className="h-4 w-22 rounded mx-auto mb-2 bg-white/60" />
        <div className="h-6 w-28 rounded-xl mx-auto" style={{ background: "#5c6ac4", boxShadow: "0 4px 12px #5c6ac450" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#f8fafc" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-8 rounded mx-auto mb-0.5" style={{ background: "#5c6ac4" }} />
            <div className="h-1 w-5 rounded mx-auto bg-slate-300" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#232840", border: "1px solid #2d3460" }}>
            <div className="h-4 w-4 rounded-lg mb-1" style={{ background: "#5c6ac420" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: "#5c6ac4" }} />
            </div>
            <div className="h-1.5 w-full rounded bg-white/35 mb-1" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewPhysicalProduct() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#0f1a0f", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="h-1.5 w-16 rounded" style={{ background: "rgba(240,253,244,0.6)" }} />
        <div className="h-5 w-14 rounded-xl" style={{ background: "#16a34a" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#16a34a20", border: "1px solid #16a34a50" }}>
          <div className="h-1 w-1 rounded-full" style={{ background: "#16a34a" }} />
          <div className="h-1 w-14 rounded" style={{ background: "#16a34a80" }} />
        </div>
        <div className="h-4 w-28 rounded mx-auto mb-1" style={{ background: "#f0fdf4" }} />
        <div className="h-4 w-20 rounded mx-auto mb-2" style={{ background: "rgba(240,253,244,0.7)" }} />
        <div className="h-1.5 w-36 rounded mx-auto mb-1 bg-white/20" />
        <div className="h-1.5 w-28 rounded mx-auto mb-3 bg-white/15" />
        <div className="h-6 w-24 rounded-xl mx-auto" style={{ background: "#16a34a", boxShadow: "0 4px 12px #16a34a40" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#f0fdf4" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-8 rounded mx-auto mb-0.5" style={{ background: "#16a34a" }} />
            <div className="h-1 w-5 rounded mx-auto bg-slate-300" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["#dcfce7","#d1fae5","#ecfdf5"].map((bg,i) => (
          <div key={i} className="rounded-xl p-2" style={{ background: bg }}>
            <div className="h-1.5 w-full rounded mb-1 bg-slate-400/50" />
            <div className="h-1 w-3/4 rounded bg-slate-400/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSubscriptionBox() {
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "#1a0030", padding: "10px 10px 0" }}>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="h-1.5 w-10 rounded" style={{ background: "rgba(253,244,255,0.5)" }} />
        <div className="h-5 w-18 rounded-xl" style={{ background: "#d946ef" }} />
      </div>
      <div className="text-center mb-3 px-1">
        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2" style={{ background: "#d946ef20", border: "1px solid #d946ef50" }}>
          <div className="h-1 w-1 rounded-full animate-pulse" style={{ background: "#d946ef" }} />
          <div className="h-1 w-20 rounded" style={{ background: "#d946ef70" }} />
        </div>
        <div className="h-4 w-32 rounded mx-auto mb-1" style={{ background: "#fdf4ff" }} />
        <div className="h-4 w-24 rounded mx-auto mb-2" style={{ background: "rgba(253,244,255,0.7)" }} />
        <div className="h-1.5 w-36 rounded mx-auto mb-1 bg-white/20" />
        <div className="h-1.5 w-28 rounded mx-auto mb-3 bg-white/15" />
        <div className="h-6 w-28 rounded-xl mx-auto" style={{ background: "#d946ef", boxShadow: "0 4px 16px #d946ef50" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-xl p-2 mb-2" style={{ background: "#2d003d" }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="text-center">
            <div className="h-3 w-8 rounded mx-auto mb-0.5" style={{ background: "#d946ef" }} />
            <div className="h-1 w-5 rounded mx-auto bg-white/20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0,1,2].map(i => (
          <div key={i} className="rounded-xl p-2" style={{ background: "#2d003d", border: "1px solid #4a0060" }}>
            <div className="h-4 w-4 rounded-lg mb-1" style={{ background: "#d946ef20" }}>
              <div className="h-2 w-2 rounded m-1" style={{ background: "#d946ef" }} />
            </div>
            <div className="h-1.5 w-full rounded mb-1" style={{ background: "rgba(253,244,255,0.4)" }} />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ReactNode> = {
  "saas-1": <PreviewSaaSHero />,
  "saas-2": <PreviewSaaSPricing />,
  "saas-3": <PreviewSaaSWaitlist />,
  "saas-4": <PreviewDevTool />,
  "saas-5": <PreviewChromeExtension />,
  "saas-6": <PreviewAPIProduct />,
  "agency-1": <PreviewCreativeAgency />,
  "agency-2": <PreviewMarketingAgency />,
  "agency-3": <PreviewDesignStudio />,
  "agency-4": <PreviewFreelancer />,
  "agency-5": <PreviewVideoProduction />,
  "ecom-1": <PreviewProductLaunch />,
  "ecom-2": <PreviewFlashSale />,
  "ecom-3": <PreviewShopifyApp />,
  "ecom-4": <PreviewPhysicalProduct />,
  "ecom-5": <PreviewSubscriptionBox />,
};

const FALLBACK_GRADIENTS = [
  "from-violet-500 to-blue-600",
  "from-blue-500 to-cyan-600",
  "from-orange-500 to-amber-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-purple-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-pink-600",
];

export default function DashboardTemplatesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = TEMPLATES.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "category") result = [...result].sort((a, b) => a.category.localeCompare(b.category));
    return result;
  }, [search, category, sort]);

  const handleEdit = (template: (typeof TEMPLATES)[number], e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.isPro) { toast.error("Upgrade to Pro to use this template"); return; }
    toast.success(`Opening "${template.name}" in editor…`);
    router.push(`/editor/tpl-${template.id}`);
  };

  const handleView = (template: (typeof TEMPLATES)[number], e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.isPro) { toast.error("Upgrade to Pro to preview this template"); return; }
    toast.info(`Opening preview for "${template.name}"…`);
    window.open(`/editor/tpl-${template.id}`, "_blank");
  };

  const handlePublish = (template: (typeof TEMPLATES)[number], e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.isPro) { toast.error("Upgrade to Pro to publish this template"); return; }
    toast.success(`"${template.name}" added to your pages and published!`);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{TEMPLATES.length} ready-made templates — pick one and launch in minutes</p>
        </div>
        <button
          onClick={() => router.push(`/editor/${Date.now()}`)}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:self-auto">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Start from Blank
        </button>
      </div>

      {/* Search + Sort + Category filter */}
      <div className="flex flex-col gap-2.5">
        {/* Row 1: search + sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search templates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
          >
            <option value="default" className="bg-[#0d0d18]">Default</option>
            <option value="name" className="bg-[#0d0d18]">Name A–Z</option>
            <option value="category" className="bg-[#0d0d18]">Category</option>
          </select>
        </div>
        {/* Row 2: category pills — single scrollable row */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                category === cat
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                  : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/70"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/25">{filtered.length} template{filtered.length !== 1 ? "s" : ""} shown</span>
        {(search || category !== "All") && (
          <button onClick={() => { setSearch(""); setCategory("All"); }} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Clear ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 border-dashed py-24 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-base font-semibold text-white/60">
            No templates found{search ? ` for "${search}"` : ""}
          </p>
          <p className="text-sm text-white/30 mt-1">Try a different keyword or browse all categories</p>
          <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/50 hover:text-white hover:border-white/20 transition-all">
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template, i) => {
            const preview = PREVIEW_MAP[template.id];
            const isHovered = hoveredId === template.id;
            return (
              <div
                key={template.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Preview area — fully clickable */}
                <div
                  className="relative h-48 overflow-hidden shrink-0 cursor-pointer"
                  onClick={(e) => handleView(template, e)}
                >
                  {preview ? (
                    <div className="h-full w-full">{preview}</div>
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length]} flex flex-col items-center justify-center gap-2`}>
                      <div className="text-4xl drop-shadow-lg">{template.emoji}</div>
                      <div className="text-white/70 text-xs font-semibold tracking-wide uppercase">{template.name}</div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                    {template.isPro && (
                      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">PRO</span>
                    )}
                  </div>

                  {/* Sections count pill — top right */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white/70 border border-white/10">
                      {template.blocks} sections
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}>
                    <p className="text-white font-semibold text-sm">{template.emoji} {template.name}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleView(template, e)}
                        className="flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/20">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={(e) => handleEdit(template, e)}
                        className="flex items-center gap-1.5 rounded-xl bg-violet-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-violet-400"
                        style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.5)" }}>
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-sm leading-snug text-white">{template.emoji} {template.name}</h3>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${CAT_COLORS[template.category] || "border-white/10 text-white/40"}`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed flex-1 mb-4">{template.description}</p>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={(e) => handleView(template, e)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={(e) => handleEdit(template, e)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 py-2 text-xs font-semibold text-violet-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/20 hover:text-violet-200">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={(e) => handlePublish(template, e)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:text-emerald-300">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Start from Blank — special card at end of grid */}
          <div
            className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-transparent cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02] hover:-translate-y-1"
            onClick={() => router.push(`/editor/${Date.now()}`)}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center" style={{ minHeight: 280 }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-white/20 text-white/30 transition-all group-hover:border-white/30 group-hover:text-white/50">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white/50 group-hover:text-white/70 transition-colors">Start from Blank</h3>
                <p className="text-xs text-white/25 mt-1 group-hover:text-white/40 transition-colors">Build your own from scratch</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
