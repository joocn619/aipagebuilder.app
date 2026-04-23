import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

export interface TemplateData {
  id: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  tags: string[];
  isPro: boolean;
  globalStyles: GlobalStyles;
  blocks: EditorBlock[];
}

const S = (top = 64, bottom = 64) => ({ paddingTop: top, paddingBottom: bottom, paddingLeft: 24, paddingRight: 24 });

const RAW_TEMPLATE_DATA: TemplateData[] = [

  // ══════════════════════════════════════════════
  // NICHE 1 — SaaS / Software (6 templates)
  // ══════════════════════════════════════════════

  // ─── saas-1: SaaS Hero ────────────────────────
  {
    id: "saas-1", name: "SaaS Hero", category: "SaaS", emoji: "🚀",
    description: "Full-featured SaaS landing with hero, features, stats, pricing & FAQ.",
    tags: ["saas", "modern", "dark"], isPro: false,
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "s1-header", type: "header", styles: S(16, 16), content: { logo: "SaaSly", menuItems: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Blog", url: "#" }], ctaText: "Start Free Trial", ctaUrl: "#", sticky: true } },
      { id: "s1-hero", type: "hero", styles: { ...S(100, 100), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "🚀 New — AI automations just launched", headline: "Ship Better Products, Faster", subheadline: "The all-in-one platform to plan, build, and scale your SaaS. Trusted by 12,000+ teams worldwide.", ctaText: "Start Free Trial", ctaUrl: "#", secondaryCtaText: "Watch Demo", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "s1-logos", type: "social-proof", styles: S(32, 32), content: { heading: "Trusted by teams at", layout: "logos", items: ["Stripe", "Notion", "Linear", "Vercel", "Supabase", "Figma"] } },
      { id: "s1-stats", type: "stats", styles: { ...S(56, 56), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 12000, label: "Teams Worldwide", suffix: "+" }, { value: 99.99, label: "Uptime SLA", suffix: "%" }, { value: 4200000, label: "Tasks Automated", suffix: "+" }, { value: 200, label: "Integrations", suffix: "+" }] } },
      { id: "s1-features", type: "features", styles: S(80, 80), content: { heading: "Everything Your Team Needs", subheading: "Powerful tools built for modern SaaS teams", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "AI Automations", description: "Let AI handle repetitive tasks so your team stays focused on what matters most." },
        { icon: "shield", title: "Enterprise Security", description: "SOC2 compliant with SSO, 2FA, and role-based access control built in." },
        { icon: "bar-chart-3", title: "Real-Time Analytics", description: "Track usage, revenue, and churn with live dashboards and custom reports." },
        { icon: "globe", title: "Global CDN", description: "99.99% uptime with edge deployments across 30+ regions worldwide." },
        { icon: "users", title: "Team Collaboration", description: "Invite unlimited teammates, set permissions, and work together in real time." },
        { icon: "star", title: "200+ Integrations", description: "Connect with Slack, Zapier, HubSpot, Stripe, and 200+ other tools." },
      ] } },
      { id: "s1-howitworks", type: "features", styles: { ...S(80, 80), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Up and Running in Minutes", subheading: "No complicated setup. No engineering required.", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "1. Create Your Account", description: "Sign up in 30 seconds. No credit card required. Your free trial starts immediately." },
        { icon: "settings", title: "2. Configure Workspace", description: "Connect your tools, invite your team, and customize workflows to match how you work." },
        { icon: "zap", title: "3. Launch & Scale", description: "Go live in minutes. As your team grows, SaaSly scales with you — no migrations needed." },
      ] } },
      { id: "s1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Loved by 12,000+ Teams", layout: "grid", testimonials: [
        { name: "Sarah Chen", role: "CTO", company: "Acme Corp", content: "We cut our deployment time by 70% in the first month. Absolutely game-changing for our team.", rating: 5 },
        { name: "Marcus Webb", role: "Founder", company: "LaunchPad", content: "Finally a platform that scales with us. We went from 100 to 10,000 users without one migration.", rating: 5 },
        { name: "Priya Nair", role: "VP Engineering", company: "DataFlow", content: "The analytics alone are worth it. We finally understand where users drop off and why.", rating: 5 },
      ] } },
      { id: "s1-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Simple, Transparent Pricing", subheading: "No hidden fees. Cancel anytime.", plans: [
        { name: "Starter", price: 0, period: "month", features: ["3 Projects", "5 Team Members", "10GB Storage", "Basic Analytics", "Email Support"], ctaText: "Get Started Free" },
        { name: "Growth", price: 49, period: "month", features: ["25 Projects", "25 Team Members", "100GB Storage", "Advanced Analytics", "Priority Support", "API Access"], ctaText: "Start Growth", highlighted: true },
        { name: "Enterprise", price: 149, period: "month", features: ["Unlimited Projects", "Unlimited Members", "1TB Storage", "Custom Analytics", "Dedicated Support", "SSO & SAML", "SLA Guarantee"], ctaText: "Contact Sales" },
      ] } },
      { id: "s1-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Frequently Asked Questions", items: [
        { question: "Is there a free trial?", answer: "Yes! You get 14 days free on any paid plan, no credit card required." },
        { question: "Can I change plans later?", answer: "Absolutely. Upgrade or downgrade at any time and we'll prorate the difference." },
        { question: "Do you offer refunds?", answer: "We offer a 30-day money-back guarantee on all paid plans." },
        { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and wire transfers for annual plans." },
      ] } },
      { id: "s1-logos2", type: "logo-carousel", styles: { ...S(40, 40), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Works With Your Favorite Tools", speed: 35, logos: [{ name: "Slack" }, { name: "Stripe" }, { name: "HubSpot" }, { name: "Zapier" }, { name: "Notion" }, { name: "GitHub" }, { name: "Jira" }, { name: "Salesforce" }, { name: "Figma" }, { name: "Linear" }] } },
      { id: "s1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#7c3aed", textColor: "#ffffff" }, content: { heading: "Ready to Transform Your Workflow?", subheading: "Join 12,000+ teams building better software with SaaSly.", ctaText: "Start Free Trial — No Credit Card", ctaUrl: "#" } },
      { id: "s1-footer", type: "footer", styles: S(48, 48), content: { logo: "SaaSly", columns: [{ title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }, { label: "Roadmap", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Blog", url: "#" }, { label: "Careers", url: "#" }, { label: "Contact", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "Cookies", url: "#" }] }], copyright: "© 2026 SaaSly. All rights reserved." } },
    ],
  },

  // ─── saas-2: SaaS Pricing ─────────────────────
  {
    id: "saas-2", name: "SaaS Pricing", category: "SaaS", emoji: "💰",
    description: "Conversion-optimized pricing page with comparison table, FAQ, and trust badges.",
    tags: ["saas", "pricing", "light"], isPro: false,
    globalStyles: { primaryColor: "#059669", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "s2-header", type: "header", styles: S(16, 16), content: { logo: "PricePro", menuItems: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "FAQ", url: "#" }], ctaText: "Start Free", ctaUrl: "#", sticky: true } },
      { id: "s2-hero", type: "hero", styles: { ...S(80, 60), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "💰 Save 40% with annual billing", headline: "Simple Pricing, Serious Results", subheadline: "No hidden fees. No surprise invoices. Just straightforward pricing that scales with your business.", ctaText: "Start Free — No Card Needed", ctaUrl: "#", alignment: "center" } },
      { id: "s2-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Choose Your Plan", subheading: "Start free. Upgrade when you're ready.", plans: [
        { name: "Free", price: 0, period: "month", features: ["1 Project", "3 Team Members", "5GB Storage", "Community Support", "Basic Analytics", "API Access"], ctaText: "Get Started Free" },
        { name: "Pro", price: 29, period: "month", features: ["10 Projects", "15 Team Members", "50GB Storage", "Priority Support", "Advanced Analytics", "API Access", "Custom Domain", "Remove Branding"], ctaText: "Start Pro Trial", highlighted: true },
        { name: "Business", price: 79, period: "month", features: ["50 Projects", "50 Team Members", "250GB Storage", "24/7 Support", "Custom Analytics", "Full API", "5 Custom Domains", "White Label", "SSO Login"], ctaText: "Start Business Trial" },
        { name: "Enterprise", price: 299, period: "month", features: ["Unlimited Projects", "Unlimited Members", "Unlimited Storage", "Dedicated Support", "SLA 99.99%", "SAML/SSO", "Custom Contract", "Onboarding Help"], ctaText: "Contact Sales" },
      ] } },
      { id: "s2-trust", type: "features", styles: { ...S(48, 48), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Every Plan Includes", subheading: "Core features that come with every tier — no upgrades required.", layout: "grid", columns: 4, features: [
        { icon: "shield", title: "Bank-Level Security", description: "256-bit SSL encryption and SOC2 Type II compliance on all plans." },
        { icon: "zap", title: "99.99% Uptime", description: "Global CDN with automatic failover. We stay up so you stay up." },
        { icon: "users", title: "Free Onboarding", description: "Personal onboarding session with every paid plan to get you started fast." },
        { icon: "star", title: "30-Day Guarantee", description: "Not happy? Get a full refund within 30 days, no questions asked." },
      ] } },
      { id: "s2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "10,000+ Companies Trust Us", layout: "grid", testimonials: [
        { name: "Lena Park", role: "Founder", company: "ShipFast", content: "Switched from a $500/month competitor. Got all the same features for $29. No brainer.", rating: 5 },
        { name: "Tom Brady", role: "Head of Ops", company: "GrowthHQ", content: "The pricing is so clear. We knew exactly what we'd pay on day one and it never changed.", rating: 5 },
        { name: "Ana Lima", role: "CTO", company: "StackBase", content: "Upgraded from Free to Pro in week 2. The value jump was immediate and obvious.", rating: 5 },
      ] } },
      { id: "s2-faq", type: "faq", styles: { ...S(), textColor: "#1e293b" }, content: { heading: "Pricing FAQs", items: [
        { question: "Can I switch plans at any time?", answer: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we prorate any differences." },
        { question: "What happens when my trial ends?", answer: "You'll be asked to choose a plan. If you don't, your account moves to the Free plan automatically — no charge." },
        { question: "Do you offer annual billing?", answer: "Yes! Annual billing saves you up to 40% compared to monthly. Switch anytime in your billing settings." },
        { question: "Is there a setup fee?", answer: "Never. No setup fees, no onboarding fees. You only pay for your plan." },
        { question: "Can I add more team members?", answer: "Yes, additional seats are available on all paid plans at $8/seat/month." },
      ] } },
      { id: "s2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#059669", textColor: "#ffffff" }, content: { heading: "Start Building for Free Today", subheading: "No credit card. No commitment. Upgrade when you're ready.", ctaText: "Create Free Account", ctaUrl: "#" } },
      { id: "s2-footer", type: "footer", styles: S(48, 48), content: { logo: "PricePro", columns: [{ title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Security", url: "#" }] }, { title: "Support", links: [{ label: "Help Center", url: "#" }, { label: "Contact", url: "#" }, { label: "Status", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 PricePro. All rights reserved." } },
    ],
  },

  // ─── saas-3: SaaS Waitlist ────────────────────
  {
    id: "saas-3", name: "SaaS Waitlist", category: "SaaS", emoji: "⏳",
    description: "High-converting waitlist page with countdown timer, social proof, and early-access perks.",
    tags: ["saas", "waitlist", "launch", "dark"], isPro: false,
    globalStyles: { primaryColor: "#f59e0b", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "s3-header", type: "header", styles: S(16, 16), content: { logo: "LaunchKit", menuItems: [{ label: "Features", url: "#" }, { label: "Why Us", url: "#" }], ctaText: "Join Waitlist", ctaUrl: "#", sticky: true } },
      { id: "s3-hero", type: "hero", styles: { ...S(120, 100), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { badge: "⚡ Limited spots — 2,847 people waiting", headline: "The Future of Productivity Is Almost Here", subheadline: "LaunchKit is a next-generation workspace that combines AI, automation, and collaboration in one beautiful tool. Launching Q3 2026.", ctaText: "Join the Waitlist — It's Free", ctaUrl: "#", secondaryCtaText: "See What's Coming", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "s3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "", stats: [{ value: 2847, label: "On the Waitlist", suffix: "+" }, { value: 94, label: "Would Recommend", suffix: "%" }, { value: 48, label: "Hrs to Launch After Signup", suffix: "h" }, { value: 12, label: "Founding Member Spots Left", suffix: "" }] } },
      { id: "s3-perks", type: "features", styles: { ...S(80, 80), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { heading: "Early Access Perks", subheading: "Join the waitlist today and get exclusive founding member benefits", layout: "grid", columns: 3, features: [
        { icon: "star", title: "50% Off Forever", description: "Founding members lock in 50% off any paid plan for the lifetime of their account. Never pay full price." },
        { icon: "zap", title: "Day-1 Access", description: "Skip the queue. You'll get access the moment we launch — before we open to the public." },
        { icon: "users", title: "Private Community", description: "Join our exclusive Slack for early members. Direct access to the founding team and other builders." },
        { icon: "sparkles", title: "Shape the Product", description: "Vote on features, test betas, and give feedback that actually gets shipped to the product." },
        { icon: "shield", title: "Data Migration Help", description: "Free 1-on-1 migration assistance from your current tools. We'll move your data for you." },
        { icon: "globe", title: "Custom Subdomain", description: "Claim your custom subdomain (yourname.launchkit.io) before anyone else can take it." },
      ] } },
      { id: "s3-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "People from these companies have joined", layout: "logos", items: ["Google", "Notion", "Stripe", "Shopify", "Figma", "Vercel"] } },
      { id: "s3-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { heading: "What Beta Testers Are Saying", layout: "grid", testimonials: [
        { name: "Jamie Torres", role: "Product Manager", company: "Basecamp", content: "I've been in the beta for 3 weeks. This is the productivity tool I've been waiting for my entire career.", rating: 5 },
        { name: "Rachel Kim", role: "Solo Founder", company: "Indie Hackers", content: "Replaced 4 different SaaS tools with LaunchKit alone. The AI features are genuinely next-level.", rating: 5 },
        { name: "Finn O'Brien", role: "Engineering Lead", company: "Remote.com", content: "The speed is unreal. Everything feels instant. Our team's async workflows improved overnight.", rating: 5 },
      ] } },
      { id: "s3-faq", type: "faq", styles: { ...S(), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "Quick Questions", items: [
        { question: "When exactly does LaunchKit launch?", answer: "We're targeting Q3 2026. Waitlist members will get notified 48 hours before public launch." },
        { question: "Is joining the waitlist really free?", answer: "100% free. No credit card. No commitment. We'll email you when it's your turn." },
        { question: "What happens if I refer friends?", answer: "Every referral moves you 10 spots up the list. Refer 5 friends and jump 50 positions instantly." },
        { question: "Will I lose my spot if I miss the launch email?", answer: "No. Your spot is saved for 30 days after your invite goes out. We'll send reminders." },
      ] } },
      { id: "s3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#f59e0b", textColor: "#0c0a09" }, content: { heading: "Don't Miss Your Spot", subheading: "2,847 people are ahead of you. Join now and start moving up the list.", ctaText: "Reserve My Early Access Spot", ctaUrl: "#" } },
      { id: "s3-footer", type: "footer", styles: { ...S(48, 48), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { logo: "LaunchKit", columns: [{ title: "Company", links: [{ label: "About", url: "#" }, { label: "Blog", url: "#" }, { label: "Roadmap", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 LaunchKit. All rights reserved." } },
    ],
  },

  // ─── saas-4: Developer Tool ───────────────────
  {
    id: "saas-4", name: "Developer Tool", category: "SaaS", emoji: "⚙️",
    description: "Dark terminal-style landing for CLI tools, dev platforms, and open-source projects.",
    tags: ["saas", "developer", "cli", "dark", "technical"], isPro: false,
    globalStyles: { primaryColor: "#22c55e", secondaryColor: "#0a0a0a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "s4-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0a0a0a", textColor: "#e2e8f0" }, content: { logo: "devkit", menuItems: [{ label: "Docs", url: "#" }, { label: "GitHub", url: "#" }, { label: "Blog", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "npm install devkit", ctaUrl: "#", sticky: true } },
      { id: "s4-hero", type: "hero", styles: { ...S(100, 100), backgroundColor: "#0a0a0a", textColor: "#e2e8f0" }, content: { badge: "⚙️ v2.0 released — 40% faster builds", headline: "The Developer Toolkit That Just Works", subheadline: "Stop fighting your toolchain. devkit gives you blazing-fast builds, zero-config deploys, and a CLI you'll actually enjoy using.", ctaText: "Get Started Free", ctaUrl: "#", secondaryCtaText: "View on GitHub", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "s4-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#111111", textColor: "#e2e8f0" }, content: { heading: "", stats: [{ value: 50000, label: "Developers", suffix: "+" }, { value: 2800000, label: "Builds Per Month", suffix: "+" }, { value: 99.9, label: "Build Success Rate", suffix: "%" }, { value: 340, label: "ms Avg Build Time", suffix: "ms" }] } },
      { id: "s4-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0a0a0a", textColor: "#e2e8f0" }, content: { heading: "Built for Speed. Loved by Teams.", subheading: "Everything a modern development team needs, with none of the bloat.", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Lightning Builds", description: "Incremental compilation and smart caching means 90% of your builds finish under 1 second." },
        { icon: "globe", title: "Zero-Config Deploy", description: "One command deploys to any cloud: AWS, GCP, Azure, Vercel, Fly.io. No YAML required." },
        { icon: "shield", title: "Secret Management", description: "Built-in secrets vault with environment isolation. Never commit credentials again." },
        { icon: "code", title: "Language Agnostic", description: "Node, Python, Go, Rust, Ruby — devkit speaks your language. Full monorepo support included." },
        { icon: "layers", title: "Preview Environments", description: "Every PR gets a live preview URL automatically. Share with clients before merging." },
        { icon: "bar-chart-3", title: "Build Analytics", description: "Spot slow tests, flaky builds, and bottlenecks with real-time build performance dashboards." },
      ] } },
      { id: "s4-howitworks", type: "features", styles: { ...S(80, 80), backgroundColor: "#111111", textColor: "#e2e8f0" }, content: { heading: "Install Once. Use Everywhere.", subheading: "Get up and running in under 5 minutes.", layout: "grid", columns: 3, features: [
        { icon: "code", title: "1. Install the CLI", description: "Run `npm install -g devkit` or use our one-liner install script. Works on Mac, Linux, and Windows." },
        { icon: "settings", title: "2. Init Your Project", description: "Run `devkit init` in any project directory. Auto-detects your stack and configures everything." },
        { icon: "zap", title: "3. Build & Deploy", description: "Run `devkit deploy`. That's it. Your app is live with HTTPS, custom domain, and CDN." },
      ] } },
      { id: "s4-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0a0a0a", textColor: "#e2e8f0" }, content: { heading: "Devs Love It", layout: "grid", testimonials: [
        { name: "Tomas Varga", role: "Senior Engineer", company: "Shopify", content: "Replaced our 800-line Makefile with a single devkit.json. Build times dropped from 4 min to 18 seconds.", rating: 5 },
        { name: "Aisha Johnson", role: "Platform Engineer", company: "Cloudflare", content: "The preview environments feature alone saved our team hours of back-and-forth every week.", rating: 5 },
        { name: "Dan Luu", role: "Indie Dev", company: "Open Source", content: "I've tried everything. devkit is the first tool that actually respects my time and stays out of my way.", rating: 5 },
      ] } },
      { id: "s4-pricing", type: "pricing", styles: { ...S(80, 80), backgroundColor: "#111111", textColor: "#e2e8f0" }, content: { heading: "Pricing", subheading: "Free for individuals. Built for teams.", plans: [
        { name: "Open Source", price: 0, period: "month", features: ["Unlimited projects", "100 builds/month", "Community support", "Public repos only", "devkit CLI"], ctaText: "Start Free" },
        { name: "Pro", price: 19, period: "month", features: ["Unlimited builds", "Private repos", "Preview environments", "Secret vault", "Priority support", "Build analytics"], ctaText: "Start Pro", highlighted: true },
        { name: "Team", price: 59, period: "month", features: ["Everything in Pro", "5 team members", "SSO", "Audit logs", "Custom domains", "Dedicated Slack"], ctaText: "Start Team Trial" },
      ] } },
      { id: "s4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#22c55e", textColor: "#0a0a0a" }, content: { heading: "Start Building Faster Today", subheading: "50,000+ developers already ship with devkit. Join them in 5 minutes.", ctaText: "npm install -g devkit", ctaUrl: "#" } },
      { id: "s4-footer", type: "footer", styles: { ...S(48, 48), backgroundColor: "#0a0a0a", textColor: "#e2e8f0" }, content: { logo: "devkit", columns: [{ title: "Docs", links: [{ label: "Getting Started", url: "#" }, { label: "CLI Reference", url: "#" }, { label: "API", url: "#" }] }, { title: "Community", links: [{ label: "GitHub", url: "#" }, { label: "Discord", url: "#" }, { label: "Blog", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 devkit. MIT Licensed." } },
    ],
  },

  // ─── saas-5: Chrome Extension ─────────────────
  {
    id: "saas-5", name: "Chrome Extension", category: "SaaS", emoji: "🔌",
    description: "Lightweight landing for browser extensions — install CTA, feature list, and user reviews.",
    tags: ["saas", "extension", "chrome", "light", "minimal"], isPro: false,
    globalStyles: { primaryColor: "#4f46e5", secondaryColor: "#1e293b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "s5-header", type: "header", styles: S(16, 16), content: { logo: "TabFlow", menuItems: [{ label: "Features", url: "#" }, { label: "Reviews", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "Add to Chrome — Free", ctaUrl: "#", sticky: true } },
      { id: "s5-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { badge: "⭐ 4.9/5 · 14,000+ users · Chrome Web Store", headline: "Your Browser's Missing Superpower", subheadline: "TabFlow supercharges your Chrome with AI tab management, one-click sessions, and a productivity dashboard — right in your browser.", ctaText: "Add to Chrome — It's Free", ctaUrl: "#", secondaryCtaText: "Watch 90-Second Demo", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "s5-logos", type: "social-proof", styles: S(32, 32), content: { heading: "Used daily by people at", layout: "logos", items: ["Google", "Microsoft", "Atlassian", "Notion", "Shopify", "HubSpot"] } },
      { id: "s5-features", type: "features", styles: S(80, 80), content: { heading: "Everything in One Click", subheading: "No new apps. No new tabs. Just a smarter browser.", layout: "grid", columns: 3, features: [
        { icon: "layers", title: "Smart Tab Groups", description: "AI auto-groups your tabs by project, topic, or workflow. Find anything instantly." },
        { icon: "sparkles", title: "AI Summaries", description: "Paste a link and get a 3-sentence summary in 2 seconds. Never read a bad article again." },
        { icon: "zap", title: "1-Click Sessions", description: "Save your entire browser state and restore it later. Switch between work, research, and play." },
        { icon: "bar-chart-3", title: "Focus Mode", description: "Block distracting sites with one click. Set a timer and let TabFlow keep you on track." },
        { icon: "search", title: "Universal Search", description: "Search across all your open tabs, bookmarks, and history with one keyboard shortcut." },
        { icon: "shield", title: "Privacy First", description: "100% local processing. Your tabs and browsing data never leave your device. Ever." },
      ] } },
      { id: "s5-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Numbers That Matter", stats: [{ value: 14000, label: "Active Users", suffix: "+" }, { value: 4.9, label: "Chrome Store Rating", suffix: "/5" }, { value: 45, label: "Minutes Saved Per Day", suffix: "min" }, { value: 2000000, label: "Tabs Managed", suffix: "+" }] } },
      { id: "s5-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { heading: "14,000 Happier Browsers", layout: "grid", testimonials: [
        { name: "Chris Walsh", role: "Designer", company: "Figma", content: "I had 200 tabs open every day. TabFlow got me to 12. I'm a completely different person now.", rating: 5 },
        { name: "Nadia Osei", role: "Researcher", company: "Stanford", content: "The AI summaries save me at least 2 hours a week. I can't do research without TabFlow anymore.", rating: 5 },
        { name: "Ben Shapiro", role: "Founder", company: "Micro SaaS", content: "Saved my entire browser state before a vacation. Came back and picked up exactly where I left off.", rating: 5 },
      ] } },
      { id: "s5-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Free Forever, Pro When You Need It", subheading: "The core features are always free. Upgrade for power-user extras.", plans: [
        { name: "Free", price: 0, period: "month", features: ["Unlimited tab groups", "5 saved sessions", "Basic search", "Focus mode (30 min)", "Local processing"], ctaText: "Add to Chrome Free" },
        { name: "Pro", price: 5, period: "month", features: ["Everything in Free", "Unlimited sessions", "AI summaries (unlimited)", "Cross-device sync", "Priority support", "Early feature access"], ctaText: "Start 14-Day Trial", highlighted: true },
      ] } },
      { id: "s5-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Common Questions", items: [
        { question: "Does TabFlow work on Firefox or Safari?", answer: "Currently Chrome and Edge only. Firefox support is on our roadmap for Q4 2026." },
        { question: "Is my browsing data private?", answer: "Yes. All processing is local. We never see your tabs, URLs, or browsing history." },
        { question: "Does it slow down my browser?", answer: "No. TabFlow uses lazy loading and runs in a separate process. Most users see no performance impact." },
        { question: "Can I use it on multiple computers?", answer: "Pro plan includes cross-device sync via your account. Free plan is device-local only." },
      ] } },
      { id: "s5-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#4f46e5", textColor: "#ffffff" }, content: { heading: "Join 14,000 Happier Chrome Users", subheading: "Free to install. No account required. Works in 10 seconds.", ctaText: "Add TabFlow to Chrome — Free", ctaUrl: "#" } },
      { id: "s5-footer", type: "footer", styles: S(48, 48), content: { logo: "TabFlow", columns: [{ title: "Extension", links: [{ label: "Features", url: "#" }, { label: "Changelog", url: "#" }, { label: "Roadmap", url: "#" }] }, { title: "Support", links: [{ label: "Help Center", url: "#" }, { label: "Contact", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 TabFlow. All rights reserved." } },
    ],
  },

  // ─── saas-6: API Product ──────────────────────
  {
    id: "saas-6", name: "API Product", category: "SaaS", emoji: "🔗",
    description: "Technical API product landing with docs-style layout, code snippets, and usage-based pricing.",
    tags: ["saas", "api", "developer", "dark", "technical"], isPro: true,
    globalStyles: { primaryColor: "#06b6d4", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "s6-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { logo: "NexusAPI", menuItems: [{ label: "Docs", url: "#" }, { label: "Endpoints", url: "#" }, { label: "Pricing", url: "#" }, { label: "Status", url: "#" }], ctaText: "Get API Key", ctaUrl: "#", sticky: true } },
      { id: "s6-hero", type: "hero", styles: { ...S(100, 100), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { badge: "🔗 REST & GraphQL · 99.99% uptime · SOC2", headline: "The API That Powers Modern Apps", subheadline: "One API to handle authentication, payments, notifications, and analytics. Ship your product 10x faster without building backend infrastructure from scratch.", ctaText: "Get Your Free API Key", ctaUrl: "#", secondaryCtaText: "Read the Docs", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "s6-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#0f172a", textColor: "#e2e8f0" }, content: { heading: "Powering apps at", layout: "logos", items: ["Stripe", "Twilio", "Cloudflare", "Vercel", "PlanetScale", "Resend"] } },
      { id: "s6-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { heading: "", stats: [{ value: 5000000000, label: "API Calls Per Month", suffix: "B+" }, { value: 99.99, label: "Uptime SLA", suffix: "%" }, { value: 28, label: "ms Avg Response Time", suffix: "ms" }, { value: 8000, label: "Developers", suffix: "+" }] } },
      { id: "s6-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0f172a", textColor: "#e2e8f0" }, content: { heading: "One API. Every Feature You Need.", subheading: "Stop building infrastructure. Start building your product.", layout: "grid", columns: 3, features: [
        { icon: "shield", title: "Auth & Identity", description: "Social login, magic links, MFA, and JWT sessions out of the box. Supports all OAuth providers." },
        { icon: "zap", title: "Payments", description: "Charge cards, manage subscriptions, and handle webhooks. Stripe-compatible API surface." },
        { icon: "mail", title: "Transactional Email", description: "Send beautiful emails with templates, tracking, and deliverability built in. 99% inbox rate." },
        { icon: "bar-chart-3", title: "Analytics Events", description: "Track user actions, funnels, and revenue with a single event call. Integrates with any BI tool." },
        { icon: "database", title: "File Storage", description: "Upload, transform, and serve images and files globally via CDN. Auto-resizing built in." },
        { icon: "globe", title: "Webhooks", description: "Reliable event delivery with automatic retries, signatures, and a visual delivery log." },
      ] } },
      { id: "s6-howitworks", type: "features", styles: { ...S(80, 80), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { heading: "Integrate in Minutes", subheading: "SDKs for every major language. One import and you're ready.", layout: "grid", columns: 3, features: [
        { icon: "code", title: "1. Install the SDK", description: "npm install nexus-api or pip install nexus-api. Official SDKs for JS, Python, Go, Ruby, and PHP." },
        { icon: "settings", title: "2. Add Your API Key", description: "Copy your key from the dashboard, add it to your environment. One environment variable is all it takes." },
        { icon: "zap", title: "3. Call the API", description: "nexus.auth.login(), nexus.pay.charge(), nexus.email.send(). Clear, consistent, and documented." },
      ] } },
      { id: "s6-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#e2e8f0" }, content: { heading: "Built By Developers, For Developers", layout: "grid", testimonials: [
        { name: "Karl Müller", role: "CTO", company: "FinShift", content: "We replaced 6 separate services with NexusAPI. Our backend is now 2,000 lines instead of 18,000.", rating: 5 },
        { name: "Sophie Grant", role: "Full Stack Dev", company: "Solo Founder", content: "I launched my SaaS in a weekend. Auth, payments, emails — all done with one API and great docs.", rating: 5 },
        { name: "Leon Park", role: "Platform Lead", company: "RetailOS", content: "5 billion calls a month and not a single outage in 14 months. The SLA isn't just a promise — it's real.", rating: 5 },
      ] } },
      { id: "s6-pricing", type: "pricing", styles: { ...S(80, 80), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { heading: "Usage-Based Pricing", subheading: "Pay only for what you use. No minimums. No surprises.", plans: [
        { name: "Sandbox", price: 0, period: "month", features: ["10,000 API calls/month", "All endpoints included", "Community support", "No credit card", "Rate limited"], ctaText: "Start Free" },
        { name: "Growth", price: 49, period: "month", features: ["1M API calls included", "$0.02 per 1k after", "All endpoints", "Email support", "Webhooks", "99.9% SLA"], ctaText: "Start Growth", highlighted: true },
        { name: "Scale", price: 299, period: "month", features: ["10M API calls included", "$0.01 per 1k after", "Priority support", "Custom SLA", "Dedicated IP", "SOC2 Report"], ctaText: "Talk to Sales" },
      ] } },
      { id: "s6-faq", type: "faq", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#e2e8f0" }, content: { heading: "Technical FAQs", items: [
        { question: "What's the rate limit on the free plan?", answer: "Free (Sandbox) plan is rate-limited to 100 requests/minute and 10,000/month. Paid plans have much higher limits." },
        { question: "Do you have an uptime SLA?", answer: "Growth plan includes 99.9% SLA. Scale plan includes 99.99% SLA with financial credits if we miss it." },
        { question: "Is the API REST or GraphQL?", answer: "Both. Every endpoint is available as REST (JSON) and GraphQL. Choose what fits your stack." },
        { question: "Where is data stored?", answer: "US East by default. EU and Asia-Pacific regions available on Growth and Scale plans." },
        { question: "Can I self-host?", answer: "Enterprise plans include a Docker-based self-hosted deployment option with full source code access." },
      ] } },
      { id: "s6-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#06b6d4", textColor: "#020617" }, content: { heading: "Get Your Free API Key Now", subheading: "10,000 free calls/month. No credit card. Full API access from day one.", ctaText: "Generate Free API Key", ctaUrl: "#" } },
      { id: "s6-footer", type: "footer", styles: { ...S(48, 48), backgroundColor: "#020617", textColor: "#e2e8f0" }, content: { logo: "NexusAPI", columns: [{ title: "Docs", links: [{ label: "Quick Start", url: "#" }, { label: "API Reference", url: "#" }, { label: "SDKs", url: "#" }, { label: "Status", url: "#" }] }, { title: "Product", links: [{ label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }, { label: "Roadmap", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "DPA", url: "#" }] }], copyright: "© 2026 NexusAPI. All rights reserved." } },
    ],
  },


  // ══════════════════════════════════════════════
  // NICHE 2 — Agency / Freelance (5 templates)
  // ══════════════════════════════════════════════

  // ─── agency-1: Creative Agency ────────────────
  {
    id: "agency-1", name: "Creative Agency", category: "Agency", emoji: "🎨",
    description: "Bold portfolio-driven agency site with work grid, services, team, and case study results.",
    tags: ["agency", "portfolio", "bold", "dark"], isPro: false,
    globalStyles: { primaryColor: "#f97316", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "ag1-header", type: "header", styles: S(16, 16), content: { logo: "CREA.", menuItems: [{ label: "Work", url: "#" }, { label: "Services", url: "#" }, { label: "Team", url: "#" }, { label: "Contact", url: "#" }], ctaText: "Start a Project", ctaUrl: "#", sticky: true } },
      { id: "ag1-hero", type: "hero", styles: { ...S(120, 100), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { badge: "🎨 Award-winning creative studio — Est. 2018", headline: "We Craft Brands That Turn Heads", subheadline: "Strategic design and digital experiences for ambitious brands. From identity to launch, we do it all — beautifully.", ctaText: "See Our Work", ctaUrl: "#", secondaryCtaText: "Get a Quote", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "ag1-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "Trusted by brands like", layout: "logos", items: ["Nike", "Spotify", "Airbnb", "Dropbox", "Mailchimp", "Intercom"] } },
      { id: "ag1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 200, label: "Projects Delivered", suffix: "+" }, { value: 98, label: "Client Satisfaction", suffix: "%" }, { value: 7, label: "Years of Excellence", suffix: "" }, { value: 24, label: "Design Awards Won", suffix: "" }] } },
      { id: "ag1-services", type: "features", styles: S(80, 80), content: { heading: "What We Create", subheading: "Full-service creative solutions for every touchpoint", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Brand Identity", description: "Logos, visual systems, and guidelines that make you instantly recognizable in any market." },
        { icon: "globe", title: "Web Design & Dev", description: "Pixel-perfect websites and web apps that perform as beautifully as they look." },
        { icon: "bar-chart-3", title: "Digital Marketing", description: "Campaigns across SEO, paid, social, and email that generate real, measurable results." },
        { icon: "users", title: "UX Research", description: "Deep user research, journey mapping, and usability testing to build products people love." },
        { icon: "sparkles", title: "Motion & Video", description: "Brand films, explainers, and social content that stop the scroll and tell your story." },
        { icon: "layers", title: "Print & Packaging", description: "Physical brand collateral that carries the same quality as your digital presence." },
      ] } },
      { id: "ag1-work", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Selected Work", layout: "grid", columns: 3, images: [] } },
      { id: "ag1-team", type: "team", styles: { ...S(80, 80), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "The Minds Behind the Magic", layout: "grid", members: [
        { name: "Maya Hartwell", role: "Founder & Creative Director", bio: "Former Apple designer with 14 years crafting iconic brand identities.", photoUrl: "" },
        { name: "Leo Sánchez", role: "Head of Strategy", bio: "Ex-McKinsey. Turns brand challenges into growth opportunities.", photoUrl: "" },
        { name: "Zoe Nakamura", role: "Lead Developer", bio: "Full-stack engineer obsessed with performance and pixel perfection.", photoUrl: "" },
        { name: "Finn O'Reilly", role: "Motion Director", bio: "Award-winning animator. If it moves, Finn made it mesmerizing.", photoUrl: "" },
      ] } },
      { id: "ag1-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "What Clients Say", layout: "grid", testimonials: [
        { name: "Rachel Kim", role: "CMO", company: "Luminary", content: "CREA. didn't just redesign our brand — they redefined how our entire market sees us. Revenue up 40%.", rating: 5 },
        { name: "James Okafor", role: "Founder", company: "Parkway", content: "They delivered a brand identity in 3 weeks that felt like it had existed for decades. Truly world-class.", rating: 5 },
        { name: "Sofia Ito", role: "VP Marketing", company: "Pulse Health", content: "Best agency we've ever worked with. Fast, collaborative, and the output is always beyond expectations.", rating: 5 },
      ] } },
      { id: "ag1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#f97316", textColor: "#ffffff" }, content: { heading: "Ready to Build Something Iconic?", subheading: "We take on 4 new clients per quarter. Spots are limited.", ctaText: "Apply to Work With Us", ctaUrl: "#" } },
      { id: "ag1-footer", type: "footer", styles: { ...S(48, 48), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "CREA.", columns: [{ title: "Services", links: [{ label: "Branding", url: "#" }, { label: "Web Design", url: "#" }, { label: "Motion", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Work", url: "#" }, { label: "Careers", url: "#" }] }, { title: "Contact", links: [{ label: "Start a Project", url: "#" }, { label: "hello@crea.studio", url: "#" }] }], copyright: "© 2026 CREA. Studio. All rights reserved." } },
    ],
  },

  // ─── agency-2: Marketing Agency ───────────────
  {
    id: "agency-2", name: "Marketing Agency", category: "Agency", emoji: "📈",
    description: "Results-driven marketing agency with ROI stats, case studies, services, and lead capture.",
    tags: ["agency", "marketing", "b2b", "professional"], isPro: false,
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "ag2-header", type: "header", styles: S(16, 16), content: { logo: "GrowthLab", menuItems: [{ label: "Services", url: "#" }, { label: "Results", url: "#" }, { label: "About", url: "#" }, { label: "Blog", url: "#" }], ctaText: "Get Free Audit", ctaUrl: "#", sticky: true } },
      { id: "ag2-hero", type: "hero", styles: { ...S(110, 100), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "📈 500+ brands grown — $2B+ in client revenue", headline: "We Don't Run Campaigns. We Build Growth Engines.", subheadline: "Data-driven digital marketing that compounds. SEO, paid media, email, and CRO — all working together to scale your revenue.", ctaText: "Get a Free Growth Audit", ctaUrl: "#", secondaryCtaText: "See Case Studies", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ag2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 2000000000, label: "Revenue Generated", prefix: "$" }, { value: 500, label: "Brands Scaled", suffix: "+" }, { value: 340, label: "Avg. ROAS Delivered", suffix: "%" }, { value: 92, label: "Client Retention Rate", suffix: "%" }] } },
      { id: "ag2-services", type: "features", styles: S(80, 80), content: { heading: "Growth Services That Move the Needle", subheading: "Every channel. Every stage. One agency.", layout: "grid", columns: 3, features: [
        { icon: "search", title: "SEO & Content", description: "Rank for the keywords your customers are searching. We build topical authority that compounds over time." },
        { icon: "zap", title: "Paid Media", description: "Google, Meta, TikTok, LinkedIn — profitable ad campaigns managed by certified specialists." },
        { icon: "mail", title: "Email & Automation", description: "Revenue-generating email flows and campaigns. Average 38x ROI across our client portfolio." },
        { icon: "bar-chart-3", title: "CRO & Analytics", description: "Turn more of your existing traffic into buyers. We test everything and keep what works." },
        { icon: "users", title: "Social Media", description: "Organic social strategy and management that builds community and drives qualified pipeline." },
        { icon: "globe", title: "Affiliate & Partnerships", description: "Build a performance channel of affiliates and partners who get paid only when they drive results." },
      ] } },
      { id: "ag2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Real Results. Real Clients.", layout: "grid", testimonials: [
        { name: "Tyler Banks", role: "CEO", company: "CartUp", content: "GrowthLab took us from $50k to $400k/month in revenue in 14 months. The ROI on our engagement is insane.", rating: 5 },
        { name: "Priya Mehta", role: "Head of Growth", company: "Fenix SaaS", content: "Our CAC dropped by 60% and LTV doubled after implementing their full-funnel strategy. Life-changing.", rating: 5 },
        { name: "Carlos Vega", role: "Founder", company: "UrbanThreads", content: "Best marketing investment we've ever made. Month 1 was slow, but by month 3 we had our best quarter ever.", rating: 5 },
      ] } },
      { id: "ag2-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Common Questions", items: [
        { question: "How long before we see results?", answer: "Paid channels typically show results in 30-60 days. SEO compounds over 3-6 months. We set realistic expectations on day one." },
        { question: "Do you work with early-stage startups?", answer: "Yes, but we're most effective with companies doing $50k+/month revenue. Below that, we recommend our Growth Starter package." },
        { question: "What does a typical engagement cost?", answer: "Our retainers start at $5,000/month. Enterprise engagements range from $15k-50k/month depending on scope and ad spend managed." },
        { question: "Do you guarantee results?", answer: "We don't promise specific numbers — no ethical agency does. But we do guarantee transparency, clear KPIs, and our work until we hit agreed targets." },
      ] } },
      { id: "ag2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#2563eb", textColor: "#ffffff" }, content: { heading: "Let's Audit Your Growth Potential", subheading: "Free 30-minute growth audit. No pitch. Just honest feedback and a clear plan.", ctaText: "Book Free Audit Call", ctaUrl: "#" } },
      { id: "ag2-footer", type: "footer", styles: S(48, 48), content: { logo: "GrowthLab", columns: [{ title: "Services", links: [{ label: "SEO", url: "#" }, { label: "Paid Media", url: "#" }, { label: "Email", url: "#" }, { label: "CRO", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Case Studies", url: "#" }, { label: "Blog", url: "#" }] }, { title: "Contact", links: [{ label: "Get Audit", url: "#" }, { label: "hello@growthlab.co", url: "#" }] }], copyright: "© 2026 GrowthLab. All rights reserved." } },
    ],
  },

  // ─── agency-3: Design Studio ──────────────────
  {
    id: "agency-3", name: "Design Studio", category: "Agency", emoji: "✏️",
    description: "Minimal white-space design studio with clean typography, portfolio grid, and elegant CTA.",
    tags: ["agency", "design", "minimal", "light"], isPro: false,
    globalStyles: { primaryColor: "#18181b", secondaryColor: "#ffffff", fontFamily: "Inter", headingFont: "Inter", borderRadius: 4, baseFontSize: 17 },
    blocks: [
      { id: "ag3-header", type: "header", styles: S(20, 20), content: { logo: "Form & Function", menuItems: [{ label: "Work", url: "#" }, { label: "Studio", url: "#" }, { label: "Process", url: "#" }], ctaText: "Let's Talk", ctaUrl: "#", sticky: true } },
      { id: "ag3-hero", type: "hero", styles: { ...S(140, 120), textColor: "#18181b" }, content: { headline: "Design That Respects Intelligence", subheadline: "We create thoughtful digital experiences for companies that care about craft. Less noise. More meaning. Always intentional.", ctaText: "View Selected Work", ctaUrl: "#", secondaryCtaText: "Our Process →", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "ag3-logos", type: "social-proof", styles: { ...S(24, 24), backgroundColor: "#f4f4f5", textColor: "#18181b" }, content: { heading: "Studio partners", layout: "logos", items: ["Basecamp", "Linear", "Framer", "Loom", "Pitch", "Cron"] } },
      { id: "ag3-work", type: "gallery", styles: { ...S(80, 80), textColor: "#18181b" }, content: { heading: "Selected Work", layout: "grid", columns: 3, images: [] } },
      { id: "ag3-services", type: "features", styles: { ...S(80, 80), backgroundColor: "#f4f4f5", textColor: "#18181b" }, content: { heading: "How We Work", subheading: "Three things we do. All done obsessively well.", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "Visual Identity", description: "Logos, type, color, motion — a cohesive system that travels from screen to print with equal grace." },
        { icon: "globe", title: "Product Design", description: "Interface design, design systems, and prototypes for software products that feel inevitable to use." },
        { icon: "layers", title: "Web Presence", description: "Bespoke websites coded to pixel perfection. Fast, accessible, and built to last." },
      ] } },
      { id: "ag3-team", type: "team", styles: { ...S(), textColor: "#18181b" }, content: { heading: "The Studio", layout: "grid", members: [
        { name: "Elara Voss", role: "Creative Director", bio: "14 years. Ex-Pentagram. Believes constraints are where creativity lives.", photoUrl: "" },
        { name: "Riku Tanaka", role: "Interface Designer", bio: "Interaction obsessed. If an animation takes 300ms, he's asked why it isn't 240.", photoUrl: "" },
        { name: "Amara Diallo", role: "Developer", bio: "Writes code the way designers write briefs — with intention and discipline.", photoUrl: "" },
      ] } },
      { id: "ag3-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#18181b", textColor: "#ffffff" }, content: { heading: "Studio Testimonials", layout: "grid", testimonials: [
        { name: "Claus Berg", role: "CEO", company: "Odalys", content: "Form & Function didn't redesign our product. They reframed how our customers understand it. Entirely different thing.", rating: 5 },
        { name: "Nina Walsh", role: "Founder", company: "Elio", content: "The restraint in their work is what impressed me most. Every decision has a reason. Nothing is decorative.", rating: 5 },
        { name: "David Hu", role: "CPO", company: "Centa", content: "We've worked with 6 design studios. None came close to this level of thinking and output.", rating: 5 },
      ] } },
      { id: "ag3-cta", type: "cta", styles: { ...S(100, 100), backgroundColor: "#18181b", textColor: "#ffffff" }, content: { heading: "Start a Conversation", subheading: "We're selective about the work we take on. If you care about craft, we'd love to hear from you.", ctaText: "Send Us a Brief", ctaUrl: "#" } },
      { id: "ag3-footer", type: "footer", styles: S(48, 48), content: { logo: "Form & Function", columns: [{ title: "Studio", links: [{ label: "Work", url: "#" }, { label: "Process", url: "#" }, { label: "About", url: "#" }] }, { title: "Contact", links: [{ label: "Start a Project", url: "#" }, { label: "studio@formfunction.co", url: "#" }] }], copyright: "© 2026 Form & Function Studio." } },
    ],
  },

  // ─── agency-4: Freelancer Portfolio ───────────
  {
    id: "agency-4", name: "Freelancer Portfolio", category: "Agency", emoji: "👤",
    description: "Personal brand landing page for freelancers — skills, portfolio, process, and hire-me CTA.",
    tags: ["freelance", "portfolio", "personal", "minimal"], isPro: false,
    globalStyles: { primaryColor: "#8b5cf6", secondaryColor: "#1e1b4b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "ag4-header", type: "header", styles: S(16, 16), content: { logo: "Alex Parker", menuItems: [{ label: "Work", url: "#" }, { label: "Skills", url: "#" }, { label: "About", url: "#" }], ctaText: "Hire Me", ctaUrl: "#", sticky: true } },
      { id: "ag4-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { badge: "✅ Available for projects — Starting May 2026", headline: "Product Designer & Creative Developer", subheadline: "I design interfaces that feel effortless and build products that work flawlessly. 6 years. 50+ clients. Zero late deliveries.", ctaText: "See My Work", ctaUrl: "#", secondaryCtaText: "Download CV", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "ag4-stats", type: "stats", styles: { ...S(40, 40), backgroundColor: "#2e1065", textColor: "#e0e7ff" }, content: { heading: "", stats: [{ value: 50, label: "Clients Served", suffix: "+" }, { value: 6, label: "Years Experience", suffix: "" }, { value: 100, label: "On-Time Delivery Rate", suffix: "%" }, { value: 4.9, label: "Average Rating", suffix: "/5" }] } },
      { id: "ag4-services", type: "features", styles: { ...S(80, 80), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { heading: "What I Do Best", subheading: "Specialized skills. Real results.", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "UI/UX Design", description: "Clean, modern interfaces for web and mobile apps built with Figma. Prototypes included." },
        { icon: "code", title: "Frontend Dev", description: "React, Next.js, and Tailwind CSS. I design AND build, so no translation loss." },
        { icon: "star", title: "Brand Identity", description: "Logos, palettes, and typography systems for startups and personal brands." },
        { icon: "globe", title: "Webflow & Framer", description: "No-code sites with code-level quality. SEO ready, fast, and easy to manage." },
        { icon: "bar-chart-3", title: "Design Systems", description: "Scalable component libraries in Figma and code for growing product teams." },
        { icon: "users", title: "Consulting", description: "Fractional design leadership, team reviews, and product strategy sessions." },
      ] } },
      { id: "ag4-work", type: "gallery", styles: S(80, 80), content: { heading: "Recent Projects", layout: "grid", columns: 3, images: [] } },
      { id: "ag4-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#2e1065", textColor: "#e0e7ff" }, content: { heading: "What Clients Say", layout: "grid", testimonials: [
        { name: "Chloe Davis", role: "Co-Founder", company: "Orbit", content: "Alex took our rough wireframes and turned them into something we were genuinely proud to ship. Fast and painless.", rating: 5 },
        { name: "Rajan Patel", role: "CEO", company: "Helio", content: "Hired as a designer, delivered like a full product team. Thinking, strategy, execution — all at the highest level.", rating: 5 },
        { name: "Emma Schulz", role: "Product Lead", company: "Wavr", content: "The best freelancer I've hired in 10 years of building products. Responsive, opinionated in the right ways, and excellent.", rating: 5 },
      ] } },
      { id: "ag4-faq", type: "faq", styles: { ...S(), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { heading: "Working Together", items: [
        { question: "What's your typical project timeline?", answer: "Brand identities take 2-3 weeks. Full website design and dev takes 4-8 weeks. Smaller scopes can be faster." },
        { question: "How do you charge?", answer: "Project-based pricing for defined scopes. Monthly retainers for ongoing partnerships. No hourly surprises." },
        { question: "Do you take on small projects?", answer: "Yes. My minimum engagement is $1,500. Anything smaller than that isn't a good use of either of our time." },
        { question: "Can you work in our Figma / codebase?", answer: "Absolutely. I'm used to jumping into existing design systems and codebases and getting up to speed quickly." },
      ] } },
      { id: "ag4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#8b5cf6", textColor: "#ffffff" }, content: { heading: "Let's Build Something Together", subheading: "Tell me about your project. I respond to every message within 24 hours.", ctaText: "Get in Touch", ctaUrl: "#" } },
      { id: "ag4-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#1e1b4b", textColor: "#e0e7ff" }, content: { logo: "Alex Parker", columns: [{ title: "Services", links: [{ label: "UI/UX Design", url: "#" }, { label: "Development", url: "#" }, { label: "Brand Identity", url: "#" }] }, { title: "Links", links: [{ label: "Portfolio", url: "#" }, { label: "Dribbble", url: "#" }, { label: "LinkedIn", url: "#" }] }], copyright: "© 2026 Alex Parker. Designed & Built by me." } },
    ],
  },

  // ─── agency-5: Video Production ───────────────
  {
    id: "agency-5", name: "Video Production", category: "Agency", emoji: "🎬",
    description: "Cinematic dark landing for video agencies — showreel, services, client logos, and project CTA.",
    tags: ["agency", "video", "cinematic", "dark", "creative"], isPro: true,
    globalStyles: { primaryColor: "#ef4444", secondaryColor: "#0a0a0a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "ag5-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "FRAME°", menuItems: [{ label: "Reel", url: "#" }, { label: "Work", url: "#" }, { label: "Services", url: "#" }, { label: "Contact", url: "#" }], ctaText: "Start a Project", ctaUrl: "#", sticky: true } },
      { id: "ag5-hero", type: "hero", styles: { ...S(130, 110), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { badge: "🎬 Emmy-nominated production studio — LA & NYC", headline: "Stories That Move People", subheadline: "Brand films, commercials, and social content that stop the scroll and start conversations. Every frame deliberate. Every second earned.", ctaText: "Watch Our Reel", ctaUrl: "#", secondaryCtaText: "Start a Project", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ag5-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "Produced for", layout: "logos", items: ["Netflix", "Google", "Apple", "Nike", "Red Bull", "Adidas"] } },
      { id: "ag5-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 350, label: "Productions Completed", suffix: "+" }, { value: 2000000000, label: "Video Views Generated", suffix: "B+" }, { value: 12, label: "Industry Awards", suffix: "" }, { value: 10, label: "Years in Business", suffix: "" }] } },
      { id: "ag5-services", type: "features", styles: { ...S(80, 80), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "What We Produce", subheading: "From concept to final cut — we handle every frame", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Brand Films", description: "Cinematic brand stories that communicate your values, culture, and vision in 60-180 seconds." },
        { icon: "zap", title: "TV Commercials", description: "Broadcast-ready commercials engineered to convert — from storyboard to post-production." },
        { icon: "sparkles", title: "Social Content", description: "Short-form content for Instagram, TikTok, and YouTube that stops scrolling and starts sharing." },
        { icon: "users", title: "Documentary", description: "Long-form documentaries and case study films that build authority and deep brand trust." },
        { icon: "globe", title: "Product Videos", description: "Lifestyle and explainer videos that show your product at its absolute best." },
        { icon: "layers", title: "Event Coverage", description: "Full event production — from multi-cam live streaming to polished post-event highlight reels." },
      ] } },
      { id: "ag5-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "Director's Cut Reviews", layout: "grid", testimonials: [
        { name: "Marcus Cole", role: "CMO", company: "Apex Brands", content: "Our FRAME° brand film has 22 million views organically. No paid spend. Just exceptional storytelling.", rating: 5 },
        { name: "Yuki Oda", role: "Creative Director", company: "Studio N", content: "Working with FRAME° is like having a Hollywood crew with startup speed and startup budget-friendliness.", rating: 5 },
        { name: "Laura Bishop", role: "CEO", company: "Verda", content: "They took a complicated product and made it feel emotional and accessible in 90 seconds. Pure craft.", rating: 5 },
      ] } },
      { id: "ag5-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#ef4444", textColor: "#ffffff" }, content: { heading: "Ready to Make Something Memorable?", subheading: "We take 6 new production projects per quarter. Let's talk before spots fill up.", ctaText: "Start Your Project", ctaUrl: "#" } },
      { id: "ag5-footer", type: "footer", styles: { ...S(48, 48), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "FRAME°", columns: [{ title: "Production", links: [{ label: "Brand Films", url: "#" }, { label: "Commercials", url: "#" }, { label: "Social", url: "#" }] }, { title: "Studio", links: [{ label: "About", url: "#" }, { label: "Work", url: "#" }, { label: "Awards", url: "#" }] }, { title: "Contact", links: [{ label: "Start a Project", url: "#" }, { label: "LA: +1 310 555 0100", url: "#" }] }], copyright: "© 2026 FRAME° Productions. All rights reserved." } },
    ],
  },


  // ══════════════════════════════════════════════
  // NICHE 3 — E-commerce / Product (5 templates)
  // ══════════════════════════════════════════════

  // ─── ecom-1: Product Launch ───────────────────
  {
    id: "ecom-1", name: "Product Launch", category: "E-commerce", emoji: "🛍️",
    description: "High-converting single product launch page with urgency, features, reviews, and buy now CTA.",
    tags: ["ecommerce", "product", "launch", "conversion"], isPro: false,
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "ec1-header", type: "header", styles: S(16, 16), content: { logo: "Nova", menuItems: [{ label: "Features", url: "#" }, { label: "Reviews", url: "#" }, { label: "FAQ", url: "#" }], ctaText: "Buy Now — $79", ctaUrl: "#", sticky: true } },
      { id: "ec1-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "🔥 Launch Week — 40% off ends Friday", headline: "The Last Productivity Tool You'll Ever Buy", subheadline: "Nova combines task management, time tracking, and focus sessions into one elegant experience. Built for people who get things done.", ctaText: "Buy Now — $79 (Was $129)", ctaUrl: "#", secondaryCtaText: "Watch Demo", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ec1-logos", type: "social-proof", styles: S(32, 32), content: { heading: "As seen in", layout: "logos", items: ["Product Hunt", "TechCrunch", "Forbes", "Wired", "Fast Company"] } },
      { id: "ec1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "", stats: [{ value: 28000, label: "Customers", suffix: "+" }, { value: 4.9, label: "Average Rating", suffix: "/5" }, { value: 30, label: "Day Money-Back", suffix: "-day" }, { value: 2, label: "Min Setup Time", suffix: " min" }] } },
      { id: "ec1-features", type: "features", styles: S(80, 80), content: { heading: "Everything You Need to Focus", subheading: "No bloat. No steep learning curve. Just clarity.", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Smart Task Engine", description: "Automatically prioritizes your to-do list based on deadlines, importance, and your energy levels." },
        { icon: "bar-chart-3", title: "Focus Sessions", description: "Built-in Pomodoro timer with Spotify integration, focus score tracking, and daily reports." },
        { icon: "shield", title: "Distraction Blocker", description: "Block social media and news sites during focus sessions. Your future self will thank you." },
        { icon: "sparkles", title: "AI Daily Planner", description: "Tell Nova your goals and it builds your perfect day automatically. Adjusted in real time." },
        { icon: "users", title: "Team Sync", description: "Share projects, delegate tasks, and track team progress without leaving the app." },
        { icon: "globe", title: "Works Everywhere", description: "Mac, Windows, iOS, Android, and web. Your tasks follow you. Your progress doesn't reset." },
      ] } },
      { id: "ec1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "28,000 People Are Getting More Done", layout: "grid", testimonials: [
        { name: "Jordan Miles", role: "Founder", company: "Indie Hackers", content: "Nova replaced Notion, Todoist, AND Forest for me. Three apps replaced. One beautiful product.", rating: 5 },
        { name: "Aisha Rahman", role: "Software Engineer", company: "Stripe", content: "I've tried every productivity app. Nova is the first one I've used consistently for 6+ months.", rating: 5 },
        { name: "Marco Bianchi", role: "Designer", company: "Freelance", content: "The AI planner is scary good. It schedules my day better than I ever could on my own.", rating: 5 },
      ] } },
      { id: "ec1-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Questions Before You Buy", items: [
        { question: "Is this a one-time purchase or subscription?", answer: "One-time purchase gets you the desktop app for Mac and Windows. Mobile apps are $0.99/month optional add-on." },
        { question: "What if I don't like it?", answer: "30-day full refund, no questions asked. If it doesn't make you more productive, you don't pay." },
        { question: "Does it work offline?", answer: "Yes. Nova works fully offline. Everything syncs when you're back online." },
        { question: "Can I import my tasks from other apps?", answer: "Yes. One-click import from Notion, Todoist, Things 3, Asana, and plain text files." },
      ] } },
      { id: "ec1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#7c3aed", textColor: "#ffffff" }, content: { heading: "Join 28,000 Focused Professionals", subheading: "Launch week pricing ends Friday. $79 one-time. 30-day guarantee.", ctaText: "Buy Nova Now — $79", ctaUrl: "#" } },
      { id: "ec1-footer", type: "footer", styles: S(40, 40), content: { logo: "Nova", columns: [{ title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }] }, { title: "Support", links: [{ label: "Help Center", url: "#" }, { label: "Contact", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "Refund Policy", url: "#" }] }], copyright: "© 2026 Nova App. All rights reserved." } },
    ],
  },

  // ─── ecom-2: Flash Sale ───────────────────────
  {
    id: "ecom-2", name: "Flash Sale", category: "E-commerce", emoji: "⚡",
    description: "Urgency-driven flash sale page with countdown timer, deep discounts, and social proof.",
    tags: ["ecommerce", "sale", "urgency", "conversion", "dark"], isPro: false,
    globalStyles: { primaryColor: "#ef4444", secondaryColor: "#0a0a0a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "ec2-header", type: "header", styles: { ...S(12, 12), backgroundColor: "#ef4444", textColor: "#ffffff" }, content: { logo: "⚡ FLASH SALE", menuItems: [], ctaText: "Shop Now — 60% OFF", ctaUrl: "#", sticky: true } },
      { id: "ec2-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { badge: "⚡ 72-Hour Flash Sale — Biggest discounts of the year", headline: "60% Off Everything. This Weekend Only.", subheadline: "Premium gear, software, and digital products at prices we've never offered before. No code needed. Discount applied at checkout.", ctaText: "Shop the Sale →", ctaUrl: "#", secondaryCtaText: "See All Deals", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ec2-stats", type: "stats", styles: { ...S(40, 40), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 72, label: "Hours Left in Sale", suffix: "h" }, { value: 60, label: "Off Sitewide", suffix: "%" }, { value: 14000, label: "Items Sold", suffix: "+" }, { value: 30, label: "Day Return Policy", suffix: "d" }] } },
      { id: "ec2-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "Why Shop This Sale", subheading: "Not just discounts — real value from a brand you can trust", layout: "grid", columns: 3, features: [
        { icon: "shield", title: "Price Match Guarantee", description: "Found it cheaper? We'll match any competitor price plus give you an extra 10% off." },
        { icon: "zap", title: "Instant Delivery", description: "Digital products delivered instantly. Physical orders ship same-day on orders before 3pm." },
        { icon: "star", title: "4.9★ Rated Products", description: "Every item in the sale is rated 4.8 stars or above by verified buyers. No junk, ever." },
        { icon: "users", title: "14,000+ Happy Buyers", description: "This sale has served thousands of customers already today. Join them." },
        { icon: "globe", title: "Ship Worldwide", description: "We ship to 140+ countries. Free shipping on all orders over $50." },
        { icon: "heart", title: "30-Day Returns", description: "Changed your mind? Send it back in 30 days for a full refund, no questions asked." },
      ] } },
      { id: "ec2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "What Last Sale's Buyers Said", layout: "grid", testimonials: [
        { name: "Chris Park", role: "Verified Buyer", company: "", content: "Bought 4 items. Everything arrived perfectly. The discount was real — these aren't inflated prices.", rating: 5 },
        { name: "Maria Silva", role: "Verified Buyer", company: "", content: "Been waiting for this sale all year. Got $400 worth of gear for $160. Stoked.", rating: 5 },
        { name: "Ahmed Hassan", role: "Verified Buyer", company: "", content: "Fastest delivery I've ever seen. Ordered at 10am, at my door by 3pm. Unbelievable.", rating: 5 },
      ] } },
      { id: "ec2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#ef4444", textColor: "#ffffff" }, content: { heading: "Don't Let This Pass You By", subheading: "Sale ends when the timer hits zero. No extensions. No exceptions.", ctaText: "Shop All Deals Now →", ctaUrl: "#" } },
      { id: "ec2-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "Flash Sale", columns: [{ title: "Shop", links: [{ label: "All Deals", url: "#" }, { label: "Digital", url: "#" }, { label: "Physical", url: "#" }] }, { title: "Help", links: [{ label: "FAQ", url: "#" }, { label: "Returns", url: "#" }, { label: "Shipping", url: "#" }] }], copyright: "© 2026. Sale ends Sunday 11:59pm EST." } },
    ],
  },

  // ─── ecom-3: Shopify App ──────────────────────
  {
    id: "ecom-3", name: "Shopify App", category: "E-commerce", emoji: "🏪",
    description: "Clean Shopify app landing with features, store screenshots, reviews, and install CTA.",
    tags: ["ecommerce", "shopify", "app", "saas", "light"], isPro: false,
    globalStyles: { primaryColor: "#5c6ac4", secondaryColor: "#1a1f36", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "ec3-header", type: "header", styles: S(16, 16), content: { logo: "CartBoost", menuItems: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Reviews", url: "#" }], ctaText: "Add to Shopify — Free", ctaUrl: "#", sticky: true } },
      { id: "ec3-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#1a1f36", textColor: "#ffffff" }, content: { badge: "⭐ 4.9/5 · 3,200+ Shopify stores · #1 in Upsells", headline: "Turn Every Order Into Two", subheadline: "CartBoost adds AI-powered upsells, cross-sells, and post-purchase offers to your Shopify store. Average merchant sees 23% revenue increase in 30 days.", ctaText: "Add to Shopify — Free to Install", ctaUrl: "#", secondaryCtaText: "See Live Demo", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ec3-logos", type: "social-proof", styles: S(32, 32), content: { heading: "Trusted by 3,200+ Shopify stores", layout: "logos", items: ["Allbirds", "MVMT", "Brooklinen", "Bombas", "Mejuri", "Ridge"] } },
      { id: "ec3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "", stats: [{ value: 3200, label: "Active Stores", suffix: "+" }, { value: 23, label: "Avg Revenue Increase", suffix: "%" }, { value: 4.9, label: "Shopify Store Rating", suffix: "/5" }, { value: 180000000, label: "In Upsell Revenue Generated", prefix: "$" }] } },
      { id: "ec3-features", type: "features", styles: S(80, 80), content: { heading: "Built for Shopify Revenue", subheading: "Every feature designed to increase your average order value", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "AI Upsells", description: "Machine learning recommends the perfect upsell for each customer based on cart and browse history." },
        { icon: "zap", title: "Post-Purchase Offers", description: "One-click upsells after checkout. No re-entering payment info. Highest converting upsell type." },
        { icon: "users", title: "Bundle Builder", description: "Create buy-more-save-more bundles with a visual editor. No code. Live in minutes." },
        { icon: "bar-chart-3", title: "Revenue Analytics", description: "See exactly which upsells are making money, which aren't, and why. Act on data, not guesses." },
        { icon: "globe", title: "A/B Testing", description: "Test different offers, timing, and triggers. CartBoost automatically scales the winning variant." },
        { icon: "shield", title: "Shopify Native", description: "Built on Shopify's checkout extensions. No cart drawer conflicts. No theme issues. Ever." },
      ] } },
      { id: "ec3-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1a1f36", textColor: "#ffffff" }, content: { heading: "Shopify Merchants Love CartBoost", layout: "grid", testimonials: [
        { name: "Sophie Chen", role: "Owner", company: "GlowCo Beauty", content: "Added $18,000 in revenue last month purely from post-purchase upsells. The ROI is honestly embarrassing.", rating: 5 },
        { name: "Jason Wright", role: "Founder", company: "OutdoorKit", content: "Went from $42 AOV to $67 AOV in 6 weeks. That's a 60% increase. CartBoost is our best-performing app.", rating: 5 },
        { name: "Lily Park", role: "Director of eComm", company: "Meridian", content: "The AI upsells are eerily accurate. Our conversion rate on recommended products is 34%. Incredible.", rating: 5 },
      ] } },
      { id: "ec3-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Simple Revenue-Share Pricing", subheading: "Free to install. We only make money when you do.", plans: [
        { name: "Starter", price: 0, period: "month", features: ["Free to install", "Up to $1k upsell revenue/month", "Basic upsells", "Email support", "Analytics dashboard"], ctaText: "Install Free" },
        { name: "Growth", price: 49, period: "month", features: ["Unlimited upsell revenue", "AI recommendations", "Post-purchase offers", "Bundle builder", "A/B testing", "Priority support"], ctaText: "Start 14-Day Trial", highlighted: true },
        { name: "Pro", price: 149, period: "month", features: ["Everything in Growth", "Custom dev support", "Dedicated account manager", "API access", "SLA guarantee", "White-glove setup"], ctaText: "Contact Sales" },
      ] } },
      { id: "ec3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#5c6ac4", textColor: "#ffffff" }, content: { heading: "Start Growing Revenue Today", subheading: "3,200+ stores already making more money with CartBoost. Free to install.", ctaText: "Add CartBoost to Shopify", ctaUrl: "#" } },
      { id: "ec3-footer", type: "footer", styles: S(40, 40), content: { logo: "CartBoost", columns: [{ title: "App", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }] }, { title: "Support", links: [{ label: "Help Center", url: "#" }, { label: "Contact", url: "#" }, { label: "Status", url: "#" }] }], copyright: "© 2026 CartBoost. Built for Shopify." } },
    ],
  },

  // ─── ecom-4: Physical Product ─────────────────
  {
    id: "ecom-4", name: "Physical Product", category: "E-commerce", emoji: "📦",
    description: "Lifestyle-forward physical product landing with unboxing feel, materials, and buy-now CTA.",
    tags: ["ecommerce", "product", "physical", "lifestyle", "light"], isPro: false,
    globalStyles: { primaryColor: "#16a34a", secondaryColor: "#1e293b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "ec4-header", type: "header", styles: S(16, 16), content: { logo: "Craft&Co", menuItems: [{ label: "Materials", url: "#" }, { label: "Reviews", url: "#" }, { label: "Story", url: "#" }], ctaText: "Shop Now", ctaUrl: "#", sticky: true } },
      { id: "ec4-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f1a0f", textColor: "#f0fdf4" }, content: { badge: "🌿 Sustainably made — B Corp certified", headline: "Built to Last. Designed to Impress.", subheadline: "The Craft&Co Everyday Carry Collection. Premium leather, lifetime warranty, and craftsmanship that gets better with age.", ctaText: "Shop the Collection", ctaUrl: "#", secondaryCtaText: "Our Materials →", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ec4-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f0fdf4", textColor: "#1e293b" }, content: { heading: "", stats: [{ value: 50000, label: "Products Sold", suffix: "+" }, { value: 4.9, label: "Average Rating", suffix: "/5" }, { value: 100, label: "Lifetime Warranty", suffix: "%" }, { value: 60, label: "Day Free Returns", suffix: "d" }] } },
      { id: "ec4-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Why Craft&Co Is Different", subheading: "Mass production is the enemy of quality. We do the opposite.", layout: "grid", columns: 3, features: [
        { icon: "shield", title: "Full-Grain Leather", description: "Highest quality leather that develops a rich patina over years of use. Never peels. Never cracks." },
        { icon: "star", title: "Hand-Stitched", description: "Every seam is hand-stitched by artisans with decades of experience in our family-run workshop." },
        { icon: "heart", title: "Lifetime Warranty", description: "If it breaks, we fix it. If we can't fix it, we replace it. Forever. No receipts needed." },
        { icon: "globe", title: "Sustainably Sourced", description: "Vegetable-tanned leather from responsible tanneries. Packaging is 100% compostable." },
        { icon: "zap", title: "RFID Blocking", description: "Military-grade RFID shielding built into every wallet and cardholder in our collection." },
        { icon: "users", title: "Custom Engraving", description: "Add initials, a date, or a short message. Free engraving on every order. Ships in 3 days." },
      ] } },
      { id: "ec4-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "Real Owners. Real Reviews.", layout: "grid", testimonials: [
        { name: "Thomas Reed", role: "Verified Buyer", company: "", content: "My grandfather had a wallet for 40 years. I plan to do the same with this one. Incredible quality.", rating: 5 },
        { name: "Elena Park", role: "Verified Buyer", company: "", content: "Bought as a gift for my husband. He hasn't put it down since. The leather smell alone is worth it.", rating: 5 },
        { name: "Roberto Flores", role: "Verified Buyer", company: "", content: "4 years in and it looks better than when I bought it. The patina is beautiful. Worth every cent.", rating: 5 },
      ] } },
      { id: "ec4-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "Product FAQs", items: [
        { question: "How long does shipping take?", answer: "Standard shipping 3-5 days. Express 1-2 days. Free shipping on orders over $75 in the US." },
        { question: "Is the engraving really free?", answer: "Yes. We include free engraving on every order. Just add your text at checkout. Ships in 3 days." },
        { question: "Does leather require special care?", answer: "We include a care card and a small sample of our conditioning balm with every order. Monthly conditioning keeps leather supple." },
        { question: "What does the lifetime warranty cover?", answer: "Everything. Stitching, zippers, snaps, leather cracking. If we caused it, we fix it — free, forever." },
      ] } },
      { id: "ec4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#16a34a", textColor: "#ffffff" }, content: { heading: "Own Something That Lasts", subheading: "Free shipping over $75. Free engraving. Lifetime warranty. 60-day returns.", ctaText: "Shop the Collection", ctaUrl: "#" } },
      { id: "ec4-footer", type: "footer", styles: S(40, 40), content: { logo: "Craft&Co", columns: [{ title: "Shop", links: [{ label: "Wallets", url: "#" }, { label: "Bags", url: "#" }, { label: "Accessories", url: "#" }] }, { title: "Company", links: [{ label: "Our Story", url: "#" }, { label: "Sustainability", url: "#" }, { label: "Careers", url: "#" }] }, { title: "Help", links: [{ label: "FAQ", url: "#" }, { label: "Returns", url: "#" }, { label: "Warranty", url: "#" }] }], copyright: "© 2026 Craft&Co. Handmade with care." } },
    ],
  },

  // ─── ecom-5: Subscription Box ─────────────────
  {
    id: "ecom-5", name: "Subscription Box", category: "E-commerce", emoji: "📮",
    description: "Monthly box subscription landing with value proposition, what's inside, and recurring CTA.",
    tags: ["ecommerce", "subscription", "box", "recurring"], isPro: true,
    globalStyles: { primaryColor: "#d946ef", secondaryColor: "#1a0030", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "ec5-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#1a0030", textColor: "#fdf4ff" }, content: { logo: "BoxOf", menuItems: [{ label: "What's Inside", url: "#" }, { label: "Plans", url: "#" }, { label: "Reviews", url: "#" }], ctaText: "Subscribe Now", ctaUrl: "#", sticky: true } },
      { id: "ec5-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#1a0030", textColor: "#fdf4ff" }, content: { badge: "📮 10,000+ subscribers — New box drops the 1st of every month", headline: "A Box of Joy. Every Single Month.", subheadline: "BoxOf delivers hand-curated lifestyle products — skincare, wellness, home goods, and surprises — to your door monthly. $120+ value. You pay $49.", ctaText: "Subscribe & Save 40%", ctaUrl: "#", secondaryCtaText: "See Past Boxes", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "ec5-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#2d003d", textColor: "#fdf4ff" }, content: { heading: "", stats: [{ value: 10000, label: "Active Subscribers", suffix: "+" }, { value: 120, label: "Value Per Box", prefix: "$", suffix: "+" }, { value: 49, label: "Price Per Month", prefix: "$" }, { value: 4.9, label: "Subscriber Rating", suffix: "/5" }] } },
      { id: "ec5-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#1a0030", textColor: "#fdf4ff" }, content: { heading: "Why People Love BoxOf", subheading: "More than a box. A monthly ritual.", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "Expert Curation", description: "Our editorial team tests 200+ products monthly. Only the best 5-7 make it into your box." },
        { icon: "heart", title: "Personalized for You", description: "Answer a 2-minute quiz. Your box adapts to your taste, skin type, and lifestyle preferences." },
        { icon: "star", title: "$120+ Value Monthly", description: "Every box contains full-size products worth $120-160. You pay $49. That's not a typo." },
        { icon: "globe", title: "Exclusive Products", description: "30% of every box features products you can't buy anywhere else — created just for BoxOf subscribers." },
        { icon: "shield", title: "Skip or Cancel Anytime", description: "No commitment. Skip a month, pause, or cancel with one click. Your box, your rules." },
        { icon: "users", title: "Subscriber Community", description: "Join our private community to unbox together, share finds, and discover new brands first." },
      ] } },
      { id: "ec5-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#2d003d", textColor: "#fdf4ff" }, content: { heading: "Subscribers Are Obsessed", layout: "grid", testimonials: [
        { name: "Hannah Brooks", role: "Subscriber since 2023", company: "", content: "I've received 18 boxes. I've loved something from every single one. The curation is genuinely incredible.", rating: 5 },
        { name: "Fatima Al-Rashid", role: "Subscriber since 2024", company: "", content: "Got my sister hooked. We now unbox together over FaceTime every month. It's become our thing.", rating: 5 },
        { name: "Nia Coleman", role: "Subscriber since 2022", company: "", content: "Discovered 6 brands I now buy separately because of BoxOf. It's like having a personal stylist.", rating: 5 },
      ] } },
      { id: "ec5-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Choose Your Plan", subheading: "The longer you commit, the more you save.", plans: [
        { name: "Monthly", price: 49, period: "month", features: ["1 box per month", "5-7 full-size products", "$120+ value", "Personalized selection", "Cancel anytime"], ctaText: "Start Monthly" },
        { name: "6-Month", price: 39, period: "month", features: ["6 boxes total", "All monthly benefits", "Save $60 total", "Exclusive bonus item", "Free shipping always"], ctaText: "Get 6 Months", highlighted: true },
        { name: "Annual", price: 29, period: "month", features: ["12 boxes total", "All monthly benefits", "Save $240/year", "2 bonus items", "VIP early access", "Free shipping always"], ctaText: "Best Value — Annual" },
      ] } },
      { id: "ec5-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#d946ef", textColor: "#ffffff" }, content: { heading: "Your First Box Ships This Week", subheading: "10,000 subscribers can't be wrong. Join them and open something wonderful.", ctaText: "Subscribe Now — First Box Ships Friday", ctaUrl: "#" } },
      { id: "ec5-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0f0018", textColor: "#fdf4ff" }, content: { logo: "BoxOf", columns: [{ title: "Boxes", links: [{ label: "What's Inside", url: "#" }, { label: "Past Boxes", url: "#" }, { label: "Gift a Box", url: "#" }] }, { title: "Account", links: [{ label: "My Subscription", url: "#" }, { label: "Skip a Month", url: "#" }, { label: "Cancel", url: "#" }] }, { title: "Help", links: [{ label: "FAQ", url: "#" }, { label: "Shipping", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "© 2026 BoxOf. Curated with love." } },
    ],
  },


  // ══════════════════════════════════════════════
  // NICHE 4 — Health / Fitness (4 templates)
  // ══════════════════════════════════════════════

  // ─── health-1: Fitness Coach ──────────────────
  {
    id: "health-1", name: "Fitness Coach", category: "Health", emoji: "💪",
    description: "Transformation-focused fitness coach page with before/after stats, programs, and booking CTA.",
    tags: ["fitness", "coach", "health", "transformation"], isPro: false,
    globalStyles: { primaryColor: "#ef4444", secondaryColor: "#0a0a0a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "h1-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "Coach Ryan", menuItems: [{ label: "Programs", url: "#" }, { label: "Results", url: "#" }, { label: "About", url: "#" }], ctaText: "Book Free Call", ctaUrl: "#", sticky: true } },
      { id: "h1-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { badge: "💪 500+ transformations — Online & in-person coaching", headline: "Build the Body. Own the Mindset.", subheadline: "12-week transformation programs built around your schedule, your goals, and your life. No cookie-cutter plans. Just real results.", ctaText: "Book a Free Strategy Call", ctaUrl: "#", secondaryCtaText: "See Transformations", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "h1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#111111", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 500, label: "Transformations", suffix: "+" }, { value: 12, label: "Week Programs", suffix: "" }, { value: 98, label: "Client Satisfaction", suffix: "%" }, { value: 8, label: "Years Coaching", suffix: "" }] } },
      { id: "h1-features", type: "features", styles: S(80, 80), content: { heading: "What You Get", subheading: "A complete system built around your life — not the gym's schedule", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "Custom Workout Plan", description: "Personalized training split based on your goals, equipment, and schedule. Adjusted weekly." },
        { icon: "heart", title: "Nutrition Coaching", description: "No extreme diets. A sustainable nutrition plan with real food that fits your lifestyle." },
        { icon: "users", title: "Weekly Check-Ins", description: "Progress reviews every week via video call. Accountability that actually moves the needle." },
        { icon: "zap", title: "24/7 Support", description: "Text me anytime. Stuck on an exercise? Traveling? I've got answers before you lose momentum." },
        { icon: "bar-chart-3", title: "Progress Tracking", description: "Body metrics, strength progress, and before/after photos all tracked in one dashboard." },
        { icon: "shield", title: "Results Guarantee", description: "Follow the program for 12 weeks. If you don't see results, I'll coach you for free until you do." },
      ] } },
      { id: "h1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { heading: "Real People. Real Results.", layout: "grid", testimonials: [
        { name: "Mike D.", role: "Lost 42 lbs", company: "12-Week Program", content: "I've tried 6 different coaches and programs. None of them worked until Ryan. The difference is the accountability.", rating: 5 },
        { name: "Sarah T.", role: "Gained 12 lbs muscle", company: "Strength Program", content: "I was intimidated by weights my whole life. 3 months with Ryan and I'm deadlifting twice my bodyweight.", rating: 5 },
        { name: "Carlos M.", role: "Marathon PR", company: "Endurance Program", content: "Shaved 22 minutes off my marathon time in one training cycle. The programming was brilliant.", rating: 5 },
      ] } },
      { id: "h1-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Coaching Programs", subheading: "Pick the level of support that fits your goals", plans: [
        { name: "Self-Guided", price: 97, period: "month", features: ["Custom workout plan", "Nutrition guidelines", "Exercise video library", "Progress tracking app", "Email support"], ctaText: "Start Self-Guided" },
        { name: "Full Coaching", price: 297, period: "month", features: ["Everything in Self-Guided", "Weekly video check-ins", "24/7 text support", "Custom meal plans", "Form video review", "Results guarantee"], ctaText: "Apply for Coaching", highlighted: true },
        { name: "VIP 1-on-1", price: 697, period: "month", features: ["Everything in Full Coaching", "Unlimited calls", "In-person sessions (local)", "Priority scheduling", "Monthly body assessment", "Lifestyle coaching"], ctaText: "Apply for VIP" },
      ] } },
      { id: "h1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#ef4444", textColor: "#ffffff" }, content: { heading: "Your Transformation Starts This Week", subheading: "Book a free 30-minute strategy call. No sales pitch. Just a plan.", ctaText: "Book My Free Call →", ctaUrl: "#" } },
      { id: "h1-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0a0a0a", textColor: "#ffffff" }, content: { logo: "Coach Ryan", columns: [{ title: "Programs", links: [{ label: "12-Week Transform", url: "#" }, { label: "Strength", url: "#" }, { label: "Endurance", url: "#" }] }, { title: "Connect", links: [{ label: "Instagram", url: "#" }, { label: "YouTube", url: "#" }, { label: "Book a Call", url: "#" }] }], copyright: "© 2026 Coach Ryan. All rights reserved." } },
    ],
  },

  // ─── health-2: Online Course ──────────────────
  {
    id: "health-2", name: "Online Course", category: "Health", emoji: "🧠",
    description: "Health & wellness online course landing with curriculum, instructor bio, and enrollment CTA.",
    tags: ["health", "course", "wellness", "education"], isPro: false,
    globalStyles: { primaryColor: "#0891b2", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "h2-header", type: "header", styles: S(16, 16), content: { logo: "MindBody Academy", menuItems: [{ label: "Curriculum", url: "#" }, { label: "Instructor", url: "#" }, { label: "Reviews", url: "#" }], ctaText: "Enroll Now — $197", ctaUrl: "#", sticky: true } },
      { id: "h2-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0c4a6e", textColor: "#e0f2fe" }, content: { badge: "🧠 2,400 students enrolled — Lifetime access", headline: "Master Your Metabolism in 8 Weeks", subheadline: "The science-backed online course that teaches you exactly how nutrition, sleep, stress, and movement affect your body — and what to do about it.", ctaText: "Enroll Now — $197", ctaUrl: "#", secondaryCtaText: "Preview the Curriculum", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "h2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f0f9ff", textColor: "#1e293b" }, content: { heading: "", stats: [{ value: 2400, label: "Students Enrolled", suffix: "+" }, { value: 8, label: "Week Program", suffix: "" }, { value: 4.9, label: "Average Rating", suffix: "/5" }, { value: 30, label: "Hours of Content", suffix: "+" }] } },
      { id: "h2-features", type: "features", styles: S(80, 80), content: { heading: "What You'll Learn", subheading: "8 modules. Life-changing outcomes.", layout: "grid", columns: 3, features: [
        { icon: "bar-chart-3", title: "Module 1: Metabolism Basics", description: "Understand how your body burns energy and why crash diets always backfire scientifically." },
        { icon: "heart", title: "Module 2: Nutrition Science", description: "Cut through the noise. Learn what macros, micros, and meal timing actually do." },
        { icon: "sparkles", title: "Module 3: Sleep Optimization", description: "The underrated lever. Fix your sleep and watch your energy, mood, and body composition transform." },
        { icon: "zap", title: "Module 4: Exercise Physiology", description: "Find the right type, frequency, and intensity of exercise for YOUR body and goals." },
        { icon: "shield", title: "Module 5: Stress & Hormones", description: "How cortisol is sabotaging your progress and evidence-based ways to manage it effectively." },
        { icon: "users", title: "Module 6-8: Habits & Longevity", description: "Build systems that last. Create a personalized lifestyle blueprint for the rest of your life." },
      ] } },
      { id: "h2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0c4a6e", textColor: "#e0f2fe" }, content: { heading: "What Students Are Saying", layout: "grid", testimonials: [
        { name: "Lisa R.", role: "Student", company: "MindBody Academy", content: "I've read 20 books on health. This course gave me more clarity in 8 weeks than all of them combined.", rating: 5 },
        { name: "David K.", role: "Student", company: "MindBody Academy", content: "Finally understood why I felt exhausted despite eating well. The sleep module alone was worth $197.", rating: 5 },
        { name: "Amara J.", role: "Student", company: "MindBody Academy", content: "The science is presented so clearly that it becomes impossible NOT to apply it. Game changer.", rating: 5 },
      ] } },
      { id: "h2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#0891b2", textColor: "#ffffff" }, content: { heading: "Join 2,400 Students Transforming Their Health", subheading: "Lifetime access. 30-day money-back guarantee. Start today.", ctaText: "Enroll Now — $197", ctaUrl: "#" } },
      { id: "h2-footer", type: "footer", styles: S(40, 40), content: { logo: "MindBody Academy", columns: [{ title: "Course", links: [{ label: "Curriculum", url: "#" }, { label: "Reviews", url: "#" }, { label: "FAQ", url: "#" }] }, { title: "Support", links: [{ label: "Contact", url: "#" }, { label: "Refund Policy", url: "#" }] }], copyright: "© 2026 MindBody Academy." } },
    ],
  },

  // ─── health-3: Nutrition / Supplement ─────────
  {
    id: "health-3", name: "Supplement Brand", category: "Health", emoji: "🌿",
    description: "Trust-building supplement landing with ingredients, certifications, benefits, and buy CTA.",
    tags: ["health", "supplement", "nutrition", "product", "light"], isPro: false,
    globalStyles: { primaryColor: "#16a34a", secondaryColor: "#1e293b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "h3-header", type: "header", styles: S(16, 16), content: { logo: "PureForm", menuItems: [{ label: "Products", url: "#" }, { label: "Ingredients", url: "#" }, { label: "Science", url: "#" }], ctaText: "Shop Now", ctaUrl: "#", sticky: true } },
      { id: "h3-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#052e16", textColor: "#dcfce7" }, content: { badge: "🌿 Third-party tested · NSF Certified · Made in USA", headline: "Clean Supplements. Real Science.", subheadline: "PureForm uses only clinically-studied ingredients at proven doses. No proprietary blends. No fillers. No BS. Just supplements that work.", ctaText: "Shop Products", ctaUrl: "#", secondaryCtaText: "Read the Science", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "h3-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#f0fdf4", textColor: "#1e293b" }, content: { heading: "Featured in", layout: "logos", items: ["Men's Health", "Women's Health", "Healthline", "WebMD", "Examine.com"] } },
      { id: "h3-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#f0fdf4", textColor: "#1e293b" }, content: { heading: "Why PureForm is Different", subheading: "Every ingredient backed by peer-reviewed research", layout: "grid", columns: 3, features: [
        { icon: "shield", title: "NSF Certified", description: "Every product is independently tested for purity, potency, and banned substances. Certified clean." },
        { icon: "star", title: "Clinically-Dosed", description: "We use the exact amounts shown effective in clinical trials. No under-dosed fairy dust." },
        { icon: "globe", title: "Transparent Labels", description: "Every ingredient, every dose, fully disclosed. No proprietary blends hiding what's inside." },
        { icon: "sparkles", title: "No Unnecessary Fillers", description: "No artificial dyes, no proprietary blends, no fillers. What you see is what you get." },
        { icon: "users", title: "Third-Party Tested", description: "Tested by independent labs for heavy metals, microbials, and label accuracy. Results published." },
        { icon: "zap", title: "Made in USA", description: "Manufactured in an FDA-registered facility following cGMP standards. Quality at every step." },
      ] } },
      { id: "h3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#052e16", textColor: "#dcfce7" }, content: { heading: "", stats: [{ value: 50000, label: "Customers", suffix: "+" }, { value: 100, label: "Transparent Ingredients", suffix: "%" }, { value: 4.9, label: "Average Rating", suffix: "/5" }, { value: 60, label: "Day Money-Back", suffix: "-day" }] } },
      { id: "h3-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "Backed by Real Results", layout: "grid", testimonials: [
        { name: "Dr. James Liu", role: "Sports Medicine Physician", company: "", content: "PureForm is the only supplement brand I recommend to my patients. The transparency and testing are unmatched.", rating: 5 },
        { name: "Mia Santos", role: "Marathon Runner", company: "", content: "Finally a brand that doesn't hide behind proprietary blends. I know exactly what I'm putting in my body.", rating: 5 },
        { name: "Tom B.", role: "Verified Buyer", company: "", content: "3 months in. Bloodwork improved. Sleep improved. Energy through the roof. The science is real.", rating: 5 },
      ] } },
      { id: "h3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#16a34a", textColor: "#ffffff" }, content: { heading: "Supplements You Can Actually Trust", subheading: "60-day money-back guarantee. Free shipping over $60. Subscribe and save 20%.", ctaText: "Shop PureForm Products", ctaUrl: "#" } },
      { id: "h3-footer", type: "footer", styles: S(40, 40), content: { logo: "PureForm", columns: [{ title: "Products", links: [{ label: "Protein", url: "#" }, { label: "Pre-Workout", url: "#" }, { label: "Recovery", url: "#" }] }, { title: "Learn", links: [{ label: "Blog", url: "#" }, { label: "Research", url: "#" }, { label: "Testing", url: "#" }] }, { title: "Help", links: [{ label: "FAQ", url: "#" }, { label: "Returns", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "© 2026 PureForm Nutrition." } },
    ],
  },

  // ─── health-4: Yoga / Wellness Studio ─────────
  {
    id: "health-4", name: "Yoga Studio", category: "Health", emoji: "🧘",
    description: "Calm, soft-palette wellness studio with class schedule, instructor bios, and booking CTA.",
    tags: ["health", "yoga", "wellness", "studio", "calm"], isPro: false,
    globalStyles: { primaryColor: "#a855f7", secondaryColor: "#1e1b4b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 16, baseFontSize: 16 },
    blocks: [
      { id: "h4-header", type: "header", styles: S(16, 16), content: { logo: "Serene Studio", menuItems: [{ label: "Classes", url: "#" }, { label: "Instructors", url: "#" }, { label: "Memberships", url: "#" }], ctaText: "Book First Class Free", ctaUrl: "#", sticky: true } },
      { id: "h4-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#1e1b4b", textColor: "#ede9fe" }, content: { badge: "🧘 150+ weekly classes · Online & in-studio · All levels", headline: "Find Your Center. Find Your Strength.", subheadline: "Yoga, meditation, and breathwork classes led by world-class instructors. Whether you're a complete beginner or advanced practitioner — you belong here.", ctaText: "Book Your First Class — Free", ctaUrl: "#", secondaryCtaText: "See the Schedule", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "h4-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f5f3ff", textColor: "#1e293b" }, content: { heading: "", stats: [{ value: 3500, label: "Active Members", suffix: "+" }, { value: 150, label: "Weekly Classes", suffix: "+" }, { value: 12, label: "Expert Instructors", suffix: "" }, { value: 4.9, label: "Member Rating", suffix: "/5" }] } },
      { id: "h4-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#f5f3ff", textColor: "#1e293b" }, content: { heading: "Every Body. Every Level.", subheading: "A practice designed to meet you exactly where you are", layout: "grid", columns: 3, features: [
        { icon: "heart", title: "Hatha & Vinyasa", description: "Foundation classes for all levels. Build strength, flexibility, and a lifelong practice." },
        { icon: "sparkles", title: "Yin & Restorative", description: "Deep holds and passive poses that release tension and restore your nervous system." },
        { icon: "zap", title: "Power Yoga", description: "High-energy, athletic flow classes that build serious strength and heat." },
        { icon: "globe", title: "Guided Meditation", description: "Daily 20-minute guided sessions for stress, sleep, focus, and emotional wellbeing." },
        { icon: "users", title: "Breathwork", description: "Pranayama and modern breathwork techniques for energy, calm, and peak performance." },
        { icon: "star", title: "Online Library", description: "1,000+ on-demand classes. Practice from home, hotel, or wherever life takes you." },
      ] } },
      { id: "h4-team", type: "team", styles: { ...S(), backgroundColor: "#1e1b4b", textColor: "#ede9fe" }, content: { heading: "Your Instructors", layout: "grid", members: [
        { name: "Anika Sharma", role: "Lead Instructor — Vinyasa & Meditation", bio: "500-hr YTT. 12 years teaching. Former professional dancer turned mindfulness teacher.", photoUrl: "" },
        { name: "Tom Rivera", role: "Power Yoga & Breathwork", bio: "Yin-certified, Wim Hof instructor. Specializes in athletic performance and recovery.", photoUrl: "" },
        { name: "Layla Hassan", role: "Yin & Restorative", bio: "Trauma-informed yoga teacher. Creates space where every body feels welcome and safe.", photoUrl: "" },
      ] } },
      { id: "h4-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Memberships", subheading: "Commit to your practice. Save significantly.", plans: [
        { name: "Drop-In", price: 25, period: "class", features: ["Single class access", "Online or in-studio", "All class types", "No commitment"], ctaText: "Book a Class" },
        { name: "Monthly", price: 89, period: "month", features: ["Unlimited classes", "Online + in-studio", "On-demand library", "Priority booking", "Member discounts"], ctaText: "Join Monthly", highlighted: true },
        { name: "Annual", price: 69, period: "month", features: ["Everything in Monthly", "Best value — save $240", "Free workshop access", "1 guest pass/month", "Free intro session"], ctaText: "Join Annual" },
      ] } },
      { id: "h4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#a855f7", textColor: "#ffffff" }, content: { heading: "Your First Class Is On Us", subheading: "No commitment. No experience needed. Just show up.", ctaText: "Book My Free First Class", ctaUrl: "#" } },
      { id: "h4-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#1e1b4b", textColor: "#ede9fe" }, content: { logo: "Serene Studio", columns: [{ title: "Classes", links: [{ label: "Schedule", url: "#" }, { label: "Online Classes", url: "#" }, { label: "Workshops", url: "#" }] }, { title: "Studio", links: [{ label: "About Us", url: "#" }, { label: "Instructors", url: "#" }, { label: "Memberships", url: "#" }] }, { title: "Visit", links: [{ label: "Location", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "© 2026 Serene Studio. Practice daily." } },
    ],
  },

  // ══════════════════════════════════════════════
  // NICHE 5 — Education / Courses (4 templates)
  // ══════════════════════════════════════════════

  // ─── edu-1: Online Bootcamp ────────────────────
  {
    id: "edu-1", name: "Online Bootcamp", category: "Education", emoji: "🎓",
    description: "Immersive bootcamp landing with curriculum, outcomes, instructor, and application CTA.",
    tags: ["education", "bootcamp", "course", "coding", "dark"], isPro: false,
    globalStyles: { primaryColor: "#6366f1", secondaryColor: "#0f0f23", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "e1-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0f0f23", textColor: "#e0e7ff" }, content: { logo: "CodePath", menuItems: [{ label: "Curriculum", url: "#" }, { label: "Outcomes", url: "#" }, { label: "FAQ", url: "#" }], ctaText: "Apply Now", ctaUrl: "#", sticky: true } },
      { id: "e1-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f0f23", textColor: "#e0e7ff" }, content: { badge: "🎓 92% job placement rate — Next cohort starts June 2026", headline: "Go From Zero to Full-Stack in 16 Weeks", subheadline: "CodePath is an intensive, project-based bootcamp that teaches you everything employers actually look for — React, Node.js, PostgreSQL, and deployment.", ctaText: "Apply for Next Cohort", ctaUrl: "#", secondaryCtaText: "Download Curriculum", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "e1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1a1a3e", textColor: "#e0e7ff" }, content: { heading: "", stats: [{ value: 92, label: "Job Placement Rate", suffix: "%" }, { value: 85000, label: "Average Graduate Salary", prefix: "$" }, { value: 3200, label: "Alumni Network", suffix: "+" }, { value: 16, label: "Week Program", suffix: "" }] } },
      { id: "e1-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0f0f23", textColor: "#e0e7ff" }, content: { heading: "What You'll Master", subheading: "A curriculum designed with hiring managers, not academics", layout: "grid", columns: 3, features: [
        { icon: "code", title: "React & TypeScript", description: "Build complex SPAs from scratch. State management, custom hooks, and performance optimization." },
        { icon: "database", title: "Node.js & APIs", description: "Design RESTful and GraphQL APIs, authentication systems, and real-time features with WebSockets." },
        { icon: "layers", title: "PostgreSQL & Prisma", description: "Database design, complex queries, migrations, and ORM usage at a professional level." },
        { icon: "cloud", title: "AWS & Docker", description: "Deploy applications to the cloud with CI/CD pipelines, containers, and production best practices." },
        { icon: "sparkles", title: "AI Integration", description: "Integrate OpenAI, vector databases, and AI features into real products employers want to build." },
        { icon: "users", title: "Team Projects", description: "3 capstone projects built in teams using Git workflows. Your portfolio is employer-ready on day 1." },
      ] } },
      { id: "e1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1a1a3e", textColor: "#e0e7ff" }, content: { heading: "Graduate Stories", layout: "grid", testimonials: [
        { name: "Kenji Watanabe", role: "Bootcamp Grad → Software Engineer", company: "Shopify", content: "Went from barista to $105k engineer at Shopify in 5 months. CodePath changed my entire life trajectory.", rating: 5 },
        { name: "Priya Singh", role: "Bootcamp Grad → Frontend Dev", company: "Stripe", content: "The curriculum was brutal and perfect. By week 12 I felt like a real developer. Hired 2 weeks after graduation.", rating: 5 },
        { name: "Marcus Webb", role: "Bootcamp Grad → Full Stack Dev", company: "Linear", content: "The alumni network alone is worth it. I got 3 referrals to top companies just through Slack in the first month.", rating: 5 },
      ] } },
      { id: "e1-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Tuition", subheading: "Invest in your future. Multiple payment options available.", plans: [
        { name: "Upfront", price: 9900, period: "total", features: ["Full 16-week program", "All projects included", "Career coaching", "Alumni network", "Job guarantee*", "Save $600 vs monthly"], ctaText: "Pay Upfront — Save $600" },
        { name: "Income Share", price: 0, period: "upfront", features: ["$0 upfront tuition", "Pay 12% for 24 months after hire", "Only pay if you get hired", "Same curriculum", "Same career support"], ctaText: "Apply — ISA Option", highlighted: true },
        { name: "Monthly", price: 1087, period: "month (9 mo.)", features: ["$0 upfront", "9 monthly payments", "Full access from day 1", "All career services", "Alumni network"], ctaText: "Apply — Monthly Plan" },
      ] } },
      { id: "e1-faq", type: "faq", styles: { ...S(), backgroundColor: "#0f0f23", textColor: "#e0e7ff" }, content: { heading: "Common Questions", items: [
        { question: "Do I need prior coding experience?", answer: "No. We start from the basics. Dedication and 40+ hours/week commitment matter far more than prior experience." },
        { question: "Is this program full-time or part-time?", answer: "Full-time only. 40-50 hours per week for 16 weeks. Part-time isn't effective — we've tried it." },
        { question: "What does the job guarantee mean?", answer: "If you graduate, complete the career program, and don't get hired in 6 months — we refund your tuition in full." },
        { question: "When is the next cohort?", answer: "June 2026. Applications close when the cohort fills (usually 3 weeks before start). Apply early." },
      ] } },
      { id: "e1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#6366f1", textColor: "#ffffff" }, content: { heading: "Applications Close in 3 Weeks", subheading: "92% of graduates are employed within 6 months. Will you be next?", ctaText: "Apply for June 2026 Cohort", ctaUrl: "#" } },
      { id: "e1-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0f0f23", textColor: "#e0e7ff" }, content: { logo: "CodePath", columns: [{ title: "Program", links: [{ label: "Curriculum", url: "#" }, { label: "Outcomes", url: "#" }, { label: "Tuition", url: "#" }] }, { title: "Community", links: [{ label: "Alumni", url: "#" }, { label: "Hiring Partners", url: "#" }, { label: "Blog", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 CodePath Bootcamp. All rights reserved." } },
    ],
  },

  // ─── edu-2: Ebook / Lead Magnet ───────────────
  {
    id: "edu-2", name: "Ebook Landing", category: "Education", emoji: "📖",
    description: "High-converting ebook / lead magnet page with benefit bullets, preview, and email capture.",
    tags: ["education", "ebook", "leadmagnet", "email", "light"], isPro: false,
    globalStyles: { primaryColor: "#f59e0b", secondaryColor: "#1e293b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "e2-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { badge: "📖 Free Download — 47-page guide", headline: "The Complete Guide to Building a Profitable Newsletter in 90 Days", subheadline: "The exact playbook used to grow from 0 to 25,000 subscribers — with monetization strategies that generated $180,000 in year one.", ctaText: "Download Free — No Email Required", ctaUrl: "#", secondaryCtaText: "See What's Inside", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "e2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "", stats: [{ value: 25000, label: "Subscribers Built", suffix: "+" }, { value: 180000, label: "Year 1 Revenue", prefix: "$" }, { value: 47, label: "Pages of Tactics", suffix: "" }, { value: 90, label: "Day Playbook", suffix: "-day" }] } },
      { id: "e2-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { heading: "What's Inside the Guide", subheading: "Step-by-step playbook, not general advice", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "Niche Selection Formula", description: "The 3-question framework for finding a niche that's profitable AND something you can sustain writing about." },
        { icon: "users", title: "First 1,000 Subscribers", description: "Exactly how to get your first 1,000 subscribers in 30 days without spending a dollar on ads." },
        { icon: "zap", title: "Content Systems", description: "The batch-writing workflow that lets you produce a week of content in one 3-hour session." },
        { icon: "bar-chart-3", title: "Growth Flywheels", description: "The referral loops, cross-promotions, and content repurposing that compound your growth." },
        { icon: "star", title: "Monetization Playbook", description: "5 revenue models ranked by effort vs. payout. Which one to start with and when to add others." },
        { icon: "shield", title: "Churn & Retention", description: "Why most newsletters die at 5,000 subscribers and the engagement tactics that prevent it." },
      ] } },
      { id: "e2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "What Readers Are Saying", layout: "grid", testimonials: [
        { name: "Ben Thomas", role: "Newsletter Creator", company: "12,000 subscribers", content: "This guide is responsible for my newsletter going from 800 to 12,000 in 4 months. The referral loop tactic alone is gold.", rating: 5 },
        { name: "Laura Kim", role: "Content Creator", company: "8,500 subscribers", content: "I've read every newsletter guide online. This is the first one where every single page had an actionable, non-obvious tactic.", rating: 5 },
        { name: "James O.", role: "SaaS Founder", company: "5,200 subscribers", content: "Built a 5,200-person audience in 90 days following this exact playbook. First paid product sold out in 48 hours.", rating: 5 },
      ] } },
      { id: "e2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#f59e0b", textColor: "#0c0a09" }, content: { heading: "Get the Full Guide — Free", subheading: "PDF. Instant download. 47 pages of tactics that actually work.", ctaText: "Download the Free Guide →", ctaUrl: "#" } },
      { id: "e2-footer", type: "footer", styles: { ...S(32, 32), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { logo: "Newsletter Playbook", columns: [{ title: "More Resources", links: [{ label: "Blog", url: "#" }, { label: "YouTube", url: "#" }, { label: "Community", url: "#" }] }], copyright: "© 2026. Free to share with attribution." } },
    ],
  },

  // ─── edu-3: Webinar Registration ──────────────
  {
    id: "edu-3", name: "Webinar Page", category: "Education", emoji: "🎙️",
    description: "Live webinar registration page with date/time, speaker cards, agenda, and RSVP form.",
    tags: ["education", "webinar", "event", "registration", "live"], isPro: false,
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "e3-header", type: "header", styles: S(16, 16), content: { logo: "LearnLive", menuItems: [{ label: "Speakers", url: "#" }, { label: "Agenda", url: "#" }, { label: "FAQ", url: "#" }], ctaText: "Register Free →", ctaUrl: "#", sticky: true } },
      { id: "e3-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "🎙️ Live Webinar · Thursday June 12 · 2:00 PM EST", headline: "How to 10x Your Business Revenue in 12 Months", subheadline: "Join 3 industry experts for a live, interactive session on the frameworks, systems, and mindset shifts that separate 7-figure businesses from the rest.", ctaText: "Reserve My Free Spot →", ctaUrl: "#", secondaryCtaText: "See Full Agenda", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "e3-stats", type: "stats", styles: { ...S(40, 40), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 4200, label: "Registered Attendees", suffix: "+" }, { value: 3, label: "Expert Speakers", suffix: "" }, { value: 90, label: "Min Packed Session", suffix: " min" }, { value: 100, label: "Free to Attend", suffix: "%" }] } },
      { id: "e3-team", type: "team", styles: S(80, 80), content: { heading: "Your Speakers", layout: "grid", members: [
        { name: "Dr. Lisa Chen", role: "Revenue Strategist · Forbes Contributor", bio: "Helped 200+ companies build systematic revenue processes. Author of 'Predictable Growth'.", photoUrl: "" },
        { name: "Mark Davis", role: "CEO, ScaleIQ · $50M+ Built", bio: "3x founder. Built and sold two companies. Now helps others replicate the playbook.", photoUrl: "" },
        { name: "Sofia Torres", role: "Marketing Expert · 1M+ Followers", bio: "Growth marketing specialist. Known for turning underperforming brands into category leaders.", photoUrl: "" },
      ] } },
      { id: "e3-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#f8fafc", textColor: "#1e293b" }, content: { heading: "What You'll Walk Away With", subheading: "This isn't a pitch. It's 90 minutes of pure value.", layout: "grid", columns: 3, features: [
        { icon: "bar-chart-3", title: "Revenue Audit Framework", description: "A live framework to audit your current revenue and identify the biggest growth levers in minutes." },
        { icon: "zap", title: "The 90-Day Sprint Plan", description: "Step-by-step plan to generate measurable revenue growth in your next quarter without burning out." },
        { icon: "sparkles", title: "AI Tools for Scale", description: "The exact AI stack these founders use to do more with less and operate at 2x speed." },
        { icon: "users", title: "Live Q&A Session", description: "30 minutes of live questions answered directly by all 3 speakers. Bring your toughest challenges." },
        { icon: "globe", title: "Replay Access", description: "Can't make it live? Register and receive the full replay and slides within 24 hours." },
        { icon: "shield", title: "Free Resource Pack", description: "All attendees receive the speakers' resource pack: templates, calculators, and cheat sheets." },
      ] } },
      { id: "e3-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "What Past Attendees Said", layout: "grid", testimonials: [
        { name: "Ryan O'Brien", role: "CEO", company: "Maple Digital", content: "Applied one tactic from the Q&A live during the webinar. Added $8k MRR in the next 30 days.", rating: 5 },
        { name: "Awa Diop", role: "Founder", company: "NovaBase", content: "Best webinar I've attended in 3 years of entrepreneurship. Real strategies, real speakers, no fluff.", rating: 5 },
        { name: "Kim Nguyen", role: "COO", company: "Orbit SaaS", content: "We implemented the revenue audit framework the next day. Found $40k in revenue we were leaving on the table.", rating: 5 },
      ] } },
      { id: "e3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#2563eb", textColor: "#ffffff" }, content: { heading: "Seats Are Filling Up — Register Now", subheading: "Thursday June 12 · 2:00 PM EST · Free to attend. Replay included.", ctaText: "Reserve My Free Seat →", ctaUrl: "#" } },
      { id: "e3-footer", type: "footer", styles: S(40, 40), content: { logo: "LearnLive", columns: [{ title: "Event", links: [{ label: "Speakers", url: "#" }, { label: "Agenda", url: "#" }, { label: "FAQ", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Past Events", url: "#" }] }], copyright: "© 2026 LearnLive. All rights reserved." } },
    ],
  },

  // ─── edu-4: Coaching Program ──────────────────
  {
    id: "edu-4", name: "Coaching Program", category: "Education", emoji: "🏆",
    description: "Premium coaching program landing with transformation promise, testimonials, and apply CTA.",
    tags: ["education", "coaching", "premium", "business", "dark"], isPro: true,
    globalStyles: { primaryColor: "#d97706", secondaryColor: "#1c1917", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "e4-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { logo: "Elevate", menuItems: [{ label: "Program", url: "#" }, { label: "Results", url: "#" }, { label: "Apply", url: "#" }], ctaText: "Apply Now", ctaUrl: "#", sticky: true } },
      { id: "e4-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { badge: "🏆 Invitation-only · 12 spots per cohort · $50M+ in client results", headline: "The Coaching Program for Founders Who Are Done Playing Small", subheadline: "6-month intensive for ambitious founders ready to build a $1M+ business. Weekly calls, personal mentorship, and a peer group that holds you to the highest standard.", ctaText: "Apply for Next Cohort", ctaUrl: "#", secondaryCtaText: "Read the Results", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "e4-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { heading: "", stats: [{ value: 50000000, label: "In Client Revenue Generated", prefix: "$" }, { value: 87, label: "Program Graduates", suffix: "" }, { value: 94, label: "Reached Revenue Goals", suffix: "%" }, { value: 6, label: "Month Intensive", suffix: " mo." }] } },
      { id: "e4-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "What the Program Includes", subheading: "The highest-touch coaching experience available anywhere.", layout: "grid", columns: 3, features: [
        { icon: "users", title: "Weekly Group Calls", description: "90-minute hot-seat coaching calls every week. Your problems solved live in front of peers who share them." },
        { icon: "zap", title: "1-on-1 Monthly Sessions", description: "Private 60-minute monthly strategy session with your dedicated mentor. No agenda limits." },
        { icon: "star", title: "Peer Mastermind", description: "12 hand-picked founders at your level. Collaboration, referrals, and accountability that outlasts the program." },
        { icon: "bar-chart-3", title: "Revenue Growth Sprints", description: "Monthly 30-day sprints with specific revenue targets. Accountability built into the structure." },
        { icon: "globe", title: "Guest Expert Sessions", description: "Monthly sessions with top operators, investors, and founders on specific high-impact topics." },
        { icon: "shield", title: "Private Slack Community", description: "24/7 access to your cohort and alumni network. Questions answered within hours, not days." },
      ] } },
      { id: "e4-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { heading: "From the Alumni", layout: "grid", testimonials: [
        { name: "Jason Miller", role: "Founder", company: "CapturePro", content: "Went from $12k MRR to $94k MRR in 6 months. The program paid for itself in week 3. I'm not exaggerating.", rating: 5 },
        { name: "Nina Patel", role: "CEO", company: "Helio SaaS", content: "The peer group alone is worth 10x the cost. I've gotten $200k in introductions from fellow cohort members.", rating: 5 },
        { name: "David Osei", role: "Founder", company: "VaultOps", content: "I've done other masterminds. None compare. The mentorship is personal, the accountability is real, the results follow.", rating: 5 },
      ] } },
      { id: "e4-faq", type: "faq", styles: { ...S(), backgroundColor: "#1c1917", textColor: "#fef3c7" }, content: { heading: "Before You Apply", items: [
        { question: "Who is this program for?", answer: "Founders doing $10k-$100k MRR who are ready to grow beyond where they can go alone. This is not for pre-revenue businesses." },
        { question: "What does it cost?", answer: "Investment is $15,000 for 6 months or $2,750/month. Payment plans available. We also offer revenue-share arrangements." },
        { question: "How do you select applicants?", answer: "Every applicant does a 30-minute call. We accept 12 founders per cohort — selected for commitment, coachability, and revenue stage." },
        { question: "What if it doesn't work for me?", answer: "If you complete all calls and assignments and don't generate at least your tuition back in 6 months, we refund the difference." },
      ] } },
      { id: "e4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#d97706", textColor: "#0c0a09" }, content: { heading: "12 Spots. Next Cohort Starts July 2026.", subheading: "Applications reviewed within 48 hours. No obligation — just a conversation.", ctaText: "Apply for Elevate →", ctaUrl: "#" } },
      { id: "e4-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0c0a09", textColor: "#fef3c7" }, content: { logo: "Elevate", columns: [{ title: "Program", links: [{ label: "Overview", url: "#" }, { label: "Results", url: "#" }, { label: "Apply", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "Refund Policy", url: "#" }] }], copyright: "© 2026 Elevate Coaching. All rights reserved." } },
    ],
  },

  // ══════════════════════════════════════════════
  // NICHE 6 — Local Business (4 templates)
  // ══════════════════════════════════════════════

  // ─── local-1: Restaurant / Café ───────────────
  {
    id: "local-1", name: "Restaurant & Café", category: "Local Business", emoji: "🍽️",
    description: "Warm restaurant landing with menu preview, atmosphere section, hours, and reservation CTA.",
    tags: ["local", "restaurant", "food", "cafe", "reservation"], isPro: false,
    globalStyles: { primaryColor: "#b45309", secondaryColor: "#1c0a00", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "l1-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#1c0a00", textColor: "#fef3c7" }, content: { logo: "Ember Kitchen", menuItems: [{ label: "Menu", url: "#" }, { label: "Reservations", url: "#" }, { label: "About", url: "#" }, { label: "Events", url: "#" }], ctaText: "Reserve a Table", ctaUrl: "#", sticky: true } },
      { id: "l1-hero", type: "hero", styles: { ...S(120, 100), backgroundColor: "#1c0a00", textColor: "#fef3c7" }, content: { badge: "🔥 Wood-fired kitchen · Open Tuesday–Sunday", headline: "Food That Tells a Story", subheadline: "Ember Kitchen is a farm-to-table restaurant where seasonal ingredients meet open-fire cooking. Every dish is a reason to gather.", ctaText: "Reserve a Table", ctaUrl: "#", secondaryCtaText: "View the Menu", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "l1-stats", type: "stats", styles: { ...S(40, 40), backgroundColor: "#2d1200", textColor: "#fef3c7" }, content: { heading: "", stats: [{ value: 4.9, label: "Google Rating", suffix: "/5" }, { value: 12, label: "Years Serving the Community", suffix: "" }, { value: 95, label: "Locally Sourced Ingredients", suffix: "%" }, { value: 200, label: "Covers per Service", suffix: "" }] } },
      { id: "l1-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#fef3c7", textColor: "#1c0a00" }, content: { heading: "Why Ember Kitchen", subheading: "A dining experience, not just a meal", layout: "grid", columns: 3, features: [
        { icon: "heart", title: "Farm to Table", description: "We work directly with 14 local farms within 50 miles. You know exactly where your food comes from." },
        { icon: "star", title: "Wood-Fire Cooking", description: "Our custom wood-fired hearth produces flavors no gas kitchen can match. Come taste the difference." },
        { icon: "sparkles", title: "Seasonal Menu", description: "Our menu changes with the seasons. Come back in July and it's a completely different experience." },
        { icon: "users", title: "Private Dining", description: "Host birthdays, anniversaries, or corporate dinners in our private room for up to 24 guests." },
        { icon: "globe", title: "Natural Wine List", description: "130+ bottles of small-producer, minimal-intervention wines from around the world. Something for everyone." },
        { icon: "zap", title: "Weekend Brunch", description: "Saturday and Sunday brunch from 10am. Reservations highly recommended — we fill up fast." },
      ] } },
      { id: "l1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1c0a00", textColor: "#fef3c7" }, content: { heading: "What Our Guests Say", layout: "grid", testimonials: [
        { name: "Claire B.", role: "Google Review", company: "★★★★★", content: "The best restaurant in the city, full stop. The wood-roasted chicken is the single best dish I've eaten in a decade.", rating: 5 },
        { name: "Paulo R.", role: "Yelp Review", company: "★★★★★", content: "Booked for our anniversary. Perfect evening. The staff made it feel like we were the only table in the room.", rating: 5 },
        { name: "Wendy H.", role: "TripAdvisor", company: "★★★★★", content: "Flew in from Chicago. This was at the top of my list and it exceeded every expectation. Worth the trip alone.", rating: 5 },
      ] } },
      { id: "l1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#b45309", textColor: "#ffffff" }, content: { heading: "Reserve Your Table Tonight", subheading: "We're open Tuesday–Sunday. Weekend evenings book out 2 weeks in advance.", ctaText: "Make a Reservation", ctaUrl: "#" } },
      { id: "l1-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#1c0a00", textColor: "#fef3c7" }, content: { logo: "Ember Kitchen", columns: [{ title: "Visit", links: [{ label: "Menu", url: "#" }, { label: "Hours", url: "#" }, { label: "Location", url: "#" }] }, { title: "Events", links: [{ label: "Private Dining", url: "#" }, { label: "Wine Events", url: "#" }, { label: "Gift Cards", url: "#" }] }], copyright: "© 2026 Ember Kitchen. All rights reserved." } },
    ],
  },

  // ─── local-2: Real Estate Agent ───────────────
  {
    id: "local-2", name: "Real Estate Agent", category: "Local Business", emoji: "🏠",
    description: "Professional real estate agent page with listings preview, expertise, and contact form.",
    tags: ["local", "realestate", "agent", "property", "professional"], isPro: false,
    globalStyles: { primaryColor: "#1d4ed8", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "l2-header", type: "header", styles: S(16, 16), content: { logo: "Sarah Mitchell Realty", menuItems: [{ label: "Buy", url: "#" }, { label: "Sell", url: "#" }, { label: "Listings", url: "#" }, { label: "About", url: "#" }], ctaText: "Free Home Valuation", ctaUrl: "#", sticky: true } },
      { id: "l2-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "🏠 #1 Agent in Westside 2025 · $240M+ Sold", headline: "Find Your Next Home. Sell for More.", subheadline: "Sarah Mitchell has helped 600+ families buy and sell homes across the Westside. Unmatched market knowledge, honest advice, and results that speak for themselves.", ctaText: "Get a Free Home Valuation", ctaUrl: "#", secondaryCtaText: "View Current Listings", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "l2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 240000000, label: "In Sales Volume", prefix: "$" }, { value: 600, label: "Families Served", suffix: "+" }, { value: 14, label: "Days Avg. Days on Market", suffix: "" }, { value: 102, label: "List-to-Sale Price Ratio", suffix: "%" }] } },
      { id: "l2-features", type: "features", styles: S(80, 80), content: { heading: "Why Work With Sarah", subheading: "Experience, honesty, and results — every time", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Top 1% Nationally", description: "Ranked in the top 1% of all agents nationally for the last 8 consecutive years by volume closed." },
        { icon: "bar-chart-3", title: "Data-Driven Pricing", description: "Every listing is priced using live market analysis, not guesswork. Homes sell for more and sell faster." },
        { icon: "users", title: "Exclusive Buyer Network", description: "Access to off-market properties through a private network of over 400 agent relationships in the area." },
        { icon: "zap", title: "Concierge Service", description: "Staging, photography, legal intro, mortgage connections — all coordinated for you, at no extra cost." },
        { icon: "shield", title: "Honest Advice", description: "If a home isn't right for you, Sarah will tell you. Client relationships last decades — not just one transaction." },
        { icon: "globe", title: "Full Digital Marketing", description: "Every listing gets professional video, drone footage, social ads, and syndication to 100+ portals." },
      ] } },
      { id: "l2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Client Stories", layout: "grid", testimonials: [
        { name: "The Chen Family", role: "Buyers", company: "Westside", content: "Sarah found us a home $40k under budget in a market where everything goes over asking. She knows things no one else knows.", rating: 5 },
        { name: "Mark & Julia P.", role: "Sellers", company: "Culver City", content: "Listed Friday. 11 offers by Monday. Sold $85k over asking. Sarah's pricing and marketing strategy is exceptional.", rating: 5 },
        { name: "Dr. Aisha N.", role: "Buyer", company: "Brentwood", content: "As a first-time buyer, Sarah made the whole process feel manageable and even exciting. She fought for me at every step.", rating: 5 },
      ] } },
      { id: "l2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#1d4ed8", textColor: "#ffffff" }, content: { heading: "Ready to Buy or Sell?", subheading: "Free home valuation. No obligation. Honest advice from day one.", ctaText: "Schedule a Free Consultation", ctaUrl: "#" } },
      { id: "l2-footer", type: "footer", styles: S(40, 40), content: { logo: "Sarah Mitchell Realty", columns: [{ title: "Services", links: [{ label: "Buy a Home", url: "#" }, { label: "Sell Your Home", url: "#" }, { label: "Listings", url: "#" }] }, { title: "Contact", links: [{ label: "Call: (310) 555-0182", url: "#" }, { label: "sarah@smrealty.com", url: "#" }, { label: "Office Hours", url: "#" }] }], copyright: "© 2026 Sarah Mitchell Realty. DRE #01234567." } },
    ],
  },

  // ─── local-3: Law Firm ────────────────────────
  {
    id: "local-3", name: "Law Firm", category: "Local Business", emoji: "⚖️",
    description: "Authoritative law firm page with practice areas, case results, attorney profiles, and consultation CTA.",
    tags: ["local", "legal", "law", "professional", "trust"], isPro: false,
    globalStyles: { primaryColor: "#1e3a5f", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "l3-header", type: "header", styles: S(16, 16), content: { logo: "Morrison & Webb Law", menuItems: [{ label: "Practice Areas", url: "#" }, { label: "Results", url: "#" }, { label: "Attorneys", url: "#" }, { label: "Contact", url: "#" }], ctaText: "Free Consultation", ctaUrl: "#", sticky: true } },
      { id: "l3-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0a0f1a", textColor: "#f1f5f9" }, content: { badge: "⚖️ 30+ years · $500M+ recovered · Free consultations", headline: "Relentless Advocates for Your Rights", subheadline: "Morrison & Webb has fought for individuals and families for over three decades. We take on the cases others won't — and we win.", ctaText: "Get a Free Consultation", ctaUrl: "#", secondaryCtaText: "View Case Results", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "l3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 500000000, label: "Recovered for Clients", prefix: "$" }, { value: 30, label: "Years of Experience", suffix: "+" }, { value: 3500, label: "Cases Won", suffix: "+" }, { value: 98, label: "Client Satisfaction Rate", suffix: "%" }] } },
      { id: "l3-features", type: "features", styles: S(80, 80), content: { heading: "Practice Areas", subheading: "Deep expertise across the areas that matter most to our clients", layout: "grid", columns: 3, features: [
        { icon: "shield", title: "Personal Injury", description: "Car accidents, slip and fall, workplace injuries. We recover maximum compensation — you pay nothing unless we win." },
        { icon: "users", title: "Family Law", description: "Divorce, custody, child support, and prenuptial agreements handled with sensitivity and decisive advocacy." },
        { icon: "bar-chart-3", title: "Business Litigation", description: "Contract disputes, partnership conflicts, and business torts handled by experienced commercial litigators." },
        { icon: "star", title: "Employment Law", description: "Wrongful termination, discrimination, harassment, and wage theft. We stand up to employers who break the law." },
        { icon: "globe", title: "Estate Planning", description: "Wills, trusts, powers of attorney, and estate administration — protecting your family's future with clarity." },
        { icon: "zap", title: "Criminal Defense", description: "Misdemeanors, felonies, DUI, and expungements. Every defendant deserves a fierce and experienced defense." },
      ] } },
      { id: "l3-team", type: "team", styles: { ...S(), backgroundColor: "#0a0f1a", textColor: "#f1f5f9" }, content: { heading: "Meet the Attorneys", layout: "grid", members: [
        { name: "James Morrison", role: "Managing Partner — Personal Injury", bio: "Harvard Law, 28 years litigating. Has recovered over $300M for injured clients.", photoUrl: "" },
        { name: "Diana Webb", role: "Partner — Family & Employment Law", bio: "Georgetown Law. Known for compassionate advocacy in complex family situations.", photoUrl: "" },
        { name: "Carlos Ruiz", role: "Associate — Business & Criminal", bio: "USC Law, former federal prosecutor. Brings prosecutorial insight to every defense.", photoUrl: "" },
      ] } },
      { id: "l3-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "Client Testimonials", layout: "grid", testimonials: [
        { name: "Robert M.", role: "Personal Injury Client", company: "", content: "After my accident, Morrison & Webb recovered $2.4M for me. Other firms said $400k was the max. They were wrong.", rating: 5 },
        { name: "Ana T.", role: "Family Law Client", company: "", content: "Diana Webb fought for my children with a ferocity that moved me. Best possible outcome in a terrible situation.", rating: 5 },
        { name: "Victor H.", role: "Business Litigation Client", company: "Hartline Inc.", content: "They resolved a $1.8M contract dispute in 6 months that my previous attorney said would take 2 years.", rating: 5 },
      ] } },
      { id: "l3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#1e3a5f", textColor: "#ffffff" }, content: { heading: "Free Consultation — No Obligation", subheading: "Speak directly with an attorney. We assess your case honestly and tell you exactly where you stand.", ctaText: "Schedule Free Consultation →", ctaUrl: "#" } },
      { id: "l3-footer", type: "footer", styles: S(40, 40), content: { logo: "Morrison & Webb", columns: [{ title: "Practice Areas", links: [{ label: "Personal Injury", url: "#" }, { label: "Family Law", url: "#" }, { label: "Business Litigation", url: "#" }] }, { title: "Firm", links: [{ label: "About Us", url: "#" }, { label: "Attorneys", url: "#" }, { label: "Results", url: "#" }] }, { title: "Contact", links: [{ label: "Free Consultation", url: "#" }, { label: "(213) 555-0199", url: "#" }] }], copyright: "© 2026 Morrison & Webb LLP. Attorney Advertising." } },
    ],
  },

  // ─── local-4: Dental Clinic ───────────────────
  {
    id: "local-4", name: "Dental Clinic", category: "Local Business", emoji: "🦷",
    description: "Clean, trust-building dental clinic page with services, team, insurance info, and booking CTA.",
    tags: ["local", "dental", "medical", "clinic", "booking", "light"], isPro: false,
    globalStyles: { primaryColor: "#0891b2", secondaryColor: "#0c4a6e", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "l4-header", type: "header", styles: S(16, 16), content: { logo: "Bright Smile Dental", menuItems: [{ label: "Services", url: "#" }, { label: "Team", url: "#" }, { label: "Insurance", url: "#" }, { label: "Patient Info", url: "#" }], ctaText: "Book Appointment", ctaUrl: "#", sticky: true } },
      { id: "l4-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0c4a6e", textColor: "#e0f2fe" }, content: { badge: "🦷 New patients welcome · Most insurance accepted · Same-day emergency", headline: "Your Healthiest Smile Starts Here", subheadline: "Bright Smile Dental offers gentle, comprehensive dental care for the whole family. From cleanings to full smile makeovers — all in one welcoming office.", ctaText: "Book Your Appointment", ctaUrl: "#", secondaryCtaText: "Meet the Team", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "l4-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#f0f9ff", textColor: "#0c4a6e" }, content: { heading: "", stats: [{ value: 4800, label: "Patients Served", suffix: "+" }, { value: 15, label: "Years Serving the Community", suffix: "" }, { value: 4.9, label: "Google Rating", suffix: "/5" }, { value: 98, label: "Insurance Plans Accepted", suffix: "%" }] } },
      { id: "l4-features", type: "features", styles: S(80, 80), content: { heading: "Complete Dental Care", subheading: "Everything your family needs — right here", layout: "grid", columns: 3, features: [
        { icon: "star", title: "General Dentistry", description: "Cleanings, fillings, crowns, and exams. Keep your teeth healthy with twice-yearly preventive care." },
        { icon: "sparkles", title: "Cosmetic Dentistry", description: "Teeth whitening, veneers, bonding, and smile makeovers. The smile you've always wanted is possible." },
        { icon: "shield", title: "Orthodontics", description: "Traditional braces and Invisalign for teens and adults. Straight teeth at any age." },
        { icon: "zap", title: "Same-Day Emergency", description: "Dental emergency? We see same-day urgent cases. Call by 2pm and we'll fit you in today." },
        { icon: "heart", title: "Pediatric Care", description: "Gentle, fun visits for kids of all ages. We build trust with young patients from their very first visit." },
        { icon: "users", title: "Implants & Dentures", description: "Permanent tooth replacement solutions that look and function like natural teeth." },
      ] } },
      { id: "l4-team", type: "team", styles: { ...S(), backgroundColor: "#0c4a6e", textColor: "#e0f2fe" }, content: { heading: "Meet Your Doctors", layout: "grid", members: [
        { name: "Dr. Emily Park, DDS", role: "Lead Dentist & Founder", bio: "NYU Dental, 14 years in practice. Specializes in cosmetic and restorative dentistry.", photoUrl: "" },
        { name: "Dr. Michael Torres, DDS", role: "General & Pediatric Dentist", bio: "Known for making anxious patients completely comfortable. Specializes in family dentistry.", photoUrl: "" },
        { name: "Dr. Fatima Al-Rashid, DMD", role: "Orthodontist", bio: "Board-certified orthodontist with 10 years of Invisalign expertise.", photoUrl: "" },
      ] } },
      { id: "l4-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "4,800+ Happy Patients", layout: "grid", testimonials: [
        { name: "Jennifer K.", role: "Patient since 2019", company: "", content: "I used to be terrified of the dentist. Dr. Park completely changed that. I actually look forward to coming in now.", rating: 5 },
        { name: "Marcus W.", role: "Patient since 2021", company: "", content: "Got Invisalign and my smile is unrecognizable. Dr. Al-Rashid is incredible — results exceeded every expectation.", rating: 5 },
        { name: "The Davis Family", role: "Patients since 2018", company: "", content: "All 4 of us come here. The kids love it. The staff knows our names. It genuinely feels like a family practice.", rating: 5 },
      ] } },
      { id: "l4-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#0891b2", textColor: "#ffffff" }, content: { heading: "New Patients Welcome — Book Today", subheading: "Most insurance accepted. Same-day emergency appointments available. Call or book online.", ctaText: "Book an Appointment Online", ctaUrl: "#" } },
      { id: "l4-footer", type: "footer", styles: S(40, 40), content: { logo: "Bright Smile Dental", columns: [{ title: "Services", links: [{ label: "General Dentistry", url: "#" }, { label: "Cosmetic", url: "#" }, { label: "Orthodontics", url: "#" }, { label: "Emergencies", url: "#" }] }, { title: "Patient Info", links: [{ label: "Insurance", url: "#" }, { label: "New Patients", url: "#" }, { label: "Patient Forms", url: "#" }] }, { title: "Visit Us", links: [{ label: "Hours", url: "#" }, { label: "Location", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "© 2026 Bright Smile Dental. All rights reserved." } },
    ],
  },


  // ══════════════════════════════════════════════
  // NICHE 7 — Finance / B2B (3 templates)
  // ══════════════════════════════════════════════

  // ─── fin-1: Fintech App ───────────────────────
  {
    id: "fin-1", name: "Fintech App", category: "Finance", emoji: "💳",
    description: "Security-forward fintech app landing with trust badges, app screenshots, features, and sign-up CTA.",
    tags: ["finance", "fintech", "app", "banking", "dark"], isPro: false,
    globalStyles: { primaryColor: "#10b981", secondaryColor: "#0a0f1a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "f1-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0a0f1a", textColor: "#ecfdf5" }, content: { logo: "Vault", menuItems: [{ label: "Personal", url: "#" }, { label: "Business", url: "#" }, { label: "Security", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "Open Free Account", ctaUrl: "#", sticky: true } },
      { id: "f1-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#0a0f1a", textColor: "#ecfdf5" }, content: { badge: "🔒 Bank-level security · FDIC insured · No hidden fees", headline: "Banking Built for How You Actually Live", subheadline: "Vault gives you real-time spending insights, instant transfers, high-yield savings, and security that never sleeps — all in one beautifully simple app.", ctaText: "Open Free Account", ctaUrl: "#", secondaryCtaText: "See How It Works", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "f1-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#0f1f15", textColor: "#ecfdf5" }, content: { heading: "Trusted and covered by", layout: "logos", items: ["Forbes", "TechCrunch", "Bloomberg", "WSJ", "Wired", "Fast Company"] } },
      { id: "f1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#064e3b", textColor: "#ecfdf5" }, content: { heading: "", stats: [{ value: 2000000, label: "Customers", suffix: "+" }, { value: 4.9, label: "App Store Rating", suffix: "/5" }, { value: 0, label: "Monthly Fees", prefix: "$" }, { value: 4.85, label: "APY on Savings", suffix: "%" }] } },
      { id: "f1-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0a0f1a", textColor: "#ecfdf5" }, content: { heading: "Every Feature You Need", subheading: "A complete financial life — without the bank branch", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Instant Transfers", description: "Send and receive money instantly, 24/7. No waiting 3 business days for your own money." },
        { icon: "bar-chart-3", title: "Smart Spending Insights", description: "AI categorizes every transaction and shows you exactly where your money goes and where to cut." },
        { icon: "star", title: "High-Yield Savings", description: "Earn 4.85% APY — 10x the national average. Your savings actually grow." },
        { icon: "shield", title: "256-Bit Encryption", description: "Military-grade encryption, biometric login, and real-time fraud detection on every transaction." },
        { icon: "globe", title: "No Foreign Fees", description: "Spend globally with zero foreign transaction fees. Best exchange rates, automatically." },
        { icon: "sparkles", title: "Early Paycheck", description: "Get your direct deposit up to 2 days early. Your money, on your timeline." },
      ] } },
      { id: "f1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#064e3b", textColor: "#ecfdf5" }, content: { heading: "2M+ Customers. Zero Regrets.", layout: "grid", testimonials: [
        { name: "Sarah M.", role: "Verified Customer", company: "★★★★★", content: "Finally a bank app that doesn't treat me like a number. Switched from Chase and never looking back.", rating: 5 },
        { name: "David L.", role: "Verified Customer", company: "★★★★★", content: "The savings rate alone pays for my Netflix subscription every month. Simple math — Vault wins.", rating: 5 },
        { name: "Amina T.", role: "Verified Customer", company: "★★★★★", content: "Got notified of a fraud attempt within 30 seconds and it was already blocked. Security is on another level.", rating: 5 },
      ] } },
      { id: "f1-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Simple. Transparent. Free.", subheading: "No tricks. No hidden fees. Ever.", plans: [
        { name: "Basic", price: 0, period: "month", features: ["Free checking account", "Instant transfers", "Basic insights", "FDIC insured", "Debit card", "Mobile deposit"], ctaText: "Open Free" },
        { name: "Plus", price: 7, period: "month", features: ["Everything in Basic", "4.85% APY savings", "No foreign fees", "Early paycheck", "Premium support", "Metal card"], ctaText: "Try Plus Free", highlighted: true },
        { name: "Business", price: 19, period: "month", features: ["Everything in Plus", "Business account", "5 team cards", "Invoice tools", "Tax prep exports", "Dedicated support"], ctaText: "Open Business" },
      ] } },
      { id: "f1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#10b981", textColor: "#0a0f1a" }, content: { heading: "Open Your Account in 5 Minutes", subheading: "No minimum balance. No credit check. No fees to get started.", ctaText: "Open Free Account →", ctaUrl: "#" } },
      { id: "f1-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0a0f1a", textColor: "#ecfdf5" }, content: { logo: "Vault", columns: [{ title: "Products", links: [{ label: "Personal", url: "#" }, { label: "Savings", url: "#" }, { label: "Business", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Security", url: "#" }, { label: "Blog", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "FDIC", url: "#" }] }], copyright: "© 2026 Vault Financial Inc. FDIC Insured. Member SIPC." } },
    ],
  },

  // ─── fin-2: B2B Lead Gen ──────────────────────
  {
    id: "fin-2", name: "B2B Lead Gen", category: "Finance", emoji: "🤝",
    description: "Results-driven B2B lead generation page with ROI focus, case results, and demo CTA.",
    tags: ["finance", "b2b", "leads", "sales", "professional"], isPro: false,
    globalStyles: { primaryColor: "#1d4ed8", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "f2-header", type: "header", styles: S(16, 16), content: { logo: "Leadify", menuItems: [{ label: "Solutions", url: "#" }, { label: "Case Studies", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "Book a Demo", ctaUrl: "#", sticky: true } },
      { id: "f2-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "🤝 $380M in pipeline generated for clients — Book a demo today", headline: "More Qualified Leads. Less Wasted Budget.", subheadline: "Leadify identifies, scores, and delivers your ideal B2B buyers before they even fill out a form. Average client sees 4.2x ROI in the first 90 days.", ctaText: "Book a Strategy Demo", ctaUrl: "#", secondaryCtaText: "See Case Studies", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "f2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 380000000, label: "Pipeline Generated", prefix: "$" }, { value: 4.2, label: "Avg. ROI in 90 Days", suffix: "x" }, { value: 300, label: "B2B Clients", suffix: "+" }, { value: 68, label: "Avg. Reduction in CAC", suffix: "%" }] } },
      { id: "f2-features", type: "features", styles: S(80, 80), content: { heading: "How Leadify Fills Your Pipeline", subheading: "Intent data + AI scoring + done-for-you outreach", layout: "grid", columns: 3, features: [
        { icon: "search", title: "Intent Data Engine", description: "Identify companies actively researching your solution before they fill out a competitor's form." },
        { icon: "sparkles", title: "AI Lead Scoring", description: "Machine learning ranks every lead by fit and timing so your sales team focuses on what converts." },
        { icon: "zap", title: "Automated Outreach", description: "Personalized multi-channel sequences across email, LinkedIn, and phone — sent automatically." },
        { icon: "bar-chart-3", title: "Pipeline Analytics", description: "See every touchpoint, conversion point, and revenue attribution in one real-time dashboard." },
        { icon: "shield", title: "CRM Native", description: "Connects directly with Salesforce, HubSpot, and Pipedrive. No data entry. No double work." },
        { icon: "users", title: "SDR Augmentation", description: "Works alongside your existing sales team — amplifying their output, not replacing them." },
      ] } },
      { id: "f2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "What Our Clients Achieve", layout: "grid", testimonials: [
        { name: "Hannah Park", role: "VP Sales", company: "DataPlex", content: "We went from 12 qualified demos/month to 58. Leadify found buyers we didn't even know existed in our ICP.", rating: 5 },
        { name: "James Webb", role: "CEO", company: "SalesBridge", content: "Closed $1.4M in new business in the first 90 days. 4.2x ROI exactly as promised. I'm a convert.", rating: 5 },
        { name: "Priya M.", role: "Head of Revenue", company: "Nexify", content: "Our CAC dropped 68%. Our close rate went up 40%. Both happened simultaneously. Leadify is the reason.", rating: 5 },
      ] } },
      { id: "f2-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Pricing Built on ROI", subheading: "We only win when you win.", plans: [
        { name: "Starter", price: 2500, period: "month", features: ["500 qualified leads/mo", "Intent data access", "Email sequences", "HubSpot/Salesforce sync", "Monthly reporting"], ctaText: "Book Demo" },
        { name: "Growth", price: 5500, period: "month", features: ["2,000 qualified leads/mo", "Full intent data suite", "Multi-channel outreach", "AI scoring", "Weekly strategy calls"], ctaText: "Book Demo", highlighted: true },
        { name: "Enterprise", price: 0, period: "custom", features: ["Unlimited volume", "Custom intent signals", "Dedicated SDR team", "Custom CRM build", "ROI guarantee"], ctaText: "Contact Sales" },
      ] } },
      { id: "f2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#1d4ed8", textColor: "#ffffff" }, content: { heading: "See Leadify Fill Your Pipeline Live", subheading: "30-minute demo. We'll show you the companies in your ICP searching for you right now.", ctaText: "Book My Strategy Demo →", ctaUrl: "#" } },
      { id: "f2-footer", type: "footer", styles: S(40, 40), content: { logo: "Leadify", columns: [{ title: "Solutions", links: [{ label: "Intent Data", url: "#" }, { label: "Lead Scoring", url: "#" }, { label: "Outreach Automation", url: "#" }] }, { title: "Company", links: [{ label: "Case Studies", url: "#" }, { label: "Blog", url: "#" }, { label: "About", url: "#" }] }, { title: "Legal", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }, { label: "GDPR", url: "#" }] }], copyright: "© 2026 Leadify. All rights reserved." } },
    ],
  },

  // ─── fin-3: Consulting Firm ───────────────────
  {
    id: "fin-3", name: "Consulting Firm", category: "Finance", emoji: "📊",
    description: "Premium consulting firm page with expertise areas, case results, team, and engagement CTA.",
    tags: ["finance", "consulting", "b2b", "premium", "professional"], isPro: true,
    globalStyles: { primaryColor: "#374151", secondaryColor: "#111827", fontFamily: "Inter", headingFont: "Inter", borderRadius: 4, baseFontSize: 16 },
    blocks: [
      { id: "f3-header", type: "header", styles: S(20, 20), content: { logo: "Meridian Consulting", menuItems: [{ label: "Services", url: "#" }, { label: "Case Studies", url: "#" }, { label: "Insights", url: "#" }, { label: "Contact", url: "#" }], ctaText: "Start an Engagement", ctaUrl: "#", sticky: true } },
      { id: "f3-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#111827", textColor: "#f9fafb" }, content: { badge: "📊 $4.2B in value delivered · 180+ engagements · Fortune 500 partners", headline: "Strategic Clarity for Complex Challenges", subheadline: "Meridian Consulting partners with CEOs and boards to solve their most consequential strategic, operational, and organizational challenges. Not engagement factories — deep partnerships.", ctaText: "Start an Engagement", ctaUrl: "#", secondaryCtaText: "Read Our Case Studies", secondaryCtaUrl: "#", alignment: "left" } },
      { id: "f3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1f2937", textColor: "#f9fafb" }, content: { heading: "", stats: [{ value: 4200000000, label: "Value Delivered", prefix: "$" }, { value: 180, label: "Completed Engagements", suffix: "+" }, { value: 25, label: "Years of Practice", suffix: "" }, { value: 94, label: "Client Return Rate", suffix: "%" }] } },
      { id: "f3-features", type: "features", styles: S(80, 80), content: { heading: "Practice Areas", subheading: "Deep expertise across the decisions that shape organizations", layout: "grid", columns: 3, features: [
        { icon: "bar-chart-3", title: "Corporate Strategy", description: "Growth strategy, market entry, portfolio rationalization, and enterprise transformation programs." },
        { icon: "users", title: "Organizational Design", description: "Structuring teams, cultures, and governance systems that execute strategy at scale." },
        { icon: "globe", title: "Digital Transformation", description: "Technology strategy, AI adoption, and digital operating model design for established enterprises." },
        { icon: "star", title: "M&A Advisory", description: "Target identification, due diligence support, integration planning, and post-merger value capture." },
        { icon: "shield", title: "Operational Excellence", description: "Process redesign, cost optimization, and performance management for complex operations." },
        { icon: "zap", title: "Innovation & Growth", description: "New business building, venture creation, and innovation portfolio management for large enterprises." },
      ] } },
      { id: "f3-team", type: "team", styles: { ...S(), backgroundColor: "#111827", textColor: "#f9fafb" }, content: { heading: "Partners", layout: "grid", members: [
        { name: "Dr. Eleanor Hughes", role: "Founding Partner — Corporate Strategy", bio: "Harvard Business School. 25 years advising Fortune 100 CEOs on their most consequential decisions.", photoUrl: "" },
        { name: "Robert Ashford", role: "Partner — M&A and Digital", bio: "Former Goldman Sachs MD. Led 60+ M&A transactions and digital transformations across 12 industries.", photoUrl: "" },
        { name: "Maria Santos", role: "Partner — Organizational Design", bio: "Ex-McKinsey Principal. Redesigned operating models for 40+ global organizations.", photoUrl: "" },
      ] } },
      { id: "f3-testimonials", type: "testimonials", styles: S(80, 80), content: { heading: "Client Perspective", layout: "grid", testimonials: [
        { name: "CEO", role: "Fortune 500 Retailer", company: "Confidential", content: "Meridian helped us see the market shift before our competitors did. That single insight was worth $400M in market share.", rating: 5 },
        { name: "CFO", role: "Global Financial Services", company: "Confidential", content: "Three previous consulting firms gave us frameworks. Meridian gave us conviction and a plan we could actually execute.", rating: 5 },
        { name: "Board Chair", role: "Consumer Goods", company: "Confidential", content: "They told us what we needed to hear, not what we wanted to hear. That honesty and the results it produced are why we keep coming back.", rating: 5 },
      ] } },
      { id: "f3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#374151", textColor: "#ffffff" }, content: { heading: "Ready to Work Together?", subheading: "We begin every engagement with a confidential diagnostic call. No charge. No obligation.", ctaText: "Schedule a Diagnostic Call", ctaUrl: "#" } },
      { id: "f3-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#111827", textColor: "#f9fafb" }, content: { logo: "Meridian Consulting", columns: [{ title: "Firm", links: [{ label: "About", url: "#" }, { label: "Partners", url: "#" }, { label: "Insights", url: "#" }] }, { title: "Services", links: [{ label: "Corporate Strategy", url: "#" }, { label: "M&A", url: "#" }, { label: "Digital", url: "#" }] }, { title: "Contact", links: [{ label: "Start Engagement", url: "#" }, { label: "New York Office", url: "#" }] }], copyright: "© 2026 Meridian Consulting Group. All rights reserved." } },
    ],
  },

  // ══════════════════════════════════════════════
  // NICHE 8 — Creator / Community (3 templates)
  // ══════════════════════════════════════════════

  // ─── creator-1: Newsletter Landing ────────────
  {
    id: "creator-1", name: "Newsletter Landing", category: "Creator", emoji: "📬",
    description: "High-converting newsletter landing with subscriber count, preview, social proof, and subscribe CTA.",
    tags: ["creator", "newsletter", "email", "content"], isPro: false,
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "c1-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { badge: "📬 42,000 subscribers · Every Tuesday · Free forever", headline: "The Weekly Brief for Ambitious Builders", subheadline: "Every Tuesday morning: one big idea, three actionable tactics, and the resources serious builders need to grow faster. Read in 5 minutes. Applied in a lifetime.", ctaText: "Subscribe Free — Join 42,000 Readers", ctaUrl: "#", secondaryCtaText: "Read Last Issue", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "c1-logos", type: "social-proof", styles: { ...S(32, 32), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "Subscribers work at", layout: "logos", items: ["Google", "Apple", "Stripe", "OpenAI", "Sequoia", "Y Combinator"] } },
      { id: "c1-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 42000, label: "Weekly Readers", suffix: "+" }, { value: 62, label: "Average Open Rate", suffix: "%" }, { value: 156, label: "Issues Published", suffix: "" }, { value: 4.9, label: "Reader Rating", suffix: "/5" }] } },
      { id: "c1-features", type: "features", styles: S(80, 80), content: { heading: "What You Get Every Week", subheading: "Curated, not aggregated. Insight, not noise.", layout: "grid", columns: 3, features: [
        { icon: "sparkles", title: "The Big Idea", description: "One contrarian or underrated concept explored deeply. The kind of thinking that shifts your mental models." },
        { icon: "zap", title: "3 Tactics to Apply Now", description: "Practical, specific tactics from the week's reading, interviews, and experiments. No fluff." },
        { icon: "star", title: "Tools & Resources", description: "The tools, threads, papers, and people worth your attention this week. Pre-filtered and annotated." },
        { icon: "bar-chart-3", title: "The Numbers", description: "One interesting stat or dataset from the week — with the implication most people miss." },
        { icon: "users", title: "Reader Wins", description: "Every week we feature a reader applying the newsletter. Real results from real people." },
        { icon: "globe", title: "Full Archive Access", description: "156 issues of premium content, fully searchable. Subscribe and unlock it all instantly." },
      ] } },
      { id: "c1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Why Readers Stay", layout: "grid", testimonials: [
        { name: "Sam H.", role: "Founder", company: "SaaS", content: "The only newsletter I read the same day it arrives. Every single issue has something I immediately screenshot or send to my team.", rating: 5 },
        { name: "Lin W.", role: "Product Manager", company: "Big Tech", content: "Reading it for 2 years. The idea compounding is real. I think differently about almost every decision I make at work.", rating: 5 },
        { name: "Mia R.", role: "Angel Investor", company: "", content: "My entire deal flow strategy changed because of one issue on founder-market fit. ROI on this newsletter is immeasurable.", rating: 5 },
      ] } },
      { id: "c1-faq", type: "faq", styles: { ...S(), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "Newsletter FAQs", items: [
        { question: "How often does it arrive?", answer: "Every Tuesday morning at 6am EST. Occasionally a special issue on breaking topics. Never more than twice a week." },
        { question: "Is it really free?", answer: "The newsletter is free forever. There's a paid tier with bonus essays and early access — but the weekly brief is always free." },
        { question: "Can I unsubscribe easily?", answer: "One click at the bottom of any email. No guilt. No re-subscribe forms. We respect your inbox." },
        { question: "How do I access the archive?", answer: "Subscribers get full archive access at theweeklybrief.com/archive — all 156 issues searchable by topic." },
      ] } },
      { id: "c1-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#7c3aed", textColor: "#ffffff" }, content: { heading: "Join 42,000 Ambitious Builders", subheading: "Free. Every Tuesday. Unsubscribe in one click if it's not for you.", ctaText: "Subscribe Free →", ctaUrl: "#" } },
      { id: "c1-footer", type: "footer", styles: S(40, 40), content: { logo: "The Weekly Brief", columns: [{ title: "Newsletter", links: [{ label: "Subscribe", url: "#" }, { label: "Archive", url: "#" }, { label: "About", url: "#" }] }, { title: "Connect", links: [{ label: "Twitter/X", url: "#" }, { label: "LinkedIn", url: "#" }, { label: "Sponsor", url: "#" }] }], copyright: "© 2026 The Weekly Brief. All rights reserved." } },
    ],
  },

  // ─── creator-2: Podcast Page ──────────────────
  {
    id: "creator-2", name: "Podcast Page", category: "Creator", emoji: "🎙️",
    description: "Podcast landing with episode list, host bio, listener stats, and subscribe-across-platforms CTA.",
    tags: ["creator", "podcast", "audio", "content", "community"], isPro: false,
    globalStyles: { primaryColor: "#8b5cf6", secondaryColor: "#1a0530", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "c2-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#1a0530", textColor: "#ede9fe" }, content: { logo: "Built Different", menuItems: [{ label: "Episodes", url: "#" }, { label: "Guests", url: "#" }, { label: "Sponsors", url: "#" }], ctaText: "Subscribe Free", ctaUrl: "#", sticky: true } },
      { id: "c2-hero", type: "hero", styles: { ...S(100, 80), backgroundColor: "#1a0530", textColor: "#ede9fe" }, content: { badge: "🎙️ Top 50 Business Podcast · 3.2M Downloads · Every Wednesday", headline: "Conversations That Change How You Build", subheadline: "Built Different brings you unfiltered conversations with founders, operators, and investors who've done what most only dream about. Real stories. Real tactics. Real outcomes.", ctaText: "Listen Free on Spotify", ctaUrl: "#", secondaryCtaText: "Browse All Episodes", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "c2-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#2e1065", textColor: "#ede9fe" }, content: { heading: "", stats: [{ value: 3200000, label: "Total Downloads", suffix: "+" }, { value: 180, label: "Episodes Published", suffix: "+" }, { value: 4.9, label: "Spotify Rating", suffix: "/5" }, { value: 50, label: "Top 50 Business Podcast", suffix: "" }] } },
      { id: "c2-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#1a0530", textColor: "#ede9fe" }, content: { heading: "What You'll Hear", subheading: "Every episode is produced to be worth your commute, workout, or walk", layout: "grid", columns: 3, features: [
        { icon: "users", title: "World-Class Guests", description: "Founders who've built $100M+ companies, investors who've backed the best, operators who know how." },
        { icon: "sparkles", title: "Zero Fluff", description: "No motivational platitudes. Every episode is dense with tactics, numbers, and hard-won lessons." },
        { icon: "zap", title: "Deep Dives", description: "80–120 minute episodes that go beyond the surface. You walk away with a complete picture, not a sound bite." },
        { icon: "star", title: "Show Notes", description: "Every episode has timestamped show notes, key quotes, and resource links. Revisit any insight in 30 seconds." },
        { icon: "globe", title: "Available Everywhere", description: "Spotify, Apple Podcasts, YouTube, and our private app. Listen wherever your day takes you." },
        { icon: "bar-chart-3", title: "Subscriber Bonus", description: "Join our email list and get the uncut interviews, bloopers, and host commentary cut from the main episode." },
      ] } },
      { id: "c2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#2e1065", textColor: "#ede9fe" }, content: { heading: "What Listeners Say", layout: "grid", testimonials: [
        { name: "Tyler M.", role: "Startup Founder", company: "", content: "This podcast is why I started my company. Episode 87 with Marcus Webb rewired how I think about product-market fit.", rating: 5 },
        { name: "Grace L.", role: "Head of Product", company: "Series B", content: "I've listened to every episode twice. The depth is unmatched. It's like getting MBA-level frameworks from people who actually built things.", rating: 5 },
        { name: "Ahmed S.", role: "Angel Investor", company: "", content: "I recommend this podcast to every founder I back. The mental models discussed here save years of expensive mistakes.", rating: 5 },
      ] } },
      { id: "c2-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#8b5cf6", textColor: "#ffffff" }, content: { heading: "3.2 Million Downloads. Zero Regrets.", subheading: "New episode every Wednesday. Available free on all major platforms.", ctaText: "Subscribe on Spotify →", ctaUrl: "#" } },
      { id: "c2-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#1a0530", textColor: "#ede9fe" }, content: { logo: "Built Different", columns: [{ title: "Podcast", links: [{ label: "All Episodes", url: "#" }, { label: "Top Episodes", url: "#" }, { label: "Newsletter", url: "#" }] }, { title: "Business", links: [{ label: "Sponsor the Show", url: "#" }, { label: "Media Kit", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "© 2026 Built Different. All rights reserved." } },
    ],
  },

  // ─── creator-3: Community / Discord ───────────
  {
    id: "creator-3", name: "Community Page", category: "Creator", emoji: "🏡",
    description: "Online community landing with member count, benefits, featured members, and join CTA.",
    tags: ["creator", "community", "discord", "membership", "social"], isPro: false,
    globalStyles: { primaryColor: "#5865f2", secondaryColor: "#0e0e10", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "c3-header", type: "header", styles: { ...S(16, 16), backgroundColor: "#0e0e10", textColor: "#ffffff" }, content: { logo: "The Builder's Circle", menuItems: [{ label: "Benefits", url: "#" }, { label: "Members", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "Join the Community", ctaUrl: "#", sticky: true } },
      { id: "c3-hero", type: "hero", styles: { ...S(110, 90), backgroundColor: "#0e0e10", textColor: "#ffffff" }, content: { badge: "🏡 8,400 members · 50+ countries · Active daily", headline: "The Community for Builders Who Mean It", subheadline: "The Builder's Circle is where ambitious founders, designers, and developers come to share real progress, get real feedback, and build real relationships with people on the same path.", ctaText: "Join Free — Start Today", ctaUrl: "#", secondaryCtaText: "Meet the Members", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "c3-stats", type: "stats", styles: { ...S(48, 48), backgroundColor: "#1a1a1e", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 8400, label: "Active Members", suffix: "+" }, { value: 50, label: "Countries Represented", suffix: "+" }, { value: 200, label: "New Members Per Week", suffix: "+" }, { value: 4.9, label: "Member Satisfaction", suffix: "/5" }] } },
      { id: "c3-features", type: "features", styles: { ...S(80, 80), backgroundColor: "#0e0e10", textColor: "#ffffff" }, content: { heading: "What You Get Inside", subheading: "Everything you need to build faster and avoid costly mistakes", layout: "grid", columns: 3, features: [
        { icon: "users", title: "Daily Check-Ins", description: "Post your wins, blocks, and goals every day. Accountability and encouragement from 8,400 people who get it." },
        { icon: "sparkles", title: "Expert AMAs", description: "Weekly Ask Me Anything sessions with successful founders, investors, and operators. Live Q&A format." },
        { icon: "zap", title: "Project Feedback", description: "Share your work and get detailed, honest feedback from experienced builders within hours." },
        { icon: "star", title: "Skill Channels", description: "Deep channels for design, development, marketing, sales, and fundraising. Find your tribe within the tribe." },
        { icon: "globe", title: "Job Board", description: "Exclusive job postings and hiring opportunities within the community. Where builders hire builders." },
        { icon: "bar-chart-3", title: "Resources & Templates", description: "Curated library of templates, checklists, and resources contributed by the community. Always growing." },
      ] } },
      { id: "c3-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#1a1a1e", textColor: "#ffffff" }, content: { heading: "From the Community", layout: "grid", testimonials: [
        { name: "Jake T.", role: "Indie Hacker", company: "MRR: $12k/mo", content: "Got my first 100 paying customers through connections I made in this community. The ROI on a $29/month membership is insane.", rating: 5 },
        { name: "Yuna K.", role: "Designer Turned Founder", company: "Raised $400k", content: "Found my co-founder, my first angel investor, AND my first customer in this community in 6 months. It's everything.", rating: 5 },
        { name: "Carlos P.", role: "Full Stack Dev", company: "Working on SaaS", content: "Shipped my first public project after 2 years of building in private. The community feedback gave me the courage to launch.", rating: 5 },
      ] } },
      { id: "c3-pricing", type: "pricing", styles: S(80, 80), content: { heading: "Join the Community", subheading: "A fraction of what one good connection is worth.", plans: [
        { name: "Free", price: 0, period: "month", features: ["Read-only access", "Weekly digest email", "Public job board", "1 project feedback/month", "Community newsletter"], ctaText: "Join Free" },
        { name: "Member", price: 29, period: "month", features: ["Full community access", "All skill channels", "Unlimited feedback", "Weekly AMAs live", "Resource library", "Member directory"], ctaText: "Join as Member", highlighted: true },
        { name: "Founding", price: 199, period: "year", features: ["Everything in Member", "Founding badge forever", "Monthly 1-on-1 call", "Private mastermind", "Lifetime pricing locked", "First access to events"], ctaText: "Become a Founder" },
      ] } },
      { id: "c3-cta", type: "cta", styles: { ...S(80, 80), backgroundColor: "#5865f2", textColor: "#ffffff" }, content: { heading: "8,400 Builders Can't Be Wrong", subheading: "Start free. Upgrade when you're ready. Your community is waiting.", ctaText: "Join the Builder's Circle Free →", ctaUrl: "#" } },
      { id: "c3-footer", type: "footer", styles: { ...S(40, 40), backgroundColor: "#0e0e10", textColor: "#ffffff" }, content: { logo: "The Builder's Circle", columns: [{ title: "Community", links: [{ label: "Join Free", url: "#" }, { label: "Benefits", url: "#" }, { label: "Pricing", url: "#" }] }, { title: "Resources", links: [{ label: "Job Board", url: "#" }, { label: "Events", url: "#" }, { label: "Newsletter", url: "#" }] }, { title: "Legal", links: [{ label: "Code of Conduct", url: "#" }, { label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }], copyright: "© 2026 The Builder's Circle. All rights reserved." } },
    ],
  },

];

type TemplateCategory =
  | "SaaS"
  | "Agency"
  | "E-commerce"
  | "Health"
  | "Education"
  | "Local Business"
  | "Finance"
  | "Creator";

interface CategoryCopy {
  audience: string;
  outcome: string;
  problemTitle: string;
  solutionTitle: string;
  problems: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  steps: { badge: string; title: string; description: string }[];
  cases: { client: string; title: string; result: string; description: string }[];
  tools: string[];
  guarantees: { title: string; description: string }[];
  comparison: { feature: string; values: string[] }[];
}

const CATEGORY_COPY: Record<TemplateCategory, CategoryCopy> = {
  SaaS: {
    audience: "software buyers",
    outcome: "higher activation, stronger retention, and a faster path from demo to paid customer",
    problemTitle: "Why SaaS pages stall",
    solutionTitle: "A product story that converts",
    problems: [
      { title: "Feature lists without context", description: "Visitors see capabilities, but not the workflow or outcome those features create." },
      { title: "Trust arrives too late", description: "Security, proof, integrations, and pricing clarity are often hidden below the decision point." },
    ],
    solutions: [
      { title: "Outcome-led sections", description: "The page moves from pain to product value, proof, plan, pricing, and action." },
      { title: "Adoption feels easy", description: "Process, integrations, and guarantee sections remove implementation anxiety before signup." },
    ],
    steps: [
      { badge: "Discover", title: "Map the workflow", description: "Show the specific job your software improves and where it fits in the buyer's day." },
      { badge: "Activate", title: "Prove the product", description: "Use demo-style sections, measurable benefits, and social proof to build confidence." },
      { badge: "Expand", title: "Make scale obvious", description: "Surface security, integrations, pricing, and support before the final CTA." },
    ],
    cases: [
      { client: "Growth team", title: "Trial activation improved", result: "+38%", description: "Clear onboarding and proof sections helped more visitors start with the right use case." },
      { client: "RevOps team", title: "Demo requests became qualified", result: "2.4x", description: "Better problem framing and integrations reduced low-fit leads." },
      { client: "Product team", title: "Feature adoption accelerated", result: "31 days", description: "A workflow-led page shortened the time from interest to expansion." },
    ],
    tools: ["Slack", "Stripe", "HubSpot", "Salesforce", "Zapier", "Notion", "Google SSO", "Segment", "Webhooks"],
    guarantees: [
      { title: "14-day trial", description: "Let buyers experience the core workflow before committing." },
      { title: "Secure by default", description: "Highlight SSO, roles, audit logs, encryption, and compliance-ready practices." },
      { title: "Migration support", description: "Reduce switching friction with onboarding, import help, and templates." },
      { title: "Cancel anytime", description: "Lower risk with transparent billing and no lock-in messaging." },
    ],
    comparison: [
      { feature: "Setup time", values: ["Weeks", "Days", "Minutes"] },
      { feature: "AI guidance", values: ["false", "Limited", "true"] },
      { feature: "Team workflow", values: ["Manual", "Fragmented", "Unified"] },
      { feature: "Scale support", values: ["Add-ons", "Enterprise only", "Built in"] },
    ],
  },
  Agency: {
    audience: "clients",
    outcome: "better positioning, clearer service value, and more qualified project inquiries",
    problemTitle: "Why service pages feel generic",
    solutionTitle: "A client-winning narrative",
    problems: [
      { title: "Beautiful work, unclear offer", description: "Visitors admire the visuals but do not understand the process, fit, or business result." },
      { title: "Proof is scattered", description: "Case studies, testimonials, packages, and team credibility are disconnected." },
    ],
    solutions: [
      { title: "Strategy before visuals", description: "Show how the team diagnoses, designs, launches, and measures client outcomes." },
      { title: "Proof-led selling", description: "Bring case studies, team expertise, and process into the decision journey." },
    ],
    steps: [
      { badge: "01", title: "Diagnose", description: "Clarify goals, audience, constraints, and the business metric that matters." },
      { badge: "02", title: "Design the system", description: "Turn strategy into brand, content, campaign, or product experiences." },
      { badge: "03", title: "Launch and optimize", description: "Ship quickly, measure the impact, and improve what moves revenue." },
    ],
    cases: [
      { client: "B2B SaaS", title: "Repositioned the category story", result: "+64%", description: "A sharper narrative and premium design system increased demo intent." },
      { client: "Consumer brand", title: "Campaign launch rebuilt", result: "3.1x", description: "New creative direction and landing flow lifted paid conversion." },
      { client: "Local leader", title: "Trust-first website", result: "+48%", description: "Service clarity and stronger proof increased consultation requests." },
    ],
    tools: ["Figma", "Webflow", "Framer", "Shopify", "HubSpot", "Notion", "Slack", "GA4", "Meta Ads"],
    guarantees: [
      { title: "Senior-led work", description: "Position expertise and direct access to decision-makers." },
      { title: "Clear milestones", description: "Show timelines, deliverables, and review points before contact." },
      { title: "Launch support", description: "Include handoff, training, analytics, and optimization guidance." },
      { title: "No surprise scope", description: "Reduce risk with transparent packages and approval checkpoints." },
    ],
    comparison: [
      { feature: "Strategy depth", values: ["Light", "Medium", "Senior-led"] },
      { feature: "Case-study proof", values: ["false", "Some", "true"] },
      { feature: "Launch support", values: ["Handoff", "Basic", "Ongoing"] },
      { feature: "Best for", values: ["Small edits", "Projects", "Growth partners"] },
    ],
  },
  "E-commerce": {
    audience: "buyers",
    outcome: "more add-to-cart action, higher trust, and stronger purchase confidence",
    problemTitle: "Why buyers hesitate",
    solutionTitle: "A purchase path with proof",
    problems: [
      { title: "Benefits are not tangible", description: "Buyers see features but cannot feel the before-and-after value." },
      { title: "Risk feels too high", description: "Shipping, quality, returns, fit, and support concerns block checkout." },
    ],
    solutions: [
      { title: "Product value in context", description: "Use benefits, comparisons, reviews, and use cases to make the product feel real." },
      { title: "Confidence before checkout", description: "Guarantee, delivery, and proof sections answer objections before the CTA." },
    ],
    steps: [
      { badge: "Pick", title: "Choose the right option", description: "Guide shoppers with use cases, bundles, or plan comparisons." },
      { badge: "Try", title: "Experience the benefit", description: "Show product details, reviews, and transformations that make value concrete." },
      { badge: "Love", title: "Buy with confidence", description: "Back the offer with delivery, returns, and support promises." },
    ],
    cases: [
      { client: "Verified buyers", title: "More confident checkout", result: "+27%", description: "Benefit-led copy and stronger guarantees reduced last-step hesitation." },
      { client: "Repeat shoppers", title: "Bundle adoption increased", result: "1.8x", description: "Clear comparison and pricing sections made premium options easier to choose." },
      { client: "Launch campaign", title: "First-week sell-through", result: "72%", description: "Urgency and social proof helped convert early demand." },
    ],
    tools: ["Shopify", "Klaviyo", "Stripe", "Apple Pay", "PayPal", "Afterpay", "TikTok Shop", "Meta Pixel", "Reviews.io"],
    guarantees: [
      { title: "30-day returns", description: "Make the return window visible before the buyer reaches checkout." },
      { title: "Secure checkout", description: "Show payment safety, trusted processors, and privacy confidence." },
      { title: "Quality checked", description: "Explain materials, testing, sourcing, or fulfillment standards." },
      { title: "Fast support", description: "Give shoppers a clear path if sizing, delivery, or product questions come up." },
    ],
    comparison: [
      { feature: "Materials", values: ["Basic", "Premium", "Signature"] },
      { feature: "Support", values: ["Email", "Priority", "Concierge"] },
      { feature: "Returns", values: ["14 days", "30 days", "60 days"] },
      { feature: "Best for", values: ["Trying", "Daily use", "Gifting"] },
    ],
  },
  Health: {
    audience: "health-conscious customers",
    outcome: "trust, safe expectations, and more qualified signups or applications",
    problemTitle: "Why wellness offers need trust",
    solutionTitle: "A credible path to change",
    problems: [
      { title: "Claims can feel vague", description: "Visitors need clear outcomes, realistic timelines, and expert context." },
      { title: "Safety questions remain", description: "Programs, products, and appointments require reassurance before action." },
    ],
    solutions: [
      { title: "Evidence-led value", description: "Use authority, process, testimonials, and disclaimers to build confidence." },
      { title: "Guided next step", description: "Make the booking, application, or purchase path feel safe and supported." },
    ],
    steps: [
      { badge: "Assess", title: "Understand the baseline", description: "Start with goals, constraints, habits, or appointment needs." },
      { badge: "Plan", title: "Build the right protocol", description: "Show the program, class, product routine, or care pathway." },
      { badge: "Support", title: "Track progress safely", description: "Reinforce accountability, expert review, and realistic expectations." },
    ],
    cases: [
      { client: "Members", title: "Consistency improved", result: "+52%", description: "Clear routines and support expectations helped people stay engaged." },
      { client: "Clients", title: "Program completion rose", result: "86%", description: "A structured journey and social proof reduced drop-off." },
      { client: "Patients", title: "Booking friction dropped", result: "-34%", description: "Trust, process, and FAQ sections made next steps clearer." },
    ],
    tools: ["Calendly", "Zoom", "Stripe", "Trainerize", "MyFitnessPal", "Google Fit", "Apple Health", "Mindbody", "Email"],
    guarantees: [
      { title: "Expert-led guidance", description: "Surface credentials, certifications, or practitioner experience clearly." },
      { title: "Transparent expectations", description: "Avoid hype by explaining timeline, effort, and who the offer is for." },
      { title: "Safety-first support", description: "Encourage visitors to consult professionals where appropriate." },
      { title: "Flexible participation", description: "Clarify cancellation, rescheduling, or program-fit policies." },
    ],
    comparison: [
      { feature: "Support level", values: ["Self-guided", "Group", "1-on-1"] },
      { feature: "Progress tracking", values: ["Basic", "Weekly", "Personalized"] },
      { feature: "Best for", values: ["Starters", "Consistency", "Transformation"] },
      { feature: "Risk guidance", values: ["Limited", "Included", "High-touch"] },
    ],
  },
  Education: {
    audience: "students and learners",
    outcome: "clear learning outcomes, stronger enrollment confidence, and lower drop-off",
    problemTitle: "Why learners delay enrolling",
    solutionTitle: "A learning path that feels achievable",
    problems: [
      { title: "The outcome is unclear", description: "Learners need to know what skill, credential, or transformation they will gain." },
      { title: "The workload feels risky", description: "Time, support, price, and fit concerns stop committed students from joining." },
    ],
    solutions: [
      { title: "Outcome-first curriculum", description: "Show modules, projects, instructors, and proof of student progress." },
      { title: "Enrollment without guesswork", description: "Use process, pricing, FAQs, and guarantees to clarify the commitment." },
    ],
    steps: [
      { badge: "Learn", title: "Start with the roadmap", description: "Explain modules, schedule, prerequisites, and the final outcome." },
      { badge: "Build", title: "Practice with feedback", description: "Show assignments, coaching, community, or project reviews." },
      { badge: "Launch", title: "Apply the skill", description: "Tie the program to portfolio, career, business, or personal outcomes." },
    ],
    cases: [
      { client: "Student cohort", title: "Completion improved", result: "91%", description: "Clear milestones and support expectations helped learners finish." },
      { client: "Career switchers", title: "Portfolio-ready projects", result: "6", description: "Project-led curriculum made the outcome easier to evaluate." },
      { client: "Alumni", title: "Confidence at graduation", result: "+44%", description: "Coaching and proof sections reduced enrollment hesitation." },
    ],
    tools: ["Zoom", "Circle", "Discord", "Notion", "Teachable", "Stripe", "Google Meet", "GitHub", "Slack"],
    guarantees: [
      { title: "Clear curriculum", description: "Show modules, time commitment, and success criteria before enrollment." },
      { title: "Support access", description: "Clarify office hours, community, feedback, and instructor availability." },
      { title: "Outcome proof", description: "Use student stories, portfolios, or results to make value credible." },
      { title: "Fair refund terms", description: "Include trial lessons, refund windows, or fit checks where relevant." },
    ],
    comparison: [
      { feature: "Format", values: ["Self-paced", "Cohort", "Coached"] },
      { feature: "Feedback", values: ["Limited", "Weekly", "Personal"] },
      { feature: "Projects", values: ["1", "3", "6+"] },
      { feature: "Best for", values: ["Curious", "Committed", "Career-ready"] },
    ],
  },
  "Local Business": {
    audience: "local customers",
    outcome: "more calls, bookings, visits, and trust from nearby buyers",
    problemTitle: "Why local visitors bounce",
    solutionTitle: "A local-first trust journey",
    problems: [
      { title: "Important details are hidden", description: "Hours, services, location, pricing, and booking paths must be immediately clear." },
      { title: "Trust is not local enough", description: "Reviews, team, neighborhood proof, and service guarantees need to be visible." },
    ],
    solutions: [
      { title: "Book-ready structure", description: "Guide visitors from need to service to proof to appointment." },
      { title: "Neighborhood credibility", description: "Use reviews, team, process, and contact sections to make the business feel familiar." },
    ],
    steps: [
      { badge: "Call", title: "Choose the service", description: "Make the right service, menu, property, or consultation path easy to find." },
      { badge: "Visit", title: "Know what to expect", description: "Show process, hours, team, location, and preparation details." },
      { badge: "Return", title: "Deliver a trusted experience", description: "Use reviews and guarantees to reinforce repeat visits and referrals." },
    ],
    cases: [
      { client: "Local customers", title: "More appointment requests", result: "+39%", description: "Clear services and reviews made booking feel safer." },
      { client: "Neighborhood search", title: "Call intent increased", result: "2.1x", description: "Location-first proof and service clarity improved local conversion." },
      { client: "Repeat visitors", title: "Review-driven trust", result: "4.9/5", description: "Visible testimonials and team sections increased confidence." },
    ],
    tools: ["Google Maps", "Calendly", "Square", "Yelp", "TripAdvisor", "WhatsApp", "Google Reviews", "OpenTable", "Email"],
    guarantees: [
      { title: "Clear booking", description: "Show phone, form, hours, response time, and location details." },
      { title: "Trusted locally", description: "Feature reviews, years in business, awards, and neighborhood experience." },
      { title: "Transparent service", description: "Clarify pricing ranges, process, preparation, and what is included." },
      { title: "Responsive follow-up", description: "Promise clear next steps after booking, inquiry, or visit." },
    ],
    comparison: [
      { feature: "Booking path", values: ["Phone only", "Form", "Instant"] },
      { feature: "Local proof", values: ["Basic", "Reviews", "Full trust stack"] },
      { feature: "Service clarity", values: ["List", "Packages", "Guided"] },
      { feature: "Best for", values: ["Walk-ins", "Appointments", "High intent"] },
    ],
  },
  Finance: {
    audience: "financial buyers",
    outcome: "more qualified trust, demo requests, and risk-aware conversions",
    problemTitle: "Why finance pages require extra proof",
    solutionTitle: "A trust-first conversion system",
    problems: [
      { title: "Risk feels abstract", description: "Visitors need security, compliance, transparency, and measurable outcomes before they act." },
      { title: "Value is hard to compare", description: "Financial offers must explain ROI, process, safeguards, and fit clearly." },
    ],
    solutions: [
      { title: "Compliance-aware narrative", description: "Bring security, process, proof, and disclaimers into the main page flow." },
      { title: "Decision-grade clarity", description: "Use comparison, case studies, pricing, and guarantees to support high-consideration buyers." },
    ],
    steps: [
      { badge: "Audit", title: "Understand the financial goal", description: "Clarify risk, opportunity, current tools, and decision criteria." },
      { badge: "Model", title: "Show the business case", description: "Use proof, ROI framing, and process to make value measurable." },
      { badge: "Protect", title: "Reduce risk before action", description: "Surface compliance, support, privacy, and transparent terms." },
    ],
    cases: [
      { client: "Finance team", title: "Manual reporting reduced", result: "-61%", description: "A clearer value story helped buyers connect workflow to ROI." },
      { client: "Sales team", title: "Qualified demos increased", result: "2.7x", description: "Trust and case-study sections filtered stronger prospects." },
      { client: "Executive buyers", title: "Decision cycle shortened", result: "19 days", description: "Comparison and security proof reduced procurement friction." },
    ],
    tools: ["Plaid", "Stripe", "QuickBooks", "Salesforce", "HubSpot", "SOC 2", "SSO", "Looker", "Snowflake"],
    guarantees: [
      { title: "Security-first", description: "Highlight encryption, access controls, audit trails, and compliance posture." },
      { title: "Transparent terms", description: "Clarify pricing, data practices, contracts, and cancellation or consultation steps." },
      { title: "Expert support", description: "Show onboarding, financial specialists, or implementation guidance." },
      { title: "Measured outcomes", description: "Tie the offer to ROI, savings, pipeline, or operational performance." },
    ],
    comparison: [
      { feature: "Security posture", values: ["Basic", "Managed", "Enterprise-grade"] },
      { feature: "Reporting", values: ["Manual", "Dashboard", "Automated"] },
      { feature: "Implementation", values: ["DIY", "Assisted", "White-glove"] },
      { feature: "Best for", values: ["Individuals", "Teams", "Organizations"] },
    ],
  },
  Creator: {
    audience: "subscribers and community members",
    outcome: "more signups, stronger belonging, and recurring audience engagement",
    problemTitle: "Why creator pages underperform",
    solutionTitle: "A page that turns attention into community",
    problems: [
      { title: "The value is too vague", description: "Visitors need to know exactly what they receive and why it matters weekly." },
      { title: "Belonging is missing", description: "Stats, samples, testimonials, and member outcomes must make the audience feel seen." },
    ],
    solutions: [
      { title: "Make the ritual clear", description: "Show cadence, content pillars, samples, and the transformation from joining." },
      { title: "Turn proof into belonging", description: "Use member stories, audience stats, and pricing to make the community feel active." },
    ],
    steps: [
      { badge: "Join", title: "Subscribe or enter", description: "Make the first step quick, free or low-risk, and emotionally clear." },
      { badge: "Engage", title: "Experience the rhythm", description: "Show episodes, issues, events, channels, or content drops." },
      { badge: "Belong", title: "Grow with the audience", description: "Use proof, member outcomes, and upgrade paths to support retention." },
    ],
    cases: [
      { client: "Subscribers", title: "Weekly engagement rose", result: "+46%", description: "Clear content pillars made the audience understand the value faster." },
      { client: "Members", title: "Paid upgrades increased", result: "2.2x", description: "Benefit-led membership sections made premium access easier to evaluate." },
      { client: "Sponsors", title: "Audience fit improved", result: "4.8/5", description: "A stronger proof stack helped sponsors trust the audience quality." },
    ],
    tools: ["Substack", "Spotify", "Apple Podcasts", "Discord", "Circle", "YouTube", "ConvertKit", "Patreon", "Beehiiv"],
    guarantees: [
      { title: "No spam", description: "Clarify cadence, unsubscribe terms, and privacy before signup." },
      { title: "Real value", description: "Preview examples, member benefits, and recurring content themes." },
      { title: "Community standards", description: "Show moderation, code of conduct, and safe participation promises." },
      { title: "Flexible membership", description: "Make free, paid, and cancellation paths simple." },
    ],
    comparison: [
      { feature: "Access", values: ["Free", "Member", "Founding"] },
      { feature: "Community", values: ["Read-only", "Full access", "Private group"] },
      { feature: "Bonus content", values: ["false", "Monthly", "Weekly"] },
      { feature: "Best for", values: ["Curious", "Committed", "Power users"] },
    ],
  },
};

const ENHANCEMENT_ORDER: Record<TemplateCategory, Array<EditorBlock["type"]>> = {
  SaaS: ["problem-solution", "process", "integrations", "guarantee", "case-studies", "comparison"],
  Agency: ["case-studies", "process", "problem-solution", "guarantee", "integrations", "comparison"],
  "E-commerce": ["problem-solution", "comparison", "guarantee", "process", "case-studies", "integrations"],
  Health: ["problem-solution", "process", "guarantee", "case-studies", "comparison", "integrations"],
  Education: ["process", "problem-solution", "case-studies", "guarantee", "comparison", "integrations"],
  "Local Business": ["problem-solution", "process", "guarantee", "case-studies", "integrations", "comparison"],
  Finance: ["problem-solution", "process", "guarantee", "case-studies", "comparison", "integrations"],
  Creator: ["problem-solution", "process", "case-studies", "guarantee", "integrations", "comparison"],
};

const RICH_TAGS = ["full-page", "2026", "conversion"];

function isTemplateCategory(category: string): category is TemplateCategory {
  return category in CATEGORY_COPY;
}

function enhancedStyle(template: TemplateData, index: number): EditorBlock["styles"] {
  const primary = template.globalStyles.primaryColor;
  const secondary = template.globalStyles.secondaryColor;
  const darkCategories = ["SaaS", "Finance", "Creator"];
  const dark = darkCategories.includes(template.category);
  const lightBg = index % 2 === 0 ? "#f8fafc" : "#ffffff";
  const darkBg = index % 2 === 0 ? secondary : "#020617";

  return {
    ...S(84, 84),
    backgroundColor: dark ? darkBg : lightBg,
    textColor: dark ? "#f8fafc" : "#111827",
    gradient: dark
      ? `radial-gradient(circle at 15% 0%, ${primary}30, transparent 34%), linear-gradient(135deg, ${darkBg}, ${secondary})`
      : `radial-gradient(circle at 85% 0%, ${primary}18, transparent 32%), linear-gradient(135deg, ${lightBg}, #ffffff)`,
    borderRadius: 0,
    boxShadow: index % 3 === 0 ? `inset 0 1px 0 ${primary}18` : undefined,
    animation: "slide-up",
    animationDelay: (index % 4) * 80,
    animationDuration: 650,
  };
}

function withMotion(block: EditorBlock, index: number): EditorBlock {
  if (block.type === "header" || block.type === "footer") return block;
  return {
    ...block,
    styles: {
      ...block.styles,
      animation: block.styles.animation || (index % 3 === 0 ? "fade-in" : "slide-up"),
      animationDelay: block.styles.animationDelay ?? Math.min(index * 45, 360),
      animationDuration: block.styles.animationDuration ?? 620,
      hoverEffect: block.styles.hoverEffect || (["features", "pricing", "testimonials", "case-studies"].includes(block.type) ? "lift" : "none"),
    },
  };
}

function makeEnhancementBlock(template: TemplateData, type: EditorBlock["type"], sequence: number): EditorBlock {
  const category = isTemplateCategory(template.category) ? template.category : "SaaS";
  const copy = CATEGORY_COPY[category];
  const prefix = `${template.id}-complete-${sequence}`;
  const name = template.name;

  if (type === "problem-solution") {
    return {
      id: `${prefix}-problem`,
      type,
      styles: enhancedStyle(template, sequence),
      content: {
        eyebrow: `${category} conversion gap`,
        heading: `${name}: solve the hesitation before the CTA`,
        subheading: `A complete ${category.toLowerCase()} template needs to show the problem, the better path, and why the visitor should act now.`,
        problemTitle: copy.problemTitle,
        solutionTitle: copy.solutionTitle,
        problems: copy.problems,
        solutions: copy.solutions,
      },
    };
  }

  if (type === "process") {
    return {
      id: `${prefix}-process`,
      type,
      styles: enhancedStyle(template, sequence),
      content: {
        eyebrow: "Conversion journey",
        heading: `How ${name} moves ${copy.audience} from interest to action`,
        subheading: `The structure is designed around ${copy.outcome}.`,
        steps: copy.steps,
      },
    };
  }

  if (type === "case-studies") {
    return {
      id: `${prefix}-cases`,
      type,
      styles: enhancedStyle(template, sequence),
      content: {
        eyebrow: "Proof stack",
        heading: `Proof points built for ${name}`,
        subheading: "Case-study style cards make the promise specific, measurable, and easier to trust.",
        cases: copy.cases,
      },
    };
  }

  if (type === "integrations") {
    return {
      id: `${prefix}-ecosystem`,
      type,
      styles: enhancedStyle(template, sequence),
      content: {
        eyebrow: "Ecosystem",
        heading: `${name} fits the channels your audience already trusts`,
        subheading: "Use this section to make adoption, booking, checkout, enrollment, or community participation feel frictionless.",
        tools: copy.tools,
        note: `For ${category.toLowerCase()} pages, ecosystem proof reduces the feeling of starting from scratch.`,
      },
    };
  }

  if (type === "guarantee") {
    return {
      id: `${prefix}-guarantee`,
      type,
      styles: enhancedStyle(template, sequence),
      content: {
        eyebrow: "Decision safety",
        badge: "Confidence layer",
        heading: `A safer next step for ${copy.audience}`,
        subheading: "This section reverses risk with clear terms, support expectations, and trust signals near the final CTA.",
        points: copy.guarantees,
      },
    };
  }

  return {
    id: `${prefix}-comparison`,
    type: "comparison",
    styles: enhancedStyle(template, sequence),
    content: {
      heading: `${name} comparison framework`,
      columns: ["Basic page", "Good page", "Complete 2026 template"],
      rows: copy.comparison,
    },
  };
}

function insertBeforeTerminalBlocks(blocks: EditorBlock[], additions: EditorBlock[]): EditorBlock[] {
  const terminalIndex = blocks.findIndex((block) => block.type === "cta" || block.type === "footer");
  if (terminalIndex === -1) return [...blocks, ...additions];
  return [
    ...blocks.slice(0, terminalIndex),
    ...additions,
    ...blocks.slice(terminalIndex),
  ];
}

function completeTemplate(template: TemplateData): TemplateData {
  const targetSections = 12;
  const category = isTemplateCategory(template.category) ? template.category : "SaaS";
  const existingBlocks = template.blocks.map(withMotion);
  const slotsNeeded = Math.max(0, targetSections - existingBlocks.length);
  const additions = ENHANCEMENT_ORDER[category]
    .filter((type) => !existingBlocks.some((block) => block.type === type))
    .slice(0, slotsNeeded)
    .map((type, index) => makeEnhancementBlock(template, type, index));

  const blocks = insertBeforeTerminalBlocks(existingBlocks, additions);
  const tags = Array.from(new Set([...template.tags, ...RICH_TAGS]));
  const description = template.description.startsWith("Complete")
    ? template.description
    : `Complete ${template.category} template with ${blocks.length} conversion-focused sections, premium proof flow, and 2026-ready motion styling.`;

  return {
    ...template,
    description,
    tags,
    blocks,
  };
}

export const TEMPLATE_DATA: TemplateData[] = RAW_TEMPLATE_DATA.map(completeTemplate);

export function getTemplateById(id: string): TemplateData | undefined {
  return TEMPLATE_DATA.find((t) => t.id === id);
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
