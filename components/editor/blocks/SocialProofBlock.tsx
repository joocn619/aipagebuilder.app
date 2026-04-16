"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function SocialProofBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; items?: string[]; };
  return (
    <div className="py-12 text-center">
      {isEditing ? (
        <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
      ) : (
        <h2 className="text-3xl font-bold">{c.heading}</h2>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        {(c.items || []).length > 0 ? (
          (c.items || []).map((item, i) => (
            <div key={i} className="h-10 w-24 rounded bg-muted" />
          ))
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex h-10 w-24 items-center justify-center rounded bg-muted text-xs text-muted-foreground">Logo {i + 1}</div>
          ))
        )}
      </div>
    </div>
  );
}
