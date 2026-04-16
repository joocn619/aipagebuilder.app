"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  settings: { text?: string; acceptText?: string; rejectText?: string; position?: string };
}

export function CookieBar({ settings }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={`fixed left-0 right-0 z-50 ${settings.position === "top" ? "top-0" : "bottom-0"}`}>
      <div className="mx-4 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-lg border">
        <p className="text-sm text-gray-600">{settings.text || "We use cookies to improve your experience."}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setDismissed(true)}>{settings.rejectText || "Reject"}</Button>
          <Button size="sm" onClick={() => setDismissed(true)}>{settings.acceptText || "Accept All"}</Button>
        </div>
      </div>
    </div>
  );
}
