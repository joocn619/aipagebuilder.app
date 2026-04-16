"use client";

import { useEffect, useState } from "react";

interface Props {
  settings: { color?: string; height?: number; position?: string };
}

export function ProgressBar({ settings }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${settings.position === "bottom" ? "bottom-0" : "top-0"}`}
      style={{ height: settings.height || 3 }}
    >
      <div
        className="h-full transition-all duration-150"
        style={{ width: `${progress}%`, backgroundColor: settings.color || "#2563eb" }}
      />
    </div>
  );
}
