"use client";

import { useState } from "react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface AccordionItem { title: string; content: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function AccordionBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; items?: AccordionItem[]; };
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="py-12">
      {c.heading && (
        <div className="mb-8 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-bold">{c.heading}</h2>
          )}
        </div>
      )}
      <div className="mx-auto max-w-3xl space-y-2">
        {(c.items || []).map((item, i) => (
          <div key={i} className="rounded-lg border">
            <button className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-accent/50 transition-colors"
              onClick={() => toggle(i)}>
              {item.title}
              <span className="ml-2 text-muted-foreground transition-transform" style={{ transform: openIndices.has(i) ? "rotate(180deg)" : "rotate(0)" }}>
                &#9660;
              </span>
            </button>
            {openIndices.has(i) && (
              <div className="border-t px-4 py-3 text-sm text-muted-foreground">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
