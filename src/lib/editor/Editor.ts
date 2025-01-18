import { Maths } from "../utils/maths";
import { Cursor } from "./Cursor";
import { Selection, SelectionDireciton } from "./Selection";

export enum EditingMode {
  Normal = "normal",
  Insert = "insert",
  Visual = "visual",
  VisualLine = "visual-line",
}

interface Editor {
  mode: EditingMode;
  cursor: Cursor;
  lines: string[];
  clipboard: string | null;
  selection: Selection | null;
}

export namespace Editor {
  export const create = (): Editor => {
    return {
      mode: EditingMode.Normal,
      cursor: Cursor.create(),
      lines: [""],
      clipboard: null,
      selection: null,
    };
  };

  export const setTextBuffer = (e: Editor, buffer: string) => {
    e.lines = buffer.split("\n");
    Cursor.set(e.cursor, 0, 0);
  };

  export const moveCursorX = (e: Editor, dx: number) => {
    Cursor.moveX(e.cursor, e.lines, dx);
    if (e.selection) {
      e.selection.endpoint.x = e.cursor.actual.x;
    }
  };

  export const moveCursorY = (e: Editor, dy: number) => {
    Cursor.moveX(e.cursor, e.lines, dy);
    if (e.selection) {
      e.selection.endpoint.y = e.cursor.actual.y;
    }
  };
}
