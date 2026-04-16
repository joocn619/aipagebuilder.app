"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageViewsChart, ConversionFunnelChart, type DailyMetric } from "@/components/analytics/AnalyticsCharts";
import { HeatmapOverlay } from "@/components/analytics/HeatmapOverlay";
import { ScrollDepthChart } from "@/components/analytics/ScrollDepthChart";
import { RealtimeVisitors } from "@/components/analytics/RealtimeVisitors";

const DEMO_DAILY: DailyMetric[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.now() - (13 - i) * 86400000);
  const base = 40 + Math.round(Math.sin(i * 0.9) * 15 + Math.random() * 20);
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    views: base,
    visitors: Math.round(base * 0.75),
    conversions: Math.round(base * 0.1),
  };
});

const DEMO_FUNNEL = [
  { label: "Page Views", value: 1842 },
  { label: "Scrolled 50%", value: 1102 },
  { label: "Clicked CTA", value: 421 },
  { label: "Form Started", value: 198 },
  { label: "Converted", value: 134 },
];

export default function PageAnalyticsPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [range, setRange] = useState("14d");
  const [daily] = useState<DailyMetric[]>(DEMO_DAILY);

  const totalViews = daily.reduce((s, d) => s + d.views, 0);
  const totalVisitors = daily.reduce((s, d) => s + d.visitors, 0);
  const totalConversions = daily.reduce((s, d) => s + (d.conversions ?? 0), 0);
  const convRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : "0.0";
  const avgTime = "2m 34s"; // demo

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/analytics">
          <Button variant="ghost" size="sm">← Analytics</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Page Analytics</h1>
          <p className="text-xs text-muted-foreground font-mono">Page ID: {pageId}</p>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Views", value: totalViews.toLocaleString() },
          { label: "Visitors", value: totalVisitors.toLocaleString() },
          { label: "Conversions", value: totalConversions.toLocaleString() },
          { label: "Conv. Rate", value: `${convRate}%` },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="scroll">Scroll Depth</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Views & Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <PageViewsChart data={daily} />
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-5">
                  <RealtimeVisitors pageId={pageId} />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5 space-y-2">
                  <p className="text-sm font-semibold">Avg. Time on Page</p>
                  <p className="text-3xl font-bold">{avgTime}</p>
                  <p className="text-xs text-muted-foreground">Based on session recordings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="pt-4">
          <Card>
            <CardContent className="pt-5">
              <HeatmapOverlay pageId={pageId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scroll" className="pt-4">
          <Card>
            <CardContent className="pt-5">
              <ScrollDepthChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversionFunnelChart data={DEMO_FUNNEL} />
              <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs text-muted-foreground">
                {DEMO_FUNNEL.map((step, i) => {
                  const dropOff = i > 0
                    ? Math.round(((DEMO_FUNNEL[i - 1].value - step.value) / DEMO_FUNNEL[i - 1].value) * 100)
                    : 0;
                  return (
                    <div key={i}>
                      <p className="font-bold text-foreground text-base">{step.value.toLocaleString()}</p>
                      <p>{step.label}</p>
                      {i > 0 && <p className="text-red-500 mt-1">-{dropOff}%</p>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
