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

function isDarkText(col?: string): boolean {
  if (!col) return false;
  const hex = col.replace("#", "");
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.45;
}

interface Feature { icon?: string; title: string; description: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function FeaturesBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; layout?: string; columns?: number; features?: Feature[]; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;
  const lightBg = textCol ? isDarkText(textCol) : false;
  const cols = c.columns === 2 ? "md:grid-cols-2" : c.columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  const cardBg = lightBg ? "#ffffff" : undefined;
  const cardBorder = lightBg ? "rgba(226,232,240,1)" : textCol ? textCol + "15" : undefined;
  const titleColor = textCol || "inherit";
  const descColor = textCol ? textCol + "80" : "rgba(100,116,139,1)";
  const subheadColor = textCol ? textCol + "99" : "rgba(100,116,139,1)";

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
      <div className={`grid grid-cols-1 gap-6 ${cols}`}>
        {(c.features || []).map((feat, i) => {
          const IconComponent = ICON_MAP[feat.icon?.toLowerCase() || ""] || Zap;
          return (
            <div key={i}
              className="group relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ background: cardBg, borderColor: cardBorder }}>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: primary + "15" }}>
                <IconComponent className="h-5 w-5" style={{ color: primary }} />
              </div>
              <h3 className="mb-2 text-base font-semibold leading-snug" style={{ color: titleColor }}>{feat.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: descColor }}>{feat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
