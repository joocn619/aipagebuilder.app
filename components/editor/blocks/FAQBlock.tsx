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
  const textCol = block.styles.textColor;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {c.heading && (
        <div className="mb-10 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              style={{ color: textCol || "#f1f5f9" }}
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>
              {c.heading}
            </h2>
          ) : (
            <h2 className="text-3xl font-bold" style={{ color: textCol || "#f1f5f9" }}>{c.heading}</h2>
          )}
        </div>
      )}
      <div className="mx-auto max-w-3xl space-y-3">
        {(c.items || []).map((item, i) => (
          <div key={i} className="rounded-xl border overflow-hidden"
            style={{ borderColor: textCol ? textCol + "20" : "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: textCol || "#f1f5f9" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {item.question}
              <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base font-bold transition-transform"
                style={{
                  color: textCol || "#f1f5f9",
                  transform: openIndex === i ? "rotate(45deg)" : "none",
                  opacity: 0.7,
                }}>+</span>
            </button>
            {openIndex === i && (
              <div className="border-t px-5 py-4 text-sm leading-relaxed"
                style={{
                  borderColor: textCol ? textCol + "20" : "rgba(255,255,255,0.08)",
                  color: textCol ? textCol + "bb" : "rgba(203,213,225,0.85)",
                }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
