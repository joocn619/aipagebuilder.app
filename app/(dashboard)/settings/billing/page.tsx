"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS, type PlanKey } from "@/lib/constants/plans";
import { toast } from "sonner";
import { CreditCard, Zap, Check, FileText, ExternalLink, TrendingUp } from "lucide-react";

const INVOICES = [
  { id: "inv_001", date: "Apr 1, 2026", amount: "$39.00", status: "paid", plan: "Pro" },
  { id: "inv_002", date: "Mar 1, 2026", amount: "$39.00", status: "paid", plan: "Pro" },
  { id: "inv_003", date: "Feb 1, 2026", amount: "$39.00", status: "paid", plan: "Pro" },
];

const PLAN_HIGHLIGHTS: Record<string, string[]> = {
  free: ["1 page", "5 AI credits/mo", "Basic analytics", "PageForge subdomain"],
  starter: ["15 pages", "100 AI credits/mo", "Heatmaps", "Lead capture", "Standard analytics"],
  pro: ["50 pages", "500 AI credits/mo", "Heatmaps + Recordings", "A/B Testing", "Team (5 seats)", "White label"],
  unlimited: ["Unlimited pages", "Unlimited AI credits", "All Pro features", "API access", "Unlimited team"],
};

export default function BillingSettingsPage() {
  const [currentPlan] = useState<PlanKey>("pro");
  const [loading] = useState<string | null>(null);

  const handleCheckout = (_planName: string) => {
    toast.info("Billing coming soon!");
  };

  const handlePortal = () => {
    toast.info("Billing portal coming soon!");
  };

  const plan = PLANS[currentPlan];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, usage, and invoices</p>
      </div>

      {/* Current Plan Summary */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Current Plan</span>
            </div>
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-white/50 text-sm mt-0.5">
              ${plan.price}/month · Renews May 1, 2026
            </p>
          </div>
          <div className="text-right">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePortal}
              disabled={loading === "portal"}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              {loading === "portal" ? "Loading..." : "Manage Subscription"}
            </Button>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Pages", used: 8, limit: plan.limits.pages === -1 ? null : plan.limits.pages, icon: "📄" },
            { label: "AI Credits", used: 3200, limit: plan.limits.aiCredits === -1 ? null : plan.limits.aiCredits, icon: "✨" },
            { label: "Team Seats", used: 3, limit: 5, icon: "👥" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50 flex items-center gap-1.5">
                  <span>{item.icon}</span> {item.label}
                </span>
                <span className="text-xs text-white/70 font-mono">
                  {item.used.toLocaleString()} / {item.limit === null ? "∞" : item.limit.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.limit && (item.used / item.limit) > 0.8
                      ? "bg-amber-500"
                      : "bg-gradient-to-r from-violet-500 to-blue-500"
                  }`}
                  style={{ width: item.limit ? `${Math.min((item.used / item.limit) * 100, 100)}%` : "10%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">All Plans</h2>
          <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
            <TrendingUp className="h-3 w-3" />
            Annual saves 20%
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, p]) => {
            const isCurrent = currentPlan === key;
            const highlights = PLAN_HIGHLIGHTS[key] || [];
            return (
              <Card
                key={key}
                className={`relative border transition-all ${
                  isCurrent
                    ? "border-violet-500/40 bg-violet-500/[0.07]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 text-white border-0 text-[10px] px-2">Current Plan</Badge>
                  </div>
                )}
                <CardHeader className="pb-3 pt-5">
                  <div className="flex items-baseline justify-between">
                    <CardTitle className="text-sm font-semibold">{p.name}</CardTitle>
                    {key === "pro" && <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Popular</Badge>}
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">${p.price}</span>
                    <span className="text-white/30 text-sm">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {highlights.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-white/60">
                        <Check className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && key !== "free" && (
                    <Button
                      className={`w-full text-xs ${
                        key === "unlimited"
                          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                          : "bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90"
                      }`}
                      variant={key === "unlimited" ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleCheckout(key)}
                      disabled={loading === key}
                    >
                      {loading === key ? "Loading..." : `Upgrade to ${p.name}`}
                    </Button>
                  )}
                  {isCurrent && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-violet-400 py-1">
                      <Check className="h-3.5 w-3.5" />
                      Active
                    </div>
                  )}
                  {!isCurrent && key === "free" && (
                    <div className="text-xs text-white/20 text-center py-1">Downgrade</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-violet-400" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-12 items-center justify-center rounded bg-gradient-to-r from-slate-700 to-slate-600 text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-white/30">Expires 12/27</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePortal}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs"
            >
              Update Card
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-400" />
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {INVOICES.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/5">
                    <FileText className="h-3.5 w-3.5 text-white/30" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{inv.plan} Plan</p>
                    <p className="text-xs text-white/30">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{inv.amount}</span>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px]">Paid</Badge>
                  <button className="flex items-center gap-1 text-xs text-white/30 hover:text-white transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
