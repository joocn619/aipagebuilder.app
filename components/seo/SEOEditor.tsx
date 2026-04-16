"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData: string;
  focusKeyword: string;
}

interface SEOEditorProps {
  pageId: string;
  pageTitle: string;
  pageSlug: string;
  initialData?: Partial<SEOData>;
  onSave: (data: SEOData) => void;
}

interface SEOCheck {
  label: string;
  pass: boolean;
  tip: string;
}

function computeSEOScore(data: SEOData): { score: number; checks: SEOCheck[] } {
  const checks: SEOCheck[] = [
    {
      label: "Meta title exists",
      pass: data.metaTitle.length > 0,
      tip: "Add a meta title for this page",
    },
    {
      label: "Meta title length (50-60 chars)",
      pass: data.metaTitle.length >= 50 && data.metaTitle.length <= 60,
      tip: `Current: ${data.metaTitle.length} chars. Aim for 50-60`,
    },
    {
      label: "Meta description exists",
      pass: data.metaDescription.length > 0,
      tip: "Add a meta description to improve click-through rates",
    },
    {
      label: "Meta description length (120-160 chars)",
      pass: data.metaDescription.length >= 120 && data.metaDescription.length <= 160,
      tip: `Current: ${data.metaDescription.length} chars. Aim for 120-160`,
    },
    {
      label: "Focus keyword set",
      pass: data.focusKeyword.length > 0,
      tip: "Set a focus keyword to optimize for",
    },
    {
      label: "Keyword in meta title",
      pass: data.focusKeyword.length > 0 && data.metaTitle.toLowerCase().includes(data.focusKeyword.toLowerCase()),
      tip: "Include your focus keyword in the meta title",
    },
    {
      label: "Keyword in meta description",
      pass: data.focusKeyword.length > 0 && data.metaDescription.toLowerCase().includes(data.focusKeyword.toLowerCase()),
      tip: "Include your focus keyword in the meta description",
    },
    {
      label: "OG image set",
      pass: data.ogImage.length > 0,
      tip: "Add an Open Graph image for social sharing",
    },
    {
      label: "Canonical URL set",
      pass: data.canonicalUrl.length > 0,
      tip: "Set a canonical URL to avoid duplicate content issues",
    },
    {
      label: "Not blocking search engines",
      pass: !data.noIndex && !data.noFollow,
      tip: "Page is set to noindex or nofollow — search engines won't crawl it",
    },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);
  return { score, checks };
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

const DEFAULT_STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "",
  "description": "",
  "url": "",
}, null, 2);

export function SEOEditor({ pageTitle, pageSlug, initialData, onSave }: Omit<SEOEditorProps, "pageId"> & { pageId?: string }) {
  const [data, setData] = useState<SEOData>({
    metaTitle: initialData?.metaTitle || pageTitle,
    metaDescription: initialData?.metaDescription || "",
    ogTitle: initialData?.ogTitle || pageTitle,
    ogDescription: initialData?.ogDescription || "",
    ogImage: initialData?.ogImage || "",
    canonicalUrl: initialData?.canonicalUrl || `https://aipagebuilder.app/p/${pageSlug}`,
    noIndex: initialData?.noIndex || false,
    noFollow: initialData?.noFollow || false,
    structuredData: initialData?.structuredData || DEFAULT_STRUCTURED_DATA,
    focusKeyword: initialData?.focusKeyword || "",
  });
  const [jsonError, setJsonError] = useState("");

  const { score, checks } = computeSEOScore(data);

  const update = (field: keyof SEOData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validateJSON = (value: string) => {
    try {
      JSON.parse(value);
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  const handleSave = () => {
    if (jsonError) {
      toast.error("Fix JSON-LD errors before saving");
      return;
    }
    onSave(data);
    toast.success("SEO settings saved");
  };

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">SEO Score</p>
              <p className={`text-4xl font-bold mt-1 ${scoreColor(score)}`}>{score}/100</p>
            </div>
            <div className="w-48 space-y-1.5">
              {checks.slice(0, 5).map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span>{check.pass ? "✅" : "❌"}</span>
                  <span className={check.pass ? "text-muted-foreground" : "text-foreground"}>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-muted">
            <div
              className={`h-2 rounded-full transition-all ${scoreBg(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="meta">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="og">Social / OG</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="audit">
            Audit
            {checks.filter((c) => !c.pass).length > 0 && (
              <Badge variant="destructive" className="ml-1.5 h-4 px-1 text-[10px]">
                {checks.filter((c) => !c.pass).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Meta */}
        <TabsContent value="meta" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Focus Keyword</Label>
            <Input
              value={data.focusKeyword}
              onChange={(e) => update("focusKeyword", e.target.value)}
              placeholder="e.g. page builder for agencies"
            />
            <p className="text-xs text-muted-foreground">Optimize this page around one primary keyword</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Meta Title</Label>
              <span className={`text-xs ${data.metaTitle.length > 60 ? "text-red-500" : data.metaTitle.length >= 50 ? "text-green-600" : "text-muted-foreground"}`}>
                {data.metaTitle.length}/60
              </span>
            </div>
            <Input
              value={data.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
              placeholder="Page title for search engines"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Meta Description</Label>
              <span className={`text-xs ${data.metaDescription.length > 160 ? "text-red-500" : data.metaDescription.length >= 120 ? "text-green-600" : "text-muted-foreground"}`}>
                {data.metaDescription.length}/160
              </span>
            </div>
            <textarea
              className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              value={data.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              placeholder="Describe this page for search results (120-160 characters)"
            />
          </div>

          {/* SERP Preview */}
          <div className="rounded-lg border p-4 bg-white">
            <p className="text-xs text-muted-foreground mb-3 font-medium">SERP Preview</p>
            <div className="text-[#1a0dab] text-lg font-medium leading-tight">
              {data.metaTitle || pageTitle}
            </div>
            <div className="text-[#006621] text-xs mt-0.5">
              {data.canonicalUrl || `https://aipagebuilder.app/p/${pageSlug}`}
            </div>
            <div className="text-[#545454] text-sm mt-1 leading-snug">
              {data.metaDescription || "No meta description set."}
            </div>
          </div>
        </TabsContent>

        {/* OG */}
        <TabsContent value="og" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>OG Title</Label>
            <Input
              value={data.ogTitle}
              onChange={(e) => update("ogTitle", e.target.value)}
              placeholder="Title shown when shared on social media"
            />
          </div>
          <div className="space-y-2">
            <Label>OG Description</Label>
            <textarea
              className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={2}
              value={data.ogDescription}
              onChange={(e) => update("ogDescription", e.target.value)}
              placeholder="Description for social sharing"
            />
          </div>
          <div className="space-y-2">
            <Label>OG Image URL</Label>
            <Input
              value={data.ogImage}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="https://... (1200x630px recommended)"
            />
          </div>

          {/* OG Preview */}
          <div className="rounded-lg border overflow-hidden">
            <p className="text-xs text-muted-foreground px-3 py-2 border-b font-medium">Social Preview</p>
            {data.ogImage ? (
              <div className="aspect-[1200/630] bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.ogImage} alt="OG preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[1200/630] bg-muted flex items-center justify-center text-muted-foreground text-sm">
                No OG image set
              </div>
            )}
            <div className="bg-[#f0f2f5] px-3 py-2 text-xs">
              <p className="text-[#606770] uppercase">aipagebuilder.app</p>
              <p className="font-semibold text-[#1c1e21] mt-0.5">{data.ogTitle || pageTitle}</p>
              <p className="text-[#606770] mt-0.5 line-clamp-2">{data.ogDescription || data.metaDescription}</p>
            </div>
          </div>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Canonical URL</Label>
            <Input
              value={data.canonicalUrl}
              onChange={(e) => update("canonicalUrl", e.target.value)}
              placeholder="https://aipagebuilder.app/p/slug"
            />
            <p className="text-xs text-muted-foreground">Prevents duplicate content penalties</p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">noindex</p>
              <p className="text-xs text-muted-foreground">Hide from search engines</p>
            </div>
            <Switch checked={data.noIndex} onCheckedChange={(v) => update("noIndex", v)} />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">nofollow</p>
              <p className="text-xs text-muted-foreground">Don&apos;t pass link equity from this page</p>
            </div>
            <Switch checked={data.noFollow} onCheckedChange={(v) => update("noFollow", v)} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>JSON-LD Structured Data</Label>
              {jsonError && <span className="text-xs text-red-500">{jsonError}</span>}
            </div>
            <textarea
              className="w-full rounded-md border bg-background px-3 py-2 font-mono text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={10}
              value={data.structuredData}
              onChange={(e) => {
                update("structuredData", e.target.value);
                validateJSON(e.target.value);
              }}
            />
            <p className="text-xs text-muted-foreground">Schema.org structured data for rich search results</p>
          </div>
        </TabsContent>

        {/* Audit */}
        <TabsContent value="audit" className="pt-4">
          <div className="space-y-2">
            {checks.map((check, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${check.pass ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50"}`}>
                <span className="text-base">{check.pass ? "✅" : "⚠️"}</span>
                <div>
                  <p className="text-sm font-medium">{check.label}</p>
                  {!check.pass && <p className="text-xs text-muted-foreground mt-0.5">{check.tip}</p>}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">Save SEO Settings</Button>
    </div>
  );
}
