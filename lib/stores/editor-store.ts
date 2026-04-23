"use client";

import { create } from "zustand";
import { v4 as uuid } from "uuid";

// ============================================
// Types
// ============================================

export interface BlockStyles {
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  opacity?: number;
  backgroundImage?: string;
  backgroundSize?: string;
  maxWidth?: string;
  // Advanced
  boxShadow?: string;
  backdropBlur?: number;
  gradient?: string;
  // Animation
  animation?: "none" | "fade-in" | "slide-up" | "slide-left" | "zoom-in" | "bounce";
  animationDelay?: number;
  animationDuration?: number;
  hoverEffect?: "none" | "lift" | "glow" | "scale";
}

export interface EditorBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  styles: BlockStyles;
  hidden?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}

export interface GlobalStyles {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  headingFont: string;
  borderRadius: number;
  baseFontSize: number;
}

export type PreviewMode = "desktop" | "tablet" | "mobile";

export interface EditorState {
  // Page data
  pageId: string | null;
  pageTitle: string;
  pageSlug: string;

  // Blocks
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  hoveredBlockId: string | null;

  // Global
  globalStyles: GlobalStyles;
  customCss: string;
  customJs: string;

  // UI state
  previewMode: PreviewMode;
  isDirty: boolean;
  isSaving: boolean;
  isPreviewOpen: boolean;
  sidebarTab: "blocks" | "settings" | "styles" | "tree" | "code";
  zoom: number;

  // History
  undoStack: EditorBlock[][];
  redoStack: EditorBlock[][];

  // Actions — page
  setPage: (id: string, title: string, slug: string, blocks: EditorBlock[], globalStyles: GlobalStyles, customCss?: string, customJs?: string) => void;
  setPageTitle: (title: string) => void;
  setPageSlug: (slug: string) => void;

  // Actions — blocks
  addBlock: (type: string, index?: number) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  updateBlockContent: (id: string, content: Record<string, unknown>) => void;
  updateBlockStyles: (id: string, styles: Partial<BlockStyles>) => void;
  updateBlockHidden: (id: string, hidden: EditorBlock["hidden"]) => void;

  // Actions — clipboard
  clipboard: EditorBlock | null;
  copyBlock: (id: string) => void;
  pasteBlock: (index?: number) => void;
  applyPreset: (blockId: string, styles: Partial<BlockStyles>, contentOverrides?: Record<string, unknown>) => void;

  // Actions — selection
  selectBlock: (id: string | null) => void;
  hoverBlock: (id: string | null) => void;

  // Actions — global
  setGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  setCustomCss: (css: string) => void;
  setCustomJs: (js: string) => void;

  // Actions — UI
  setPreviewMode: (mode: PreviewMode) => void;
  setSidebarTab: (tab: EditorState["sidebarTab"]) => void;
  setZoom: (zoom: number) => void;
  setIsPreviewOpen: (open: boolean) => void;

  // Actions — history
  undo: () => void;
  redo: () => void;

  // Actions — save
  markSaving: (saving: boolean) => void;
  markClean: () => void;
}

// ============================================
// Default block content per type
// ============================================

export function getDefaultBlockContent(type: string): Record<string, unknown> {
  const defaults: Record<string, Record<string, unknown>> = {
    hero: {
      headline: "Your Headline Here",
      subheadline: "A compelling subheadline that explains your value proposition",
      ctaText: "Get Started",
      ctaUrl: "#",
      alignment: "center",
    },
    features: {
      heading: "Features",
      subheading: "Everything you need",
      layout: "grid",
      columns: 3,
      features: [
        { icon: "zap", title: "Fast", description: "Lightning fast performance" },
        { icon: "shield", title: "Secure", description: "Enterprise-grade security" },
        { icon: "star", title: "Reliable", description: "99.9% uptime guaranteed" },
      ],
    },
    testimonials: {
      heading: "What Our Customers Say",
      layout: "grid",
      testimonials: [
        { name: "John Doe", role: "CEO", company: "Acme Inc", content: "Amazing product that changed our business!", rating: 5 },
        { name: "Jane Smith", role: "CTO", company: "TechCo", content: "Best tool we have ever used.", rating: 5 },
      ],
    },
    cta: {
      heading: "Ready to Get Started?",
      subheading: "Join thousands of happy customers",
      ctaText: "Start Free Trial",
      ctaUrl: "#",
    },
    pricing: {
      heading: "Simple Pricing",
      subheading: "No hidden fees",
      plans: [
        { name: "Starter", price: 19, period: "month", features: ["5 Pages", "Basic Analytics"], ctaText: "Get Started" },
        { name: "Pro", price: 39, period: "month", features: ["50 Pages", "Advanced Analytics", "A/B Testing"], ctaText: "Go Pro", highlighted: true },
      ],
    },
    faq: {
      heading: "Frequently Asked Questions",
      items: [
        { question: "What is PageForge?", answer: "An AI-powered page builder." },
        { question: "Is there a free plan?", answer: "Yes! Start building for free." },
      ],
    },
    form: {
      heading: "Get in Touch",
      description: "Fill out the form below",
      fields: [
        { type: "text", label: "Name", placeholder: "Your name", required: true },
        { type: "email", label: "Email", placeholder: "you@example.com", required: true },
        { type: "textarea", label: "Message", placeholder: "Your message...", required: false },
      ],
      submitText: "Submit",
      successMessage: "Thank you! We will be in touch.",
    },
    gallery: { heading: "Gallery", layout: "grid", columns: 3, images: [] },
    video: { heading: "Watch Our Demo", provider: "youtube", videoId: "", autoplay: false },
    countdown: { heading: "Offer Ends Soon", mode: "fixed", targetDate: "" },
    "social-proof": { heading: "Trusted By", layout: "logos", items: [] },
    "custom-html": { html: "<div>Your custom HTML here</div>", css: "" },
    header: {
      logo: "PageForge",
      menuItems: [
        { label: "Features", url: "#features" },
        { label: "Pricing", url: "#pricing" },
        { label: "Contact", url: "#contact" },
      ],
      ctaText: "Get Started",
      ctaUrl: "#",
      sticky: true,
    },
    footer: {
      logo: "PageForge",
      columns: [
        { title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Contact", url: "#" }] },
      ],
      copyright: "2026 PageForge. All rights reserved.",
    },
    team: {
      heading: "Meet Our Team",
      layout: "grid",
      members: [{ name: "Jane Doe", role: "CEO", bio: "Passionate leader", photoUrl: "" }],
    },
    stats: {
      heading: "By the Numbers",
      stats: [
        { value: 10000, label: "Happy Customers", suffix: "+" },
        { value: 99, label: "Uptime", suffix: "%" },
        { value: 50, label: "Countries", suffix: "+" },
      ],
      animated: true,
    },
    "logo-carousel": { heading: "Trusted By Leading Companies", speed: 30, logos: [] },
    comparison: {
      heading: "Compare Plans",
      columns: ["Free", "Pro", "Enterprise"],
      rows: [
        { feature: "Pages", values: ["1", "50", "Unlimited"] },
        { feature: "AI Credits", values: ["5", "500", "Unlimited"] },
      ],
    },
    tabs: {
      tabs: [
        { label: "Tab 1", content: "Content for tab 1" },
        { label: "Tab 2", content: "Content for tab 2" },
      ],
    },
    accordion: {
      heading: "More Information",
      items: [
        { title: "Section 1", content: "Content here" },
        { title: "Section 2", content: "Content here" },
      ],
    },
    "problem-solution": {
      eyebrow: "Why it matters",
      heading: "Replace the old way with a clearer path",
      subheading: "Show the pain your audience feels, then position your offer as the modern answer.",
      problemTitle: "The old way",
      solutionTitle: "The better way",
      problems: [
        { title: "Too many moving parts", description: "Customers are juggling manual work, scattered tools, and unclear next steps." },
        { title: "No clear proof", description: "The page does not show enough trust, urgency, or relevant outcomes." },
      ],
      solutions: [
        { title: "One guided experience", description: "A focused journey moves visitors from pain to value to action." },
        { title: "Proof at every step", description: "Benefits, process, case studies, and guarantees reduce risk before the CTA." },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "A simple process from interest to outcome",
      subheading: "Break the conversion journey into clear steps so visitors know exactly what happens next.",
      steps: [
        { badge: "Step 1", title: "Choose your goal", description: "Start with the outcome your visitor wants most." },
        { badge: "Step 2", title: "Follow the plan", description: "Show the guided process, timeline, and support." },
        { badge: "Step 3", title: "Launch with confidence", description: "End with a measurable result and low-risk CTA." },
      ],
    },
    "case-studies": {
      eyebrow: "Proof",
      heading: "Results that make the promise believable",
      subheading: "Use concrete examples to show how similar customers got meaningful outcomes.",
      cases: [
        { client: "Customer A", title: "From stuck to shipped", result: "+42%", description: "A focused page and clearer offer helped the team convert more qualified visitors." },
        { client: "Customer B", title: "Less friction, more action", result: "2.8x", description: "Better proof, pricing, and CTA placement improved decision speed." },
        { client: "Customer C", title: "A premium experience", result: "14 days", description: "The full launch system went from idea to live campaign in two weeks." },
      ],
    },
    integrations: {
      eyebrow: "Connected workflow",
      heading: "Fits the tools your audience already uses",
      subheading: "Show platforms, channels, or ecosystem touchpoints that make adoption feel easy.",
      tools: ["Stripe", "Slack", "HubSpot", "Zapier", "Notion", "Google Analytics"],
      note: "Use this section for integrations, sales channels, booking platforms, marketplaces, or community destinations.",
    },
    guarantee: {
      eyebrow: "Low-risk decision",
      badge: "Risk reversed",
      heading: "A confident promise that removes hesitation",
      subheading: "Pair the final CTA with guarantees, safeguards, compliance notes, or support promises.",
      points: [
        { title: "Clear expectations", description: "Visitors know what they get, when they get it, and what happens after signup." },
        { title: "Human support", description: "Support, onboarding, or guidance is visible before the visitor commits." },
        { title: "Flexible exit", description: "A refund, cancellation, consultation, or safety promise lowers perceived risk." },
        { title: "Trusted delivery", description: "Security, quality checks, or expert review reinforce confidence." },
      ],
    },
  };

  return defaults[type] || {};
}

// ============================================
// Store
// ============================================

const DEFAULT_GLOBAL_STYLES: GlobalStyles = {
  primaryColor: "#2563eb",
  secondaryColor: "#0f172a",
  fontFamily: "Inter",
  headingFont: "Inter",
  borderRadius: 8,
  baseFontSize: 16,
};

function pushHistory(state: EditorState): Partial<EditorState> {
  return {
    undoStack: [...state.undoStack, state.blocks.map((b) => ({ ...b }))],
    redoStack: [],
    isDirty: true,
  };
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  pageId: null,
  pageTitle: "",
  pageSlug: "",
  blocks: [],
  selectedBlockId: null,
  hoveredBlockId: null,
  globalStyles: { ...DEFAULT_GLOBAL_STYLES },
  customCss: "",
  customJs: "",
  previewMode: "desktop",
  isDirty: false,
  isSaving: false,
  isPreviewOpen: false,
  sidebarTab: "blocks",
  zoom: 100,
  undoStack: [],
  redoStack: [],
  clipboard: null,

  // Page
  setPage: (id, title, slug, blocks, globalStyles, customCss = "", customJs = "") =>
    set({
      pageId: id,
      pageTitle: title,
      pageSlug: slug,
      blocks,
      globalStyles: { ...DEFAULT_GLOBAL_STYLES, ...globalStyles },
      customCss,
      customJs,
      isDirty: false,
      undoStack: [],
      redoStack: [],
      selectedBlockId: null,
    }),

  setPageTitle: (title) => set({ pageTitle: title, isDirty: true }),
  setPageSlug: (slug) => set({ pageSlug: slug, isDirty: true }),

  // Blocks
  addBlock: (type, index) =>
    set((state) => {
      const newBlock: EditorBlock = {
        id: uuid(),
        type,
        content: getDefaultBlockContent(type),
        styles: {
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: 24,
          paddingRight: 24,
        },
      };
      const blocks = [...state.blocks];
      if (index !== undefined) {
        blocks.splice(index, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { blocks, selectedBlockId: newBlock.id, sidebarTab: "settings", ...pushHistory(state) };
    }),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
      ...pushHistory(state),
    })),

  duplicateBlock: (id) =>
    set((state) => {
      const idx = state.blocks.findIndex((b) => b.id === id);
      if (idx === -1) return state;
      const original = state.blocks[idx];
      const copy: EditorBlock = {
        ...original,
        id: uuid(),
        content: { ...original.content },
        styles: { ...original.styles },
      };
      const blocks = [...state.blocks];
      blocks.splice(idx + 1, 0, copy);
      return { blocks, selectedBlockId: copy.id, ...pushHistory(state) };
    }),

  moveBlock: (fromIndex, toIndex) =>
    set((state) => {
      const blocks = [...state.blocks];
      const [moved] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, moved);
      return { blocks, ...pushHistory(state) };
    }),

  updateBlockContent: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, content: { ...b.content, ...content } } : b
      ),
      isDirty: true,
    })),

  updateBlockStyles: (id, styles) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, styles: { ...b.styles, ...styles } } : b
      ),
      isDirty: true,
    })),

  updateBlockHidden: (id, hidden) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, hidden } : b)),
      isDirty: true,
    })),

  // Clipboard
  copyBlock: (id) =>
    set((state) => {
      const block = state.blocks.find((b) => b.id === id);
      return block ? { clipboard: { ...block, id: uuid(), content: { ...block.content }, styles: { ...block.styles } } } : state;
    }),

  pasteBlock: (index) =>
    set((state) => {
      if (!state.clipboard) return state;
      const pasted: EditorBlock = { ...state.clipboard, id: uuid() };
      const blocks = [...state.blocks];
      if (index !== undefined) blocks.splice(index, 0, pasted);
      else blocks.push(pasted);
      return { blocks, selectedBlockId: pasted.id, ...pushHistory(state) };
    }),

  applyPreset: (blockId, styles, contentOverrides) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === blockId
          ? { ...b, styles: { ...b.styles, ...styles }, content: contentOverrides ? { ...b.content, ...contentOverrides } : b.content }
          : b
      ),
      ...pushHistory(state),
    })),

  // Selection
  selectBlock: (id) => set({ selectedBlockId: id, sidebarTab: id ? "settings" : "blocks" }),
  hoverBlock: (id) => set({ hoveredBlockId: id }),

  // Global
  setGlobalStyles: (styles) =>
    set((state) => ({
      globalStyles: { ...state.globalStyles, ...styles },
      isDirty: true,
    })),
  setCustomCss: (css) => set({ customCss: css, isDirty: true }),
  setCustomJs: (js) => set({ customJs: js, isDirty: true }),

  // UI
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) }),
  setIsPreviewOpen: (open) => set({ isPreviewOpen: open }),

  // History
  undo: () =>
    set((state) => {
      if (state.undoStack.length === 0) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      return {
        blocks: prev,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, state.blocks.map((b) => ({ ...b }))],
        isDirty: true,
        selectedBlockId: null,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      return {
        blocks: next,
        redoStack: state.redoStack.slice(0, -1),
        undoStack: [...state.undoStack, state.blocks.map((b) => ({ ...b }))],
        isDirty: true,
        selectedBlockId: null,
      };
    }),

  // Save
  markSaving: (saving) => set({ isSaving: saving }),
  markClean: () => set({ isDirty: false }),
}));
