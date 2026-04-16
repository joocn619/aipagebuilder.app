"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function GalleryBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; columns?: number; images?: string[]; };
  const cols = c.columns === 2 ? "md:grid-cols-2" : c.columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <div className="py-12">
      {c.heading && (
        <div className="mb-6 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-bold">{c.heading}</h2>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-4 ${cols}`}>
        {(c.images || []).length > 0 ? (
          (c.images || []).map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))
        ) : (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
              Image {i + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
