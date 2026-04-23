"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface MenuItem { label: string; url: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function HeaderBlock({ block, globalStyles, isEditing }: Props) {
  const c = block.content as { logo?: string; menuItems?: MenuItem[]; ctaText?: string; ctaUrl?: string; };
  const primary = globalStyles.primaryColor || "#7c3aed";

  return (
    <header className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-bold"
          style={{ background: `linear-gradient(135deg, ${primary}, ${primary}cc)` }}>
          {(c.logo || "P").charAt(0)}
        </div>
        <span className="text-lg font-bold" style={{ color: block.styles.textColor || "inherit" }}>{c.logo}</span>
      </div>

      {/* Nav */}
      <nav className="hidden items-center gap-7 md:flex">
        {(c.menuItems || []).map((item, i) => (
          <a key={i} href={isEditing ? "#" : item.url}
            className="text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: block.styles.textColor ? block.styles.textColor + "99" : "rgba(100,116,139,1)" }}
            onClick={(e) => isEditing && e.preventDefault()}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      {c.ctaText && (
        <a
          href={isEditing ? "#" : (c.ctaUrl || "#")}
          onClick={(e) => isEditing && e.preventDefault()}
          className="hidden rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 md:inline-flex"
          style={{ backgroundColor: primary, boxShadow: `0 4px 12px ${primary}40` }}
        >
          {c.ctaText}
        </a>
      )}
    </header>
  );
}
