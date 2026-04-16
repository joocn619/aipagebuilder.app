"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function CountdownBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; mode?: string; targetDate?: string; };
  return (
    <div className="py-12 text-center" style={{ backgroundColor: block.styles.backgroundColor || "#1e293b", color: "#fff" }}>
      {isEditing ? (
        <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
      ) : (
        <h2 className="text-3xl font-bold">{c.heading}</h2>
      )}
      <div className="mt-8 flex items-center justify-center gap-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-4xl font-bold">00</span>
            <span className="mt-1 text-xs uppercase text-white/60">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
