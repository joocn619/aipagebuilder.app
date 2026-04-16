export interface EditorBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  styles: Record<string, unknown>;
  order: number;
  isHidden?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}

export interface GlobalStyles {
  primaryColor: string;
  fontFamily: string;
  borderRadius: string;
  spacingScale: number;
}

export interface EditorState {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  globalStyles: GlobalStyles;
  previewMode: "desktop" | "tablet" | "mobile";
  isDirty: boolean;
  undoStack: EditorBlock[][];
  redoStack: EditorBlock[][];
}

export type EditorAction =
  | { type: "ADD_BLOCK"; block: EditorBlock }
  | { type: "REMOVE_BLOCK"; blockId: string }
  | { type: "UPDATE_BLOCK"; blockId: string; updates: Partial<EditorBlock> }
  | { type: "REORDER_BLOCKS"; fromIndex: number; toIndex: number }
  | { type: "SELECT_BLOCK"; blockId: string | null }
  | { type: "SET_PREVIEW_MODE"; mode: "desktop" | "tablet" | "mobile" }
  | { type: "SET_GLOBAL_STYLES"; styles: Partial<GlobalStyles> }
  | { type: "UNDO" }
  | { type: "REDO" };
