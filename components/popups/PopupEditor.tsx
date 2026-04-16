"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface PopupData {
  name: string;
  type: string;
  triggerType: string;
  triggerValue: string;
  content: {
    heading: string;
    description: string;
    ctaText: string;
    fields: { type: string; label: string; required: boolean }[];
  };
  frequency: string;
  isActive: boolean;
}

interface PopupEditorProps {
  initialData?: Partial<PopupData>;
  onSave: (data: PopupData) => void;
}

export function PopupEditor({ initialData, onSave }: PopupEditorProps) {
  const [data, setData] = useState<PopupData>({
    name: initialData?.name || "New Popup",
    type: initialData?.type || "newsletter",
    triggerType: initialData?.triggerType || "time_delay",
    triggerValue: initialData?.triggerValue || "5",
    content: {
      heading: initialData?.content?.heading || "Subscribe to our newsletter",
      description: initialData?.content?.description || "Get weekly updates delivered to your inbox.",
      ctaText: initialData?.content?.ctaText || "Subscribe",
      fields: initialData?.content?.fields || [{ type: "email", label: "Email", required: true }],
    },
    frequency: initialData?.frequency || "once_per_session",
    isActive: initialData?.isActive ?? false,
  });

  const update = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateContent = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, content: { ...prev.content, [field]: value } }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Popup Name</Label>
              <Input value={data.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={data.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promo">Promo/Discount</SelectItem>
                  <SelectItem value="exit">Exit Intent</SelectItem>
                  <SelectItem value="survey">Survey</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Trigger</Label>
              <Select value={data.triggerType} onValueChange={(v) => update("triggerType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="time_delay">Time Delay</SelectItem>
                  <SelectItem value="scroll_pct">Scroll Percentage</SelectItem>
                  <SelectItem value="exit_intent">Exit Intent</SelectItem>
                  <SelectItem value="click">Click</SelectItem>
                  <SelectItem value="page_load">Page Load</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(data.triggerType === "time_delay" || data.triggerType === "scroll_pct") && (
              <div className="space-y-1.5">
                <Label>{data.triggerType === "time_delay" ? "Delay (seconds)" : "Scroll %"}</Label>
                <Input value={data.triggerValue} onChange={(e) => update("triggerValue", e.target.value)} />
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Frequency</Label>
              <Select value={data.frequency} onValueChange={(v) => update("frequency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="every_visit">Every Visit</SelectItem>
                  <SelectItem value="once_per_session">Once per Session</SelectItem>
                  <SelectItem value="once">Only Once</SelectItem>
                  <SelectItem value="every_3_days">Every 3 Days</SelectItem>
                  <SelectItem value="every_7_days">Every 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch checked={data.isActive} onCheckedChange={(v) => update("isActive", v)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Heading</Label>
              <Input value={data.content.heading} onChange={(e) => updateContent("heading", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={data.content.description}
                onChange={(e) => updateContent("description", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>CTA Button Text</Label>
              <Input value={data.content.ctaText} onChange={(e) => updateContent("ctaText", e.target.value)} />
            </div>

            {/* Preview */}
            <div className="rounded-lg border bg-muted/30 p-6 text-center">
              <h4 className="text-lg font-bold">{data.content.heading}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{data.content.description}</p>
              <Button className="mt-4" size="sm">{data.content.ctaText}</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => toast.info("Cancelled")}>Cancel</Button>
        <Button onClick={() => { onSave(data); toast.success("Popup saved!"); }}>Save Popup</Button>
      </div>
    </div>
  );
}
