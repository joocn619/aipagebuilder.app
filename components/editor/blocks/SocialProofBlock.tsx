"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function SocialProofBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; items?: string[]; };
  const textCol = block.styles.textColor;

  return (
    <div className="text-center">
      {c.heading && (
        <div className="mb-8">
          {isEditing ? (
            <p className="text-sm font-semibold uppercase tracking-widest outline-none"
              style={{ color: textCol ? textCol + "60" : "rgba(148,163,184,1)" }}
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</p>
          ) : (
            <p className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: textCol ? textCol + "60" : "rgba(148,163,184,1)" }}>{c.heading}</p>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {(c.items || []).length > 0 ? (
          (c.items || []).map((item, i) => (
            <div key={i} className="flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold tracking-tight transition-opacity hover:opacity-70"
              style={{
                color: textCol ? textCol + "80" : "rgba(100,116,139,1)",
                border: `1px solid ${textCol ? textCol + "15" : "rgba(226,232,240,1)"}`,
              }}>
              {item}
            </div>
          ))
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
          ))
        )}
      </div>
    </div>
  );
}
