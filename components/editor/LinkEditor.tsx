"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LinkData {
  url: string;
  type: "url" | "anchor" | "phone" | "email";
  target?: "_blank" | "_self";
}

interface LinkEditorProps {
  open: boolean;
  onClose: () => void;
  initialData?: LinkData;
  onSave: (data: LinkData) => void;
}

export function LinkEditor({ open, onClose, initialData, onSave }: LinkEditorProps) {
  const [type, setType] = useState<LinkData["type"]>(initialData?.type || "url");
  const [url, setUrl] = useState(initialData?.url || "");
  const [target, setTarget] = useState<"_blank" | "_self">(initialData?.target || "_self");

  const placeholder = type === "url" ? "https://example.com" : type === "anchor" ? "#section-id" : type === "phone" ? "+1234567890" : "email@example.com";
  const prefix = type === "phone" ? "tel:" : type === "email" ? "mailto:" : "";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Edit Link</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Link Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as LinkData["type"])}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="anchor">Anchor</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">{type === "url" ? "URL" : type === "anchor" ? "Anchor ID" : type === "phone" ? "Phone Number" : "Email Address"}</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={placeholder} className="h-9" />
          </div>
          {type === "url" && (
            <div className="space-y-1.5">
              <Label className="text-xs">Open in</Label>
              <Select value={target} onValueChange={(v) => setTarget(v as "_blank" | "_self")}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Same Tab</SelectItem>
                  <SelectItem value="_blank">New Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
            <Button size="sm" onClick={() => { onSave({ url: prefix + url, type, target }); onClose(); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
