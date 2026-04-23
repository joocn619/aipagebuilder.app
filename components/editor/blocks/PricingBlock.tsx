"use client";

import { Check } from "lucide-react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Plan { name: string; price: number; period?: string; features?: string[]; ctaText?: string; highlighted?: boolean; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function PricingBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; plans?: Plan[]; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const gridCols = (c.plans?.length || 0) === 2 ? "md:grid-cols-2" : (c.plans?.length || 0) === 4 ? "lg:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      {(c.heading || c.subheading) && (
        <div className="mb-12 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{c.heading}</h2>
          )}
          {c.subheading && <p className="mt-3 text-base text-muted-foreground">{c.subheading}</p>}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-6 ${gridCols} items-stretch`}>
        {(c.plans || []).map((plan, i) => (
          <div key={i} className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all ${plan.highlighted ? "shadow-xl ring-2" : "hover:shadow-md"}`}
            style={plan.highlighted ? { borderColor: primary, background: `linear-gradient(135deg, ${primary}08, transparent)`, outlineColor: primary } : {}}>
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full px-4 py-1 text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: primary }}>Most Popular</span>
              </div>
            )}
            <div className="mb-5">
              <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wider">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period || "mo"}</span>
              </div>
            </div>
            <ul className="mb-7 flex-1 space-y-3">
              {(plan.features || []).map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: primary + "20" }}>
                    <Check className="h-2.5 w-2.5" style={{ color: primary }} />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={(e) => isEditing && e.preventDefault()}
              className="block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all hover:opacity-90"
              style={plan.highlighted
                ? { backgroundColor: primary, color: "#fff", boxShadow: `0 4px 14px ${primary}50` }
                : { border: `1.5px solid ${primary}40`, color: primary }}
            >
              {plan.ctaText || "Get Started"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
