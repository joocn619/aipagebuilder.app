"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PopupConfig {
  id: string;
  type: string;
  triggerType: string;
  triggerValue?: string;
  frequency: string;
  content: {
    heading: string;
    description: string;
    ctaText: string;
    fields?: { type: string; label: string; required: boolean }[];
  };
  styles?: {
    bgColor?: string;
    textColor?: string;
    accentColor?: string;
    size?: string;
  };
}

interface PopupRendererProps {
  popups: PopupConfig[];
  pageId: string;
}

export function PopupRenderer({ popups, pageId }: PopupRendererProps) {
  const [activePopup, setActivePopup] = useState<PopupConfig | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    popups.forEach((popup) => {
      if (dismissed.has(popup.id)) return;

      // Check frequency
      const storageKey = `pf_popup_${popup.id}`;
      const lastShown = localStorage.getItem(storageKey);
      if (popup.frequency === "once" && lastShown) return;
      if (popup.frequency === "once_per_session" && sessionStorage.getItem(storageKey)) return;

      if (popup.triggerType === "time_delay") {
        const delay = parseInt(popup.triggerValue || "5") * 1000;
        const timer = setTimeout(() => {
          setActivePopup(popup);
          localStorage.setItem(storageKey, Date.now().toString());
          sessionStorage.setItem(storageKey, "1");
        }, delay);
        return () => clearTimeout(timer);
      }

      if (popup.triggerType === "scroll_pct") {
        const handler = () => {
          const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (pct >= parseInt(popup.triggerValue || "50")) {
            setActivePopup(popup);
            localStorage.setItem(storageKey, Date.now().toString());
            window.removeEventListener("scroll", handler);
          }
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
      }

      if (popup.triggerType === "exit_intent") {
        const handler = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            setActivePopup(popup);
            localStorage.setItem(storageKey, Date.now().toString());
            document.removeEventListener("mouseleave", handler);
          }
        };
        document.addEventListener("mouseleave", handler);
        return () => document.removeEventListener("mouseleave", handler);
      }

      if (popup.triggerType === "page_load") {
        setActivePopup(popup);
        localStorage.setItem(storageKey, Date.now().toString());
      }
    });
  }, [popups, dismissed, pageId]);

  const dismissPopup = () => {
    if (activePopup) {
      setDismissed((prev) => new Set(prev).add(activePopup.id));
      setActivePopup(null);
    }
  };

  const handleSubmit = async () => {
    // Track conversion
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_id: pageId, event_type: "popup_conversion", metadata: { popup_id: activePopup?.id } }),
    }).catch(() => {});
    dismissPopup();
  };

  if (!activePopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={dismissPopup}>
      <div className="relative mx-4 max-w-md rounded-xl bg-white p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={dismissPopup}>&#10005;</button>
        <h3 className="text-xl font-bold">{activePopup.content.heading}</h3>
        <p className="mt-2 text-sm text-gray-600">{activePopup.content.description}</p>

        {activePopup.content.fields && activePopup.content.fields.length > 0 && (
          <div className="mt-4 space-y-3">
            {activePopup.content.fields.map((field, i) => (
              <Input key={i} type={field.type} placeholder={field.label} required={field.required} />
            ))}
          </div>
        )}

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          {activePopup.content.ctaText}
        </Button>
      </div>
    </div>
  );
}
