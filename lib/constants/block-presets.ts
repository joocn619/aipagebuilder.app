import type { BlockStyles } from "@/lib/stores/editor-store";

export interface BlockPreset {
  id: string;
  name: string;
  blockType: string;
  styles: Partial<BlockStyles>;
  contentOverrides?: Record<string, unknown>;
}

export const BLOCK_PRESETS: BlockPreset[] = [
  // Hero presets
  { id: "hero-light", name: "Light", blockType: "hero", styles: { backgroundColor: "#f8fafc", textColor: "#0f172a", paddingTop: 96, paddingBottom: 96 } },
  { id: "hero-dark", name: "Dark", blockType: "hero", styles: { backgroundColor: "#0f172a", textColor: "#f1f5f9", paddingTop: 96, paddingBottom: 96 } },
  { id: "hero-gradient", name: "Gradient", blockType: "hero", styles: { backgroundColor: "#1e40af", textColor: "#ffffff", paddingTop: 96, paddingBottom: 96 } },
  { id: "hero-minimal", name: "Minimal", blockType: "hero", styles: { paddingTop: 64, paddingBottom: 64 } },

  // Features presets
  { id: "features-cards", name: "Cards", blockType: "features", styles: { backgroundColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },
  { id: "features-dark", name: "Dark", blockType: "features", styles: { backgroundColor: "#0f172a", textColor: "#f1f5f9", paddingTop: 64, paddingBottom: 64 } },
  { id: "features-colored", name: "Colored BG", blockType: "features", styles: { backgroundColor: "#eff6ff", paddingTop: 64, paddingBottom: 64 } },

  // CTA presets
  { id: "cta-primary", name: "Primary", blockType: "cta", styles: { backgroundColor: "#2563eb", textColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },
  { id: "cta-dark", name: "Dark", blockType: "cta", styles: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },
  { id: "cta-gradient", name: "Purple", blockType: "cta", styles: { backgroundColor: "#7c3aed", textColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },

  // Testimonials presets
  { id: "testimonials-light", name: "Light", blockType: "testimonials", styles: { backgroundColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },
  { id: "testimonials-gray", name: "Gray BG", blockType: "testimonials", styles: { backgroundColor: "#f8fafc", paddingTop: 64, paddingBottom: 64 } },

  // Pricing presets
  { id: "pricing-light", name: "Light", blockType: "pricing", styles: { backgroundColor: "#ffffff", paddingTop: 64, paddingBottom: 64 } },
  { id: "pricing-dark", name: "Dark", blockType: "pricing", styles: { backgroundColor: "#0f172a", textColor: "#f1f5f9", paddingTop: 64, paddingBottom: 64 } },

  // Countdown presets
  { id: "countdown-dark", name: "Dark", blockType: "countdown", styles: { backgroundColor: "#1e293b", textColor: "#ffffff", paddingTop: 48, paddingBottom: 48 } },
  { id: "countdown-red", name: "Urgency", blockType: "countdown", styles: { backgroundColor: "#991b1b", textColor: "#ffffff", paddingTop: 48, paddingBottom: 48 } },
];

export function getPresetsForBlock(blockType: string): BlockPreset[] {
  return BLOCK_PRESETS.filter((p) => p.blockType === blockType);
}
