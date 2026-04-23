"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface LogoItem { name?: string; url?: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function LogoCarouselBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; speed?: number; logos?: (string | LogoItem)[]; };
  const textCol = block.styles.textColor;

  const logos: LogoItem[] = (c.logos || []).map((l) =>
    typeof l === "string" ? { name: l, url: l } : l
  );

  const speed = c.speed || 30;
  const items = logos.length > 0 ? logos : Array.from({ length: 8 }, (_, i) => ({ name: `Brand ${i + 1}`, url: "" }));
  const doubled = [...items, ...items];

  return (
    <div>
      {c.heading && (
        <div className="mb-10 text-center">
          {isEditing ? (
            <h2 className="text-2xl font-bold outline-none" contentEditable suppressContentEditableWarning
              style={textCol ? { color: textCol } : {}}
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-2xl font-bold" style={textCol ? { color: textCol } : {}}>{c.heading}</h2>
          )}
        </div>
      )}

      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
          style={{ background: `linear-gradient(to right, ${block.styles.backgroundColor || "transparent"}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
          style={{ background: `linear-gradient(to left, ${block.styles.backgroundColor || "transparent"}, transparent)` }} />

        <div
          className="flex items-center gap-8"
          style={{
            display: "flex",
            animation: `carousel-scroll ${speed}s linear infinite`,
            width: "max-content",
          }}
        >
          {doubled.map((logo, i) =>
            logo.url ? (
              <div key={i} className="flex h-10 w-28 shrink-0 items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.url} alt={logo.name || ""} className="max-h-8 max-w-full object-contain" />
              </div>
            ) : (
              <div key={i}
                className="flex h-10 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
                style={{
                  color: textCol ? textCol + "99" : "rgba(100,116,139,1)",
                  border: `1px solid ${textCol ? textCol + "20" : "rgba(226,232,240,1)"}`,
                  whiteSpace: "nowrap",
                  opacity: 0.75,
                }}>
                {logo.name}
              </div>
            )
          )}
        </div>

        <style>{`
          @keyframes carousel-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
