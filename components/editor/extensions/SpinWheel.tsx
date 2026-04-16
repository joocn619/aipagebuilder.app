"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  settings: { heading?: string; prizes?: string[]; requireEmail?: boolean };
  isPreview?: boolean;
}

export function SpinWheel({ settings, isPreview }: Props) {
  const [show, setShow] = useState(isPreview || false);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const prizes = settings.prizes || ["10% Off", "Free Shipping", "20% Off", "Try Again"];

  const handleSpin = () => {
    if (settings.requireEmail && !email) return;
    setSpinning(true);
    setTimeout(() => {
      const winner = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(winner);
      setSpinning(false);
    }, 2000);
  };

  if (!show) {
    return (
      <button
        className="fixed bottom-20 right-4 z-40 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-purple-700"
        onClick={() => setShow(true)}
      >
        Win a Prize!
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl">
        <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShow(false)}>&#10005;</button>
        <h3 className="text-xl font-bold">{settings.heading || "Spin to Win!"}</h3>

        {result ? (
          <div className="mt-6">
            <p className="text-lg font-bold text-purple-600">{result}</p>
            <p className="mt-2 text-sm text-gray-500">Check your email for the coupon.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {prizes.map((p, i) => (
                <div key={i} className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">{p}</div>
              ))}
            </div>
            {settings.requireEmail && (
              <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            )}
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSpin} disabled={spinning}>
              {spinning ? "Spinning..." : "Spin the Wheel!"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
