"use client";

import { useEffect, useState } from "react";

interface Props {
  settings: { showAfter?: number; bgColor?: string; iconColor?: string; position?: string };
}

export function BackToTop({ settings }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > (settings.showAfter || 300));
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [settings.showAfter]);

  if (!visible) return null;

  return (
    <button
      className="fixed z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-opacity hover:opacity-80"
      style={{ backgroundColor: settings.bgColor || "#0f172a", color: settings.iconColor || "#fff", bottom: 16, right: settings.position === "bottom-left" ? undefined : 16, left: settings.position === "bottom-left" ? 16 : undefined }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      &#8593;
    </button>
  );
}
