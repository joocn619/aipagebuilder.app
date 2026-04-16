"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { label: "Total Pages", value: "12", change: "+3 this week", icon: "📄", color: "text-blue-600" },
  { label: "Published", value: "8", change: "4 drafts", icon: "🚀", color: "text-green-600" },
  { label: "Page Views (30d)", value: "3,842", change: "+18% vs last month", icon: "👁️", color: "text-violet-600" },
  { label: "Conversions", value: "317", change: "8.2% rate", icon: "⚡", color: "text-orange-600" },
];

const RECENT_PAGES = [
  { id: "p1", title: "Homepage", slug: "home", status: "published", views: 1842, updatedAt: "2h ago" },
  { id: "p2", title: "Pricing Page", slug: "pricing", status: "published", views: 967, updatedAt: "1d ago" },
  { id: "p3", title: "Free Trial Landing", slug: "trial", status: "draft", views: 0, updatedAt: "2d ago" },
  { id: "p4", title: "Agency Services", slug: "services", status: "published", views: 543, updatedAt: "3d ago" },
];

const QUICK_ACTIONS = [
  { title: "New Page", desc: "Start from blank or template", icon: "✏️", href: "/pages/new", cta: "Create Page" },
  { title: "Browse Templates", desc: "18 professionally designed templates", icon: "🎨", href: "/templates", cta: "View Templates" },
  { title: "AI Generator", desc: "Describe your page — AI builds it", icon: "🧠", href: "/pages/new", cta: "Generate Page" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back — here&apos;s what&apos;s happening</p>
        </div>
        <Link href="/pages/new">
          <Button>+ Create New Page</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {QUICK_ACTIONS.map((action) => (
          <Card key={action.title} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5">
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{action.desc}</p>
              <Link href={action.href}>
                <Button variant="outline" size="sm">{action.cta}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Pages */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Pages</CardTitle>
            <Link href="/pages">
              <Button variant="ghost" size="sm" className="text-xs">View all →</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {RECENT_PAGES.map((page) => (
              <div key={page.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {page.title[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{page.title}</p>
                    <p className="text-xs text-muted-foreground">/{page.slug} · {page.updatedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:block">{page.views.toLocaleString()} views</span>
                  <Badge variant={page.status === "published" ? "default" : "secondary"} className="text-[10px]">
                    {page.status}
                  </Badge>
                  <Link href={`/editor/${page.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: "John Smith", email: "john@example.com", tag: "hot", source: "Homepage" },
                { name: "Sarah Lee", email: "sarah@agency.com", tag: "warm", source: "Pricing" },
                { name: "Mike Chen", email: "mike@startup.com", tag: "cold", source: "Trial" },
              ].map((lead) => (
                <div key={lead.email} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{lead.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{lead.source}</span>
                    <Badge variant="outline" className={`text-[10px] ${lead.tag === "hot" ? "text-red-500" : lead.tag === "warm" ? "text-orange-500" : "text-blue-500"}`}>
                      {lead.tag}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/leads">
              <Button variant="ghost" size="sm" className="mt-3 text-xs w-full">View all leads →</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Popups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: "Newsletter Signup", type: "newsletter", rate: "7.2%" },
                { name: "Exit Intent Offer", type: "exit", rate: "5.8%" },
              ].map((popup) => (
                <div key={popup.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-medium">{popup.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{popup.type}</Badge>
                    <span className="text-xs text-muted-foreground">{popup.rate} conv.</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/popups">
              <Button variant="ghost" size="sm" className="mt-3 text-xs w-full">Manage popups →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
