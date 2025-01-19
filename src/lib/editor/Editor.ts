import { isCharacterKey } from "../utils/keyboardUtils";
import { Cursor } from "./Cursor";
import { LineBuffer } from "./LineBuffer";
import { Selection } from "./Selection";

export enum EditingMode {
  Normal = "normal",
  Insert = "insert",
  Visual = "visual",
  VisualLine = "visual-line",
}

export interface Editor {
  mode: EditingMode;
  cursor: Cursor;
  selection: Selection | null;
}

export namespace Editor {
  export const create = (): Editor => {
    return {
      mode: EditingMode.Normal,
      cursor: Cursor.create(),
      selection: null,
    };
  };

  export const resetCursor = (e: Editor) => {
    Cursor.setX(e.cursor, 0);
    Cursor.setY(e.cursor, 0);
  };

  export const moveCursorX = (e: Editor, buffer: LineBuffer, dx: number) => {
    Cursor.moveX(e.cursor, buffer.lines, dx);
    if (e.selection) {
      e.selection.endpoint.x = e.cursor.actual.x;
    }
  };

  export const moveCursorY = (e: Editor, buffer: LineBuffer, dy: number) => {
    Cursor.moveY(e.cursor, buffer.lines, dy);
    if (e.selection) {
      e.selection.endpoint.y = e.cursor.actual.y;
    }
  };

  export const copy = (e: Editor, buffer: LineBuffer) => {
    if (e.selection) {
      const copiedLines = Selection.copy(
        e.selection,
        buffer.lines,
        e.mode === EditingMode.VisualLine
      );
      return copiedLines;
    }
  };

  export const cut = (e: Editor, buffer: LineBuffer) => {
    if (e.selection) {
      const { copiedLines, newLines } = Selection.cut(
        e.selection,
        buffer.lines,
        e.mode === EditingMode.VisualLine
      );
      buffer.lines = newLines;
      return copiedLines;
    }
  };

  export const paste = (e: Editor, buffer: LineBuffer, text: string) => {
    LineBuffer.insertText(buffer, text, e.cursor.actual.x, e.cursor.actual.y);
  };

  export const insertBlankLine = (
    e: Editor,
    buffer: LineBuffer,
    insertBefore: boolean
  ) => {
    let idx = e.cursor.actual.y;
    if (!insertBefore) {
      idx += 1;
    }
    LineBuffer.insertBlankLine(buffer, idx);
    if (!insertBefore) {
      moveCursorY(e, buffer, 1);
    }
    // TODO insert move cursor.x based on the whitespace of the new line
  };

  export const handleKeyboardEvent = (
    e: Editor,
    ev: KeyboardEvent,
    buffer: LineBuffer
  ) => {
    let wasHandled = false;
    let wasChanged = {
      cursor: false,
      buffer: false,
      selection: false,
      mode: false,
    };

    switch (e.mode) {
      case EditingMode.Normal:
        {
          switch (ev.key) {
            case "h":
              moveCursorX(e, buffer, -1);
              wasHandled = true;
              wasChanged.cursor = true;
              break;
            case "j":
              moveCursorY(e, buffer, 1);
              wasHandled = true;
              wasChanged.cursor = true;
              break;
            case "k":
              moveCursorY(e, buffer, -1);
              wasHandled = true;
              wasChanged.cursor = true;
              break;
            case "l":
              moveCursorX(e, buffer, 1);
              wasHandled = true;
              wasChanged.cursor = true;
              break;
            case "O":
              insertBlankLine(e, buffer, true);
              e.mode = EditingMode.Insert;
              wasHandled = true;
              wasChanged.cursor = true;
              wasChanged.mode = true;
              wasChanged.buffer = true;
              break;
            case "o":
              insertBlankLine(e, buffer, false);
              e.mode = EditingMode.Insert;
              wasHandled = true;
              wasChanged.cursor = true;
              wasChanged.mode = true;
              wasChanged.buffer = true;
              break;
            case "i":
              e.mode = EditingMode.Insert;
              wasHandled = true;
              wasChanged.mode = true;
              break;
            case "p":
              paste(e, buffer, "asdf\n");
              wasHandled = true;
              wasChanged.cursor = true;
              wasChanged.buffer = true;
              break;
          }
        }
        break;
      case EditingMode.Insert:
        {
          if (isCharacterKey(ev)) {
            paste(e, buffer, ev.key);
            moveCursorX(e, buffer, 1);
            wasChanged.cursor = true;
            wasChanged.buffer = true;
            wasHandled = true;
          } else {
            switch (ev.key) {
              case "Enter":
                // TODO move cursor to start of new line
                ev.preventDefault();
                paste(e, buffer, "\n");
                moveCursorY(e, buffer, 1);
                Cursor.setX(e.cursor, 0);
                wasHandled = true;
                wasChanged.cursor = true;
                wasChanged.buffer = true;
                break;
              case "Escape":
                ev.preventDefault();
                e.mode = EditingMode.Normal;
                wasHandled = true;
                wasChanged.mode = true;
                break;
            }
          }
        }
        break;
    }

    return { wasHandled, wasChanged };
  };
}
