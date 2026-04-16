"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Search, Download, MoreHorizontal, Mail, FileJson,
  Flame, Thermometer, Snowflake, Users, TrendingUp, MessageSquare,
} from "lucide-react";

interface Lead {
  id: string;
  pageTitle: string;
  data: Record<string, string>;
  tags: string[];
  notes: string;
  sourceUrl: string;
  createdAt: string;
}

const DEMO_LEADS: Lead[] = [
  { id: "1", pageTitle: "SaaS Landing", data: { name: "John Doe", email: "john@example.com", message: "Interested in Pro plan" }, tags: ["hot"], notes: "", sourceUrl: "/p/saas-landing", createdAt: "2026-04-09T10:30:00Z" },
  { id: "2", pageTitle: "SaaS Landing", data: { name: "Jane Smith", email: "jane@company.com" }, tags: ["warm"], notes: "Follow up next week", sourceUrl: "/p/saas-landing", createdAt: "2026-04-08T14:20:00Z" },
  { id: "3", pageTitle: "Agency Portfolio", data: { name: "Mike Johnson", email: "mike@agency.io", message: "Need a quote for 5 pages" }, tags: ["hot"], notes: "", sourceUrl: "/p/agency-portfolio", createdAt: "2026-04-07T09:15:00Z" },
  { id: "4", pageTitle: "Product Launch", data: { name: "Sarah Kim", email: "sarah@startup.com" }, tags: ["cold"], notes: "", sourceUrl: "/p/product-launch", createdAt: "2026-04-06T16:45:00Z" },
  { id: "5", pageTitle: "Pricing Page", data: { name: "David Lee", email: "david@techco.com", message: "When does the agency plan launch?" }, tags: ["warm"], notes: "", sourceUrl: "/p/pricing", createdAt: "2026-04-05T11:00:00Z" },
];

const TAG_CONFIG = {
  hot: { label: "Hot", icon: Flame, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  warm: { label: "Warm", icon: Thermometer, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  cold: { label: "Cold", icon: Snowflake, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
};

const AVATAR_COLORS = [
  "from-violet-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-blue-500 to-cyan-500",
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = leads.filter((l) => {
    if (search) {
      const s = search.toLowerCase();
      if (!Object.values(l.data).some((v) => v.toLowerCase().includes(s)) &&
          !l.pageTitle.toLowerCase().includes(s)) return false;
    }
    if (tagFilter !== "all" && !l.tags.includes(tagFilter)) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === filtered.length ? new Set() : new Set(filtered.map((l) => l.id)));
  };

  const exportCSV = () => {
    const rows = filtered.map((l) => ({
      name: l.data.name || "",
      email: l.data.email || "",
      message: l.data.message || "",
      page: l.pageTitle,
      tags: l.tags.join(", "),
      date: new Date(l.createdAt).toLocaleDateString(),
    }));
    const headers = Object.keys(rows[0] || {});
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => `"${(r as Record<string, string>)[h] || ""}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as CSV");
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as JSON");
  };

  const bulkDelete = () => {
    const count = selectedIds.size;
    setLeads((prev) => prev.filter((l) => !selectedIds.has(l.id)));
    setSelectedIds(new Set());
    toast.success(`${count} leads deleted`);
  };

  const tagLead = (id: string, tag: string) => {
    setLeads((prev) => prev.map((l) =>
      l.id === id ? { ...l, tags: l.tags.includes(tag) ? l.tags.filter((t) => t !== tag) : [tag] } : l
    ));
    toast.success("Tag updated");
  };

  const hotCount = leads.filter((l) => l.tags.includes("hot")).length;
  const warmCount = leads.filter((l) => l.tags.includes("warm")).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-muted-foreground">{leads.length} total submissions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportCSV}
            className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            CSV
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={exportJSON}
            className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
          >
            <FileJson className="h-3.5 w-3.5 mr-1.5" />
            JSON
          </Button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Leads", value: leads.length, icon: Users, color: "text-violet-400" },
          { label: "Hot Leads", value: hotCount, icon: Flame, color: "text-red-400" },
          { label: "Warm Leads", value: warmCount, icon: TrendingUp, color: "text-amber-400" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-white/30">{stat.label}</p>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 w-56 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
          />
        </div>

        <div className="flex gap-1">
          {["all", "hot", "warm", "cold"].map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors capitalize ${
                tagFilter === tag
                  ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {tag === "all" ? "All" : tag}
            </button>
          ))}
        </div>

        {selectedIds.size > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={bulkDelete}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs ml-auto"
          >
            Delete {selectedIds.size} selected
          </Button>
        )}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-20 text-center">
          <Users className="h-10 w-10 text-white/10 mb-3" />
          <p className="text-sm font-medium text-white/40">No leads yet</p>
          <p className="text-xs text-white/20 mt-1">Leads appear when visitors submit forms on your pages</p>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-white/5 px-5 py-3">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={toggleSelectAll}
              className="rounded border-white/20 bg-white/5 accent-violet-500"
            />
            <span className="flex-1 text-[10px] uppercase tracking-widest text-white/20 font-medium">Contact</span>
            <span className="hidden md:block w-28 text-[10px] uppercase tracking-widest text-white/20 font-medium">Page</span>
            <span className="w-20 text-[10px] uppercase tracking-widest text-white/20 font-medium">Tag</span>
            <span className="hidden sm:block w-20 text-[10px] uppercase tracking-widest text-white/20 font-medium text-right">Date</span>
            <span className="w-8" />
          </div>

          <div className="divide-y divide-white/5">
            {filtered.map((lead, idx) => {
              const tagKey = (lead.tags[0] || "cold") as keyof typeof TAG_CONFIG;
              const tagConfig = TAG_CONFIG[tagKey] || TAG_CONFIG.cold;
              const TagIcon = tagConfig.icon;
              const initials = (lead.data.name || lead.data.email || "?").slice(0, 2).toUpperCase();
              const gradient = AVATAR_COLORS[idx % AVATAR_COLORS.length];

              return (
                <div key={lead.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(lead.id)}
                    onChange={() => toggleSelect(lead.id)}
                    className="rounded border-white/20 bg-white/5 accent-violet-500"
                  />

                  {/* Avatar + info */}
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-xs font-bold`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{lead.data.name || lead.data.email}</p>
                      <div className="flex items-center gap-1.5 text-xs text-white/30">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{lead.data.email}</span>
                      </div>
                      {lead.data.message && (
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white/20">
                          <MessageSquare className="h-3 w-3 shrink-0" />
                          <span className="truncate">{lead.data.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Page */}
                  <div className="hidden md:block w-28">
                    <span className="text-xs text-white/50 truncate">{lead.pageTitle}</span>
                  </div>

                  {/* Tag */}
                  <div className="w-20">
                    <div className={`flex items-center gap-1.5 w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium ${tagConfig.color}`}>
                      <TagIcon className="h-3 w-3" />
                      {tagConfig.label}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="hidden sm:block w-20 text-right">
                    <span className="text-xs text-white/30">{timeAgo(lead.createdAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="w-8 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0d0d18] border-white/10">
                        <DropdownMenuItem onClick={() => tagLead(lead.id, "hot")} className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                          <Flame className="h-3.5 w-3.5 text-red-400" /> Tag as Hot
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => tagLead(lead.id, "warm")} className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                          <Thermometer className="h-3.5 w-3.5 text-amber-400" /> Tag as Warm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => tagLead(lead.id, "cold")} className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                          <Snowflake className="h-3.5 w-3.5 text-blue-400" /> Tag as Cold
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem
                          onClick={() => { setLeads((prev) => prev.filter((l) => l.id !== lead.id)); toast.success("Lead deleted"); }}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                        >
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
