"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TEMPLATE_DATA } from "@/lib/constants/templates";

const CATEGORIES = ["All", "Landing Page", "SaaS", "Agency", "E-commerce", "Portfolio", "Blog", "Event", "Coming Soon"];

const TEMPLATES = TEMPLATE_DATA.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
  description: t.description,
  blocks: t.blocks.length,
  emoji: t.emoji,
  tags: t.tags,
  isPro: t.isPro,
}));

const COLORS: Record<string, string> = {
  "SaaS": "bg-violet-500/10 text-violet-600 border-violet-200",
  "Agency": "bg-blue-500/10 text-blue-600 border-blue-200",
  "Landing Page": "bg-green-500/10 text-green-600 border-green-200",
  "E-commerce": "bg-orange-500/10 text-orange-600 border-orange-200",
  "Portfolio": "bg-pink-500/10 text-pink-600 border-pink-200",
  "Blog": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  "Event": "bg-red-500/10 text-red-600 border-red-200",
  "Coming Soon": "bg-gray-500/10 text-gray-600 border-gray-200",
};

const BLOCK_GRADIENTS = [
  "from-violet-400 to-blue-500",
  "from-blue-400 to-cyan-500",
  "from-pink-400 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-green-400 to-emerald-500",
  "from-indigo-400 to-purple-500",
  "from-teal-400 to-cyan-500",
  "from-fuchsia-400 to-pink-500",
];

export default function DashboardTemplatesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = category === "All" || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const applyTemplate = (template: (typeof TEMPLATES)[number]) => {
    if (template.isPro) {
      toast.error("Upgrade to Pro to use this template");
      return;
    }
    sessionStorage.setItem("pending_template_id", template.id);
    toast.success(`Opening "${template.name}" template...`);
    router.push(`/editor/${Date.now()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="text-sm text-muted-foreground">{TEMPLATES.length} templates — start building faster</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push(`/editor/${Date.now()}`)}>
          Start from Blank
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">No templates found</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template, i) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
            >
              {/* Preview area */}
              <div className={`relative h-40 bg-gradient-to-br ${BLOCK_GRADIENTS[i % BLOCK_GRADIENTS.length]} p-4`}>
                {/* Mini page mockup */}
                <div className="mx-auto h-full max-w-[160px] overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 space-y-1.5">
                  <div className="h-2 w-2/3 rounded-sm bg-white/60" />
                  <div className="h-1.5 w-full rounded-sm bg-white/30" />
                  <div className="h-1.5 w-4/5 rounded-sm bg-white/30" />
                  <div className="mt-2 h-5 w-1/2 rounded-md bg-white/50 mx-auto" />
                  <div className="mt-1.5 grid grid-cols-2 gap-1">
                    <div className="h-6 rounded bg-white/20" />
                    <div className="h-6 rounded bg-white/20" />
                  </div>
                  <div className="h-1.5 w-full rounded-sm bg-white/20" />
                  <div className="h-1.5 w-3/4 rounded-sm bg-white/20" />
                </div>

                {/* Emoji */}
                <div className="absolute top-3 right-3 text-2xl">{template.emoji}</div>

                {/* Pro badge */}
                {template.isPro && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-500 text-white border-0 text-[10px] px-1.5">PRO</Badge>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold shadow-lg"
                    onClick={() => applyTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm">{template.name}</p>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${COLORS[template.category] || ""}`}>
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{template.blocks} blocks</span>
                  <div className="flex gap-1">
                    {template.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
