"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function CustomHTMLBlock({ block }: Props) {
  const c = block.content as { html?: string; };

  const sanitizedHtml = useMemo(() => {
    if (typeof window === "undefined") return c.html || "";
    return DOMPurify.sanitize(c.html || "<p>Custom HTML block</p>", {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  }, [c.html]);

  return (
    <div className="py-6">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}
