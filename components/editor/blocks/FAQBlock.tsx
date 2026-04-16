"use client";

import { useState } from "react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function FAQBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; items?: FAQItem[] };
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-12">
      <div className="mb-10 text-center">
        {isEditing ? (
          <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>
            {c.heading}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold">{c.heading}</h2>
        )}
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {(c.items || []).map((item, i) => (
          <div key={i} className="rounded-lg border">
            <button
              className="flex w-full items-center justify-between p-4 text-left font-medium"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {item.question}
              <span className="ml-2 text-muted-foreground">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="border-t px-4 py-3 text-sm text-muted-foreground">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
