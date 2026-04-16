"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function VideoBlock({ block, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; provider?: string; videoId?: string; };
  return (
    <div className="py-12">
      {c.heading && (
        <div className="mb-6 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-bold">{c.heading}</h2>
          )}
        </div>
      )}
      <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl bg-muted">
        {c.videoId ? (
          <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${c.videoId}`} allowFullScreen title="Video" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>Add a video URL in the settings panel</p>
          </div>
        )}
      </div>
    </div>
  );
}
