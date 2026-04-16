"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageViewsChart, BounceRateChart, type DailyMetric } from "@/components/analytics/AnalyticsCharts";
import { RealtimeVisitors } from "@/components/analytics/RealtimeVisitors";
import { Eye, Users, TrendingDown, Zap, Download, Video, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface AnalyticsTotals {
  views: number;
  form_submits: number;
  device: { desktop: number; tablet: number; mobile: number };
}

const DEMO_DAILY: DailyMetric[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.now() - (13 - i) * 86400000);
  const base = 80 + Math.round(Math.sin(i * 0.7) * 30 + Math.random() * 40);
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    views: base,
    visitors: Math.round(base * 0.72),
    conversions: Math.round(base * 0.08),
  };
});

const DEMO_TOP_PAGES = [
  { id: "p1", title: "Homepage", slug: "home", views: 1842, conversions: 134, rate: 7.3, trend: "up" },
  { id: "p2", title: "Pricing", slug: "pricing", views: 967, conversions: 89, rate: 9.2, trend: "up" },
  { id: "p3", title: "Free Trial Landing", slug: "trial", views: 543, conversions: 76, rate: 14.0, trend: "up" },
  { id: "p4", title: "About Us", slug: "about", views: 312, conversions: 18, rate: 5.8, trend: "down" },
];

const DEVICE_ICONS: Record<string, string> = {
  desktop: "🖥️",
  tablet: "📱",
  mobile: "📲",
};

export default function AnalyticsPage() {
  const [range, setRange] = useState("14d");
  const [daily, setDaily] = useState<DailyMetric[]>(DEMO_DAILY);
  const [totals, setTotals] = useState<AnalyticsTotals>({
    views: 3664,
    form_submits: 317,
    device: { desktop: 2012, tablet: 634, mobile: 1018 },
  });

  useEffect(() => {
    fetch(`/api/analytics?range=${range}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.daily?.length) setDaily(data.daily);
        if (data.totals) setTotals(data.totals);
      })
      .catch(() => {/* use demo data */});
  }, [range]);

  const totalViews = daily.reduce((s, d) => s + d.views, 0);
  const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
  const avgBounce = totalVisitors > 0
    ? Math.round(((totalVisitors - totals.form_submits) / totalVisitors) * 100)
    : 0;
  const convRate = totalViews > 0
    ? ((totals.form_submits / totalViews) * 100).toFixed(1)
    : "0.0";

  const deviceTotal = totals.device.desktop + totals.device.tablet + totals.device.mobile || 1;

  const exportCSV = () => {
    const rows = [
      ["Date", "Views", "Visitors", "Conversions"],
      ...daily.map((d) => [d.date, d.views, d.visitors, d.conversions ?? 0]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `analytics-${range}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const STATS = [
    { label: "Page Views", value: totalViews.toLocaleString(), change: "+18%", up: true, icon: Eye, color: "text-blue-400" },
    { label: "Unique Visitors", value: totalVisitors.toLocaleString(), change: "+12%", up: true, icon: Users, color: "text-violet-400" },
    { label: "Bounce Rate", value: `${avgBounce}%`, change: "-3%", up: false, icon: TrendingDown, color: "text-amber-400" },
    { label: "Conv. Rate", value: `${convRate}%`, change: "+0.4%", up: true, icon: Zap, color: "text-green-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Site-wide performance overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0d0d18] border-white/10">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={exportCSV}
            className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
          <Link href="/analytics/sessions">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 text-xs"
            >
              <Video className="h-3.5 w-3.5 mr-1.5" />
              Sessions
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-white/30 uppercase tracking-wide">{stat.label}</p>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <div className={`mt-1 flex items-center gap-1 text-xs ${stat.up ? "text-green-400" : "text-amber-400"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change} vs prev. period
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-white/10 bg-white/[0.03]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Page Views & Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <PageViewsChart data={daily} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardContent className="pt-5">
              <RealtimeVisitors />
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/[0.03]">
            <CardContent className="pt-5 space-y-3">
              <p className="text-sm font-semibold">Device Breakdown</p>
              {(["desktop", "tablet", "mobile"] as const).map((d) => {
                const pct = Math.round((totals.device[d] / deviceTotal) * 100);
                return (
                  <div key={d} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="capitalize text-white/50 flex items-center gap-1.5">
                        <span>{DEVICE_ICONS[d]}</span> {d}
                      </span>
                      <span className="font-medium text-white/70">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bounce rate chart */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Bounce Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BounceRateChart data={daily} />
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Top Pages</CardTitle>
            <Link href="/pages">
              <Button variant="ghost" size="sm" className="text-xs text-white/30 hover:text-white hover:bg-white/5">
                View all →
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {DEMO_TOP_PAGES.map((page, idx) => (
              <div key={page.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/20 w-4 font-mono">{idx + 1}</span>
                  <div>
                    <Link href={`/analytics/${page.id}`} className="text-sm font-medium hover:text-violet-400 transition-colors">
                      {page.title}
                    </Link>
                    <p className="text-xs text-white/30">/{page.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{page.views.toLocaleString()}</p>
                    <p className="text-[10px] text-white/30">views</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{page.conversions}</p>
                    <p className="text-[10px] text-white/30">conv.</p>
                  </div>
                  <Badge
                    className={`w-14 justify-center text-[10px] ${
                      page.rate >= 10
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-white/5 text-white/50 border-white/10"
                    }`}
                  >
                    {page.rate}%
                  </Badge>
                  <div className={`flex items-center ${page.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {page.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
