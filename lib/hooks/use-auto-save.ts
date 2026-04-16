"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "@/lib/stores/editor-store";

export function useAutoSave(saveFunction: () => Promise<void>, intervalMs = 30000) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isDirty = useEditorStore((s) => s.isDirty);
  const isSaving = useEditorStore((s) => s.isSaving);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const state = useEditorStore.getState();
      if (state.isDirty && !state.isSaving) {
        saveFunction();
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [saveFunction, intervalMs]);

  // Warn on page unload if dirty
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirty && !isSaving) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSaving]);
}
