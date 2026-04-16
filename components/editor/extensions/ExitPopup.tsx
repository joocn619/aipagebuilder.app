"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  settings: { heading?: string; description?: string; ctaText?: string; showOnce?: boolean };
  isPreview?: boolean;
}

export function ExitPopup({ settings, isPreview }: Props) {
  const [show, setShow] = useState(isPreview || false);

  useEffect(() => {
    if (isPreview) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [isPreview]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 max-w-md rounded-xl bg-white p-8 text-center shadow-2xl">
        <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShow(false)}>&#10005;</button>
        <h3 className="text-2xl font-bold">{settings.heading || "Wait!"}</h3>
        <p className="mt-2 text-gray-600">{settings.description || "Don't miss out on our special offer."}</p>
        <Button className="mt-6 w-full">{settings.ctaText || "Claim Offer"}</Button>
      </div>
    </div>
  );
}
