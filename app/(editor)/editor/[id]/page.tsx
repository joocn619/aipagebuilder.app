"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditorStore, type EditorBlock, type GlobalStyles } from "@/lib/stores/editor-store";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { TemplateBrowser } from "@/components/editor/TemplateBrowser";
import { AIPanel } from "@/components/editor/AIPanel";
import { useEditorShortcuts } from "@/lib/hooks/use-editor-shortcuts";
import { useAutoSave } from "@/lib/hooks/use-auto-save";
import { toast } from "sonner";
import { getTemplateById } from "@/lib/constants/templates";
import { slugify } from "@/lib/utils/format";

// Demo blocks for development
const DEMO_BLOCKS: EditorBlock[] = [
  {
    id: "demo-header",
    type: "header",
    content: {
      logo: "PageForge",
      menuItems: [
        { label: "Features", url: "#features" },
        { label: "Pricing", url: "#pricing" },
        { label: "Contact", url: "#contact" },
      ],
      ctaText: "Get Started",
      ctaUrl: "#",
    },
    styles: { paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 },
  },
  {
    id: "demo-hero",
    type: "hero",
    content: {
      headline: "Build Landing Pages 10x Faster",
      subheadline: "AI-powered page builder for agencies and entrepreneurs. No code needed.",
      ctaText: "Start Free Trial",
      ctaUrl: "#",
      alignment: "center",
    },
    styles: { paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 },
  },
  {
    id: "demo-features",
    type: "features",
    content: {
      heading: "Everything You Need",
      subheading: "Powerful features to build and convert",
      layout: "grid",
      columns: 3,
      features: [
        { icon: "zap", title: "AI-Powered", description: "Generate pages with a single prompt" },
        { icon: "shield", title: "Conversion Tools", description: "Built-in A/B testing, popups, and analytics" },
        { icon: "star", title: "White Label", description: "Remove our branding and add yours" },
      ],
    },
    styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 },
  },
  {
    id: "demo-cta",
    type: "cta",
    content: {
      heading: "Ready to Get Started?",
      subheading: "Join 10,000+ agencies and entrepreneurs",
      ctaText: "Start Building for Free",
      ctaUrl: "#",
    },
    styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 },
  },
  {
    id: "demo-footer",
    type: "footer",
    content: {
      logo: "PageForge",
      columns: [
        { title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }, { label: "Templates", url: "#" }] },
        { title: "Company", links: [{ label: "About", url: "#" }, { label: "Blog", url: "#" }, { label: "Contact", url: "#" }] },
      ],
      copyright: "2026 PageForge. All rights reserved.",
    },
    styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 },
  },
];

const DEMO_GLOBAL_STYLES: GlobalStyles = {
  primaryColor: "#2563eb",
  secondaryColor: "#0f172a",
  fontFamily: "Inter",
  headingFont: "Inter",
  borderRadius: 8,
  baseFontSize: 16,
};

export default function EditPagePage() {
  const params = useParams();
  const pageId = params.id as string;
  const { setPage, markSaving, markClean } = useEditorStore();
  const [templateBrowserOpen, setTemplateBrowserOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  useEffect(() => {
    if (pageId.startsWith("tpl-")) {
      const tpl = getTemplateById(pageId.replace("tpl-", ""));
      if (tpl) {
        setPage(pageId, tpl.name, slugify(tpl.name), tpl.blocks, tpl.globalStyles);
        return;
      }
    }
    setPage(pageId, "My Landing Page", "my-landing-page", DEMO_BLOCKS, DEMO_GLOBAL_STYLES);
  }, [pageId, setPage]);

  // Save function
  const handleSave = useCallback(async () => {
    markSaving(true);
    try {
      // TODO: Save to Supabase in Phase 4
      await new Promise((r) => setTimeout(r, 500)); // Simulate
      markClean();
      toast.success("Page saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      markSaving(false);
    }
  }, [markSaving, markClean]);

  const handlePublish = useCallback(async () => {
    await handleSave();
    toast.success("Page published!");
  }, [handleSave]);

  // Keyboard shortcuts
  useEditorShortcuts(handleSave);

  // Auto-save every 30 seconds
  useAutoSave(handleSave, 30000);

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar
        onSave={handleSave}
        onPublish={handlePublish}
        onOpenTemplates={() => setTemplateBrowserOpen(true)}
        onOpenAI={() => setAiPanelOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        <EditorCanvas />
        <EditorSidebar />
      </div>
      <TemplateBrowser
        open={templateBrowserOpen}
        onClose={() => setTemplateBrowserOpen(false)}
      />
      <AIPanel
        open={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
      />
    </div>
  );
}
