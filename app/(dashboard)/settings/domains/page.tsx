"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Globe, Plus, Copy, Check, RefreshCw, Trash2,
  AlertCircle, CheckCircle2, Clock, ExternalLink, Shield,
} from "lucide-react";

type DomainStatus = "active" | "pending" | "error";

interface CustomDomain {
  id: string;
  domain: string;
  status: DomainStatus;
  ssl: boolean;
  addedAt: string;
  pages: number;
}

const DEMO_DOMAINS: CustomDomain[] = [
  { id: "1", domain: "pages.acmecorp.com", status: "active", ssl: true, addedAt: "Mar 2026", pages: 5 },
  { id: "2", domain: "landing.myapp.io", status: "pending", ssl: false, addedAt: "Apr 2026", pages: 0 },
];

const STATUS_CONFIG: Record<DomainStatus, { label: string; icon: React.ElementType; color: string }> = {
  active: { label: "Active", icon: CheckCircle2, color: "text-green-400 bg-green-500/10 border-green-500/20" },
  pending: { label: "Verifying", icon: Clock, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  error: { label: "DNS Error", icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
};

const CNAME_TARGET = "cname.aipagebuilder.app";
const TXT_RECORD = "pageforge-verify=abc123xyz";

export default function DomainsSettingsPage() {
  const [domains, setDomains] = useState<CustomDomain[]>(DEMO_DOMAINS);
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
    toast.success("Copied to clipboard");
  };

  const handleAddDomain = async () => {
    const clean = newDomain.trim().toLowerCase().replace(/^https?:\/\//, "");
    if (!clean.includes(".") || clean.length < 4) {
      toast.error("Enter a valid domain name");
      return;
    }
    if (domains.find((d) => d.domain === clean)) {
      toast.error("This domain is already added");
      return;
    }
    setAdding(true);
    await new Promise((r) => setTimeout(r, 800));
    setDomains((prev) => [...prev, {
      id: Date.now().toString(),
      domain: clean,
      status: "pending",
      ssl: false,
      addedAt: "Now",
      pages: 0,
    }]);
    setNewDomain("");
    setAdding(false);
    toast.success("Domain added — configure your DNS records below");
  };

  const handleVerify = async (id: string) => {
    setVerifying(id);
    await new Promise((r) => setTimeout(r, 1500));
    setVerifying(null);
    toast.info("DNS verification takes up to 24 hours. We'll email you when it's ready.");
  };

  const handleRemove = (id: string) => {
    setDomains((prev) => prev.filter((d) => d.id !== id));
    toast.success("Domain removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Custom Domains</h1>
          <p className="text-sm text-muted-foreground">
            Connect your own domain to publish pages at your brand URL
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 text-green-400" />
          <span className="text-xs text-white/50">SSL auto-provisioned</span>
        </div>
      </div>

      {/* Add domain */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4 text-violet-400" />
            Add Custom Domain
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <Input
                placeholder="pages.yourdomain.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddDomain()}
                className="pl-9 bg-white/5 border-white/10 text-sm placeholder:text-white/20 focus:border-violet-500/50"
              />
            </div>
            <Button
              onClick={handleAddDomain}
              disabled={adding || !newDomain}
              className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90"
            >
              {adding ? "Adding..." : "Add Domain"}
            </Button>
          </div>
          <p className="text-xs text-white/30">
            You can use a subdomain (e.g. <span className="text-white/50">pages.company.com</span>) or a root domain.
            We recommend subdomains for easier DNS setup.
          </p>
        </CardContent>
      </Card>

      {/* DNS Setup Instructions */}
      <Card className="border-violet-500/20 bg-violet-500/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">DNS Configuration</CardTitle>
          <p className="text-xs text-white/40 mt-1">Add these records in your domain registrar (e.g. Cloudflare, Namecheap, GoDaddy)</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* CNAME Record */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-4 gap-3 bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-widest text-white/30 font-medium">
              <span>Type</span>
              <span>Name</span>
              <span className="col-span-2">Value</span>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center px-4 py-3">
              <Badge className="w-fit bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">CNAME</Badge>
              <span className="text-sm text-white/70 font-mono">@</span>
              <span className="col-span-1 text-sm text-white/70 font-mono truncate">{CNAME_TARGET}</span>
              <button
                onClick={() => copyText(CNAME_TARGET, "cname")}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors justify-end"
              >
                {copied === "cname" ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "cname" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* TXT Record */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-4 gap-3 bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-widest text-white/30 font-medium">
              <span>Type</span>
              <span>Name</span>
              <span className="col-span-2">Value</span>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center px-4 py-3">
              <Badge className="w-fit bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">TXT</Badge>
              <span className="text-sm text-white/70 font-mono">@</span>
              <span className="col-span-1 text-sm text-white/70 font-mono truncate">{TXT_RECORD}</span>
              <button
                onClick={() => copyText(TXT_RECORD, "txt")}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors justify-end"
              >
                {copied === "txt" ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "txt" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <p className="text-xs text-white/30 flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            DNS changes can take up to 24–48 hours to propagate globally
          </p>
        </CardContent>
      </Card>

      {/* Domain List */}
      {domains.length > 0 && (
        <Card className="border-white/10 bg-white/[0.03]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Domains</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {domains.map((domain) => {
                const statusConfig = STATUS_CONFIG[domain.status];
                const StatusIcon = statusConfig.icon;
                return (
                  <div key={domain.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    {/* Domain icon */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Globe className="h-4 w-4 text-white/40" />
                    </div>

                    {/* Domain info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">{domain.domain}</p>
                        {domain.ssl && (
                          <Shield className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-white/30">
                        Added {domain.addedAt} · {domain.pages} page{domain.pages !== 1 ? "s" : ""} using this domain
                      </p>
                    </div>

                    {/* Status */}
                    <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shrink-0 ${statusConfig.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {domain.status === "active" && (
                        <a
                          href={`https://${domain.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {domain.status === "pending" && (
                        <button
                          onClick={() => handleVerify(domain.id)}
                          disabled={verifying === domain.id}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
                          title="Re-check DNS"
                        >
                          <RefreshCw className={`h-4 w-4 ${verifying === domain.id ? "animate-spin" : ""}`} />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(domain.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove domain"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {domains.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-16 text-center">
          <Globe className="h-10 w-10 text-white/10 mb-3" />
          <p className="text-sm font-medium text-white/40">No custom domains yet</p>
          <p className="text-xs text-white/20 mt-1">Add a domain above to publish at your brand URL</p>
        </div>
      )}

      {/* How it works */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/20 mb-4">How it works</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { step: "1", title: "Add your domain", desc: "Enter the domain or subdomain you want to use for your pages" },
            { step: "2", title: "Configure DNS", desc: "Add the CNAME and TXT records in your domain registrar's dashboard" },
            { step: "3", title: "Go live", desc: "Once DNS propagates, SSL is auto-provisioned and your pages go live" },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-white/30 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
