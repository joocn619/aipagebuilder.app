"use client";

import { useState } from "react";
import { useEditorStore, type EditorBlock, type GlobalStyles } from "@/lib/stores/editor-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  blocks: EditorBlock[];
  globalStyles: GlobalStyles;
}

// Demo templates — in production these come from Supabase
const TEMPLATE_CATEGORIES = [
  "All",
  "Landing",
  "Product",
  "Coming Soon",
  "Portfolio",
  "Event",
  "Local",
  "Blank",
];

const DEMO_TEMPLATES: TemplateItem[] = [
  {
    id: "blank",
    name: "Blank Canvas",
    category: "Blank",
    isPremium: false,
    blocks: [],
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
  },
  {
    id: "saas-starter",
    name: "SaaS Starter",
    category: "Landing",
    isPremium: false,
    blocks: [
      { id: "t1-h", type: "header", content: { logo: "YourBrand", menuItems: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }], ctaText: "Get Started", ctaUrl: "#" }, styles: { paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 } },
      { id: "t1-hero", type: "hero", content: { headline: "Ship Your SaaS Faster", subheadline: "The all-in-one platform for modern startups", ctaText: "Start Free", alignment: "center" }, styles: { paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 } },
      { id: "t1-feat", type: "features", content: { heading: "Why Choose Us", subheading: "Everything you need to succeed", layout: "grid", columns: 3, features: [{ icon: "zap", title: "Fast", description: "Lightning fast" }, { icon: "shield", title: "Secure", description: "Enterprise security" }, { icon: "star", title: "Reliable", description: "99.9% uptime" }] }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t1-pricing", type: "pricing", content: { heading: "Simple Pricing", subheading: "No hidden fees", plans: [{ name: "Starter", price: 29, period: "month", features: ["5 Projects", "Basic Analytics"], ctaText: "Start Free" }, { name: "Pro", price: 79, period: "month", features: ["Unlimited Projects", "Advanced Analytics", "Priority Support"], ctaText: "Go Pro", highlighted: true }] }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t1-cta", type: "cta", content: { heading: "Ready to Launch?", subheading: "Join thousands of happy customers", ctaText: "Start Free Trial" }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t1-f", type: "footer", content: { logo: "YourBrand", columns: [{ title: "Product", links: [{ label: "Features", url: "#" }, { label: "Pricing", url: "#" }] }, { title: "Company", links: [{ label: "About", url: "#" }, { label: "Contact", url: "#" }] }], copyright: "2026 YourBrand. All rights reserved." }, styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 } },
    ],
    globalStyles: { primaryColor: "#2563eb", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
  },
  {
    id: "agency",
    name: "Agency Pro",
    category: "Landing",
    isPremium: false,
    blocks: [
      { id: "t2-h", type: "header", content: { logo: "Agency", menuItems: [{ label: "Work", url: "#" }, { label: "Services", url: "#" }, { label: "Contact", url: "#" }], ctaText: "Get a Quote" }, styles: { paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-hero", type: "hero", content: { headline: "We Build Brands That Matter", subheadline: "Full-service digital agency for ambitious businesses", ctaText: "View Our Work", alignment: "left" }, styles: { paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-logos", type: "social-proof", content: { heading: "Trusted By", layout: "logos", items: [] }, styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-feat", type: "features", content: { heading: "Our Services", layout: "grid", columns: 3, features: [{ title: "Web Design", description: "Beautiful, responsive websites" }, { title: "Branding", description: "Memorable brand identities" }, { title: "Marketing", description: "Data-driven campaigns" }] }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-test", type: "testimonials", content: { heading: "Client Reviews", testimonials: [{ name: "Sarah K.", role: "CEO", company: "TechStart", content: "Outstanding work! They transformed our brand completely.", rating: 5 }] }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-form", type: "form", content: { heading: "Start a Project", description: "Tell us about your project", fields: [{ type: "text", label: "Name", required: true }, { type: "email", label: "Email", required: true }, { type: "textarea", label: "Project Details", required: false }], submitText: "Send Message" }, styles: { paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t2-f", type: "footer", content: { logo: "Agency", columns: [{ title: "Services", links: [{ label: "Web Design", url: "#" }] }], copyright: "2026 Agency. All rights reserved." }, styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 } },
    ],
    globalStyles: { primaryColor: "#0f172a", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 6, baseFontSize: 16 },
  },
  {
    id: "lead-gen",
    name: "Lead Generation",
    category: "Landing",
    isPremium: false,
    blocks: [
      { id: "t3-hero", type: "hero", content: { headline: "Get Your Free Guide", subheadline: "10 proven strategies to grow your business in 2026", ctaText: "Download Now", alignment: "center" }, styles: { paddingTop: 80, paddingBottom: 40, paddingLeft: 24, paddingRight: 24 } },
      { id: "t3-form", type: "form", content: { heading: "Claim Your Copy", fields: [{ type: "text", label: "Full Name", required: true }, { type: "email", label: "Email Address", required: true }], submitText: "Download Free Guide", successMessage: "Check your email!" }, styles: { paddingTop: 24, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 } },
      { id: "t3-feat", type: "features", content: { heading: "What You Will Learn", layout: "list", columns: 2, features: [{ title: "Growth Hacking", description: "Proven tactics from top companies" }, { title: "Customer Retention", description: "Keep them coming back" }, { title: "Scaling Fast", description: "From 0 to 1M users" }] }, styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 } },
      { id: "t3-test", type: "testimonials", content: { heading: "What Readers Say", testimonials: [{ name: "Mike R.", content: "This guide changed how we do marketing.", rating: 5 }] }, styles: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 } },
    ],
    globalStyles: { primaryColor: "#059669", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 8, baseFontSize: 16 },
  },
  {
    id: "coming-soon",
    name: "Coming Soon",
    category: "Coming Soon",
    isPremium: false,
    blocks: [
      { id: "t4-hero", type: "hero", content: { headline: "Something Amazing is Coming", subheadline: "Be the first to know when we launch", ctaText: "Notify Me", alignment: "center" }, styles: { paddingTop: 120, paddingBottom: 40, paddingLeft: 24, paddingRight: 24 } },
      { id: "t4-cd", type: "countdown", content: { heading: "Launching In", mode: "fixed" }, styles: { paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24 } },
      { id: "t4-form", type: "form", content: { heading: "", fields: [{ type: "email", label: "Email", placeholder: "Enter your email", required: true }], submitText: "Notify Me" }, styles: { paddingTop: 24, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 } },
    ],
    globalStyles: { primaryColor: "#7c3aed", secondaryColor: "#0f172a", fontFamily: "Inter", headingFont: "Inter", borderRadius: 12, baseFontSize: 16 },
  },
];

interface TemplateBrowserProps {
  open: boolean;
  onClose: () => void;
}

export function TemplateBrowser({ open, onClose }: TemplateBrowserProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { setPage, pageId, pageTitle, pageSlug } = useEditorStore();

  const filtered = DEMO_TEMPLATES.filter((t) => {
    if (category !== "All" && t.category !== category) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const applyTemplate = (template: TemplateItem) => {
    setPage(
      pageId || "new",
      pageTitle || template.name,
      pageSlug || template.id,
      template.blocks,
      template.globalStyles
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Input placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9" />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer rounded-lg border p-3 hover:border-primary transition-colors"
                onClick={() => applyTemplate(template)}
              >
                <div className="mb-2 aspect-video rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  {template.blocks.length === 0 ? "Blank" : `${template.blocks.length} blocks`}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{template.name}</p>
                  {template.isPremium && <Badge variant="secondary" className="text-[10px]">PRO</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{template.category}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
