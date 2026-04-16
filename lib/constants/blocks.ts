export const BLOCK_CATEGORIES = [
  "hero",
  "content",
  "social-proof",
  "conversion",
  "media",
  "navigation",
  "advanced",
] as const;

export type BlockCategory = (typeof BLOCK_CATEGORIES)[number];

export const BLOCK_TYPES = [
  { id: "hero", name: "Hero", category: "hero" as BlockCategory, isPro: false },
  { id: "features", name: "Features", category: "content" as BlockCategory, isPro: false },
  { id: "testimonials", name: "Testimonials", category: "social-proof" as BlockCategory, isPro: false },
  { id: "cta", name: "CTA", category: "conversion" as BlockCategory, isPro: false },
  { id: "pricing", name: "Pricing", category: "conversion" as BlockCategory, isPro: false },
  { id: "faq", name: "FAQ", category: "content" as BlockCategory, isPro: false },
  { id: "form", name: "Form", category: "conversion" as BlockCategory, isPro: false },
  { id: "gallery", name: "Gallery", category: "media" as BlockCategory, isPro: false },
  { id: "video", name: "Video", category: "media" as BlockCategory, isPro: false },
  { id: "countdown", name: "Countdown", category: "conversion" as BlockCategory, isPro: false },
  { id: "social-proof", name: "Social Proof", category: "social-proof" as BlockCategory, isPro: false },
  { id: "custom-html", name: "Custom HTML", category: "advanced" as BlockCategory, isPro: false },
  { id: "header", name: "Header/Nav", category: "navigation" as BlockCategory, isPro: false },
  { id: "footer", name: "Footer", category: "navigation" as BlockCategory, isPro: false },
  { id: "team", name: "Team", category: "content" as BlockCategory, isPro: true },
  { id: "stats", name: "Stats/Counter", category: "social-proof" as BlockCategory, isPro: true },
  { id: "logo-carousel", name: "Logo Carousel", category: "social-proof" as BlockCategory, isPro: true },
  { id: "comparison", name: "Comparison Table", category: "content" as BlockCategory, isPro: true },
  { id: "tabs", name: "Tabs", category: "content" as BlockCategory, isPro: true },
  { id: "accordion", name: "Accordion", category: "content" as BlockCategory, isPro: true },
] as const;
