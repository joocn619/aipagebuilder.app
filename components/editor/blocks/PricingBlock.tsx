"use client";

import { Check } from "lucide-react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Plan { name: string; price: number; period?: string; features?: string[]; ctaText?: string; highlighted?: boolean; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function PricingBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; plans?: Plan[]; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;

  const headingColor = textCol || "#f1f5f9";
  const subColor = textCol ? textCol + "99" : "#94a3b8";

  const gridCols = (c.plans?.length || 0) === 2 ? "md:grid-cols-2" : (c.plans?.length || 0) === 4 ? "lg:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      {(c.heading || c.subheading) && (
        <div className="mb-12 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl outline-none" contentEditable suppressContentEditableWarning
              style={{ color: headingColor }}
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl" style={{ color: headingColor }}>{c.heading}</h2>
          )}
          {c.subheading && <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg" style={{ color: subColor }}>{c.subheading}</p>}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-6 ${gridCols} items-stretch`}>
        {(c.plans || []).map((plan, i) => {
          const cardBg = plan.highlighted
            ? `radial-gradient(circle at 20% 0%, ${primary}30, transparent 38%), linear-gradient(135deg, ${primary}14, rgba(255,255,255,0.05))`
            : `linear-gradient(135deg, ${primary}10, rgba(255,255,255,0.04))`;

          const cardTextColor = textCol || "#f1f5f9";
          const cardMutedColor = textCol ? textCol + "99" : "rgba(148,163,184,1)";
          const cardFeatureColor = textCol ? textCol + "cc" : "rgba(203,213,225,1)";

          return (
            <div key={i}
              className={`relative flex flex-col rounded-[1.75rem] border shadow-sm transition-all duration-300 hover:-translate-y-1 ${plan.highlighted ? "shadow-xl ring-2 pt-8 px-6 pb-6" : "p-6 hover:shadow-xl"}`}
              style={{
                background: cardBg,
                borderColor: plan.highlighted ? primary : (textCol ? textCol + "18" : "rgba(255,255,255,0.1)"),
                color: cardTextColor,
              }}>
              <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl"
                style={{ background: primary + (plan.highlighted ? "35" : "14") }} />
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="rounded-full px-4 py-1 text-xs font-bold text-white shadow-md"
                    style={{ backgroundColor: primary }}>Most Popular</span>
                </div>
              )}
              <div className="relative mb-5">
                <h3 className="text-base font-bold uppercase tracking-wider"
                  style={{ color: plan.highlighted ? primary : cardMutedColor }}>{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: cardTextColor }}>${plan.price}</span>
                  <span className="text-sm" style={{ color: cardMutedColor }}>/{plan.period || "mo"}</span>
                </div>
              </div>
              <ul className="relative mb-7 flex-1 space-y-3">
                {(plan.features || []).map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: primary + "20" }}>
                      <Check className="h-2.5 w-2.5" style={{ color: primary }} />
                    </div>
                    <span style={{ color: cardFeatureColor }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                onClick={(e) => isEditing && e.preventDefault()}
                className="block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all hover:opacity-90"
                style={plan.highlighted
                  ? { backgroundColor: primary, color: "#fff", boxShadow: `0 4px 14px ${primary}50` }
                  : { border: `1.5px solid ${primary}40`, color: primary, background: "transparent" }}
              >
                {plan.ctaText || "Get Started"}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
