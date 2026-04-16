"use client";

import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore, type EditorBlock } from "@/lib/stores/editor-store";
import { BlockRenderer } from "./BlockRenderer";
import { cn } from "@/lib/utils";

// ============================================
// Sortable Block Wrapper
// ============================================

function SortableBlock({ block }: { block: EditorBlock }) {
  const {
    globalStyles,
    selectedBlockId,
    hoveredBlockId,
    selectBlock,
    hoverBlock,
    removeBlock,
    duplicateBlock,
    updateBlockContent,
    isPreviewOpen,
  } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        !isPreviewOpen && "cursor-pointer",
        !isPreviewOpen && isSelected && "ring-2 ring-primary ring-offset-2",
        !isPreviewOpen && isHovered && !isSelected && "ring-1 ring-primary/40"
      )}
      onClick={(e) => {
        if (isPreviewOpen) return;
        e.stopPropagation();
        selectBlock(block.id);
      }}
      onMouseEnter={() => !isPreviewOpen && hoverBlock(block.id)}
      onMouseLeave={() => !isPreviewOpen && hoverBlock(null)}
    >
      {/* Drag handle + actions (visible on hover) */}
      {!isPreviewOpen && (
        <div className="absolute -left-10 top-0 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="flex h-7 w-7 items-center justify-center rounded bg-muted text-xs hover:bg-accent cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
            {...attributes}
            {...listeners}
          >
            &#x2630;
          </button>
          <button
            className="flex h-7 w-7 items-center justify-center rounded bg-muted text-xs hover:bg-accent"
            title="Duplicate block"
            onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }}
          >
            &#x2398;
          </button>
          <button
            className="flex h-7 w-7 items-center justify-center rounded bg-destructive/10 text-xs text-destructive hover:bg-destructive/20"
            title="Delete block"
            onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Block type label */}
      {!isPreviewOpen && isSelected && (
        <div className="absolute -top-6 left-0 z-10 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          {block.type}
        </div>
      )}

      <BlockRenderer
        block={block}
        globalStyles={globalStyles}
        isEditing={!isPreviewOpen && isSelected}
        onContentChange={(content) => updateBlockContent(block.id, content)}
      />
    </div>
  );
}

// ============================================
// Editor Canvas
// ============================================

export function EditorCanvas() {
  const { blocks, moveBlock, selectBlock, previewMode, zoom } =
    useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    },
    [blocks, moveBlock]
  );

  const canvasWidth =
    previewMode === "mobile" ? 375 : previewMode === "tablet" ? 768 : "100%";

  return (
    <div
      className="flex-1 overflow-auto bg-muted/30 p-8"
      onClick={() => selectBlock(null)}
    >
      <div
        className="mx-auto min-h-[600px] bg-background shadow-sm transition-all"
        style={{
          width: canvasWidth,
          maxWidth: "100%",
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
        }}
      >
        {blocks.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No blocks yet</p>
              <p className="mt-1 text-sm">
                Add blocks from the sidebar to start building
              </p>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="relative pl-10">
                {blocks.map((block) => (
                  <SortableBlock key={block.id} block={block} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
