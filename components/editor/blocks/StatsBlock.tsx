"use client";

import { useEffect, useRef, useState } from "react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Stat { value: number; label: string; prefix?: string; suffix?: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function AnimatedStat({ stat, primary, textCol, delay }: { stat: Stat; primary: string; textCol?: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(stat.value, 1600, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const decimals = String(stat.value).includes(".") ? String(stat.value).split(".")[1].length : 0;
  const fmt = (n: number) => {
    const v = Math.min(n, stat.value);
    if (stat.value >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
    if (stat.value >= 1_000) return (v / 1_000).toFixed(1) + "k";
    if (decimals > 0) return v.toFixed(decimals);
    return Math.floor(v).toLocaleString();
  };

  return (
    <div ref={ref} className="pf-fade-up flex flex-col items-center gap-2 text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl font-extrabold tabular-nums md:text-5xl lg:text-6xl" style={{ color: textCol || primary }}>
        {stat.prefix}{fmt(count)}{stat.suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: textCol ? textCol + "99" : "rgba(203,213,225,0.8)" }}>
        {stat.label}
      </div>
      <div className="mt-1 h-0.5 w-8 rounded-full opacity-40" style={{ backgroundColor: textCol || primary }} />
    </div>
  );
}

export function StatsBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; stats?: Stat[]; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;
  const cols = (c.stats?.length || 0) <= 2 ? "md:grid-cols-2" : (c.stats?.length || 0) === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      {c.heading && (
        <div className="mb-10 text-center">
          {isEditing ? (
            <h2 className="text-2xl font-bold outline-none" style={textCol ? { color: textCol } : {}} contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-2xl font-bold" style={textCol ? { color: textCol } : {}}>{c.heading}</h2>
          )}
        </div>
      )}
      <div className={`grid grid-cols-2 gap-10 ${cols}`}>
        {(c.stats || []).map((stat, i) => (
          <AnimatedStat key={i} stat={stat} primary={primary} textCol={textCol} delay={i * 120} />
        ))}
      </div>
    </div>
  );
}
