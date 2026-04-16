"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Stat { value: number; label: string; prefix?: string; suffix?: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function StatsBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; stats?: Stat[]; };
  return (
    <div className="py-12 text-center">
      {c.heading && (
        isEditing ? (
          <h2 className="mb-10 text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
        ) : (
          <h2 className="mb-10 text-3xl font-bold">{c.heading}</h2>
        )
      )}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
        {(c.stats || []).map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-bold" style={{ color: globalStyles.primaryColor }}>
              {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
