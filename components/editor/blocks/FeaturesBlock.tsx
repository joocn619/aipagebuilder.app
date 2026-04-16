"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function FeaturesBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    heading?: string;
    subheading?: string;
    layout?: string;
    columns?: number;
    features?: Feature[];
  };

  const cols = c.columns === 2 ? "md:grid-cols-2" : c.columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

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
        {c.subheading && (
          <p className="mt-2 text-muted-foreground">{c.subheading}</p>
        )}
      </div>
      <div className={`grid grid-cols-1 gap-8 ${cols}`}>
        {(c.features || []).map((feat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
              style={{ backgroundColor: globalStyles.primaryColor + "15", color: globalStyles.primaryColor }}
            >
              <span className="text-xl font-bold">{(feat.icon || "").charAt(0).toUpperCase() || (i + 1)}</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feat.title}</h3>
            <p className="text-sm text-muted-foreground">{feat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
