"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Funnel {
  id: string;
  name: string;
  type: string;
  steps: number;
  views: number;
  conversions: number;
  isActive: boolean;
}

const DEMO_FUNNELS: Funnel[] = [
  { id: "f1", name: "Free Trial Funnel", type: "saas", steps: 4, views: 1240, conversions: 87, isActive: true },
  { id: "f2", name: "Webinar Registration", type: "webinar", steps: 3, views: 562, conversions: 134, isActive: true },
  { id: "f3", name: "Product Launch", type: "launch", steps: 5, views: 0, conversions: 0, isActive: false },
];

const TYPE_COLORS: Record<string, string> = {
  saas: "bg-violet-500/10 text-violet-600",
  webinar: "bg-blue-500/10 text-blue-600",
  launch: "bg-orange-500/10 text-orange-600",
  ecommerce: "bg-green-500/10 text-green-600",
};

export default function FunnelsPage() {
  const [funnels, setFunnels] = useState(DEMO_FUNNELS);

  const deleteFunnel = (id: string) => {
    setFunnels((prev) => prev.filter((f) => f.id !== id));
    toast.success("Funnel deleted");
  };

  const convRate = (views: number, conversions: number) =>
    views === 0 ? "0%" : `${((conversions / views) * 100).toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Funnels</h1>
          <p className="text-sm text-muted-foreground">{funnels.length} funnels</p>
        </div>
        <Link href="/funnels/new">
          <Button>Create Funnel</Button>
        </Link>
      </div>

      {funnels.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">No funnels yet</p>
          <p className="text-sm text-muted-foreground mt-1">Build your first sales funnel</p>
          <Link href="/funnels/new" className="mt-4"><Button size="sm">Create Funnel</Button></Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {funnels.map((funnel) => (
            <Card key={funnel.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{funnel.name}</CardTitle>
                    <Badge variant="secondary" className={`text-[10px] ${TYPE_COLORS[funnel.type] || ""}`}>{funnel.type}</Badge>
                    <Badge variant="outline" className="text-[10px]">{funnel.steps} steps</Badge>
                    {funnel.isActive
                      ? <Badge className="bg-green-500/10 text-green-600 border-green-200 text-[10px]">Active</Badge>
                      : <Badge variant="secondary" className="text-[10px]">Draft</Badge>}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">⋯</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><Link href={`/funnels/${funnel.id}/edit`}>Edit</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setFunnels(prev => [...prev, { ...funnel, id: Date.now().toString(), name: `${funnel.name} (Copy)`, isActive: false, views: 0, conversions: 0 }]); toast.success("Funnel duplicated"); }}>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteFunnel(funnel.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-8 text-sm">
                  <div><span className="text-muted-foreground">Views:</span> <strong>{funnel.views.toLocaleString()}</strong></div>
                  <div><span className="text-muted-foreground">Conversions:</span> <strong>{funnel.conversions}</strong></div>
                  <div><span className="text-muted-foreground">Rate:</span> <strong>{convRate(funnel.views, funnel.conversions)}</strong></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
