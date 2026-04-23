"use client";

import { useEditorStore } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface EditorToolbarProps {
  onSave: () => void;
  onPublish: () => void;
  onOpenTemplates?: () => void;
  onOpenAI?: () => void;
}

export function EditorToolbar({ onSave, onPublish, onOpenTemplates, onOpenAI }: EditorToolbarProps) {
  const {
    pageTitle,
    previewMode,
    setPreviewMode,
    isDirty,
    isSaving,
    undo,
    redo,
    undoStack,
    redoStack,
    zoom,
    setZoom,
    isPreviewOpen,
    setIsPreviewOpen,
  } = useEditorStore();

  return (
    <div className="flex h-14 items-center justify-between border-b border-white/5 bg-[#0d0d18] px-4 text-white">
      {/* Left: Page title + status */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{pageTitle || "Untitled Page"}</span>
        {isDirty && (
          <Badge variant="outline" className="text-xs">
            Unsaved
          </Badge>
        )}
        {isSaving && (
          <Badge variant="secondary" className="text-xs">
            Saving...
          </Badge>
        )}
      </div>

      {/* Center: Device preview + zoom */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={undoStack.length === 0}
          title="Undo (Ctrl+Z)"
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={redoStack.length === 0}
          title="Redo (Ctrl+Shift+Z)"
        >
          Redo
        </Button>

        <div className="mx-2 h-6 w-px bg-border" />

        <Select
          value={previewMode}
          onValueChange={(v) => setPreviewMode(v as "desktop" | "tablet" | "mobile")}
        >
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setZoom(zoom - 10)}>
            -
          </Button>
          <span className="w-10 text-center text-xs">{zoom}%</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setZoom(zoom + 10)}>
            +
          </Button>
        </div>
      </div>

      {/* Right: Templates + Preview + Save + Publish */}
      <div className="flex items-center gap-2">
        {onOpenAI && (
          <Button variant="ghost" size="sm" onClick={onOpenAI}>
            AI
          </Button>
        )}
        {onOpenTemplates && (
          <Button variant="ghost" size="sm" onClick={onOpenTemplates}>
            Templates
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
          {isPreviewOpen ? "Edit" : "Preview"}
        </Button>
        <Button variant="outline" size="sm" onClick={onSave} disabled={!isDirty || isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button size="sm" onClick={onPublish}>
          Publish
        </Button>
      </div>
    </div>
  );
}
