"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
}

export function GenericBlock({ block }: Props) {
  return (
    <div className="flex items-center justify-center py-12 text-muted-foreground">
      <p className="text-sm">
        Block type: <strong>{block.type}</strong>
      </p>
    </div>
  );
}
