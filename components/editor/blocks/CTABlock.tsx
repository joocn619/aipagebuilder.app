"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function CTABlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; ctaText?: string; ctaUrl?: string; secondaryCtaText?: string; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const bg = block.styles.backgroundColor || primary;
  const textCol = block.styles.textColor || "#ffffff";

  return (
    <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
      style={{ backgroundColor: bg, color: textCol }}>
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10" style={{ backgroundColor: textCol }} />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-10" style={{ backgroundColor: textCol }} />

      <div className="relative mx-auto max-w-2xl">
        {isEditing ? (
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl outline-none" contentEditable suppressContentEditableWarning
            style={{ color: textCol }}
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
        ) : (
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: textCol }}>{c.heading}</h2>
        )}
        {c.subheading && (
          <p className="mt-4 text-lg" style={{ color: textCol + "cc" }}>{c.subheading}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {c.ctaText && (
            <a
              href={isEditing ? "#" : (c.ctaUrl || "#")}
              onClick={(e) => isEditing && e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: textCol, color: bg }}
            >
              {c.ctaText}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          )}
          {c.secondaryCtaText && (
            <a
              href="#"
              onClick={(e) => isEditing && e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-sm font-semibold transition-all hover:opacity-80"
              style={{ borderColor: textCol + "50", color: textCol }}
            >
              {c.secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
