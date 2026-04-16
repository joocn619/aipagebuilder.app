"use client";

import { useState } from "react";
import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface TabItem { label: string; content: string; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function TabsBlock({ block, globalStyles }: Props) {
  const c = block.content as { tabs?: TabItem[]; };
  const tabs = c.tabs || [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-12">
      <div className="flex border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === i
                ? "border-b-2 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={activeTab === i ? { borderColor: globalStyles.primaryColor, color: globalStyles.primaryColor } : {}}
            onClick={() => setActiveTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm">
        {tabs[activeTab]?.content || "No content"}
      </div>
    </div>
  );
}
