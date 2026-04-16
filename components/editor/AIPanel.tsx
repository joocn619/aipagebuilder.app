"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/lib/stores/editor-store";
import { TONE_OPTIONS, INDUSTRY_OPTIONS } from "@/lib/ai/prompts";
import { toast } from "sonner";

interface AIPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AIPanel({ open, onClose }: AIPanelProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">Generate Page</TabsTrigger>
            <TabsTrigger value="copy">Write Copy</TabsTrigger>
            <TabsTrigger value="image">Generate Image</TabsTrigger>
            <TabsTrigger value="layout">Image to Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="generate"><AIPageGenerator onClose={onClose} /></TabsContent>
          <TabsContent value="copy"><AICopyWriter /></TabsContent>
          <TabsContent value="image"><AIImageGenerator /></TabsContent>
          <TabsContent value="layout"><AIImageToLayout onClose={onClose} /></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// AI Page Generator
// ============================================

function AIPageGenerator({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const { setPage, pageId, pageTitle, pageSlug, globalStyles } = useEditorStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Enter a description");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, industry, tone }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPage(pageId || "ai-gen", pageTitle || "AI Generated Page", pageSlug || "ai-page", data.blocks, globalStyles);
      toast.success("Page generated!");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-1.5">
        <Label>Describe your page</Label>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="A landing page for a SaaS project management tool targeting small agencies. Emphasize speed, collaboration, and affordable pricing."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
            <SelectContent>
              {INDUSTRY_OPTIONS.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TONE_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? "Generating..." : "Generate Page with AI"}
      </Button>
    </div>
  );
}

// ============================================
// AI Copy Writer
// ============================================

function AICopyWriter() {
  const [type, setType] = useState("headline");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedBlockId, updateBlockContent } = useEditorStore();

  const handleGenerate = async () => {
    if (!context.trim()) return toast.error("Enter context");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context, tone, count: 3 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const items = data.headlines || data.descriptions || data.ctas || (data.heading ? [data.heading] : []);
      setResults(Array.isArray(items) ? items : []);
      toast.success("Copy generated!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const applyCopy = (text: string) => {
    if (!selectedBlockId) return toast.error("Select a block first");
    const field = type === "headline" ? "headline" : type === "description" ? "subheadline" : type === "cta" ? "ctaText" : "heading";
    updateBlockContent(selectedBlockId, { [field]: text });
    toast.success("Applied to selected block");
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Copy Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="headline">Headlines</SelectItem>
              <SelectItem value="description">Descriptions</SelectItem>
              <SelectItem value="cta">CTA Buttons</SelectItem>
              <SelectItem value="section">Full Section</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TONE_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Context</Label>
        <Input
          placeholder="What is this for? (e.g., SaaS landing page hero)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>
      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? "Generating..." : "Generate Copy"}
      </Button>

      {results.length > 0 && (
        <div className="space-y-2">
          <Label>Results (click to apply to selected block)</Label>
          {results.map((text, i) => (
            <button
              key={i}
              className="block w-full rounded-lg border p-3 text-left text-sm hover:bg-accent transition-colors"
              onClick={() => applyCopy(text)}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// AI Image Generator
// ============================================

function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("natural");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Enter a prompt");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImageUrl(data.imageUrl);
      toast.success("Image generated!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-1.5">
        <Label>Describe the image</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="A modern office workspace with a laptop showing a dashboard, warm lighting, professional photography style"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Style</Label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="natural">Natural (Photo-realistic)</SelectItem>
            <SelectItem value="vivid">Vivid (Dramatic/Artistic)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? "Generating..." : "Generate Image"}
      </Button>

      {imageUrl && (
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="AI Generated" className="w-full" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              navigator.clipboard.writeText(imageUrl);
              toast.success("Image URL copied!");
            }}
          >
            Copy Image URL
          </Button>
        </div>
      )}
    </div>
  );
}

// ============================================
// AI Image to Layout
// ============================================

function AIImageToLayout({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setPage, pageId, pageTitle, pageSlug, globalStyles } = useEditorStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleConvert = async () => {
    if (!file) return toast.error("Upload a screenshot first");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/ai/image-to-layout", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPage(pageId || "layout-gen", pageTitle || "From Screenshot", pageSlug || "from-screenshot", data.blocks, globalStyles);
      toast.success("Layout converted!");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-1.5">
        <Label>Upload a screenshot or mockup</Label>
        <p className="text-xs text-muted-foreground">
          Supports: website screenshots, Figma exports, hand-drawn sketches (PNG, JPEG, WebP)
        </p>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {preview && (
        <div className="overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="max-h-64 w-full object-contain" />
        </div>
      )}

      <Button onClick={handleConvert} disabled={loading || !file} className="w-full">
        {loading ? "Converting..." : "Convert to Editable Page"}
      </Button>
    </div>
  );
}
