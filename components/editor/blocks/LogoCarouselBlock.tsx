"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function LogoCarouselBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; speed?: number; logos?: string[]; };
  return (
    <div className="py-12 text-center">
      {c.heading && (
        isEditing ? (
          <h2 className="mb-8 text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
        ) : (
          <h2 className="mb-8 text-3xl font-bold">{c.heading}</h2>
        )
      )}
      <div className="flex items-center justify-center gap-10 overflow-hidden">
        {(c.logos || []).length > 0 ? (
          (c.logos || []).map((logo, i) => (
            <div key={i} className="flex h-10 w-28 shrink-0 items-center justify-center rounded bg-muted">
              <img src={logo} alt="" className="max-h-8 object-contain" />
            </div>
          ))
        ) : (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex h-10 w-28 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
              Logo {i + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
