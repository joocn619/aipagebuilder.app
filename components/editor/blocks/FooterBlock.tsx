"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface FooterLink { label: string; url: string; }
interface FooterColumn { title: string; links: FooterLink[]; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function FooterBlock({ block, isEditing }: Props) {
  const c = block.content as { logo?: string; columns?: FooterColumn[]; copyright?: string; };
  return (
    <footer className="border-t py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div><div className="text-lg font-bold">{c.logo}</div></div>
        {(c.columns || []).map((col, i) => (
          <div key={i}>
            <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}><a href={isEditing ? "#" : link.url} className="text-sm text-muted-foreground hover:text-foreground" onClick={(e) => isEditing && e.preventDefault()}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {c.copyright && <p className="mt-8 text-center text-xs text-muted-foreground">{c.copyright}</p>}
    </footer>
  );
}
