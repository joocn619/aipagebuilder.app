export interface ExtensionConfig {
  id: string;
  name: string;
  description: string;
  category: "conversion" | "navigation" | "compliance" | "social";
  isPro: boolean;
  defaultSettings: Record<string, unknown>;
}

export const EXTENSIONS: ExtensionConfig[] = [
  {
    id: "sticky-cta",
    name: "Sticky CTA Bar",
    description: "A fixed bar that stays visible as visitors scroll",
    category: "conversion",
    isPro: false,
    defaultSettings: { text: "Get Started Today", ctaText: "Sign Up", ctaUrl: "#", bgColor: "#2563eb", textColor: "#ffffff", position: "bottom" },
  },
  {
    id: "exit-popup",
    name: "Exit Intent Popup",
    description: "Show a popup when visitors try to leave",
    category: "conversion",
    isPro: false,
    defaultSettings: { heading: "Wait! Before you go...", description: "Get 10% off your first purchase", ctaText: "Claim Offer", showOnce: true },
  },
  {
    id: "sales-notification",
    name: "Sales Notifications",
    description: "Show real-time social proof notifications",
    category: "social",
    isPro: false,
    defaultSettings: { messages: ["John from NYC just signed up", "Sarah from London purchased Pro"], interval: 5000, duration: 4000, position: "bottom-left" },
  },
  {
    id: "countdown-fixed",
    name: "Countdown Timer (Fixed)",
    description: "Countdown to a specific date and time",
    category: "conversion",
    isPro: false,
    defaultSettings: { targetDate: "", heading: "Offer ends in", bgColor: "#1e293b", textColor: "#ffffff" },
  },
  {
    id: "countdown-evergreen",
    name: "Evergreen Countdown",
    description: "Per-visitor countdown that resets for each person",
    category: "conversion",
    isPro: true,
    defaultSettings: { hours: 24, minutes: 0, heading: "Your exclusive offer expires in", bgColor: "#991b1b", textColor: "#ffffff" },
  },
  {
    id: "spin-wheel",
    name: "Spin to Win",
    description: "Gamified discount wheel to boost conversions",
    category: "conversion",
    isPro: true,
    defaultSettings: { heading: "Spin to Win!", prizes: ["10% Off", "Free Shipping", "20% Off", "5% Off", "Try Again", "15% Off"], requireEmail: true },
  },
  {
    id: "announcement-bar",
    name: "Announcement Bar",
    description: "Top banner for announcements and promotions",
    category: "conversion",
    isPro: false,
    defaultSettings: { text: "Free shipping on orders over $50!", bgColor: "#2563eb", textColor: "#ffffff", dismissible: true, linkText: "Shop Now", linkUrl: "#" },
  },
  {
    id: "cookie-bar",
    name: "Cookie Consent",
    description: "GDPR-compliant cookie consent bar",
    category: "compliance",
    isPro: false,
    defaultSettings: { text: "We use cookies to improve your experience.", acceptText: "Accept All", rejectText: "Reject", position: "bottom" },
  },
  {
    id: "age-verification",
    name: "Age Verification",
    description: "Gate content behind age verification",
    category: "compliance",
    isPro: false,
    defaultSettings: { heading: "Are you 18+?", description: "You must be of legal age.", confirmText: "Yes, I am 18+", denyText: "No" },
  },
  {
    id: "back-to-top",
    name: "Back to Top",
    description: "Floating button to scroll back to top",
    category: "navigation",
    isPro: false,
    defaultSettings: { showAfter: 300, bgColor: "#0f172a", iconColor: "#ffffff", position: "bottom-right" },
  },
  {
    id: "floating-cta",
    name: "Floating CTA Button",
    description: "WhatsApp, call, or chat floating button",
    category: "conversion",
    isPro: false,
    defaultSettings: { type: "whatsapp", phoneNumber: "", message: "Hi! I have a question.", bgColor: "#25D366", position: "bottom-right" },
  },
  {
    id: "progress-bar",
    name: "Scroll Progress Bar",
    description: "Shows reading progress as visitors scroll",
    category: "navigation",
    isPro: false,
    defaultSettings: { color: "#2563eb", height: 3, position: "top" },
  },
];

export function getExtension(id: string): ExtensionConfig | undefined {
  return EXTENSIONS.find((e) => e.id === id);
}
