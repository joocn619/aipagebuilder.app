"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/lib/stores/editor-store";

interface BlockContextMenuProps {
  blockId: string;
  children: React.ReactNode;
}

export function BlockContextMenu({ blockId, children }: BlockContextMenuProps) {
  const { blocks, removeBlock, duplicateBlock, copyBlock, pasteBlock, moveBlock, clipboard } =
    useEditorStore();
  const idx = blocks.findIndex((b) => b.id === blockId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => duplicateBlock(blockId)}>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyBlock(blockId)}>
          Copy Block
        </DropdownMenuItem>
        {clipboard && (
          <DropdownMenuItem onClick={() => pasteBlock(idx + 1)}>
            Paste Below
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => idx > 0 && moveBlock(idx, idx - 1)}
          disabled={idx === 0}
        >
          Move Up
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => idx < blocks.length - 1 && moveBlock(idx, idx + 1)}
          disabled={idx === blocks.length - 1}
        >
          Move Down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => removeBlock(blockId)}
          className="text-destructive focus:text-destructive"
        >
          Delete Block
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
