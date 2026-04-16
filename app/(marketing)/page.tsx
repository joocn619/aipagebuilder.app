"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Variants ─────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerFast = { visible: { transition: { staggerChildren: 0.07 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Glass card ───────────────────────────────────────────────────────────────
function Glass({ children, className = "", hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 24px 48px rgba(139,92,246,0.15)" } : undefined}
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "🧠", title: "AI Page Generator", desc: "Describe any page — Claude AI builds it in 8 seconds. Full layout, copy, and styling.", grad: "from-violet-500/20 to-purple-500/5" },
  { icon: "✍️", title: "AI Copywriter", desc: "Headlines, CTAs, full sections — written in your brand voice, instantly.", grad: "from-blue-500/20 to-cyan-500/5" },
  { icon: "🔥", title: "Click Heatmaps", desc: "See exactly where visitors click. Filter by device. Optimize what converts.", grad: "from-orange-500/20 to-red-500/5" },
  { icon: "📹", title: "Session Recording", desc: "Watch real visitor sessions with canvas playback. Find every drop-off.", grad: "from-green-500/20 to-emerald-500/5" },
  { icon: "🎯", title: "Popup Builder", desc: "Exit-intent, scroll, time-delay — 6 types, 5 triggers, full conversion control.", grad: "from-pink-500/20 to-rose-500/5" },
  { icon: "📊", title: "Analytics", desc: "Views, bounce rate, conversions — beautiful charts, date range, CSV export.", grad: "from-indigo-500/20 to-blue-500/5" },
  { icon: "🔍", title: "SEO Tools", desc: "SERP preview, SEO score 0–100, JSON-LD, sitemap.xml — everything built in.", grad: "from-teal-500/20 to-cyan-500/5" },
  { icon: "⚡", title: "12 Extensions", desc: "Sticky bars, spin wheels, countdown timers, sales notifications — one toggle.", grad: "from-yellow-500/20 to-amber-500/5" },
  { icon: "🖼️", title: "Screenshot → Layout", desc: "Upload any design mockup — AI converts it to fully editable blocks.", grad: "from-purple-500/20 to-violet-500/5" },
];

const TOOLS = [
  { name: "PageFly", price: "$199/mo" },
  { name: "Hotjar", price: "$99/mo" },
  { name: "ClickFunnels", price: "$97/mo" },
  { name: "OptinMonster", price: "$49/mo" },
  { name: "EComposer", price: "$39/mo" },
];

const STEPS = [
  { n: "01", icon: "💬", title: "Describe your page", desc: "Tell the AI your industry, goal, and tone. Full page generated in under 10 seconds." },
  { n: "02", icon: "🎨", title: "Customize visually", desc: "Drag, drop, edit inline. 20 block types, 50+ templates. Zero code needed." },
  { n: "03", icon: "🚀", title: "Publish & optimize", desc: "Go live in one click. Heatmaps, recordings, and analytics start instantly." },
];

const TESTIMONIALS = [
  { name: "Sarah K.", role: "Agency Owner", av: "SK", text: "Replaced Hotjar, ClickFunnels, and OptinMonster. Saved $400/mo. Our clients get better results than before." },
  { name: "Marcus T.", role: "Performance Marketer", av: "MT", text: "The AI generator is legitimately impressive. Describe a page, it builds it. My campaign output tripled." },
  { name: "Priya R.", role: "Freelance Designer", av: "PR", text: "Screenshot to layout changed my workflow. Design in Figma, upload, get editable blocks. Deliver in hours." },
  { name: "James L.", role: "SaaS Founder", av: "JL", text: "Session recording showed exactly why we weren't converting. Fixed the CTA. Rate went from 3.2% to 8.7%." },
  { name: "Ana M.", role: "E-commerce Consultant", av: "AM", text: "Exit-intent popup set up in 5 min. First week: 67 new email subs. Pays for itself every single month." },
  { name: "David C.", role: "Growth Lead", av: "DC", text: "Heatmaps + session recordings in one dashboard. Used to pay $99 just for Hotjar. Now I get that plus everything else for $39." },
];

const PLANS = [
  { name: "Free", price: "0", desc: "Try it out", features: ["3 pages", "20 block types", "10 AI credits/mo", "50+ templates"], cta: "Get Started", hot: false },
  { name: "Starter", price: "19", desc: "Solopreneurs", features: ["15 pages", "100 AI credits/mo", "Analytics", "Lead management"], cta: "Start Free Trial", hot: false },
  { name: "Pro", price: "39", desc: "Most popular", features: ["Unlimited pages", "500 AI credits/mo", "Heatmaps + recordings", "Popup builder", "SEO tools", "12 extensions"], cta: "Start Free Trial", hot: true },
  { name: "Agency", price: "99", desc: "For teams", features: ["Everything in Pro", "Unlimited AI credits", "5 workspaces", "White-label", "Custom domain"], cta: "Start Free Trial", hot: false },
];

const FAQS = [
  { q: "Do I need to know how to code?", a: "Not at all. The drag-and-drop editor is built for non-developers. Build, publish, and optimize pages without writing a single line of code." },
  { q: "How good is the AI page generator?", a: "Very good. Describe your page — industry, goal, tone — and Claude AI generates a complete layout with copy, sections, and styling in under 10 seconds." },
  { q: "Is there really a 14-day free trial?", a: "Yes. No credit card required. Full Pro access for 14 days. If you don't upgrade, you drop to the Free plan automatically." },
  { q: "What does it cost to run?", a: "Under $50/month at launch (Supabase + Vercel). At 100 Pro customers ($39/mo) you're making $3,400+ profit per month." },
  { q: "How does pricing compare to my current tools?", a: "The average user replaces $400–500/month in tools. At $39/month you save $360–460 every month — that's $4,000–5,500 per year." },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-[#080810]">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.25),transparent)]" />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]" />
      {/* Animated blobs */}
      <motion.div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

      <div className="container relative z-10 py-28 pb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 gap-2 border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300 hover:bg-violet-500/10">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400 inline-block" />
              Powered by Claude AI + OpenAI
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
            Build Pages That
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent pb-2">
              Convert — With AI
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/50 md:text-xl">
            One platform to replace PageFly, Hotjar, ClickFunnels & OptinMonster.
            Build, publish, and optimize pages — at <strong className="text-white/80">$39/month</strong>.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="h-14 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 px-10 text-base font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 border-0 transition-all">
                  Start Free Trial →
                </Button>
              </motion.div>
            </Link>
            <Link href="#how-it-works">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="ghost" size="lg" className="h-14 border border-white/10 bg-white/5 px-10 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white hover:border-white/20">
                  See How It Works
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.p variants={fadeIn} className="mt-4 text-xs text-white/30">
            14-day free trial · No credit card · Deploy in under 1 hour
          </motion.p>

          {/* Editor mockup */}
          <motion.div variants={scaleIn} className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d18] shadow-2xl shadow-black/50">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/40">
                <span className="text-green-400">🔒</span> aipagebuilder.app/editor
              </div>
            </div>
            <div className="flex" style={{ height: 340 }}>
              {/* Sidebar */}
              <div className="w-52 shrink-0 border-r border-white/10 bg-white/[0.02] p-3 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 px-2 mb-3">Blocks</p>
                {["Hero", "Features", "Pricing", "Testimonials", "CTA", "Footer"].map((b, i) => (
                  <motion.div key={b} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.08 }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs cursor-pointer ${i === 0 ? "bg-violet-500/20 text-violet-300" : "text-white/40 hover:bg-white/5"}`}>
                    <div className={`h-2 w-2 rounded-sm ${i === 0 ? "bg-violet-400" : "bg-white/20"}`} />
                    {b}
                  </motion.div>
                ))}
              </div>
              {/* Canvas */}
              <div className="flex-1 bg-[#111120] p-4 space-y-3">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                  className="rounded-xl bg-gradient-to-br from-violet-600/40 to-blue-600/40 border border-violet-500/20 p-6 text-center space-y-2">
                  <div className="h-4 w-48 mx-auto rounded-full bg-white/20" />
                  <div className="h-2.5 w-64 mx-auto rounded-full bg-white/10" />
                  <div className="h-2.5 w-56 mx-auto rounded-full bg-white/10" />
                  <div className="mx-auto mt-3 h-9 w-28 rounded-lg bg-white/20" />
                </motion.div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.1 }}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
                      <div className="h-6 w-6 rounded-md bg-violet-500/30" />
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-3/4 rounded bg-white/10" />
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Right panel */}
              <div className="w-52 shrink-0 border-l border-white/10 bg-white/[0.02] p-3 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 px-2 mb-3">Styles</p>
                {["Background", "Text Color", "Padding", "Font", "Radius"].map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.07 }} className="space-y-1">
                    <div className="text-[10px] text-white/30">{s}</div>
                    <div className={`h-7 w-full rounded-md border bg-white/5 ${i === 0 ? "border-violet-500/50" : "border-white/10"}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { val: "345+", label: "Features built" },
    { val: "50+", label: "Page templates" },
    { val: "$500+", label: "Replaced per month" },
    { val: "1hr", label: "To deploy & launch" },
  ];
  return (
    <section className="border-y border-white/5 bg-[#080810] py-16">
      <div className="container">
        <Section>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{s.val}</div>
                <div className="mt-1 text-sm text-white/40">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Tools Replaced ───────────────────────────────────────────────────────────
function ToolsReplaced() {
  return (
    <section className="bg-[#080810] py-24">
      <div className="container">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Badge className="mb-4 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/10">The Problem</Badge>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">You&apos;re paying too much<br />for too many tools</h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto">The average agency stacks 5+ tools. $400–$500/month, 5 logins, zero integration. We replace all of them.</p>
          </motion.div>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {TOOLS.map((t) => (
                <motion.div key={t.name} variants={fadeUp} whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                  <span className="text-sm text-white/40 line-through">{t.name}</span>
                  <Badge className="border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/10 text-[10px]">{t.price}</Badge>
                </motion.div>
              ))}
            </div>
            <motion.div variants={scaleIn}
              className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-blue-600/10 px-8 py-6 text-center backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-blue-500/5" />
              <div className="relative">
                <p className="text-2xl font-extrabold text-white">AIPageBuilder</p>
                <p className="text-white/40 text-sm mt-1">All of the above — one platform</p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">$39</span>
                  <span className="text-white/40">/month</span>
                  <Badge className="border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/10">Save $460/mo</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" className="bg-[#080810] py-24">
      <div className="container">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">345 Features</Badge>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Everything you need to grow</h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto">From AI generation to session recordings — every tool built in, nothing to install.</p>
          </motion.div>
          <motion.div variants={staggerFast} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Glass key={f.title} hover className={`bg-gradient-to-br ${f.grad} p-6`}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </Glass>
            ))}
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#080810] border-y border-white/5 py-24">
      <div className="container">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">How It Works</Badge>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">From idea to live page<br />in minutes</h2>
          </motion.div>
          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="absolute top-12 left-1/2 hidden h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent md:block" />
            {STEPS.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} transition={{ delay: i * 0.15 }} className="relative text-center">
                <motion.div whileHover={{ scale: 1.05 }}
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-blue-600/10 text-5xl">
                  {s.icon}
                </motion.div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-violet-500/50">{s.n}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── AI Showcase ──────────────────────────────────────────────────────────────
function AIShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const steps = [
    { label: "Analyzing prompt...", c: "bg-blue-500" },
    { label: "Generating Hero section", c: "bg-violet-500" },
    { label: "Writing copy...", c: "bg-indigo-500" },
    { label: "Building Features block", c: "bg-purple-500" },
    { label: "Adding Pricing section", c: "bg-fuchsia-500" },
    { label: "Page ready ✓", c: "bg-green-500" },
  ];
  return (
    <section className="bg-[#080810] py-24" ref={ref}>
      <div className="container">
        <Section>
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} className="text-center mb-14">
              <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">Claude AI</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Describe it. We build it.</h2>
              <p className="mt-4 text-white/40 max-w-xl mx-auto">Type a prompt — get a complete, editable landing page in seconds. No templates to browse.</p>
            </motion.div>
            <motion.div variants={scaleIn} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a] shadow-2xl shadow-black/50">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Your Prompt</p>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 leading-relaxed mb-5">
                    &ldquo;Create a landing page for an AI project management SaaS targeting remote teams. Professional tone. Features, pricing, strong CTA. Focus on time-saving.&rdquo;
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["Industry: SaaS", "Tone: Professional", "Goal: Signups"].map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/40">{t}</span>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 border-0 font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all">
                      🧠 Generate Page
                    </Button>
                  </motion.div>
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">AI Building...</p>
                  <div className="space-y-3">
                    {steps.map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.4 }} className="flex items-center gap-3 text-sm">
                        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                          transition={{ delay: 0.3 + i * 0.4, type: "spring" }}
                          className={`h-2 w-2 rounded-full ${s.c}`} />
                        <span className={i === steps.length - 1 ? "font-semibold text-green-400" : "text-white/40"}>{s.label}</span>
                        {i === steps.length - 1 && (
                          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.8 }} className="ml-auto text-xs text-white/30">8.2s</motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 3.2 }}
                    className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                    <div className="h-8 rounded-lg bg-gradient-to-r from-violet-500/30 to-blue-500/30" />
                    <div className="grid grid-cols-3 gap-1.5">{[1, 2, 3].map((i) => <div key={i} className="h-10 rounded-md bg-white/5" />)}</div>
                    <div className="h-6 w-2/3 mx-auto rounded-md bg-violet-500/20" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Analytics Showcase ───────────────────────────────────────────────────────
function AnalyticsShowcase() {
  return (
    <section className="bg-[#080810] border-y border-white/5 py-24">
      <div className="container">
        <Section>
          <div className="mx-auto max-w-5xl grid gap-14 md:grid-cols-2 items-center">
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/10">Analytics & Heatmaps</Badge>
              <h2 className="text-4xl font-bold text-white mb-5">Know exactly what&apos;s working</h2>
              <p className="text-white/40 mb-8 leading-relaxed">Stop guessing. See where visitors click, how far they scroll, what makes them leave — and fix it in the same platform you built the page.</p>
              <ul className="space-y-4">
                {["🔥 Click heatmaps — see every tap and click", "📹 Session recordings — watch real visitors", "📊 Conversion funnels — find every drop-off", "⚡ Real-time visitors — live counter"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-white/60">{item}</motion.li>
                ))}
              </ul>
            </motion.div>
            {/* Dashboard preview */}
            <motion.div variants={scaleIn}>
              <Glass className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold text-white">Page Analytics</p>
                  <Badge className="border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/10 text-[10px] gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse inline-block" /> Live
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[{ l: "Views", v: "3,842" }, { l: "Visitors", v: "2,104" }, { l: "Conv.", v: "8.7%" }].map((s) => (
                    <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
                      <p className="text-sm font-bold text-white">{s.v}</p>
                      <p className="text-[10px] text-white/40">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-1 h-20 mb-5">
                  {[30, 45, 38, 60, 55, 72, 65, 80, 70, 90, 75, 95, 88, 100].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.04, duration: 0.4 }} viewport={{ once: true }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-violet-600 to-violet-400/40" />
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 relative overflow-hidden" style={{ height: 80 }}>
                  <p className="text-[10px] text-white/30 mb-1">Click Heatmap</p>
                  {[{ x: "50%", y: "50%", s: 36, o: 0.8 }, { x: "28%", y: "65%", s: 22, o: 0.5 }, { x: "72%", y: "35%", s: 26, o: 0.6 }, { x: "62%", y: "75%", s: 16, o: 0.35 }].map((d, i) => (
                    <div key={i} className="absolute rounded-full blur-sm" style={{ left: d.x, top: d.y, width: d.s, height: d.s, background: `rgba(239,68,68,${d.o})`, transform: "translate(-50%,-50%)" }} />
                  ))}
                </div>
              </Glass>
            </motion.div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="bg-[#080810] py-24">
      <div className="container">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Loved by 500+ agencies</h2>
          </motion.div>
          <motion.div variants={staggerFast} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Glass key={t.name} hover className="p-6">
                <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                <p className="text-sm text-white/60 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white text-xs font-bold">{t.av}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </Glass>
            ))}
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="bg-[#080810] border-y border-white/5 py-24">
      <div className="container">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">Pricing</Badge>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Simple, transparent pricing</h2>
            <p className="mt-3 text-white/40">14-day free trial · No credit card required</p>
            <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {["Monthly", "Yearly"].map((label, i) => (
                <button key={label} onClick={() => setYearly(i === 1)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${(i === 1) === yearly ? "bg-violet-600 text-white shadow-md" : "text-white/40 hover:text-white"}`}>
                  {label} {i === 1 && <span className="ml-1 text-xs opacity-70">-20%</span>}
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div variants={staggerFast} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => {
              const price = yearly ? Math.round(parseInt(plan.price) * 0.8) : parseInt(plan.price);
              return (
                <motion.div key={plan.name} variants={fadeUp} whileHover={{ y: -5 }}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all ${plan.hot ? "border-violet-500/40 bg-gradient-to-b from-violet-600/10 to-[#080810] shadow-xl shadow-violet-500/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"}`}>
                  {plan.hot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 px-3 shadow-lg text-white">Most Popular</Badge>
                    </div>
                  )}
                  <p className="font-bold text-lg text-white">{plan.name}</p>
                  <p className="text-xs text-white/40 mt-0.5 mb-5">{plan.desc}</p>
                  <AnimatePresence mode="wait">
                    <motion.div key={`${plan.name}-${yearly}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-white">${price}</span>
                      <span className="text-white/30 text-sm mb-1.5">/mo</span>
                    </motion.div>
                  </AnimatePresence>
                  <ul className="flex-1 space-y-2.5 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="mt-0.5 text-violet-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className={`w-full border-0 font-medium transition-all ${plan.hot ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:opacity-90" : "bg-white/10 text-white hover:bg-white/20 hover:text-white"}`} size="sm">
                      {plan.cta}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#080810] py-24">
      <div className="container max-w-2xl">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <Badge className="mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">FAQ</Badge>
            <h2 className="text-4xl font-bold text-white">Questions answered</h2>
          </motion.div>
          <motion.div variants={stagger} className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left">
                  <span className="font-medium text-sm text-white">{faq.q}</span>
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-4 shrink-0 text-white/40">↓</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p className="border-t border-white/10 px-5 py-4 text-sm text-white/40 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-[#080810] border-t border-white/5 py-24">
      <div className="container">
        <Section>
          <motion.div variants={scaleIn} className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/50 via-[#0d0d1f] to-blue-900/30 p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,255,0.15),transparent_70%)]" />
            <motion.div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
            <motion.div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 1.5 }} />
            <div className="relative">
              <motion.div variants={fadeUp}>
                <Badge className="mb-5 border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10 px-4">🚀 Start Building Today</Badge>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
                Ready to replace $500/mo<br />with one tool?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/50 mb-10 text-lg max-w-xl mx-auto">
                Join agencies and marketers who replaced Hotjar, ClickFunnels, and OptinMonster. Start your free trial today.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139,92,246,0.4)" }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="h-14 bg-gradient-to-r from-violet-600 to-blue-600 border-0 px-10 text-base font-semibold text-white shadow-xl shadow-violet-500/30 transition-all">
                      Start Free Trial — No Card Needed →
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              <motion.p variants={fadeIn} className="mt-4 text-xs text-white/30">14-day trial · Cancel anytime · Deploy in 1 hour</motion.p>
            </div>
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-[#080810]">
      <Hero />
      <Stats />
      <ToolsReplaced />
      <Features />
      <HowItWorks />
      <AIShowcase />
      <AnalyticsShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
