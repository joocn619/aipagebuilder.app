"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function HeroBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    headline?: string; subheadline?: string;
    ctaText?: string; ctaUrl?: string;
    secondaryCtaText?: string; secondaryCtaUrl?: string;
    badge?: string; alignment?: string;
  };

  const align = c.alignment === "left" ? "items-start text-left" : c.alignment === "right" ? "items-end text-right" : "items-center text-center";
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;
  const hasDarkBg = !!block.styles.backgroundColor;

  return (
    <div className={`relative flex flex-col ${align} gap-6 overflow-hidden`}>
      {/* Animated background blobs */}
      {hasDarkBg && (
        <>
          <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full opacity-20 pf-blob pf-float"
            style={{ background: `radial-gradient(circle, ${primary}, transparent 70%)` }} />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-15 pf-blob"
            style={{ background: `radial-gradient(circle, ${primary}cc, transparent 70%)`, animationDelay: "3s" }} />
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: `radial-gradient(circle, ${textCol || "#ffffff"} 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        </>
      )}

      {/* Badge */}
      {c.badge && (
        <div className="pf-fade-up relative z-10 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
          style={{ borderColor: primary + "50", backgroundColor: primary + "18", color: primary }}>
          <span className="h-1.5 w-1.5 rounded-full pf-pulse-ring" style={{ backgroundColor: primary }} />
          {c.badge}
        </div>
      )}

      {/* Headline — gradient on dark bg, solid on light */}
      {isEditing ? (
        <h1 className={`relative z-10 text-4xl font-extrabold leading-[1.1] tracking-tight outline-none md:text-5xl lg:text-6xl xl:text-7xl pf-fade-up pf-delay-1 ${hasDarkBg ? "pf-gradient-text pf-shimmer-text" : ""}`}
          style={hasDarkBg ? {
            backgroundImage: `linear-gradient(135deg, ${textCol || "#ffffff"} 0%, ${primary} 50%, ${textCol || "#ffffff"} 100%)`,
            backgroundSize: "200% auto",
          } : { color: textCol || "inherit" }}
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ headline: e.currentTarget.textContent || "" })}>
          {c.headline}
        </h1>
      ) : (
        <h1 className={`relative z-10 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl pf-fade-up pf-delay-1 ${hasDarkBg ? "pf-gradient-text pf-shimmer-text" : ""}`}
          style={hasDarkBg ? {
            backgroundImage: `linear-gradient(135deg, ${textCol || "#ffffff"} 0%, ${primary} 50%, ${textCol || "#ffffff"} 100%)`,
            backgroundSize: "200% auto",
          } : { color: textCol || "inherit" }}>
          {c.headline}
        </h1>
      )}

      {/* Subheadline */}
      {c.subheadline && (
        <p className="relative z-10 max-w-2xl text-lg leading-relaxed md:text-xl pf-fade-up pf-delay-2"
          style={{ color: textCol ? textCol + "bb" : "rgba(100,116,139,1)" }}>
          {c.subheadline}
        </p>
      )}

      {/* CTAs */}
      {(c.ctaText || c.secondaryCtaText) && (
        <div className={`relative z-10 flex flex-wrap gap-3 pf-fade-up pf-delay-3 ${c.alignment === "center" ? "justify-center" : ""}`}>
          {c.ctaText && (
            <a href={isEditing ? "#" : (c.ctaUrl || "#")}
              onClick={(e) => isEditing && e.preventDefault()}
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
              style={{ backgroundColor: primary, boxShadow: `0 8px 32px ${primary}50` }}>
              {c.ctaText}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          )}
          {c.secondaryCtaText && (
            <a href={isEditing ? "#" : (c.secondaryCtaUrl || "#")}
              onClick={(e) => isEditing && e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-sm font-bold transition-all hover:opacity-80 hover:-translate-y-0.5"
              style={{ borderColor: primary + "60", color: textCol || primary, backdropFilter: "blur(4px)" }}>
              {c.secondaryCtaText}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
