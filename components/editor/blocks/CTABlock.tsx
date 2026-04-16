"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function CTABlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    heading?: string;
    subheading?: string;
    ctaText?: string;
    ctaUrl?: string;
  };

  return (
    <div className="py-16 text-center" style={{ backgroundColor: block.styles.backgroundColor || globalStyles.primaryColor, color: "#fff" }}>
      {isEditing ? (
        <h2 className="text-3xl font-bold text-white outline-none" contentEditable suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>
          {c.heading}
        </h2>
      ) : (
        <h2 className="text-3xl font-bold text-white">{c.heading}</h2>
      )}
      {c.subheading && <p className="mt-3 text-lg text-white/80">{c.subheading}</p>}
      {c.ctaText && (
        <Button size="lg" variant="secondary" className="mt-6" onClick={(e) => isEditing && e.preventDefault()}>
          {c.ctaText}
        </Button>
      )}
    </div>
  );
}
