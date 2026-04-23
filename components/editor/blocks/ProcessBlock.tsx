"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Step {
  title: string;
  description: string;
  badge?: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function ProcessBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    steps?: Step[];
  };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textColor = block.styles.textColor || "#f1f5f9";
  const mutedColor = block.styles.textColor ? `${block.styles.textColor}99` : "rgba(203,213,225,0.85)";

  return (
    <div>
      <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          {c.eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em]" style={{ color: primary }}>
              {c.eyebrow}
            </p>
          )}
          {isEditing ? (
            <h2
              className="outline-none text-3xl font-black tracking-tight md:text-5xl"
              contentEditable
              suppressContentEditableWarning
              style={{ color: textColor }}
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}
            >
              {c.heading}
            </h2>
          ) : (
            <h2 className="text-3xl font-black tracking-tight md:text-5xl" style={{ color: textColor }}>{c.heading}</h2>
          )}
        </div>
        {c.subheading && <p className="text-base leading-7 md:text-lg" style={{ color: mutedColor }}>{c.subheading}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {(c.steps || []).map((step, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] p-5 transition-all hover:-translate-y-1"
            style={{ borderColor: primary + "24" }}
          >
            <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${primary}, transparent)` }} />
            <div className="mb-8 flex items-center justify-between">
              <span className="text-4xl font-black tracking-tighter" style={{ color: primary + "55" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {step.badge && (
                <span className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: primary + "35", color: primary }}>
                  {step.badge}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold" style={{ color: textColor }}>{step.title}</h3>
            <p className="mt-3 text-sm leading-6" style={{ color: mutedColor }}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
