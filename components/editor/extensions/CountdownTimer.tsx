"use client";

import { useEffect, useState } from "react";

interface Props {
  settings: { targetDate?: string; heading?: string; bgColor?: string; textColor?: string; hours?: number; minutes?: number; mode?: string };
}

function calcRemaining(target: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function CountdownTimer({ settings }: Props) {
  const target = settings.targetDate
    ? new Date(settings.targetDate)
    : new Date(Date.now() + ((settings.hours || 24) * 3600000) + ((settings.minutes || 0) * 60000));

  const [time, setTime] = useState(calcRemaining(target));

  useEffect(() => {
    const timer = setInterval(() => setTime(calcRemaining(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="py-4 text-center" style={{ backgroundColor: settings.bgColor || "#1e293b", color: settings.textColor || "#fff" }}>
      {settings.heading && <p className="mb-2 text-sm font-medium">{settings.heading}</p>}
      <div className="flex items-center justify-center gap-3">
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums">{String(time[unit]).padStart(2, "0")}</span>
            <span className="text-[10px] uppercase opacity-60">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
