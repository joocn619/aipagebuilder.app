"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Point {
  title: string;
  description: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function GuaranteeBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    badge?: string;
    points?: Point[];
  };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textColor = block.styles.textColor || "inherit";
  const mutedColor = block.styles.textColor ? `${block.styles.textColor}99` : "rgb(100 116 139)";

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border p-6 md:p-10" style={{ borderColor: primary + "30", background: `linear-gradient(135deg, ${primary}14, rgba(255,255,255,0.04))` }}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: primary + "25" }} />
      <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          {c.badge && (
            <div className="mb-5 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white" style={{ background: primary }}>
              {c.badge}
            </div>
          )}
          {c.eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em]" style={{ color: primary }}>{c.eyebrow}</p>}
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
          {c.subheading && <p className="mt-4 text-base leading-7 md:text-lg" style={{ color: mutedColor }}>{c.subheading}</p>}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {(c.points || []).map((point, index) => (
            <div key={index} className="rounded-3xl border bg-white/[0.06] p-5" style={{ borderColor: primary + "24" }}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: primary }}>
                {index + 1}
              </div>
              <h3 className="font-bold" style={{ color: textColor }}>{point.title}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: mutedColor }}>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
