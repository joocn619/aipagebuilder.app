"use client";

import { useEffect, useState } from "react";

interface Props {
  settings: { messages?: string[]; interval?: number; duration?: number; position?: string };
}

export function SalesNotification({ settings }: Props) {
  const messages = settings.messages || ["Someone just signed up!"];
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setCurrent((prev) => (prev + 1) % messages.length);
      setTimeout(() => setVisible(false), settings.duration || 4000);
    }, settings.interval || 5000);
    return () => clearInterval(interval);
  }, [messages.length, settings.interval, settings.duration]);

  if (!visible) return null;

  const pos = settings.position === "bottom-right" ? "bottom-4 right-4" : "bottom-4 left-4";

  return (
    <div className={`fixed z-40 ${pos} animate-in slide-in-from-bottom-4`}>
      <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border">
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">&#10003;</div>
        <p className="text-sm">{messages[current]}</p>
      </div>
    </div>
  );
}
