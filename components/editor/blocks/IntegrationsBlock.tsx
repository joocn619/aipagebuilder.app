"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function IntegrationsBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    tools?: string[];
    note?: string;
  };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textColor = block.styles.textColor || "inherit";
  const mutedColor = block.styles.textColor ? `${block.styles.textColor}99` : "rgb(100 116 139)";
  const tools = c.tools || [];

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border bg-white/[0.03] p-6 md:p-10" style={{ borderColor: primary + "28" }}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: primary + "20" }} />
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
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
          {c.note && <p className="mt-6 rounded-2xl border p-4 text-sm leading-6" style={{ borderColor: primary + "24", color: mutedColor }}>{c.note}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tools.map((tool, index) => (
            <div
              key={`${tool}-${index}`}
              className="flex min-h-24 items-center justify-center rounded-3xl border bg-white/[0.06] p-4 text-center text-sm font-bold shadow-sm transition-all hover:-translate-y-1"
              style={{ borderColor: primary + "24", color: textColor }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
