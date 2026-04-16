"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  settings: { heading?: string; description?: string; confirmText?: string; denyText?: string };
  isPreview?: boolean;
}

export function AgeVerification({ settings, isPreview }: Props) {
  const [verified, setVerified] = useState(!isPreview);
  if (verified) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
      <div className="mx-4 max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl">
        <h3 className="text-xl font-bold">{settings.heading || "Are you 18+?"}</h3>
        <p className="mt-2 text-sm text-gray-600">{settings.description || "You must be of legal age to access this content."}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>{settings.denyText || "No"}</Button>
          <Button onClick={() => setVerified(true)}>{settings.confirmText || "Yes, I am 18+"}</Button>
        </div>
      </div>
    </div>
  );
}
