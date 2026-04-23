"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Member { name: string; role: string; bio?: string; photoUrl?: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

const GRADIENTS = [
  "from-violet-500 to-blue-500","from-blue-500 to-cyan-500","from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500","from-green-500 to-emerald-500","from-indigo-500 to-purple-500",
];

export function TeamBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; members?: Member[]; };
  const cols = (c.members?.length || 0) <= 2 ? "md:grid-cols-2" : (c.members?.length || 0) === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      {c.heading && (
        <div className="mb-12 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{c.heading}</h2>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-6 ${cols}`}>
        {(c.members || []).map((m, i) => (
          <div key={i} className="group rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
            {/* Avatar */}
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl">
              {m.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
              ) : (
                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} text-xl font-bold text-white`}>
                  {m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="font-bold">{m.name}</h3>
            <p className="mt-0.5 text-sm font-medium" style={{ color: globalStyles.primaryColor }}>{m.role}</p>
            {m.bio && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
