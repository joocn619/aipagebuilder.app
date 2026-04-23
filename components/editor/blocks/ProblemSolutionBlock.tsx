"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Item {
  title: string;
  description: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function ProblemSolutionBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    problemTitle?: string;
    solutionTitle?: string;
    problems?: Item[];
    solutions?: Item[];
  };

  const primary = globalStyles.primaryColor || "#7c3aed";
  const textColor = block.styles.textColor || "inherit";
  const mutedColor = block.styles.textColor ? `${block.styles.textColor}99` : "rgba(148,163,184,0.9)";
  const panelBg = "rgba(255,255,255,0.05)";
  const panelBorder = "rgba(255,255,255,0.1)";

  return (
    <div>
      <div className="mx-auto mb-12 max-w-3xl text-center">
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
          <h2 className="text-3xl font-black tracking-tight md:text-5xl" style={{ color: textColor }}>
            {c.heading}
          </h2>
        )}
        {c.subheading && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 md:text-lg" style={{ color: mutedColor }}>
            {c.subheading}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[2rem] border p-6 md:p-8" style={{ background: panelBg, borderColor: panelBorder }}>
          <div className="mb-6 inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-500">
            Before
          </div>
          <h3 className="mb-5 text-2xl font-bold" style={{ color: textColor }}>{c.problemTitle || "The old way"}</h3>
          <div className="space-y-4">
            {(c.problems || []).map((item, index) => (
              <div key={index} className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4">
                <p className="font-semibold" style={{ color: textColor }}>{item.title}</p>
                <p className="mt-1 text-sm leading-6" style={{ color: mutedColor }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border p-6 md:p-8" style={{ background: panelBg, borderColor: primary + "55" }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl" style={{ background: primary + "30" }} />
          <div className="relative">
            <div className="mb-6 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white" style={{ background: primary }}>
              After
            </div>
            <h3 className="mb-5 text-2xl font-bold" style={{ color: textColor }}>{c.solutionTitle || "The PageForge way"}</h3>
            <div className="space-y-4">
              {(c.solutions || []).map((item, index) => (
                <div key={index} className="rounded-2xl border p-4" style={{ borderColor: primary + "30", background: primary + "10" }}>
                  <p className="font-semibold" style={{ color: textColor }}>{item.title}</p>
                  <p className="mt-1 text-sm leading-6" style={{ color: mutedColor }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
