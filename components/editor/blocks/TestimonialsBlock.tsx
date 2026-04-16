"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function TestimonialsBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as {
    heading?: string;
    layout?: string;
    testimonials?: Testimonial[];
  };

  return (
    <div className="py-12">
      <div className="mb-10 text-center">
        {isEditing ? (
          <h2
            className="text-3xl font-bold outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}
          >
            {c.heading}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold">{c.heading}</h2>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {(c.testimonials || []).map((t, i) => (
          <div key={i} className="rounded-lg border bg-card p-6">
            {t.rating && (
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-yellow-500">&#9733;</span>
                ))}
              </div>
            )}
            <p className="mb-4 text-sm italic text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.role}{t.company ? `, ${t.company}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
