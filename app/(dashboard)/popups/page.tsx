"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface PopupItem {
  id: string;
  name: string;
  type: string;
  triggerType: string;
  isActive: boolean;
  views: number;
  conversions: number;
}

const DEMO_POPUPS: PopupItem[] = [
  { id: "1", name: "Newsletter Signup", type: "newsletter", triggerType: "time_delay", isActive: true, views: 1245, conversions: 89 },
  { id: "2", name: "Exit Intent Offer", type: "exit", triggerType: "exit_intent", isActive: true, views: 567, conversions: 34 },
  { id: "3", name: "Holiday Promo", type: "promo", triggerType: "scroll_pct", isActive: false, views: 0, conversions: 0 },
];

export default function PopupsPage() {
  const [popups, setPopups] = useState<PopupItem[]>(DEMO_POPUPS);

  const toggleActive = (id: string) => {
    setPopups((prev) => prev.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p));
    toast.success("Popup status updated");
  };

  const deletePopup = (id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
    toast.success("Popup deleted");
  };

  const conversionRate = (views: number, conversions: number) => {
    if (views === 0) return "0%";
    return `${((conversions / views) * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Popups</h1>
          <p className="text-sm text-muted-foreground">{popups.length} popups</p>
        </div>
        <Link href="/popups/new">
          <Button>Create Popup</Button>
        </Link>
      </div>

      {popups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">No popups yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create your first popup to boost conversions</p>
          <Link href="/popups/new" className="mt-4"><Button size="sm">Create Popup</Button></Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {popups.map((popup) => (
            <Card key={popup.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{popup.name}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{popup.type}</Badge>
                    <Badge variant="outline" className="text-[10px]">{popup.triggerType.replace("_", " ")}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={popup.isActive} onCheckedChange={() => toggleActive(popup.id)} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">&#8943;</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild><Link href={`/popups/${popup.id}/edit`}>Edit</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setPopups((prev) => [...prev, { ...popup, id: Date.now().toString(), name: `${popup.name} (Copy)`, isActive: false, views: 0, conversions: 0 }]); toast.success("Popup duplicated"); }}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deletePopup(popup.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-8 text-sm">
                  <div><span className="text-muted-foreground">Views:</span> <strong>{popup.views.toLocaleString()}</strong></div>
                  <div><span className="text-muted-foreground">Conversions:</span> <strong>{popup.conversions.toLocaleString()}</strong></div>
                  <div><span className="text-muted-foreground">Rate:</span> <strong>{conversionRate(popup.views, popup.conversions)}</strong></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
