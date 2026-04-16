"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";

interface MenuItem { label: string; url: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function HeaderBlock({ block, globalStyles, isEditing }: Props) {
  const c = block.content as { logo?: string; menuItems?: MenuItem[]; ctaText?: string; ctaUrl?: string; };
  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-xl font-bold" style={{ color: globalStyles.primaryColor }}>{c.logo}</div>
      <nav className="hidden items-center gap-6 md:flex">
        {(c.menuItems || []).map((item, i) => (
          <a key={i} href={isEditing ? "#" : item.url} className="text-sm text-muted-foreground hover:text-foreground" onClick={(e) => isEditing && e.preventDefault()}>{item.label}</a>
        ))}
        {c.ctaText && (
          <Button size="sm" style={{ backgroundColor: globalStyles.primaryColor }} onClick={(e) => isEditing && e.preventDefault()}>{c.ctaText}</Button>
        )}
      </nav>
    </header>
  );
}
