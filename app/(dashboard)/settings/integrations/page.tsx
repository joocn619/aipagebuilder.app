"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  connected: boolean;
  isPro: boolean;
}

const INTEGRATIONS: Integration[] = [
  { id: "zapier", name: "Zapier", description: "Connect to 5,000+ apps. Automate lead routing, CRM sync, and more.", icon: "⚡", category: "Automation", connected: false, isPro: false },
  { id: "slack", name: "Slack", description: "Get notified in Slack when new leads or form submissions come in.", icon: "💬", category: "Notifications", connected: true, isPro: false },
  { id: "discord", name: "Discord", description: "Send conversion alerts and lead notifications to your Discord server.", icon: "🎮", category: "Notifications", connected: false, isPro: false },
  { id: "mailchimp", name: "Mailchimp", description: "Sync leads automatically to your Mailchimp audience lists.", icon: "🐒", category: "Email Marketing", connected: false, isPro: false },
  { id: "hubspot", name: "HubSpot", description: "Push leads and contacts directly into your HubSpot CRM pipeline.", icon: "🔶", category: "CRM", connected: false, isPro: true },
  { id: "salesforce", name: "Salesforce", description: "Sync leads and form submissions to Salesforce automatically.", icon: "☁️", category: "CRM", connected: false, isPro: true },
  { id: "googleanalytics", name: "Google Analytics", description: "Track page views, events, and conversions in GA4.", icon: "📊", category: "Analytics", connected: false, isPro: false },
  { id: "googletag", name: "Google Tag Manager", description: "Add GTM container ID for custom tracking and pixels.", icon: "🏷️", category: "Analytics", connected: false, isPro: false },
  { id: "facebookpixel", name: "Facebook Pixel", description: "Track conversions and build custom audiences for Facebook ads.", icon: "📘", category: "Advertising", connected: false, isPro: false },
  { id: "stripe", name: "Stripe", description: "Accept payments directly on your pages with Stripe checkout.", icon: "💳", category: "Payments", connected: true, isPro: false },
  { id: "convertkit", name: "ConvertKit", description: "Add subscribers to ConvertKit sequences from form submissions.", icon: "✉️", category: "Email Marketing", connected: false, isPro: true },
  { id: "webhook", name: "Webhook", description: "Send form submissions and events to any custom endpoint via POST.", icon: "🔗", category: "Developer", connected: false, isPro: false },
];

const CATEGORIES = ["All", "Automation", "Notifications", "Email Marketing", "CRM", "Analytics", "Advertising", "Payments", "Developer"];

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "bg-yellow-500/10 text-yellow-500",
  Notifications: "bg-blue-500/10 text-blue-400",
  "Email Marketing": "bg-pink-500/10 text-pink-400",
  CRM: "bg-orange-500/10 text-orange-400",
  Analytics: "bg-green-500/10 text-green-400",
  Advertising: "bg-violet-500/10 text-violet-400",
  Payments: "bg-emerald-500/10 text-emerald-400",
  Developer: "bg-gray-500/10 text-gray-400",
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [category, setCategory] = useState("All");

  const filtered = category === "All"
    ? integrations
    : integrations.filter((i) => i.category === category);

  const connectedCount = integrations.filter((i) => i.connected).length;

  const toggle = (id: string, isPro: boolean) => {
    if (isPro) {
      toast.error("Upgrade to Pro to use this integration");
      return;
    }
    setIntegrations((prev) => prev.map((i) =>
      i.id === id ? { ...i, connected: !i.connected } : i
    ));
    const integration = integrations.find((i) => i.id === id);
    toast.success(integration?.connected ? `${integration.name} disconnected` : `${integration?.name} connected!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-sm text-muted-foreground">{connectedCount} connected · {integrations.length} available</p>
        </div>
      </div>

      {/* Connected */}
      {connectedCount > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Connected</p>
          <div className="flex flex-wrap gap-2">
            {integrations.filter((i) => i.connected).map((i) => (
              <div key={i.id} className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1.5">
                <span className="text-base">{i.icon}</span>
                <span className="text-sm font-medium">{i.name}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              category === cat
                ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                : "border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((integration) => (
          <Card key={integration.id} className={`border-white/10 bg-white/[0.03] transition-all hover:border-white/20 ${integration.connected ? "border-green-500/20 bg-green-500/5" : ""}`}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{integration.name}</p>
                      {integration.isPro && <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1.5">PRO</Badge>}
                    </div>
                    <Badge variant="outline" className={`text-[10px] border-0 px-0 ${CATEGORY_COLORS[integration.category] || ""}`}>
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {integration.connected && <div className="h-2 w-2 rounded-full bg-green-500 mt-1 shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{integration.description}</p>
              <Button
                size="sm"
                variant={integration.connected ? "outline" : "default"}
                className={`w-full text-xs ${integration.connected
                  ? "border-white/10 bg-white/5 text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                  : "bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:opacity-90"
                }`}
                onClick={() => toggle(integration.id, integration.isPro)}
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
