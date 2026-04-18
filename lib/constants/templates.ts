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

export const TEMPLATE_DATA: TemplateData[] = [
  // ─── t1: SaaS Hero ───────────────────────────────────────────────
  {
    id: "t1", name: "SaaS Hero", category: "SaaS", emoji: "🚀",
    description: "Clean SaaS landing with hero, features, pricing, and CTA.",
    tags: ["minimal", "modern"], isPro: false,
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t1-header", type: "header", styles: S(16,16), content: { logo: "SaaSly", menuItems: [{ label: "Features", url: "#features" }, { label: "Pricing", url: "#pricing" }, { label: "Blog", url: "#" }], ctaText: "Start Free Trial", ctaUrl: "#", sticky: true } },
      { id: "t1-hero", type: "hero", styles: { ...S(100, 100), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { headline: "Ship Better Products, Faster", subheadline: "The all-in-one platform to plan, build, and scale your SaaS. Trusted by 12,000+ teams worldwide.", ctaText: "Start Free Trial", ctaUrl: "#", secondaryCtaText: "Watch Demo", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "t1-logos", type: "social-proof", styles: S(32,32), content: { heading: "Trusted by teams at", layout: "logos", items: ["Stripe", "Notion", "Linear", "Vercel", "Supabase", "Figma"] } },
      { id: "t1-features", type: "features", styles: S(), content: { heading: "Everything Your Team Needs", subheading: "Powerful tools built for modern SaaS teams", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "AI Automations", description: "Let AI handle repetitive tasks so your team stays focused on what matters." },
        { icon: "shield", title: "Enterprise Security", description: "SOC2 compliant with SSO, 2FA, and role-based access control built in." },
        { icon: "bar-chart-3", title: "Real-Time Analytics", description: "Track usage, revenue, and churn with live dashboards and custom reports." },
        { icon: "globe", title: "Global CDN", description: "99.99% uptime with edge deployments across 30+ regions worldwide." },
        { icon: "users", title: "Team Collaboration", description: "Invite unlimited teammates, set permissions, and work together in real time." },
        { icon: "star", title: "Integrations", description: "Connect with Slack, Zapier, HubSpot, Stripe, and 200+ other tools." },
      ]} },
      { id: "t1-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Loved by 12,000+ Teams", layout: "grid", testimonials: [
        { name: "Sarah Chen", role: "CTO", company: "Acme Corp", content: "We cut our deployment time by 70% in the first month. Absolutely game-changing for our team.", rating: 5 },
        { name: "Marcus Webb", role: "Founder", company: "LaunchPad", content: "Finally a platform that scales with us. We went from 100 to 10,000 users without changing a line of code.", rating: 5 },
        { name: "Priya Nair", role: "VP Engineering", company: "DataFlow", content: "The analytics alone are worth it. We finally understand where users drop off and why.", rating: 5 },
      ]} },
      { id: "t1-pricing", type: "pricing", styles: S(), content: { heading: "Simple, Transparent Pricing", subheading: "No hidden fees. Cancel anytime.", plans: [
        { name: "Starter", price: 0, period: "month", features: ["3 Projects", "5 Team Members", "10GB Storage", "Basic Analytics", "Email Support"], ctaText: "Get Started Free" },
        { name: "Growth", price: 49, period: "month", features: ["25 Projects", "25 Team Members", "100GB Storage", "Advanced Analytics", "Priority Support", "API Access"], ctaText: "Start Growth", highlighted: true },
        { name: "Enterprise", price: 149, period: "month", features: ["Unlimited Projects", "Unlimited Members", "1TB Storage", "Custom Analytics", "Dedicated Support", "SSO & SAML", "SLA Guarantee"], ctaText: "Contact Sales" },
      ]} },
      { id: "t1-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Frequently Asked Questions", items: [
        { question: "Is there a free trial?", answer: "Yes! You get 14 days free on any paid plan, no credit card required." },
        { question: "Can I change plans later?", answer: "Absolutely. Upgrade or downgrade at any time and we'll prorate the difference." },
        { question: "Do you offer refunds?", answer: "We offer a 30-day money-back guarantee on all paid plans." },
        { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and wire transfers for annual plans." },
      ]} },
      { id: "t1-cta", type: "cta", styles: { ...S(80,80), backgroundColor: "#7c3aed", textColor: "#ffffff" }, content: { heading: "Ready to Transform Your Workflow?", subheading: "Join 12,000+ teams building better software with SaaSly.", ctaText: "Start Free Trial — No Credit Card", ctaUrl: "#" } },
      { id: "t1-footer", type: "footer", styles: S(48,48), content: { logo: "SaaSly", columns: [
        { title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }, { label: "Roadmap", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Blog", url: "#" }, { label: "Careers", url: "#" }, { label: "Contact", url: "#" }] },
        { title: "Legal", links: [{ label: "Privacy Policy", url: "#" }, { label: "Terms of Service", url: "#" }, { label: "Cookie Policy", url: "#" }] },
      ], copyright: "2026 SaaSly. All rights reserved." } },
    ]
  },

  // ─── t2: Agency Pro ──────────────────────────────────────────────
  {
    id: "t2", name: "Agency Pro", category: "Agency", emoji: "🏢",
    description: "Full agency site with portfolio, services, team, and contact.",
    tags: ["professional", "bold"], isPro: false,
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#1e293b", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "t2-header", type: "header", styles: S(16,16), content: { logo: "Apex Agency", menuItems: [{ label: "Work", url: "#work" }, { label: "Services", url: "#services" }, { label: "Team", url: "#team" }, { label: "Contact", url: "#contact" }], ctaText: "Get a Quote", ctaUrl: "#contact", sticky: true } },
      { id: "t2-hero", type: "hero", styles: { ...S(120, 120), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "We Build Brands That Win Markets", subheadline: "Award-winning digital agency specializing in brand strategy, web design, and growth marketing for ambitious companies.", ctaText: "View Our Work", ctaUrl: "#work", secondaryCtaText: "Start a Project", secondaryCtaUrl: "#contact", alignment: "center" } },
      { id: "t2-stats", type: "stats", styles: { ...S(48,48), backgroundColor: "#1e293b", textColor: "#f1f5f9" }, content: { heading: "", stats: [{ value: 150, label: "Projects Delivered", suffix: "+" }, { value: 8, label: "Years in Business", suffix: "" }, { value: 98, label: "Client Satisfaction", suffix: "%" }, { value: 40, label: "Team Members", suffix: "+" }], animated: true } },
      { id: "t2-services", type: "features", styles: S(80,80), content: { heading: "What We Do", subheading: "End-to-end digital services that move the needle", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Brand Identity", description: "Logo, visual system, brand guidelines, and everything you need to stand out in your market." },
        { icon: "globe", title: "Web Design & Dev", description: "High-performance websites and web apps built with modern tech that converts visitors into customers." },
        { icon: "bar-chart-3", title: "Growth Marketing", description: "Data-driven campaigns across SEO, paid ads, email, and social to grow your revenue." },
        { icon: "users", title: "UX/UI Design", description: "User research, wireframes, prototypes, and polished interfaces your users will love." },
        { icon: "zap", title: "Content Strategy", description: "Brand storytelling, copywriting, and content production that builds authority and drives traffic." },
        { icon: "shield", title: "Analytics & CRO", description: "Conversion rate optimization backed by heatmaps, A/B tests, and behavioral analytics." },
      ]} },
      { id: "t2-work", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Selected Work", layout: "grid", columns: 3, images: [] } },
      { id: "t2-team", type: "team", styles: S(), content: { heading: "The People Behind the Work", layout: "grid", members: [
        { name: "Alex Morgan", role: "Founder & Creative Director", bio: "15 years shaping brands for Fortune 500 companies.", photoUrl: "" },
        { name: "Jordan Lee", role: "Head of Strategy", bio: "Former McKinsey consultant turned growth marketer.", photoUrl: "" },
        { name: "Sam Rivera", role: "Lead Developer", bio: "Full-stack engineer obsessed with performance.", photoUrl: "" },
        { name: "Taylor Kim", role: "UX Director", bio: "Designing human-centered experiences since 2012.", photoUrl: "" },
      ]} },
      { id: "t2-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Client Results", layout: "grid", testimonials: [
        { name: "David Park", role: "CEO", company: "NovaTech", content: "Apex rebuilt our brand from scratch. Our conversion rate doubled within 90 days of launch.", rating: 5 },
        { name: "Lisa Ortega", role: "CMO", company: "PulseMedia", content: "The most professional agency we've ever worked with. Delivered on time, on budget, on brief.", rating: 5 },
        { name: "Ryan Foster", role: "Founder", company: "GreenLoop", content: "Our new site generated $200k in pipeline in the first quarter. ROI is incredible.", rating: 5 },
      ]} },
      { id: "t2-form", type: "form", styles: S(), content: { heading: "Start Your Project", description: "Tell us about your project and we'll get back within 24 hours.", fields: [
        { type: "text", label: "Company Name", placeholder: "Acme Corp", required: true },
        { type: "email", label: "Email", placeholder: "you@company.com", required: true },
        { type: "text", label: "Budget Range", placeholder: "$10k – $50k", required: false },
        { type: "textarea", label: "Project Brief", placeholder: "Tell us about your project, goals, and timeline...", required: true },
      ], submitText: "Send Brief", successMessage: "Thanks! We'll review your brief and reach out within 24 hours." } },
      { id: "t2-footer", type: "footer", styles: S(48,48), content: { logo: "Apex Agency", columns: [
        { title: "Services", links: [{ label: "Brand Identity", url: "#" }, { label: "Web Design", url: "#" }, { label: "Marketing", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Team", url: "#" }, { label: "Careers", url: "#" }] },
      ], copyright: "2026 Apex Agency. All rights reserved." } },
    ]
  },

  // ─── t3: Product Launch ───────────────────────────────────────────
  {
    id: "t3", name: "Product Launch", category: "Landing Page", emoji: "⚡",
    description: "High-converting product launch page with countdown and waitlist.",
    tags: ["launch", "conversion"], isPro: false,
    globalStyles: { primaryColor: "#f97316", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 10, baseFontSize: 16 },
    blocks: [
      { id: "t3-header", type: "header", styles: S(16,16), content: { logo: "Launchpad", menuItems: [{ label: "Features", url: "#features" }, { label: "Waitlist", url: "#waitlist" }], ctaText: "Join Waitlist", ctaUrl: "#waitlist", sticky: true } },
      { id: "t3-hero", type: "hero", styles: { ...S(100,60), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "The Product That Changes Everything", subheadline: "We're launching something big. Be the first to experience the future of productivity — join 5,000+ people on the waitlist.", ctaText: "Join the Waitlist", ctaUrl: "#waitlist", alignment: "center" } },
      { id: "t3-countdown", type: "countdown", styles: { ...S(32,32), backgroundColor: "#f97316", textColor: "#ffffff" }, content: { heading: "Launching In", mode: "fixed", targetDate: new Date(Date.now() + 30 * 24 * 3600000).toISOString() } },
      { id: "t3-features", type: "features", styles: S(80,80), content: { heading: "What You're Getting", subheading: "Everything we've built — designed for one thing: results", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "10x Faster Workflow", description: "Cut the time you spend on busywork by 90%. Our AI does the heavy lifting." },
        { icon: "star", title: "Beautiful by Default", description: "Every output looks polished and professional — no design skills needed." },
        { icon: "shield", title: "Privacy First", description: "Your data never leaves your control. End-to-end encryption on everything." },
        { icon: "users", title: "Built for Teams", description: "Real-time collaboration with your entire team, no seat limits." },
        { icon: "bar-chart-3", title: "Deep Insights", description: "Understand exactly what's working with built-in analytics and reports." },
        { icon: "globe", title: "Works Everywhere", description: "Web, Mac, Windows, iOS, and Android. Your workflow, your device." },
      ]} },
      { id: "t3-socialproof", type: "social-proof", styles: { ...S(32,32), backgroundColor: "#f8fafc" }, content: { heading: "5,000+ people already signed up from", layout: "logos", items: ["Google", "Spotify", "Airbnb", "Netflix", "Shopify", "Twitter"] } },
      { id: "t3-testimonials", type: "testimonials", styles: S(), content: { heading: "Early Access Testers Love It", layout: "grid", testimonials: [
        { name: "Mia Thompson", role: "Product Manager", company: "Dropbox", content: "I've been in the beta for 3 weeks and I can't imagine going back to my old workflow. It's that good.", rating: 5 },
        { name: "Carlos Diaz", role: "Founder", company: "SeedRound", content: "This is the tool I didn't know I needed. Saved me 10 hours a week from day one.", rating: 5 },
        { name: "Nina Patel", role: "Designer", company: "Figma", content: "Finally a product that gets out of your way and lets you focus on the work that matters.", rating: 5 },
      ]} },
      { id: "t3-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Join the Waitlist", description: "Get early access + 50% off your first year. Limited spots available.", fields: [
        { type: "text", label: "Full Name", placeholder: "Jane Smith", required: true },
        { type: "email", label: "Work Email", placeholder: "jane@company.com", required: true },
        { type: "text", label: "Company", placeholder: "Acme Corp", required: false },
      ], submitText: "Secure My Spot", successMessage: "You're on the list! We'll email you the moment we launch." } },
      { id: "t3-footer", type: "footer", styles: S(32,32), content: { logo: "Launchpad", columns: [{ title: "Company", links: [{ label: "About", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "2026 Launchpad. All rights reserved." } },
    ]
  },

  // ─── t4: E-commerce Store (Pro) ───────────────────────────────────
  {
    id: "t4", name: "E-commerce Store", category: "E-commerce", emoji: "🛍️",
    description: "Product showcase with gallery, reviews, and buy buttons.",
    tags: ["shop", "products"], isPro: true,
    globalStyles: { primaryColor: "#16a34a", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t4-header", type: "header", styles: S(16,16), content: { logo: "ShopNest", menuItems: [{ label: "Products", url: "#" }, { label: "Collections", url: "#" }, { label: "About", url: "#" }], ctaText: "Shop Now", ctaUrl: "#", sticky: true } },
      { id: "t4-hero", type: "hero", styles: S(80,80), content: { headline: "Premium Products, Delivered Fast", subheadline: "Discover our curated collection of top-quality products with free shipping over $50 and hassle-free returns.", ctaText: "Shop the Collection", ctaUrl: "#", alignment: "center" } },
      { id: "t4-stats", type: "stats", styles: { ...S(32,32), backgroundColor: "#f0fdf4" }, content: { heading: "", stats: [{ value: 50000, label: "Happy Customers", suffix: "+" }, { value: 500, label: "Products", suffix: "+" }, { value: 4.9, label: "Average Rating", suffix: "★" }, { value: 2, label: "Shipping Days", suffix: "" }], animated: true } },
      { id: "t4-gallery", type: "gallery", styles: S(), content: { heading: "Best Sellers", layout: "grid", columns: 3, images: [] } },
      { id: "t4-features", type: "features", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Why Shop With Us", subheading: "", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Free Express Shipping", description: "Orders over $50 ship free with 2-day delivery to your door." },
        { icon: "shield", title: "30-Day Returns", description: "Not happy? Return anything within 30 days, no questions asked." },
        { icon: "star", title: "Authenticity Guarantee", description: "Every product is 100% authentic and quality-checked before shipping." },
        { icon: "users", title: "24/7 Support", description: "Our customer success team is always here when you need us." },
        { icon: "globe", title: "Worldwide Shipping", description: "We ship to 50+ countries with full tracking on every order." },
        { icon: "bar-chart-3", title: "Rewards Program", description: "Earn points on every purchase and redeem them for discounts." },
      ]} },
      { id: "t4-testimonials", type: "testimonials", styles: S(), content: { heading: "What Our Customers Say", layout: "grid", testimonials: [
        { name: "Emma Wilson", role: "Verified Buyer", company: "", content: "Absolutely love my order! Quality is even better than the photos. Arrived in 2 days. Will definitely buy again.", rating: 5 },
        { name: "James Liu", role: "Verified Buyer", company: "", content: "Easy checkout, fast shipping, and the product exceeded my expectations. 10/10 experience.", rating: 5 },
        { name: "Sophie Clark", role: "Verified Buyer", company: "", content: "Had a small issue and customer support resolved it within an hour. Incredible service.", rating: 5 },
      ]} },
      { id: "t4-cta", type: "cta", styles: { ...S(80,80), backgroundColor: "#16a34a", textColor: "#ffffff" }, content: { heading: "Get 20% Off Your First Order", subheading: "Sign up for our newsletter and unlock an exclusive discount code.", ctaText: "Claim Your Discount", ctaUrl: "#" } },
      { id: "t4-footer", type: "footer", styles: S(48,48), content: { logo: "ShopNest", columns: [
        { title: "Shop", links: [{ label: "All Products", url: "#" }, { label: "New Arrivals", url: "#" }, { label: "Sale", url: "#" }] },
        { title: "Support", links: [{ label: "FAQ", url: "#" }, { label: "Shipping", url: "#" }, { label: "Returns", url: "#" }] },
      ], copyright: "2026 ShopNest. All rights reserved." } },
    ]
  },

  // ─── t5: Portfolio Minimal ────────────────────────────────────────
  {
    id: "t5", name: "Portfolio Minimal", category: "Portfolio", emoji: "🎨",
    description: "Clean portfolio with work showcase and contact form.",
    tags: ["minimal", "creative"], isPro: false,
    globalStyles: { primaryColor: "#ec4899", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 4, baseFontSize: 16 },
    blocks: [
      { id: "t5-header", type: "header", styles: S(16,16), content: { logo: "Alex K.", menuItems: [{ label: "Work", url: "#work" }, { label: "About", url: "#about" }, { label: "Contact", url: "#contact" }], ctaText: "Hire Me", ctaUrl: "#contact", sticky: true } },
      { id: "t5-hero", type: "hero", styles: { ...S(120,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Designer & Creative Director", subheadline: "I help startups and growing companies craft bold visual identities, intuitive digital products, and memorable brand experiences.", ctaText: "View My Work", ctaUrl: "#work", secondaryCtaText: "Download Resume", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "t5-stats", type: "stats", styles: S(32,32), content: { heading: "", stats: [{ value: 80, label: "Projects Completed", suffix: "+" }, { value: 6, label: "Years Experience", suffix: "" }, { value: 30, label: "Happy Clients", suffix: "+" }, { value: 5, label: "Design Awards", suffix: "" }], animated: true } },
      { id: "t5-work", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Selected Work", layout: "grid", columns: 3, images: [] } },
      { id: "t5-skills", type: "features", styles: S(), content: { heading: "What I Do", subheading: "End-to-end design across strategy and execution", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Brand Identity", description: "Logo systems, color palettes, typography, and brand guidelines that tell your story." },
        { icon: "globe", title: "Web Design", description: "Pixel-perfect UI design for marketing sites, SaaS products, and web apps." },
        { icon: "users", title: "UX Research", description: "User interviews, usability testing, and data analysis to inform design decisions." },
        { icon: "zap", title: "Motion Design", description: "Micro-animations, transitions, and video assets that bring interfaces to life." },
        { icon: "bar-chart-3", title: "Design Systems", description: "Scalable component libraries in Figma that keep your product consistent at any size." },
        { icon: "shield", title: "Art Direction", description: "Creative direction for photo shoots, campaigns, and marketing materials." },
      ]} },
      { id: "t5-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Client Words", layout: "grid", testimonials: [
        { name: "Chris Evans", role: "CEO", company: "Bloom Digital", content: "Alex completely transformed our brand. Our investor deck has never looked better and we closed our Series A.", rating: 5 },
        { name: "Yuki Tanaka", role: "Founder", company: "Hana App", content: "Working with Alex was a dream. She understood our vision immediately and delivered beyond expectations.", rating: 5 },
        { name: "Ben Harris", role: "Head of Design", company: "Pixel Studio", content: "Exceptional work ethic and an incredibly sharp eye for design. Highly recommend for any creative project.", rating: 5 },
      ]} },
      { id: "t5-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Let's Work Together", description: "Have a project in mind? I'd love to hear about it.", fields: [
        { type: "text", label: "Name", placeholder: "Your name", required: true },
        { type: "email", label: "Email", placeholder: "you@example.com", required: true },
        { type: "text", label: "Project Type", placeholder: "Brand Identity, Web Design...", required: false },
        { type: "textarea", label: "Tell Me More", placeholder: "What are you building? Timeline? Budget?", required: true },
      ], submitText: "Send Message", successMessage: "Thanks! I'll get back to you within 48 hours." } },
      { id: "t5-footer", type: "footer", styles: S(32,32), content: { logo: "Alex K.", columns: [{ title: "Links", links: [{ label: "Work", url: "#" }, { label: "About", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "2026 Alex Kim. All rights reserved." } },
    ]
  },

  // ─── t6: Coming Soon ─────────────────────────────────────────────
  {
    id: "t6", name: "Coming Soon", category: "Coming Soon", emoji: "🔒",
    description: "Countdown timer, email capture, and social links.",
    tags: ["countdown", "waitlist"], isPro: false,
    globalStyles: { primaryColor: "#8b5cf6", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t6-hero", type: "hero", styles: { ...S(100,60), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Something Big Is Coming", subheadline: "We're working hard on something amazing. Be the first to know when we launch — get exclusive early access and a special founding member discount.", ctaText: "", ctaUrl: "", alignment: "center" } },
      { id: "t6-countdown", type: "countdown", styles: { ...S(32,32), backgroundColor: "#1e1b4b", textColor: "#ffffff" }, content: { heading: "Launching In", mode: "fixed", targetDate: new Date(Date.now() + 21 * 24 * 3600000).toISOString() } },
      { id: "t6-features", type: "features", styles: S(64,64), content: { heading: "What's Coming", subheading: "A sneak peek at what we're building", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Instant Setup", description: "Get started in under 5 minutes. No technical knowledge required." },
        { icon: "star", title: "AI-Powered", description: "Smart automation that learns your workflow and saves you hours every week." },
        { icon: "shield", title: "Privacy First", description: "Your data is encrypted and never shared or sold. Period." },
        { icon: "users", title: "Team Features", description: "Built for collaboration from day one. Bring your whole team." },
        { icon: "globe", title: "Works Everywhere", description: "Web, mobile, and desktop apps available at launch." },
        { icon: "bar-chart-3", title: "Deep Analytics", description: "Know exactly what's happening in your business in real time." },
      ]} },
      { id: "t6-form", type: "form", styles: { ...S(48,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Get Early Access", description: "Join 3,000+ people on our waitlist. Founding members get 50% off, forever.", fields: [
        { type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
      ], submitText: "Reserve My Spot", successMessage: "You're in! We'll email you the moment we launch." } },
      { id: "t6-footer", type: "footer", styles: S(24,24), content: { logo: "Coming Soon", columns: [], copyright: "2026. All rights reserved." } },
    ]
  },

  // ─── t7: Blog Home ────────────────────────────────────────────────
  {
    id: "t7", name: "Blog Home", category: "Blog", emoji: "✍️",
    description: "Blog homepage with featured posts, categories, and newsletter.",
    tags: ["blog", "content"], isPro: false,
    globalStyles: { primaryColor: "#ea580c", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t7-header", type: "header", styles: S(16,16), content: { logo: "The Brief", menuItems: [{ label: "Articles", url: "#" }, { label: "Topics", url: "#" }, { label: "About", url: "#" }, { label: "Newsletter", url: "#newsletter" }], ctaText: "Subscribe", ctaUrl: "#newsletter", sticky: true } },
      { id: "t7-hero", type: "hero", styles: { ...S(80,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Ideas Worth Sharing", subheadline: "Deep dives, practical guides, and fresh perspectives on technology, business, and the future of work. Published weekly.", ctaText: "Read Latest Article", ctaUrl: "#", alignment: "center" } },
      { id: "t7-features", type: "features", styles: S(), content: { heading: "Popular Topics", subheading: "Explore our most-read categories", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "AI & Technology", description: "Breaking down the latest AI trends and what they mean for your business and career." },
        { icon: "bar-chart-3", title: "Startup & Growth", description: "Lessons from founders who've scaled from zero to millions in revenue." },
        { icon: "users", title: "Future of Work", description: "How remote work, automation, and Gen Z are reshaping the modern workplace." },
        { icon: "star", title: "Design & Product", description: "The principles and processes behind the products people love to use." },
        { icon: "globe", title: "Marketing", description: "Proven strategies for growing an audience and turning followers into customers." },
        { icon: "shield", title: "Finance & Investing", description: "Practical money advice for entrepreneurs and early-stage founders." },
      ]} },
      { id: "t7-stats", type: "stats", styles: { ...S(32,32), backgroundColor: "#fff7ed" }, content: { heading: "The Brief by the Numbers", stats: [{ value: 50000, label: "Subscribers", suffix: "+" }, { value: 250, label: "Articles Published", suffix: "+" }, { value: 4.8, label: "Reader Rating", suffix: "★" }, { value: 3, label: "Years Running", suffix: "" }], animated: true } },
      { id: "t7-testimonials", type: "testimonials", styles: S(), content: { heading: "What Readers Say", layout: "grid", testimonials: [
        { name: "Maya Johnson", role: "Product Lead", company: "Stripe", content: "The Brief is the only newsletter I actually read every week. Dense, insightful, and always ahead of the curve.", rating: 5 },
        { name: "Tom Bradley", role: "Founder", company: "Founder House", content: "I've gotten 3 investor introductions from ideas I first read about in The Brief. It's that valuable.", rating: 5 },
        { name: "Leila Santos", role: "Designer", company: "Figma", content: "The design deep-dives are unmatched. I share them with my entire team every week.", rating: 5 },
      ]} },
      { id: "t7-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Join 50,000+ Readers", description: "Get the weekly brief every Sunday morning. No spam, unsubscribe anytime.", fields: [
        { type: "text", label: "First Name", placeholder: "Jane", required: true },
        { type: "email", label: "Email", placeholder: "jane@example.com", required: true },
      ], submitText: "Subscribe for Free", successMessage: "Welcome to The Brief! Check your inbox for a confirmation email." } },
      { id: "t7-footer", type: "footer", styles: S(48,48), content: { logo: "The Brief", columns: [
        { title: "Topics", links: [{ label: "Technology", url: "#" }, { label: "Startups", url: "#" }, { label: "Marketing", url: "#" }] },
        { title: "About", links: [{ label: "Our Story", url: "#" }, { label: "Authors", url: "#" }, { label: "Advertise", url: "#" }] },
      ], copyright: "2026 The Brief. All rights reserved." } },
    ]
  },

  // ─── t8: Event Page (Pro) ─────────────────────────────────────────
  {
    id: "t8", name: "Event Page", category: "Event", emoji: "🎤",
    description: "Event landing with schedule, speakers, and ticket CTA.",
    tags: ["event", "tickets"], isPro: true,
    globalStyles: { primaryColor: "#dc2626", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t8-header", type: "header", styles: S(16,16), content: { logo: "Summit 2026", menuItems: [{ label: "Schedule", url: "#schedule" }, { label: "Speakers", url: "#speakers" }, { label: "Tickets", url: "#tickets" }], ctaText: "Buy Tickets", ctaUrl: "#tickets", sticky: true } },
      { id: "t8-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "The Biggest Tech Summit of the Year", subheadline: "3 days. 50+ speakers. 2,000+ founders, builders, and investors. Join us in San Francisco, May 15–17, 2026.", ctaText: "Get Your Ticket", ctaUrl: "#tickets", alignment: "center" } },
      { id: "t8-countdown", type: "countdown", styles: { ...S(24,24), backgroundColor: "#dc2626", textColor: "#ffffff" }, content: { heading: "Event Starts In", mode: "fixed", targetDate: "2026-05-15T09:00:00Z" } },
      { id: "t8-stats", type: "stats", styles: S(32,32), content: { heading: "", stats: [{ value: 50, label: "World-Class Speakers", suffix: "+" }, { value: 2000, label: "Attendees", suffix: "+" }, { value: 3, label: "Days of Content", suffix: "" }, { value: 20, label: "Workshops", suffix: "+" }], animated: true } },
      { id: "t8-features", type: "features", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "What to Expect", subheading: "Three days packed with insights, connections, and inspiration", layout: "grid", columns: 3, features: [
        { icon: "users", title: "Keynote Speakers", description: "Hear from the CEOs, founders, and innovators shaping the next decade of technology." },
        { icon: "zap", title: "Hands-On Workshops", description: "20+ practical workshops covering AI, product design, fundraising, and growth." },
        { icon: "star", title: "Networking Events", description: "Curated dinners, happy hours, and roundtables to connect with your peers." },
        { icon: "bar-chart-3", title: "Demo Day", description: "Watch the top 10 startups pitch live to a panel of leading investors." },
        { icon: "globe", title: "Expo Hall", description: "Explore the latest products and tools from 50+ leading tech companies." },
        { icon: "shield", title: "1-on-1 Meetings", description: "Pre-schedule meetings with speakers, investors, and partners through our app." },
      ]} },
      { id: "t8-team", type: "team", styles: S(), content: { heading: "Featured Speakers", layout: "grid", members: [
        { name: "Dr. Sarah Lin", role: "CEO, Anthropic", bio: "Leading AI safety research at one of the world's most important AI labs.", photoUrl: "" },
        { name: "Marcus Chen", role: "Partner, Sequoia", bio: "Led investments in 12 unicorns across SaaS, fintech, and consumer tech.", photoUrl: "" },
        { name: "Priya Sharma", role: "CPO, Figma", bio: "Building the tools used by 10 million designers worldwide.", photoUrl: "" },
        { name: "James Park", role: "Founder, Linear", bio: "Creator of the project management tool beloved by engineering teams everywhere.", photoUrl: "" },
      ]} },
      { id: "t8-pricing", type: "pricing", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Get Your Ticket", subheading: "Early bird pricing ends March 1st", plans: [
        { name: "General", price: 299, period: "ticket", features: ["All Keynotes", "Expo Access", "Networking App", "Lunch Included"], ctaText: "Buy General Ticket" },
        { name: "VIP", price: 799, period: "ticket", features: ["Everything in General", "VIP Lounge Access", "Speaker Dinners", "Workshop Priority", "Swag Bag"], ctaText: "Buy VIP Ticket", highlighted: true },
        { name: "Team (5+)", price: 199, period: "ticket", features: ["Everything in General", "Group Seating", "Team Dashboard", "Custom Branding"], ctaText: "Buy Team Tickets" },
      ]} },
      { id: "t8-footer", type: "footer", styles: S(32,32), content: { logo: "Summit 2026", columns: [{ title: "Event", links: [{ label: "Schedule", url: "#" }, { label: "Speakers", url: "#" }, { label: "Venue", url: "#" }] }, { title: "Info", links: [{ label: "FAQ", url: "#" }, { label: "Refund Policy", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "2026 Summit Inc. All rights reserved." } },
    ]
  },

  // ─── t9: Startup Dark (Pro) ───────────────────────────────────────
  {
    id: "t9", name: "Startup Dark", category: "SaaS", emoji: "🌑",
    description: "Dark-themed startup page with bold gradients and social proof.",
    tags: ["dark", "bold"], isPro: true,
    globalStyles: { primaryColor: "#8b5cf6", secondaryColor: "#030712", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
    blocks: [
      { id: "t9-header", type: "header", styles: { ...S(16,16), backgroundColor: "#030712", textColor: "#ffffff" }, content: { logo: "Nebula", menuItems: [{ label: "Product", url: "#" }, { label: "Pricing", url: "#" }, { label: "Docs", url: "#" }], ctaText: "Get Early Access", ctaUrl: "#", sticky: true } },
      { id: "t9-hero", type: "hero", styles: { ...S(120,100), backgroundColor: "#030712", textColor: "#ffffff" }, content: { headline: "The Infrastructure for the Next Generation", subheadline: "Nebula gives ambitious teams the primitives to build faster, scale smarter, and ship with confidence — all on one unified platform.", ctaText: "Start Building Free", ctaUrl: "#", secondaryCtaText: "Read the Docs", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "t9-logos", type: "social-proof", styles: { ...S(24,24), backgroundColor: "#0d0d18", textColor: "#9ca3af" }, content: { heading: "Powering the world's fastest-growing startups", layout: "logos", items: ["Y Combinator", "Stripe", "Linear", "Vercel", "Supabase", "Notion", "Figma", "Loom"] } },
      { id: "t9-features", type: "features", styles: { ...S(80,80), backgroundColor: "#030712", textColor: "#f1f5f9" }, content: { heading: "Built Different", subheading: "Every feature designed for speed, scale, and developer experience", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Edge-First Architecture", description: "Run your logic at the edge, 50ms from any user on Earth. No cold starts." },
        { icon: "shield", title: "Zero-Config Security", description: "DDoS protection, WAF, rate limiting, and secret management out of the box." },
        { icon: "bar-chart-3", title: "Observability Built In", description: "Logs, traces, metrics, and alerts without setting up any external tooling." },
        { icon: "globe", title: "Global by Default", description: "Deploy to 35 regions in one command. Automatic failover included." },
        { icon: "star", title: "Developer Experience", description: "A CLI that predicts what you need. Docs that actually answer your questions." },
        { icon: "users", title: "Team Features", description: "Role-based access, audit logs, and team dashboards for any size org." },
      ]} },
      { id: "t9-stats", type: "stats", styles: { ...S(48,48), backgroundColor: "#0d0d18", textColor: "#f1f5f9" }, content: { heading: "The Numbers Don't Lie", stats: [{ value: 99.99, label: "Uptime SLA", suffix: "%" }, { value: 50, label: "Edge Regions", suffix: "+" }, { value: 10000, label: "Teams Building", suffix: "+" }, { value: 1, label: "Avg Response Time", suffix: "ms" }], animated: true } },
      { id: "t9-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#030712", textColor: "#f1f5f9" }, content: { heading: "Trusted by Builders", layout: "grid", testimonials: [
        { name: "Lena Kim", role: "CTO", company: "Ramp", content: "We migrated our entire infrastructure to Nebula in 2 weeks. Performance improved 3x and our infra costs dropped 40%.", rating: 5 },
        { name: "Omar Hassan", role: "Lead Engineer", company: "Retool", content: "The developer experience is unreal. I shipped a global API with caching and auth in less than a day.", rating: 5 },
        { name: "Eva Müller", role: "Founder", company: "Ditto", content: "Nebula is what AWS should have been. Simple, fast, and powerful. We're never going back.", rating: 5 },
      ]} },
      { id: "t9-pricing", type: "pricing", styles: { ...S(), backgroundColor: "#030712", textColor: "#f1f5f9" }, content: { heading: "Pricing That Scales With You", subheading: "Start free. Pay only for what you use.", plans: [
        { name: "Hobby", price: 0, period: "month", features: ["3 Projects", "100GB Bandwidth", "1M Requests/mo", "Community Support"], ctaText: "Deploy for Free" },
        { name: "Pro", price: 20, period: "month", features: ["25 Projects", "1TB Bandwidth", "10M Requests/mo", "Priority Support", "Custom Domains"], ctaText: "Start Pro", highlighted: true },
        { name: "Team", price: 99, period: "month", features: ["Unlimited Projects", "5TB Bandwidth", "100M Requests/mo", "Dedicated Support", "SLA", "SSO"], ctaText: "Start Team" },
      ]} },
      { id: "t9-cta", type: "cta", styles: { ...S(80,80), backgroundColor: "#4c1d95", textColor: "#ffffff" }, content: { heading: "Start Building Today", subheading: "Deploy your first project in under 5 minutes. No credit card required.", ctaText: "Get Started Free", ctaUrl: "#" } },
      { id: "t9-footer", type: "footer", styles: { ...S(48,48), backgroundColor: "#030712", textColor: "#9ca3af" }, content: { logo: "Nebula", columns: [
        { title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Changelog", url: "#" }] },
        { title: "Developers", links: [{ label: "Docs", url: "#" }, { label: "API Reference", url: "#" }, { label: "Status", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Blog", url: "#" }, { label: "Careers", url: "#" }] },
      ], copyright: "2026 Nebula Inc. All rights reserved." } },
    ]
  },

  // ─── t10: Freelancer ──────────────────────────────────────────────
  {
    id: "t10", name: "Freelancer", category: "Portfolio", emoji: "💼",
    description: "Personal freelancer page with skills, rates, and booking.",
    tags: ["freelance", "personal"], isPro: false,
    globalStyles: { primaryColor: "#0ea5e9", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t10-header", type: "header", styles: S(16,16), content: { logo: "Jordan Dev", menuItems: [{ label: "Services", url: "#services" }, { label: "Work", url: "#work" }, { label: "Rates", url: "#rates" }], ctaText: "Book a Call", ctaUrl: "#contact", sticky: true } },
      { id: "t10-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Full-Stack Developer for Hire", subheadline: "I help startups and product teams build fast, scalable web applications. 7 years of experience. Currently available for new projects.", ctaText: "See My Work", ctaUrl: "#work", secondaryCtaText: "Book a Free Call", secondaryCtaUrl: "#contact", alignment: "center" } },
      { id: "t10-stats", type: "stats", styles: S(32,32), content: { heading: "", stats: [{ value: 60, label: "Projects Delivered", suffix: "+" }, { value: 7, label: "Years Experience", suffix: "" }, { value: 100, label: "Client Satisfaction", suffix: "%" }, { value: 12, label: "Long-Term Clients", suffix: "" }], animated: true } },
      { id: "t10-services", type: "features", styles: S(), content: { heading: "What I Build", subheading: "Full-stack services from concept to deployment", layout: "grid", columns: 3, features: [
        { icon: "globe", title: "React & Next.js", description: "High-performance web apps and marketing sites with modern React frameworks." },
        { icon: "zap", title: "Node.js APIs", description: "Scalable REST and GraphQL APIs with authentication, caching, and real-time features." },
        { icon: "shield", title: "Database Design", description: "PostgreSQL, MongoDB, and Redis — schema design, migrations, and performance tuning." },
        { icon: "bar-chart-3", title: "DevOps & CI/CD", description: "Docker, GitHub Actions, Vercel, AWS — automated pipelines and cloud infrastructure." },
        { icon: "star", title: "UI/UX Implementation", description: "Translating Figma designs into pixel-perfect, accessible, responsive interfaces." },
        { icon: "users", title: "Code Review & Consulting", description: "Architecture reviews, performance audits, and technical mentoring for your team." },
      ]} },
      { id: "t10-work", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Recent Projects", layout: "grid", columns: 3, images: [] } },
      { id: "t10-testimonials", type: "testimonials", styles: S(), content: { heading: "Client Feedback", layout: "grid", testimonials: [
        { name: "Hana Park", role: "CTO", company: "Growthly", content: "Jordan shipped our MVP in 6 weeks flat. Clean code, great communication, and zero hand-holding needed.", rating: 5 },
        { name: "Leo Martins", role: "Founder", company: "Stackwise", content: "We've hired 10+ freelancers. Jordan is in a different league — fast, reliable, and genuinely cares about the product.", rating: 5 },
        { name: "Anya Kovacs", role: "PM", company: "Buildspace", content: "Handed Jordan a messy codebase and she returned a clean, tested, documented app. Exceptional work.", rating: 5 },
      ]} },
      { id: "t10-pricing", type: "pricing", styles: { ...S(), backgroundColor: "#f0f9ff" }, content: { heading: "My Rates", subheading: "Transparent pricing, no surprises", plans: [
        { name: "Hourly", price: 120, period: "hour", features: ["Code Reviews", "Bug Fixes", "Consulting", "Minimum 2 hours"], ctaText: "Book Hours" },
        { name: "Project", price: 5000, period: "project", features: ["Full Feature Builds", "Fixed Scope & Price", "Revisions Included", "Source Code Handoff"], ctaText: "Start a Project", highlighted: true },
        { name: "Retainer", price: 3500, period: "month", features: ["40 Hours/Month", "Priority Response", "Monthly Reporting", "Slack Access"], ctaText: "Start Retainer" },
      ]} },
      { id: "t10-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Let's Talk", description: "Tell me about your project. I'll reply within 24 hours.", fields: [
        { type: "text", label: "Name", placeholder: "Jane Smith", required: true },
        { type: "email", label: "Email", placeholder: "jane@company.com", required: true },
        { type: "text", label: "Project Type", placeholder: "Web App, API, Consulting...", required: true },
        { type: "textarea", label: "Project Details", placeholder: "What are you building? What's the timeline and budget?", required: true },
      ], submitText: "Send Message", successMessage: "Thanks! I'll review your project and reply within 24 hours." } },
      { id: "t10-footer", type: "footer", styles: S(32,32), content: { logo: "Jordan Dev", columns: [{ title: "Links", links: [{ label: "Services", url: "#" }, { label: "Portfolio", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "2026 Jordan Dev. All rights reserved." } },
    ]
  },

  // ─── t11: App Download ────────────────────────────────────────────
  {
    id: "t11", name: "App Download", category: "Landing Page", emoji: "📱",
    description: "Mobile app landing with screenshots, features, and download CTA.",
    tags: ["app", "mobile"], isPro: false,
    globalStyles: { primaryColor: "#3b82f6", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 16, baseFontSize: 16 },
    blocks: [
      { id: "t11-header", type: "header", styles: S(16,16), content: { logo: "Pocket", menuItems: [{ label: "Features", url: "#features" }, { label: "Reviews", url: "#reviews" }, { label: "Download", url: "#download" }], ctaText: "Download App", ctaUrl: "#download", sticky: true } },
      { id: "t11-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Your Entire Life, Organized in One App", subheadline: "Pocket is the all-in-one personal productivity app that syncs seamlessly across all your devices. Over 1 million downloads and counting.", ctaText: "Download for iOS", ctaUrl: "#", secondaryCtaText: "Get for Android", secondaryCtaUrl: "#", alignment: "center" } },
      { id: "t11-stats", type: "stats", styles: S(32,32), content: { heading: "", stats: [{ value: 1000000, label: "Downloads", suffix: "+" }, { value: 4.9, label: "App Store Rating", suffix: "★" }, { value: 150, label: "Countries", suffix: "" }, { value: 50000, label: "5-Star Reviews", suffix: "+" }], animated: true } },
      { id: "t11-features", type: "features", styles: S(), content: { heading: "Everything You Need, Nothing You Don't", subheading: "Pocket keeps it simple, powerful, and beautiful", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "Smart Reminders", description: "AI-powered reminders that know when to notify you based on your habits and location." },
        { icon: "star", title: "Universal Sync", description: "Your data syncs instantly across iPhone, iPad, Mac, Android, and web." },
        { icon: "shield", title: "Private & Secure", description: "End-to-end encryption keeps your notes and tasks completely private." },
        { icon: "users", title: "Share with Anyone", description: "Collaborate on lists and projects with friends, family, or your team." },
        { icon: "bar-chart-3", title: "Habit Tracking", description: "Build better habits with visual streaks, insights, and weekly summaries." },
        { icon: "globe", title: "Offline First", description: "Everything works offline. Changes sync automatically when you reconnect." },
      ]} },
      { id: "t11-gallery", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "See It in Action", layout: "grid", columns: 3, images: [] } },
      { id: "t11-testimonials", type: "testimonials", styles: S(), content: { heading: "1M+ People Love Pocket", layout: "grid", testimonials: [
        { name: "Rachel Green", role: "Verified User", company: "App Store", content: "I've tried every productivity app out there. Pocket is the only one I've stuck with for over a year. Genuinely life-changing.", rating: 5 },
        { name: "Mike Torres", role: "Verified User", company: "Google Play", content: "The widget is perfect, the reminders are smart, and it just works. Best $4.99 I've ever spent.", rating: 5 },
        { name: "Aisha Bello", role: "Verified User", company: "App Store", content: "Used this to plan my entire wedding. The shared lists feature is incredible for coordinating with a big group.", rating: 5 },
      ]} },
      { id: "t11-cta", type: "cta", styles: { ...S(80,80), backgroundColor: "#1d4ed8", textColor: "#ffffff" }, content: { heading: "Download Pocket Free Today", subheading: "Available on iOS and Android. Premium features from $4.99/month.", ctaText: "Download for iOS", ctaUrl: "#" } },
      { id: "t11-footer", type: "footer", styles: S(32,32), content: { logo: "Pocket", columns: [
        { title: "App", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Support", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Press", url: "#" }, { label: "Privacy", url: "#" }] },
      ], copyright: "2026 Pocket Technologies. All rights reserved." } },
    ]
  },

  // ─── t12: Consulting (Pro) ────────────────────────────────────────
  {
    id: "t12", name: "Consulting", category: "Agency", emoji: "📊",
    description: "B2B consulting with case studies, process, and lead form.",
    tags: ["b2b", "consulting"], isPro: true,
    globalStyles: { primaryColor: "#1d4ed8", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
    blocks: [
      { id: "t12-header", type: "header", styles: S(16,16), content: { logo: "Meridian Consulting", menuItems: [{ label: "Services", url: "#services" }, { label: "Case Studies", url: "#cases" }, { label: "Team", url: "#team" }], ctaText: "Schedule a Call", ctaUrl: "#contact", sticky: true } },
      { id: "t12-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Strategy That Drives Real Revenue", subheadline: "We partner with B2B companies to identify growth opportunities, optimize operations, and execute strategies that deliver measurable results.", ctaText: "Schedule a Strategy Call", ctaUrl: "#contact", alignment: "center" } },
      { id: "t12-stats", type: "stats", styles: { ...S(32,32), backgroundColor: "#1e3a5f", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 200, label: "Companies Advised", suffix: "+" }, { value: 500, label: "Average ROI", suffix: "%" }, { value: 15, label: "Years of Experience", suffix: "" }, { value: 50, label: "Industries Served", suffix: "+" }], animated: true } },
      { id: "t12-services", type: "features", styles: S(), content: { heading: "Our Services", subheading: "Focused on what actually moves the needle", layout: "grid", columns: 3, features: [
        { icon: "bar-chart-3", title: "Revenue Strategy", description: "Market analysis, pricing optimization, and go-to-market strategy to accelerate revenue growth." },
        { icon: "users", title: "Organizational Design", description: "Structure your team for scale with the right roles, processes, and accountability frameworks." },
        { icon: "zap", title: "Digital Transformation", description: "Modernize operations with the right technology stack, workflows, and change management." },
        { icon: "shield", title: "M&A Advisory", description: "Due diligence, valuation support, and post-merger integration planning." },
        { icon: "globe", title: "Market Expansion", description: "Geographic and vertical expansion strategy backed by primary market research." },
        { icon: "star", title: "Executive Coaching", description: "One-on-one coaching for C-suite executives navigating high-stakes transitions." },
      ]} },
      { id: "t12-team", type: "team", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Our Partners", layout: "grid", members: [
        { name: "Dr. Helen Moore", role: "Managing Partner", bio: "Former BCG Principal. 20 years advising Fortune 500 CEOs on strategy and transformation.", photoUrl: "" },
        { name: "Robert Chang", role: "Partner, Revenue", bio: "Built and scaled revenue teams at Salesforce, HubSpot, and 3 Series B startups.", photoUrl: "" },
        { name: "Amira Khalil", role: "Partner, Operations", bio: "Operations leader who's helped 30+ companies achieve ISO and SOC2 compliance.", photoUrl: "" },
      ]} },
      { id: "t12-testimonials", type: "testimonials", styles: S(), content: { heading: "Client Results", layout: "grid", testimonials: [
        { name: "Thomas Reed", role: "CEO", company: "Vantage SaaS", content: "Meridian identified $2.4M in untapped revenue within 60 days. The strategy they built became our company playbook.", rating: 5 },
        { name: "Michelle Wu", role: "COO", company: "Pacific Freight", content: "The operational overhaul Meridian led cut our costs by 30% while improving service quality. Transformational.", rating: 5 },
        { name: "Andrew Blake", role: "CFO", company: "NorthStar Capital", content: "Exceptional analytical rigor and pragmatic execution. They don't just write reports — they implement.", rating: 5 },
      ]} },
      { id: "t12-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Book a Strategy Session", description: "30-minute discovery call. No commitment required.", fields: [
        { type: "text", label: "Full Name", placeholder: "Jane Smith", required: true },
        { type: "email", label: "Business Email", placeholder: "jane@company.com", required: true },
        { type: "text", label: "Company & Role", placeholder: "CEO at Acme Corp", required: true },
        { type: "text", label: "Primary Challenge", placeholder: "e.g., Revenue plateau, scaling operations...", required: true },
        { type: "textarea", label: "Additional Context", placeholder: "Tell us more about your situation...", required: false },
      ], submitText: "Schedule My Call", successMessage: "Thank you! Our team will reach out within 4 business hours to confirm your session." } },
      { id: "t12-footer", type: "footer", styles: S(48,48), content: { logo: "Meridian Consulting", columns: [
        { title: "Services", links: [{ label: "Revenue Strategy", url: "#" }, { label: "Operations", url: "#" }, { label: "M&A", url: "#" }] },
        { title: "Company", links: [{ label: "Team", url: "#" }, { label: "Case Studies", url: "#" }, { label: "Contact", url: "#" }] },
      ], copyright: "2026 Meridian Consulting Group. All rights reserved." } },
    ]
  },

  // ─── t13: Restaurant ──────────────────────────────────────────────
  {
    id: "t13", name: "Restaurant", category: "E-commerce", emoji: "🍽️",
    description: "Restaurant page with menu, gallery, reservations, and map.",
    tags: ["food", "local"], isPro: false,
    globalStyles: { primaryColor: "#b45309", secondaryColor: "#1c1917", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t13-header", type: "header", styles: S(16,16), content: { logo: "Casa Bella", menuItems: [{ label: "Menu", url: "#menu" }, { label: "About", url: "#about" }, { label: "Reservations", url: "#reserve" }], ctaText: "Reserve a Table", ctaUrl: "#reserve", sticky: true } },
      { id: "t13-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#1c1917", textColor: "#ffffff" }, content: { headline: "Authentic Italian Cuisine Since 1989", subheadline: "Family recipes passed down through three generations. Seasonal ingredients. A dining experience worth remembering.", ctaText: "Reserve a Table", ctaUrl: "#reserve", secondaryCtaText: "View Menu", secondaryCtaUrl: "#menu", alignment: "center" } },
      { id: "t13-stats", type: "stats", styles: { ...S(32,32), backgroundColor: "#292524" }, content: { heading: "", stats: [{ value: 35, label: "Years Serving", suffix: "" }, { value: 4.9, label: "Google Rating", suffix: "★" }, { value: 200, label: "Seats Available", suffix: "" }, { value: 50, label: "Dishes on Menu", suffix: "+" }], animated: false } },
      { id: "t13-features", type: "features", styles: S(), content: { heading: "Menu Highlights", subheading: "Crafted fresh daily from local and imported ingredients", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Tagliatelle al Ragù", description: "House-made pasta with 8-hour slow-braised beef ragù and Parmigiano Reggiano." },
        { icon: "star", title: "Branzino al Forno", description: "Whole roasted sea bass with caperberries, olives, lemon, and extra-virgin olive oil." },
        { icon: "star", title: "Risotto ai Funghi", description: "Carnaroli rice with wild porcini mushrooms, white truffle oil, and aged Grana Padano." },
        { icon: "star", title: "Bistecca Fiorentina", description: "28-day dry-aged T-bone from Chianina cattle, grilled over charcoal. 600g minimum." },
        { icon: "star", title: "Burrata con Pomodori", description: "Fresh burrata from Puglia with heritage tomatoes, basil, and aged balsamic." },
        { icon: "star", title: "Tiramisù della Casa", description: "Our grandmother's recipe. Savoiardi soaked in espresso, mascarpone cream, and cocoa." },
      ]} },
      { id: "t13-gallery", type: "gallery", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Our Restaurant", layout: "grid", columns: 3, images: [] } },
      { id: "t13-testimonials", type: "testimonials", styles: S(), content: { heading: "What Our Guests Say", layout: "grid", testimonials: [
        { name: "Francesca Romano", role: "Food Blogger", company: "Roma Eats", content: "Casa Bella is the closest thing to eating in Tuscany without buying a plane ticket. The pasta alone is worth the trip.", rating: 5 },
        { name: "David Rothstein", role: "Restaurant Critic", company: "City Life", content: "In a city full of Italian restaurants, Casa Bella stands apart. The Bistecca is the best I've had outside Florence.", rating: 5 },
        { name: "Sarah Mitchell", role: "Regular Guest", company: "", content: "We've been coming here for our anniversary every year for 10 years. The food and service are consistently perfect.", rating: 5 },
      ]} },
      { id: "t13-form", type: "form", styles: { ...S(64,80), backgroundColor: "#1c1917", textColor: "#ffffff" }, content: { heading: "Make a Reservation", description: "Book your table online. For parties over 8, please call us directly.", fields: [
        { type: "text", label: "Full Name", placeholder: "Jane Smith", required: true },
        { type: "email", label: "Email", placeholder: "jane@example.com", required: true },
        { type: "text", label: "Phone Number", placeholder: "+1 (555) 000-0000", required: true },
        { type: "text", label: "Date & Time", placeholder: "e.g., Saturday, May 10 at 7:30pm", required: true },
        { type: "text", label: "Party Size", placeholder: "e.g., 4 people", required: true },
        { type: "textarea", label: "Special Requests", placeholder: "Dietary restrictions, celebrations, seating preferences...", required: false },
      ], submitText: "Request Reservation", successMessage: "Thank you! We'll confirm your reservation via email within 2 hours." } },
      { id: "t13-footer", type: "footer", styles: S(32,32), content: { logo: "Casa Bella", columns: [{ title: "Visit Us", links: [{ label: "123 Main Street", url: "#" }, { label: "Mon–Sun: 12pm–11pm", url: "#" }, { label: "+1 (555) 123-4567", url: "#" }] }], copyright: "2026 Casa Bella Ristorante. All rights reserved." } },
    ]
  },

  // ─── t14: Course Landing (Pro) ────────────────────────────────────
  {
    id: "t14", name: "Course Landing", category: "Landing Page", emoji: "🎓",
    description: "Online course page with curriculum, instructor bio, and pricing.",
    tags: ["education", "course"], isPro: true,
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t14-header", type: "header", styles: S(16,16), content: { logo: "LearnHQ", menuItems: [{ label: "Curriculum", url: "#curriculum" }, { label: "Instructor", url: "#instructor" }, { label: "Pricing", url: "#pricing" }], ctaText: "Enroll Now", ctaUrl: "#pricing", sticky: true } },
      { id: "t14-hero", type: "hero", styles: { ...S(100,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Master React & Next.js in 8 Weeks", subheadline: "The most comprehensive hands-on course to go from React beginner to confident full-stack developer. 4,000+ students enrolled.", ctaText: "Enroll Now — $299", ctaUrl: "#pricing", secondaryCtaText: "See the Curriculum", secondaryCtaUrl: "#curriculum", alignment: "center" } },
      { id: "t14-stats", type: "stats", styles: S(32,32), content: { heading: "", stats: [{ value: 4000, label: "Students Enrolled", suffix: "+" }, { value: 4.9, label: "Course Rating", suffix: "★" }, { value: 60, label: "Hours of Content", suffix: "+" }, { value: 95, label: "Completion Rate", suffix: "%" }], animated: true } },
      { id: "t14-features", type: "features", styles: S(), content: { heading: "What You'll Learn", subheading: "A complete, structured curriculum from zero to production", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "React Fundamentals", description: "Components, props, state, hooks, and the React mental model — built from the ground up." },
        { icon: "globe", title: "Next.js App Router", description: "Server components, streaming, layouts, loading states, and the full App Router architecture." },
        { icon: "shield", title: "Authentication & Auth", description: "Implement auth with NextAuth, JWT, sessions, and role-based access control." },
        { icon: "bar-chart-3", title: "Database & ORM", description: "Prisma with PostgreSQL, Supabase, and full CRUD operations in real-world patterns." },
        { icon: "star", title: "Deployment & DevOps", description: "Deploy to Vercel, set up CI/CD with GitHub Actions, and monitor with Sentry." },
        { icon: "users", title: "3 Real Projects", description: "Build a SaaS app, an e-commerce store, and a social platform. All deployed live." },
      ]} },
      { id: "t14-team", type: "team", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Your Instructor", layout: "grid", members: [
        { name: "Daniel Park", role: "Senior Engineer & Educator", bio: "8 years building production apps at Stripe, Vercel, and 3 startups. Taught 10,000+ developers online.", photoUrl: "" },
      ]} },
      { id: "t14-testimonials", type: "testimonials", styles: S(), content: { heading: "Student Success Stories", layout: "grid", testimonials: [
        { name: "Anika Rosen", role: "Junior → Senior Dev", company: "Now at Shopify", content: "This course got me a $40k salary bump. The projects are real-world and the explanations are crystal clear.", rating: 5 },
        { name: "Tyler Brooks", role: "Career Switcher", company: "Now at startup", content: "I went from zero coding experience to landing a frontend job in 5 months. Daniel's course was 80% of that journey.", rating: 5 },
        { name: "Keiko Tanaka", role: "Freelancer", company: "Now earning $8k/mo", content: "The Next.js module alone was worth the price. I immediately applied it to client projects and doubled my rates.", rating: 5 },
      ]} },
      { id: "t14-pricing", type: "pricing", styles: { ...S(), backgroundColor: "#0f172a", textColor: "#f1f5f9" }, content: { heading: "Choose Your Path", subheading: "One-time payment. Lifetime access. 30-day refund guarantee.", plans: [
        { name: "Self-Paced", price: 199, period: "one-time", features: ["60+ Hours of Video", "3 Full Projects", "Code Repository Access", "Community Discord", "Certificate of Completion"], ctaText: "Enroll Self-Paced" },
        { name: "Mentored", price: 499, period: "one-time", features: ["Everything in Self-Paced", "Weekly 1-on-1 Calls (8 weeks)", "Code Reviews", "Job Search Support", "LinkedIn Review"], ctaText: "Enroll with Mentoring", highlighted: true },
        { name: "Team (5+)", price: 149, period: "seat", features: ["Self-Paced for Each Member", "Team Dashboard", "Bulk Certificate Download", "Priority Support"], ctaText: "Enroll Your Team" },
      ]} },
      { id: "t14-faq", type: "faq", styles: S(), content: { heading: "Common Questions", items: [
        { question: "Do I need prior coding experience?", answer: "Basic JavaScript knowledge is recommended. We include a free JS primer for complete beginners." },
        { question: "How long do I have access?", answer: "Lifetime access. The course is updated as React and Next.js evolve — at no extra cost." },
        { question: "Is there a money-back guarantee?", answer: "Yes. If you're not satisfied within 30 days, we'll refund 100% of your payment — no questions asked." },
        { question: "Can I get a job with this course?", answer: "Many of our students have landed jobs. We include a job placement module and LinkedIn optimization guide." },
      ]} },
      { id: "t14-footer", type: "footer", styles: S(32,32), content: { logo: "LearnHQ", columns: [{ title: "Course", links: [{ label: "Curriculum", url: "#" }, { label: "Instructor", url: "#" }, { label: "Student Stories", url: "#" }] }], copyright: "2026 LearnHQ. All rights reserved." } },
    ]
  },

  // ─── t15: Newsletter ──────────────────────────────────────────────
  {
    id: "t15", name: "Newsletter", category: "Coming Soon", emoji: "📧",
    description: "Newsletter signup with social proof and preview samples.",
    tags: ["email", "newsletter"], isPro: false,
    globalStyles: { primaryColor: "#f59e0b", secondaryColor: "#1c1917", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t15-hero", type: "hero", styles: { ...S(100,60), backgroundColor: "#1c1917", textColor: "#ffffff" }, content: { headline: "The Weekly Dose of Clarity", subheadline: "Every Sunday at 8am: one big idea, three actionable insights, and five links worth your time. Trusted by 25,000 high-performers.", ctaText: "Subscribe Free", ctaUrl: "#subscribe", alignment: "center" } },
      { id: "t15-stats", type: "stats", styles: { ...S(24,24), backgroundColor: "#292524", textColor: "#f5f5f4" }, content: { heading: "", stats: [{ value: 25000, label: "Subscribers", suffix: "+" }, { value: 62, label: "Open Rate", suffix: "%" }, { value: 104, label: "Issues Published", suffix: "" }, { value: 4.9, label: "Reader Score", suffix: "★" }], animated: true } },
      { id: "t15-features", type: "features", styles: S(), content: { heading: "What You Get Every Week", subheading: "Designed for people who value their time", layout: "grid", columns: 3, features: [
        { icon: "zap", title: "The Big Idea", description: "One powerful concept explained simply. No fluff, no padding — just the insight you need." },
        { icon: "star", title: "3 Action Items", description: "Practical takeaways you can implement this week. Always concrete, never vague." },
        { icon: "bar-chart-3", title: "5 Links Worth Reading", description: "The most valuable articles, tools, and resources we found so you don't have to." },
        { icon: "users", title: "Reader Spotlight", description: "Real stories from subscribers applying the ideas in their own work and life." },
        { icon: "globe", title: "Market Signal", description: "One emerging trend to pay attention to — before everyone else is talking about it." },
        { icon: "shield", title: "No Spam, Ever", description: "We respect your inbox. One email per week. Unsubscribe in one click, anytime." },
      ]} },
      { id: "t15-testimonials", type: "testimonials", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "What Subscribers Say", layout: "grid", testimonials: [
        { name: "Morgan Lee", role: "Startup Founder", company: "", content: "The only newsletter I open before my coffee. Dense with value, zero filler. It's become part of my Sunday routine.", rating: 5 },
        { name: "Chloe Martin", role: "Product Manager", company: "Atlassian", content: "I've shared issues with my entire team. The signal-to-noise ratio here is unmatched by anything else I read.", rating: 5 },
        { name: "James Okafor", role: "Investor", company: "Seed Fund", content: "Three portfolio companies I invested in came from ideas I first read in this newsletter. That's all I need to say.", rating: 5 },
      ]} },
      { id: "t15-form", type: "form", styles: { ...S(64,80), backgroundColor: "#1c1917", textColor: "#ffffff" }, content: { heading: "Join 25,000+ Readers", description: "Free forever. Unsubscribe anytime. No spam.", fields: [
        { type: "text", label: "First Name", placeholder: "Jane", required: true },
        { type: "email", label: "Email Address", placeholder: "jane@example.com", required: true },
      ], submitText: "Subscribe for Free", successMessage: "You're in! Your first issue arrives this Sunday." } },
      { id: "t15-footer", type: "footer", styles: S(24,24), content: { logo: "The Weekly Dose", columns: [{ title: "Links", links: [{ label: "Archive", url: "#" }, { label: "About", url: "#" }, { label: "Privacy", url: "#" }] }], copyright: "2026 The Weekly Dose. All rights reserved." } },
    ]
  },

  // ─── t16: SaaS Pricing ────────────────────────────────────────────
  {
    id: "t16", name: "SaaS Pricing", category: "SaaS", emoji: "💰",
    description: "Detailed pricing page with comparison table and FAQ.",
    tags: ["pricing", "saas"], isPro: false,
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t16-header", type: "header", styles: S(16,16), content: { logo: "FlowApp", menuItems: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Enterprise", url: "#" }], ctaText: "Start Free", ctaUrl: "#", sticky: true } },
      { id: "t16-hero", type: "hero", styles: S(80,40), content: { headline: "Pricing That Grows With You", subheadline: "Start free. Scale confidently. Cancel anytime.", ctaText: "", ctaUrl: "", alignment: "center" } },
      { id: "t16-pricing", type: "pricing", styles: S(24,64), content: { heading: "", subheading: "", plans: [
        { name: "Free", price: 0, period: "month", features: ["1 User", "5 Projects", "1GB Storage", "Basic Analytics", "Community Support"], ctaText: "Start for Free" },
        { name: "Starter", price: 29, period: "month", features: ["5 Users", "25 Projects", "20GB Storage", "Advanced Analytics", "Email Support", "API Access"], ctaText: "Start Starter" },
        { name: "Pro", price: 79, period: "month", features: ["25 Users", "Unlimited Projects", "100GB Storage", "Custom Dashboards", "Priority Support", "Webhooks", "SSO"], ctaText: "Start Pro", highlighted: true },
        { name: "Enterprise", price: 249, period: "month", features: ["Unlimited Users", "Unlimited Projects", "1TB Storage", "Dedicated Support", "Custom Contracts", "SLA 99.99%", "On-Premise Option"], ctaText: "Contact Sales" },
      ]} },
      { id: "t16-comparison", type: "comparison", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Compare All Features", columns: ["Free", "Starter", "Pro", "Enterprise"], rows: [
        { feature: "Users", values: ["1", "5", "25", "Unlimited"] },
        { feature: "Projects", values: ["5", "25", "Unlimited", "Unlimited"] },
        { feature: "Storage", values: ["1GB", "20GB", "100GB", "1TB"] },
        { feature: "API Access", values: ["✗", "✓", "✓", "✓"] },
        { feature: "Custom Domains", values: ["✗", "✗", "✓", "✓"] },
        { feature: "Priority Support", values: ["✗", "✗", "✓", "✓"] },
        { feature: "SSO / SAML", values: ["✗", "✗", "✓", "✓"] },
        { feature: "SLA", values: ["✗", "✗", "99.9%", "99.99%"] },
        { feature: "Audit Logs", values: ["✗", "✗", "✓", "✓"] },
        { feature: "Dedicated Manager", values: ["✗", "✗", "✗", "✓"] },
      ]} },
      { id: "t16-testimonials", type: "testimonials", styles: S(), content: { heading: "Customers Love Our Pricing", layout: "grid", testimonials: [
        { name: "Oliver James", role: "CFO", company: "Kite.co", content: "We compared 6 tools. FlowApp is the only one that gave us everything we needed at a price that made sense.", rating: 5 },
        { name: "Nina Johansson", role: "Founder", company: "Havn", content: "Started on Free, upgraded to Pro in month 2. The pricing scales perfectly as you grow.", rating: 5 },
        { name: "Ben Walsh", role: "CTO", company: "Layr", content: "Enterprise plan gave us the SLA and dedicated support we needed to close our Fortune 500 clients.", rating: 5 },
      ]} },
      { id: "t16-faq", type: "faq", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "Pricing FAQs", items: [
        { question: "Can I change plans at any time?", answer: "Yes — upgrade, downgrade, or cancel at any time. Changes take effect immediately and we prorate billing." },
        { question: "Is there a free trial on paid plans?", answer: "All paid plans come with a 14-day free trial. No credit card required to start." },
        { question: "What payment methods do you accept?", answer: "Visa, Mastercard, American Express, and PayPal. Annual plans can also be paid by wire transfer." },
        { question: "Do you offer nonprofit or student discounts?", answer: "Yes! We offer 50% off for verified nonprofits and educational institutions. Contact us to apply." },
        { question: "What happens to my data if I cancel?", answer: "You can export all your data before canceling. We keep it for 30 days after cancellation, then delete it permanently." },
        { question: "Do you offer custom enterprise contracts?", answer: "Absolutely. We work with enterprise customers on custom terms, invoicing, and SLAs. Reach out to sales." },
      ]} },
      { id: "t16-cta", type: "cta", styles: { ...S(80,80), backgroundColor: "#1d4ed8", textColor: "#ffffff" }, content: { heading: "Ready to Get Started?", subheading: "Join 20,000+ teams already using FlowApp. Start free today.", ctaText: "Start for Free", ctaUrl: "#" } },
      { id: "t16-footer", type: "footer", styles: S(48,48), content: { logo: "FlowApp", columns: [
        { title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Integrations", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Careers", url: "#" }, { label: "Contact", url: "#" }] },
      ], copyright: "2026 FlowApp. All rights reserved." } },
    ]
  },

  // ─── t17: Digital Agency (Pro) ────────────────────────────────────
  {
    id: "t17", name: "Digital Agency", category: "Agency", emoji: "✨",
    description: "Creative agency with animated hero, work, and awards.",
    tags: ["creative", "animated"], isPro: true,
    globalStyles: { primaryColor: "#ec4899", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t17-header", type: "header", styles: { ...S(16,16), backgroundColor: "#000000", textColor: "#ffffff" }, content: { logo: "Flux Creative", menuItems: [{ label: "Work", url: "#work" }, { label: "Services", url: "#services" }, { label: "About", url: "#about" }], ctaText: "Start a Project", ctaUrl: "#contact", sticky: true } },
      { id: "t17-hero", type: "hero", styles: { ...S(120,100), backgroundColor: "#000000", textColor: "#ffffff", animation: "fade-in" }, content: { headline: "We Make Brands Impossible to Ignore", subheadline: "Flux Creative is a design-led digital agency building category-defining brands, websites, and campaigns for companies that want to lead their market.", ctaText: "See Our Work", ctaUrl: "#work", secondaryCtaText: "Start a Project", secondaryCtaUrl: "#contact", alignment: "center" } },
      { id: "t17-logos", type: "social-proof", styles: { ...S(24,24), backgroundColor: "#111111", textColor: "#6b7280" }, content: { heading: "We've worked with", layout: "logos", items: ["Apple", "Nike", "Spotify", "Patagonia", "Airbnb", "OpenAI", "Stripe", "Figma"] } },
      { id: "t17-stats", type: "stats", styles: { ...S(48,48), backgroundColor: "#000000", textColor: "#ffffff" }, content: { heading: "", stats: [{ value: 200, label: "Brands Launched", suffix: "+" }, { value: 12, label: "Cannes Lions Won", suffix: "" }, { value: 50, label: "Team Creatives", suffix: "+" }, { value: 10, label: "Years of Excellence", suffix: "" }], animated: true } },
      { id: "t17-work", type: "gallery", styles: { ...S(), backgroundColor: "#111111" }, content: { heading: "Selected Work", layout: "grid", columns: 3, images: [] } },
      { id: "t17-services", type: "features", styles: S(), content: { heading: "What We Create", subheading: "End-to-end creative services for market leaders", layout: "grid", columns: 3, features: [
        { icon: "star", title: "Brand Strategy", description: "Market positioning, brand architecture, naming, and messaging that makes you stand out." },
        { icon: "globe", title: "Digital Experiences", description: "Award-winning websites and interactive digital products that convert visitors into believers." },
        { icon: "zap", title: "Campaign Production", description: "Integrated campaigns across TV, digital, out-of-home, and social media." },
        { icon: "users", title: "Motion & Film", description: "Brand films, product videos, and motion design that tells your story beautifully." },
        { icon: "bar-chart-3", title: "Social & Content", description: "Always-on content strategy and production that builds an audience and drives engagement." },
        { icon: "shield", title: "Design Systems", description: "Scalable visual identity systems that keep every touchpoint consistent as you grow." },
      ]} },
      { id: "t17-team", type: "team", styles: { ...S(), backgroundColor: "#f8fafc" }, content: { heading: "The Creative Leadership", layout: "grid", members: [
        { name: "Clara Voss", role: "Creative Director", bio: "Ex-TBWA and Wieden+Kennedy. 15 years making culture-shifting work.", photoUrl: "" },
        { name: "Elias Stone", role: "Strategy Director", bio: "Former global brand strategist at Interbrand and Landor.", photoUrl: "" },
        { name: "Mia Zhao", role: "Head of Digital", bio: "Award-winning UX director who's built products for 30M+ users.", photoUrl: "" },
        { name: "Luis Ferreira", role: "Executive Producer", bio: "Produced campaigns seen by 500M+ people across 40 countries.", photoUrl: "" },
      ]} },
      { id: "t17-testimonials", type: "testimonials", styles: S(), content: { heading: "Clients Who Trust Us", layout: "grid", testimonials: [
        { name: "Kate Brennan", role: "CMO", company: "Runway", content: "Flux took our vague brief and turned it into a brand launch that defined our entire category. Genius-level work.", rating: 5 },
        { name: "Dev Sharma", role: "CEO", company: "Harbor", content: "The website they built for us has won 3 design awards and converted 2x better than our old site from day one.", rating: 5 },
        { name: "Zoe Lancaster", role: "VP Marketing", company: "Atomic VC", content: "They don't just execute — they push back, make it better, and deliver work that genuinely moves the needle.", rating: 5 },
      ]} },
      { id: "t17-form", type: "form", styles: { ...S(64,80), backgroundColor: "#000000", textColor: "#ffffff" }, content: { heading: "Start a Project", description: "We take on 4 new clients per quarter. Tell us about your brief.", fields: [
        { type: "text", label: "Name & Company", placeholder: "Jane Smith at Acme", required: true },
        { type: "email", label: "Email", placeholder: "jane@acme.com", required: true },
        { type: "text", label: "Project Type", placeholder: "Brand Identity, Website, Campaign...", required: true },
        { type: "text", label: "Budget Range", placeholder: "$50k – $200k", required: true },
        { type: "textarea", label: "Tell Us About Your Vision", placeholder: "What are you building, and what impact do you want to make?", required: true },
      ], submitText: "Submit Brief", successMessage: "Thank you! Our creative director will review your brief and reach out within 48 hours." } },
      { id: "t17-footer", type: "footer", styles: { ...S(48,48), backgroundColor: "#000000", textColor: "#6b7280" }, content: { logo: "Flux Creative", columns: [
        { title: "Work", links: [{ label: "Brand", url: "#" }, { label: "Digital", url: "#" }, { label: "Film", url: "#" }] },
        { title: "Agency", links: [{ label: "About", url: "#" }, { label: "Team", url: "#" }, { label: "Careers", url: "#" }] },
      ], copyright: "2026 Flux Creative. All rights reserved." } },
    ]
  },

  // ─── t18: Lead Magnet ─────────────────────────────────────────────
  {
    id: "t18", name: "Lead Magnet", category: "Landing Page", emoji: "🧲",
    description: "Lead magnet squeeze page with form and social proof.",
    tags: ["leads", "conversion"], isPro: false,
    globalStyles: { primaryColor: "#16a34a", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
    blocks: [
      { id: "t18-hero", type: "hero", styles: { ...S(100,60), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { headline: "Free Guide: 50 Proven Headlines That Double Conversions", subheadline: "Download our battle-tested headline swipe file used by 500+ marketers to increase landing page conversions by an average of 127%.", ctaText: "Get the Free Guide", ctaUrl: "#download", alignment: "center" } },
      { id: "t18-features", type: "features", styles: S(), content: { heading: "What's Inside the Guide", subheading: "50 pages of actionable templates you can use today", layout: "grid", columns: 3, features: [
        { icon: "star", title: "50 Headline Templates", description: "Fill-in-the-blank templates across 10 categories — just plug in your product and you're done." },
        { icon: "bar-chart-3", title: "A/B Test Data", description: "Real conversion data from 200+ A/B tests showing exactly which headline styles win and why." },
        { icon: "zap", title: "Industry Breakdowns", description: "Headlines that work for SaaS, e-commerce, services, and info products — all in one place." },
        { icon: "shield", title: "The 7 Power Words", description: "The most proven words in copywriting history and exactly how to use them for maximum impact." },
        { icon: "users", title: "Real Winning Examples", description: "Screenshots and breakdowns of landing pages that converted at 15%+ — and why they worked." },
        { icon: "globe", title: "The 30-Second Test", description: "A simple framework to evaluate any headline before you spend a dollar on traffic." },
      ]} },
      { id: "t18-socialproof", type: "social-proof", styles: { ...S(24,24), backgroundColor: "#f0fdf4" }, content: { heading: "Used by marketers at", layout: "logos", items: ["HubSpot", "Mailchimp", "Shopify", "ConvertKit", "ActiveCampaign", "Klaviyo"] } },
      { id: "t18-testimonials", type: "testimonials", styles: S(), content: { heading: "What Other Marketers Say", layout: "grid", testimonials: [
        { name: "Alicia Grant", role: "Conversion Strategist", company: "Growth Labs", content: "I've been collecting headline swipe files for 10 years. This is the best one I've seen. Immediately boosted a client's CVR by 34%.", rating: 5 },
        { name: "Brian Cole", role: "Performance Marketer", company: "ScaleHQ", content: "Replaced our 3-year-old headline framework with this guide in an afternoon. Our paid campaigns thanked us instantly.", rating: 5 },
        { name: "Sofia Luna", role: "Email Copywriter", company: "Freelance", content: "I send this guide to every client who asks why their landing page isn't converting. The A/B data alone is priceless.", rating: 5 },
      ]} },
      { id: "t18-form", type: "form", styles: { ...S(64,80), backgroundColor: "#0f172a", textColor: "#ffffff" }, content: { heading: "Get Instant Access — 100% Free", description: "Enter your email and we'll send the guide immediately. No spam, unsubscribe anytime.", fields: [
        { type: "text", label: "First Name", placeholder: "Jane", required: true },
        { type: "email", label: "Work Email", placeholder: "jane@company.com", required: true },
      ], submitText: "Send Me the Free Guide", successMessage: "It's on its way! Check your inbox — the guide should arrive in the next 2 minutes." } },
      { id: "t18-footer", type: "footer", styles: S(24,24), content: { logo: "GrowthKit", columns: [{ title: "Links", links: [{ label: "Blog", url: "#" }, { label: "Privacy Policy", url: "#" }] }], copyright: "2026 GrowthKit. All rights reserved." } },
    ]
  },
];

export function getTemplateById(id: string): TemplateData | undefined {
  return TEMPLATE_DATA.find((t) => t.id === id);
}
