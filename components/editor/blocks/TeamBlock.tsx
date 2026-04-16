"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Member { name: string; role: string; bio?: string; photoUrl?: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function TeamBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; members?: Member[]; };
  return (
    <div className="py-12">
      <div className="mb-10 text-center">
        {isEditing ? (
          <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
        ) : (
          <h2 className="text-3xl font-bold">{c.heading}</h2>
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {(c.members || []).map((m, i) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
              {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">{m.name.charAt(0)}</div>
              )}
            </div>
            <h3 className="font-semibold">{m.name}</h3>
            <p className="text-sm text-muted-foreground">{m.role}</p>
            {m.bio && <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
