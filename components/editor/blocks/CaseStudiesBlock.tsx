"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface CaseStudy {
  client: string;
  title: string;
  result: string;
  description: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function CaseStudiesBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    cases?: CaseStudy[];
  };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textColor = block.styles.textColor || "inherit";
  const mutedColor = block.styles.textColor ? `${block.styles.textColor}99` : "rgb(100 116 139)";

  return (
    <div>
      <div className="mx-auto mb-12 max-w-3xl text-center">
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
        {c.subheading && <p className="mx-auto mt-4 max-w-2xl text-base leading-7 md:text-lg" style={{ color: mutedColor }}>{c.subheading}</p>}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {(c.cases || []).map((item, index) => (
          <article
            key={index}
            className="relative overflow-hidden rounded-[2rem] border bg-white/[0.04] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ borderColor: primary + "24" }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl" style={{ background: primary + "22" }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: primary }}>{item.client}</p>
              <h3 className="mt-4 text-xl font-bold leading-tight" style={{ color: textColor }}>{item.title}</h3>
              <div className="my-6 rounded-2xl px-4 py-3 text-3xl font-black tracking-tight text-white" style={{ background: primary }}>
                {item.result}
              </div>
              <p className="text-sm leading-6" style={{ color: mutedColor }}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
