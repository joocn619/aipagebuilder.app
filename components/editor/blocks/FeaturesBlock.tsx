"use client";

import type { CSSProperties } from "react";
import { Zap, Shield, Star, Users, Globe, BarChart3, Check, Lock, Layers, Cpu, Heart, Mail, Phone, Search, Settings, ArrowRight, Code, Database, Cloud, Sparkles } from "lucide-react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: CSSProperties }>> = {
  zap: Zap, shield: Shield, star: Star, users: Users, globe: Globe,
  "bar-chart-3": BarChart3, barchart: BarChart3, check: Check, lock: Lock,
  layers: Layers, cpu: Cpu, heart: Heart, mail: Mail, phone: Phone,
  search: Search, settings: Settings, "arrow-right": ArrowRight, code: Code,
  database: Database, cloud: Cloud, sparkles: Sparkles,
};


interface Feature { icon?: string; title: string; description: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function FeaturesBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; layout?: string; columns?: number; features?: Feature[]; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;
  const isBento = (c.features?.length || 0) === 5 && c.columns !== 4;
  const cols = c.columns === 2 ? "md:grid-cols-2" : c.columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  const cardBg = `linear-gradient(135deg, ${primary}16, rgba(255,255,255,0.045))`;
  const cardBorder = textCol ? textCol + "20" : primary + "24";
  const titleColor = textCol || "#f1f5f9";
  const descColor = textCol ? textCol + "80" : "rgba(148,163,184,1)";
  const subheadColor = textCol ? textCol + "99" : "rgba(148,163,184,1)";

  return (
    <div>
      {(c.heading || c.subheading) && (
        <div className="mb-12 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl outline-none" contentEditable suppressContentEditableWarning
              style={{ color: titleColor }}
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: titleColor }}>{c.heading}</h2>
          )}
          {c.subheading && (
            <p className="mt-3 text-base md:text-lg max-w-2xl mx-auto" style={{ color: subheadColor }}>{c.subheading}</p>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-5 ${cols}`}>
        {(c.features || []).map((feat, i) => {
          const IconComponent = ICON_MAP[feat.icon?.toLowerCase() || ""] || Zap;
          return (
            <div key={i}
              className={[
                "group relative overflow-hidden rounded-[1.65rem] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                isBento && i === 0 ? "md:col-span-2" : "",
              ].filter(Boolean).join(" ")}
              style={{ background: cardBg, borderColor: cardBorder, boxShadow: `0 18px 45px ${primary}10` }}>
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: primary }} />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: primary + "16", borderColor: primary + "22" }}>
                <IconComponent className="h-5 w-5" style={{ color: primary }} />
              </div>
              <div className="relative">
                <div className="mb-3 h-0.5 w-10 rounded-full" style={{ background: primary }} />
                <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight" style={{ color: titleColor }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: descColor }}>{feat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
