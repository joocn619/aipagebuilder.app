"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus, Search, LayoutGrid, List, MoreHorizontal,
  ExternalLink, Copy, Pencil, Trash2, Eye, TrendingUp, FileText, Clock,
} from "lucide-react";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
  viewCount: number;
  convRate: number;
  type: "saas" | "launch" | "portfolio" | "funnel" | "pricing" | "coming-soon";
}

const DEMO_PAGES: PageItem[] = [
  { id: "1", title: "SaaS Landing Page", slug: "saas-landing", status: "published", updatedAt: "2h ago", viewCount: 1842, convRate: 7.3, type: "saas" },
  { id: "2", title: "Product Launch", slug: "product-launch", status: "draft", updatedAt: "1d ago", viewCount: 0, convRate: 0, type: "launch" },
  { id: "3", title: "Agency Portfolio", slug: "agency-portfolio", status: "published", updatedAt: "2d ago", viewCount: 543, convRate: 4.8, type: "portfolio" },
  { id: "4", title: "Free Trial Funnel", slug: "free-trial", status: "published", updatedAt: "3d ago", viewCount: 967, convRate: 12.1, type: "funnel" },
  { id: "5", title: "Pricing Page", slug: "pricing", status: "published", updatedAt: "5d ago", viewCount: 742, convRate: 9.4, type: "pricing" },
  { id: "6", title: "Coming Soon", slug: "coming-soon", status: "archived", updatedAt: "1w ago", viewCount: 56, convRate: 0, type: "coming-soon" },
];

const STATUS_CONFIG = {
  published: { label: "Published", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  draft: { label: "Draft", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  archived: { label: "Archived", color: "bg-white/5 text-white/30 border-white/10" },
};

// Unique mini-preview thumbnails for each page type
function PageThumbnail({ type }: { type: PageItem["type"] }) {
  if (type === "saas") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-2" style={{ background: "linear-gradient(135deg, #0f0a1e 0%, #0a0a1a 100%)" }}>
        {/* Nav */}
        <div className="flex items-center justify-between mb-1">
          <div className="h-2 w-10 rounded bg-violet-500/40" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-6 rounded bg-white/10" />
            <div className="h-1.5 w-6 rounded bg-white/10" />
            <div className="h-1.5 w-8 rounded bg-violet-500/50" />
          </div>
        </div>
        {/* Badge */}
        <div className="w-16 h-3 rounded-full bg-violet-500/20 border border-violet-500/30" />
        {/* Headline */}
        <div className="h-4 w-3/4 rounded bg-white/20" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        {/* Sub */}
        <div className="h-2 w-full rounded bg-white/7" />
        <div className="h-2 w-4/5 rounded bg-white/5" />
        {/* CTA buttons */}
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-16 rounded-lg bg-gradient-to-r from-violet-500/70 to-blue-500/70" />
          <div className="h-5 w-14 rounded-lg bg-white/5 border border-white/10" />
        </div>
        {/* Feature cards */}
        <div className="flex gap-1.5 mt-1">
          {[0,1,2].map(i => (
            <div key={i} className="flex-1 h-8 rounded-lg bg-white/5 border border-white/5 p-1">
              <div className="h-1.5 w-3 rounded bg-violet-400/30 mb-1" />
              <div className="h-1 w-full rounded bg-white/10" />
              <div className="h-1 w-3/4 rounded bg-white/7 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "launch") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #050a15 100%)" }}>
        {/* Countdown */}
        <div className="flex gap-2 mb-1">
          {["12", "34", "56", "07"].map((n, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-6 w-7 rounded bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="text-[7px] font-bold text-white/80">{n}</span>
              </div>
              <div className="h-1 w-5 rounded bg-white/10 mt-0.5" />
            </div>
          ))}
        </div>
        {/* Headline */}
        <div className="h-3 w-2/3 rounded bg-white/20" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
        {/* Product mockup */}
        <div className="w-full h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 mt-1 flex items-center justify-center">
          <div className="h-2 w-16 rounded bg-blue-400/30" />
        </div>
        {/* CTA */}
        <div className="h-5 w-24 rounded-lg bg-gradient-to-r from-blue-500/70 to-cyan-500/70 mt-1" />
        <div className="h-1.5 w-16 rounded bg-white/10" />
      </div>
    );
  }

  if (type === "portfolio") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-2" style={{ background: "linear-gradient(135deg, #0d0a00 0%, #100c00 100%)" }}>
        {/* Nav */}
        <div className="flex items-center justify-between mb-1">
          <div className="h-2 w-12 rounded bg-amber-500/40" />
          <div className="flex gap-1">
            <div className="h-1.5 w-5 rounded bg-white/10" />
            <div className="h-1.5 w-5 rounded bg-white/10" />
            <div className="h-1.5 w-5 rounded bg-white/10" />
          </div>
        </div>
        {/* Hero text */}
        <div className="h-4 w-3/4 rounded bg-white/20" />
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-5/6 rounded bg-white/7" />
        {/* Work grid */}
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          <div className="h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20" />
          <div className="h-10 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500/20" />
        </div>
        {/* Stats */}
        <div className="flex gap-2 mt-1">
          {["40+", "98%", "5★"].map((v, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="h-2.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-3/4 mx-auto rounded bg-white/5 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "funnel") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col items-center gap-2" style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0a150a 100%)" }}>
        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-white/10">
          <div className="h-1 w-2/3 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
        </div>
        {/* Step indicator */}
        <div className="flex gap-2">
          {[1,2,3].map(n => (
            <div key={n} className={`h-4 w-4 rounded-full border text-[6px] flex items-center justify-center font-bold ${n < 3 ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-white/5 border-white/20 text-white/40"}`}>{n}</div>
          ))}
        </div>
        {/* Form card */}
        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col gap-1.5">
          <div className="h-2 w-1/2 rounded bg-white/20" />
          <div className="h-1.5 w-full rounded bg-white/7" />
          <div className="h-4 w-full rounded-lg bg-white/10 border border-white/10" />
          <div className="h-4 w-full rounded-lg bg-white/10 border border-white/10" />
          <div className="h-5 w-full rounded-lg bg-gradient-to-r from-green-500/70 to-emerald-500/70" />
        </div>
        {/* Trust badges */}
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <div key={i} className="flex-1 h-3 rounded bg-white/5 border border-white/5" />)}
        </div>
      </div>
    );
  }

  if (type === "pricing") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-2" style={{ background: "linear-gradient(135deg, #080810 0%, #0a0818 100%)" }}>
        {/* Toggle */}
        <div className="flex justify-center mb-0.5">
          <div className="flex gap-0 rounded-full bg-white/5 border border-white/10 p-0.5">
            <div className="px-2 py-0.5 rounded-full bg-violet-500/30 text-[6px] text-violet-300">Monthly</div>
            <div className="px-2 py-0.5 text-[6px] text-white/30">Annual</div>
          </div>
        </div>
        {/* Pricing cards */}
        <div className="flex gap-1.5 flex-1">
          {[
            { price: "$0", name: "Free", c: "border-white/5 bg-white/[0.02]" },
            { price: "$39", name: "Pro", c: "border-violet-500/40 bg-violet-500/10" },
            { price: "$99", name: "Agency", c: "border-white/5 bg-white/[0.02]" },
          ].map(plan => (
            <div key={plan.name} className={`flex-1 rounded-xl border ${plan.c} p-1.5 flex flex-col gap-1`}>
              <div className="h-1.5 w-8 rounded bg-white/20" />
              <div className="h-3 w-10 rounded bg-white/30 font-bold" />
              {[0,1,2].map(i => (
                <div key={i} className="flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-green-400/60" />
                  <div className="h-1 flex-1 rounded bg-white/10" />
                </div>
              ))}
              <div className={`h-3 w-full rounded-lg mt-auto ${plan.name === "Pro" ? "bg-gradient-to-r from-violet-500/70 to-blue-500/70" : "bg-white/10"}`} />
            </div>
          ))}
        </div>
        {/* FAQ hint */}
        <div className="h-1.5 w-full rounded bg-white/5" />
        <div className="h-1.5 w-4/5 rounded bg-white/5" />
      </div>
    );
  }

  // coming-soon
  return (
    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center gap-2.5" style={{ background: "linear-gradient(135deg, #080810 0%, #0f0820 100%)" }}>
      {/* Logo/brand */}
      <div className="h-6 w-6 rounded-xl bg-gradient-to-br from-violet-500/60 to-blue-500/60 mb-1" />
      {/* Text */}
      <div className="h-4 w-2/3 rounded bg-white/20" />
      <div className="h-2 w-1/2 rounded bg-white/10" />
      {/* Countdown */}
      <div className="flex gap-1.5 mt-1">
        {["24", "13", "58", "30"].map((n, i) => (
          <div key={i} className="h-6 w-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-[6px] font-bold text-violet-300">{n}</span>
          </div>
        ))}
      </div>
      {/* Email input */}
      <div className="flex gap-1 w-full mt-1">
        <div className="flex-1 h-5 rounded-lg bg-white/5 border border-white/10" />
        <div className="h-5 w-10 rounded-lg bg-violet-500/40" />
      </div>
      <div className="h-1.5 w-1/3 rounded bg-white/5" />
    </div>
  );
}

export default function PagesListPage() {
  const [pages, setPages] = useState<PageItem[]>(DEMO_PAGES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = pages.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const deletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    toast.success("Page deleted");
  };

  const duplicatePage = (id: string) => {
    const page = pages.find((p) => p.id === id);
    if (!page) return;
    setPages((prev) => [...prev, {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "draft",
      viewCount: 0,
      convRate: 0,
      updatedAt: "Just now",
    }]);
    toast.success("Page duplicated");
  };

  const publishedCount = pages.filter((p) => p.status === "published").length;
  const draftCount = pages.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-sm text-muted-foreground">
            {publishedCount} published · {draftCount} draft · {pages.length} total
          </p>
        </div>
        <Link href="/pages/new">
          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90">
            <Plus className="h-4 w-4 mr-1.5" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 w-56 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
          />
        </div>

        <div className="flex gap-1">
          {["all", "published", "draft", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors capitalize ${
                statusFilter === s
                  ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              viewMode === "grid" ? "border-violet-500/50 bg-violet-500/15 text-violet-300" : "border-white/10 bg-white/5 text-white/30 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              viewMode === "list" ? "border-violet-500/50 bg-violet-500/15 text-violet-300" : "border-white/10 bg-white/5 text-white/30 hover:text-white"
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-20 text-center">
          <FileText className="h-10 w-10 text-white/10 mb-3" />
          <p className="text-sm font-medium text-white/40">No pages found</p>
          <p className="text-xs text-white/20 mt-1">Try adjusting your search or create a new page</p>
          <Link href="/pages/new" className="mt-4">
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90">
              Create Page
            </Button>
          </Link>
        </div>
      )}

      {/* Grid view */}
      {filtered.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((page) => {
            const statusConfig = STATUS_CONFIG[page.status];
            return (
              <div key={page.id} className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/20 transition-all">
                {/* Thumbnail — unique per page type */}
                <div className="relative aspect-video border-b border-white/5 overflow-hidden">
                  <PageThumbnail type={page.type} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Link href={`/editor/${page.id}`}>
                      <button className="flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors">
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                    </Link>
                    {page.status === "published" && (
                      <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                        <button className="flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors">
                          <ExternalLink className="h-3 w-3" />
                          Preview
                        </button>
                      </a>
                    )}
                  </div>
                  {/* Status pill */}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-medium rounded-full border px-2 py-0.5 ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{page.title}</p>
                      <p className="text-xs text-white/30 mt-0.5">/{page.slug}</p>
                    </div>
                    <PageMenu page={page} onDelete={deletePage} onDuplicate={duplicatePage} />
                  </div>

                  {page.status === "published" ? (
                    <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <Eye className="h-3.5 w-3.5" />
                        {page.viewCount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {page.convRate}%
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 text-xs text-white/30">
                        <Clock className="h-3 w-3" />
                        {page.updatedAt}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-white/30 pt-3 border-t border-white/5">
                      <Clock className="h-3 w-3" />
                      {page.updatedAt}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {filtered.length > 0 && viewMode === "list" && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-white/5 px-4 py-2.5 text-[10px] uppercase tracking-widest text-white/20 font-medium">
            <span>Page</span>
            <span className="hidden sm:block">Views</span>
            <span className="hidden sm:block">Conv. Rate</span>
            <span>Status</span>
            <span></span>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((page) => {
              const statusConfig = STATUS_CONFIG[page.status];
              return (
                <div key={page.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-4 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-14 shrink-0 rounded-lg overflow-hidden relative border border-white/5">
                      <PageThumbnail type={page.type} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{page.title}</p>
                      <p className="text-xs text-white/30">/{page.slug} · {page.updatedAt}</p>
                    </div>
                  </div>
                  <span className="hidden sm:block text-sm font-mono text-white/60">
                    {page.viewCount.toLocaleString()}
                  </span>
                  <span className="hidden sm:block text-sm font-mono text-white/60">
                    {page.convRate > 0 ? `${page.convRate}%` : "—"}
                  </span>
                  <span className={`text-[10px] font-medium rounded-full border px-2 py-0.5 ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                  <PageMenu page={page} onDelete={deletePage} onDuplicate={duplicatePage} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function PageMenu({
  page,
  onDelete,
  onDuplicate,
}: {
  page: PageItem;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#0d0d18] border-white/10">
          <DropdownMenuItem asChild className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
            <Link href={`/editor/${page.id}`} className="flex items-center gap-2">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDuplicate(page.id)}
            className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" /> Duplicate
          </DropdownMenuItem>
          {page.status === "published" && (
            <DropdownMenuItem asChild className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
              <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-3.5 w-3.5" /> View Live
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-white/5" />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="bg-[#0d0d18] border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &ldquo;{page.title}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            This will permanently delete the page and all its analytics data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => onDelete(page.id)}
          >
            Delete Page
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
