"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface FooterLink { label: string; url: string; }
interface FooterColumn { title: string; links: FooterLink[]; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function FooterBlock({ block, globalStyles, isEditing }: Props) {
  const c = block.content as { logo?: string; columns?: FooterColumn[]; copyright?: string; };
  const primary = globalStyles.primaryColor || "#7c3aed";
  const textCol = block.styles.textColor;

  return (
    <footer className="border-t" style={{ borderColor: textCol ? textCol + "15" : undefined }}>
      <div className="grid grid-cols-2 gap-10 pt-10 pb-8 md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${primary}, ${primary}cc)` }}>
              {(c.logo || "P").charAt(0)}
            </div>
            <span className="font-bold" style={{ color: textCol || "inherit" }}>{c.logo}</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: textCol ? textCol + "60" : "rgba(148,163,184,1)" }}>
            Building for the future.
          </p>
        </div>

        {/* Columns */}
        {(c.columns || []).map((col, i) => (
          <div key={i}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: textCol ? textCol + "80" : "rgba(100,116,139,1)" }}>
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href={isEditing ? "#" : link.url}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: textCol ? textCol + "70" : "rgba(100,116,139,1)" }}
                    onClick={(e) => isEditing && e.preventDefault()}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {c.copyright && (
        <div className="border-t py-5 text-center text-xs"
          style={{ borderColor: textCol ? textCol + "15" : undefined, color: textCol ? textCol + "40" : "rgba(148,163,184,0.6)" }}>
          {c.copyright}
        </div>
      )}
    </footer>
  );
}
