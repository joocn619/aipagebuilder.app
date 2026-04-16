"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/stores/editor-store";

export function useEditorShortcuts(onSave: () => void) {
  const { undo, redo, selectedBlockId, removeBlock, duplicateBlock, copyBlock, pasteBlock } =
    useEditorStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isCtrl = e.ctrlKey || e.metaKey;

      // Ignore if typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      // Ctrl+Z — Undo
      if (isCtrl && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Ctrl+Shift+Z or Ctrl+Y — Redo
      if (isCtrl && ((e.key === "z" && e.shiftKey) || e.key === "y")) {
        e.preventDefault();
        redo();
      }

      // Ctrl+S — Save
      if (isCtrl && e.key === "s") {
        e.preventDefault();
        onSave();
      }

      // Ctrl+D — Duplicate selected block
      if (isCtrl && e.key === "d" && selectedBlockId) {
        e.preventDefault();
        duplicateBlock(selectedBlockId);
      }

      // Ctrl+C — Copy selected block
      if (isCtrl && e.key === "c" && selectedBlockId) {
        copyBlock(selectedBlockId);
      }

      // Ctrl+V — Paste block
      if (isCtrl && e.key === "v" && useEditorStore.getState().clipboard) {
        e.preventDefault();
        const state = useEditorStore.getState();
        const idx = selectedBlockId ? state.blocks.findIndex((b) => b.id === selectedBlockId) + 1 : undefined;
        pasteBlock(idx);
      }

      // Delete/Backspace — Remove selected block
      if ((e.key === "Delete" || e.key === "Backspace") && selectedBlockId) {
        // Only if not inside contentEditable
        const sel = window.getSelection();
        if (sel && sel.anchorNode) {
          const el = sel.anchorNode.parentElement;
          if (el?.closest("[contenteditable]")) return;
        }
        e.preventDefault();
        removeBlock(selectedBlockId);
      }

      // Escape — Deselect
      if (e.key === "Escape") {
        useEditorStore.getState().selectBlock(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, selectedBlockId, removeBlock, duplicateBlock, copyBlock, pasteBlock, onSave]);
}
