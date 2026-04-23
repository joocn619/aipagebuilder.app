"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Testimonial { name: string; role?: string; company?: string; content: string; rating?: number; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

const AVATAR_COLORS = ["#7c3aed","#2563eb","#059669","#dc2626","#d97706","#0891b2","#7c3aed","#db2777"];

function isLightTextColor(col?: string): boolean {
  if (!col) return false;
  const hex = col.replace("#", "");
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45;
}

export function TestimonialsBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; layout?: string; testimonials?: Testimonial[]; };
  const textCol = block.styles.textColor;
  const lightText = isLightTextColor(textCol);
  const cols = (c.testimonials?.length || 0) === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

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
      <div className={`grid grid-cols-1 gap-5 ${cols}`}>
        {(c.testimonials || []).map((t, i) => (
          <div key={i} className="flex flex-col rounded-2xl border p-6 shadow-sm"
            style={{
              borderColor: textCol ? textCol + "20" : undefined,
              background: lightText ? "rgba(255,255,255,0.06)" : textCol ? "#ffffff" : undefined,
            }}>
            {/* Stars */}
            {(t.rating || 0) > 0 && (
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="h-4 w-4" fill={s < (t.rating || 0) ? "#f59e0b" : (lightText ? "rgba(255,255,255,0.15)" : "#e2e8f0")} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            {/* Quote mark */}
            <svg className="mb-3 h-6 w-6 opacity-20" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="flex-1 text-sm leading-relaxed"
              style={{ color: textCol ? textCol + "bb" : "rgba(100,116,139,1)" }}>{t.content}</p>
            {/* Author */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                {t.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold leading-none" style={{ color: textCol || "inherit" }}>{t.name}</p>
                <p className="mt-0.5 text-xs" style={{ color: textCol ? textCol + "80" : "rgba(100,116,139,1)" }}>
                  {t.role}{t.company ? `, ${t.company}` : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
