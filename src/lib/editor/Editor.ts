import { Cursor } from "./Cursor";
import { Selection, SelectionDireciton } from "./Selection";

export enum EditingMode {
  Normal = "normal",
  Insert = "insert",
  Visual = "visual",
  VisualLine = "visual-line",
}

export interface EditorSignals {
  onSelectionChange: (s: Selection) => void;
  onCursorChange: (c: Cursor) => void;
  onLinesChange: (lines: string[]) => void;
}

export interface Editor {
  mode: EditingMode;
  cursor: Cursor;
  lines: string[];
  clipboard: string[];
  selection: Selection | null;
  signals: EditorSignals | null;
}

export namespace Editor {
  export const create = (): Editor => {
    return {
      mode: EditingMode.Normal,
      cursor: Cursor.create(),
      lines: [],
      clipboard: [],
      selection: null,
      signals: null,
    };
  };

  export const setTextBuffer = (e: Editor, buffer: string) => {
    e.lines = buffer.split("\n");
    Cursor.set(e.cursor, 0, 0);
    if (e.signals) {
      e.signals.onLinesChange([...e.lines]);
      e.signals.onCursorChange(Cursor.clone(e.cursor));
    }
  };

  export const moveCursorX = (e: Editor, dx: number) => {
    Cursor.moveX(e.cursor, e.lines, dx);
    if (e.selection) {
      e.selection.endpoint.x = e.cursor.actual.x;
      if (e.signals) {
        e.signals.onSelectionChange(e.selection);
      }
    }
    if (e.signals) {
      e.signals.onCursorChange(Cursor.clone(e.cursor));
    }
  };

  export const moveCursorY = (e: Editor, dy: number) => {
    Cursor.moveY(e.cursor, e.lines, dy);
    if (e.selection) {
      e.selection.endpoint.y = e.cursor.actual.y;
      if (e.signals) {
        e.signals.onSelectionChange(e.selection);
      }
    }
    if (e.signals) {
      e.signals.onCursorChange(Cursor.clone(e.cursor));
    }
  };

  export const copy = (e: Editor) => {
    if (e.selection) {
      const copiedLines = Selection.copy(
        e.selection,
        e.lines,
        e.mode === EditingMode.VisualLine
      );
      e.clipboard = copiedLines;
    }
  };

  export const cut = (e: Editor) => {
    if (e.selection) {
      const { copiedLines, newLines } = Selection.cut(
        e.selection,
        e.lines,
        e.mode === EditingMode.VisualLine
      );
      e.clipboard = copiedLines;
      e.lines = newLines;
    }
  };

  export const insertBlankLine = (e: Editor, insertBefore: boolean) => {
    // TODO insert whitespace and move cursor.x

    const idx = e.cursor.actual.y;
    if (insertBefore) {
      e.lines.splice(idx, 0, "");
    } else {
      e.lines.splice(idx + 1, 0, "");
      moveCursorY(e, 1);
      if (e.signals) {
        e.signals.onCursorChange(Cursor.clone(e.cursor));
      }
    }
    if (e.signals) {
      e.signals.onLinesChange([...e.lines]);
    }
  };
}
