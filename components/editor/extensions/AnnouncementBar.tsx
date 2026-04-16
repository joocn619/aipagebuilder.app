"use client";

import { useState } from "react";

interface Props {
  settings: { text?: string; bgColor?: string; textColor?: string; dismissible?: boolean; linkText?: string; linkUrl?: string };
}

export function AnnouncementBar({ settings }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-center gap-2 px-4 py-2 text-center text-sm"
      style={{ backgroundColor: settings.bgColor || "#2563eb", color: settings.textColor || "#fff" }}>
      <span>{settings.text || "Free shipping on all orders!"}</span>
      {settings.linkText && (
        <a href={settings.linkUrl || "#"} className="font-medium underline">{settings.linkText}</a>
      )}
      {settings.dismissible && (
        <button className="absolute right-2 opacity-60 hover:opacity-100" onClick={() => setDismissed(true)}>&#10005;</button>
      )}
    </div>
  );
}
