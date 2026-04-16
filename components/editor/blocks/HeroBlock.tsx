"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function HeroBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaUrl?: string;
    alignment?: string;
    imageUrl?: string;
  };

  const align = c.alignment === "left" ? "items-start text-left" : c.alignment === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <div className={`flex flex-col ${align} gap-6 py-16`}>
      {isEditing ? (
        <h1
          className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ headline: e.currentTarget.textContent || "" })}
          style={{ color: block.styles.textColor || globalStyles.secondaryColor }}
        >
          {c.headline}
        </h1>
      ) : (
        <h1
          className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          style={{ color: block.styles.textColor || globalStyles.secondaryColor }}
        >
          {c.headline}
        </h1>
      )}

      {isEditing ? (
        <p
          className="max-w-2xl text-lg text-muted-foreground md:text-xl outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ subheadline: e.currentTarget.textContent || "" })}
        >
          {c.subheadline}
        </p>
      ) : (
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          {c.subheadline}
        </p>
      )}

      {c.ctaText && (
        <Button
          size="lg"
          className="mt-2"
          style={{ backgroundColor: globalStyles.primaryColor }}
          onClick={(e) => isEditing && e.preventDefault()}
        >
          {c.ctaText}
        </Button>
      )}
    </div>
  );
}
