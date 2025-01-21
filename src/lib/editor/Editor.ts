import { isCharacterKey } from "../utils/keyboardUtils";
import { Cursor } from "./Cursor";
import { Line } from "./Line";
import { LineBuffer } from "./LineBuffer";
import { Selection } from "./Selection";

export enum EditingMode {
  ViewOnly = "view-only",
  Normal = "normal",
  Insert = "insert",
  Visual = "visual",
  VisualLine = "visual-line",
}

export interface Editor {
  mode: EditingMode;
  cursor: Cursor;
  selection: Selection | null;
  buffer: LineBuffer;
}

export namespace Editor {
  export const create = (initialText: string): Editor => {
    const buffer = LineBuffer.create();
    LineBuffer.setFromText(buffer, initialText);
    return {
      mode: EditingMode.Normal,
      cursor: Cursor.create(),
      selection: null,
      buffer,
    };
  };

  export const resetCursor = (e: Editor) => {
    Cursor.setX(e.cursor, 0);
    Cursor.setY(e.cursor, 0);
  };

  export const moveCursorX = (e: Editor, dx: number) => {
    Cursor.moveX(e.cursor, e.buffer.lines, dx);
    if (e.selection) {
      e.selection.endpoint.x = e.cursor.actual.x;
    }
  };

  export const moveCursorY = (e: Editor, dy: number) => {
    Cursor.moveY(e.cursor, e.buffer.lines, dy);
    if (e.selection) {
      e.selection.endpoint.y = e.cursor.actual.y;
    }
  };

  export const copy = (e: Editor) => {
    if (e.selection) {
      const copiedLines = Selection.copy(
        e.selection,
        e.buffer.lines,
        e.mode === EditingMode.VisualLine
      );
      return copiedLines;
    }
  };

  export const cut = (e: Editor, buffer: LineBuffer) => {
    // TODO
    /*
    if (e.selection) {
      const { copiedLines, newLines } = Selection.cut(
        e.selection,
        buffer.lines,
        e.mode === EditingMode.VisualLine
      );
      buffer.lines = newLines;
      return copiedLines;
    }
    */
  };

  const paste = (e: Editor, text: string) => {
    LineBuffer.insertText(e.buffer, text, e.cursor.actual.x, e.cursor.actual.y);
  };

  export const backspace = (e: Editor) => {
    const { x, y } = e.cursor.actual;

    if (x === 0) {
      if (y === 0) {
        // do nothing
      } else {
        const currentLine = Line.stringFromLine(e.buffer.lines[y]);
        const targetLine = Line.stringFromLine(e.buffer.lines[y - 1]);
        const newLine = Line.lineFromString(targetLine + currentLine);
        e.buffer.lines.splice(y - 1, 2, newLine);
        Cursor.setX(e.cursor, targetLine.length);
        moveCursorY(e, -1);
      }
    } else {
      const currentLine = Line.stringFromLine(e.buffer.lines[y]);
      e.buffer.lines[y] = Line.lineFromString(
        currentLine.substring(0, x - 1) + currentLine.substring(x)
      );
      moveCursorX(e, -1);
    }
  };

  export const insertBlankLine = (e: Editor, insertBefore: boolean) => {
    let idx = e.cursor.actual.y;
    if (!insertBefore) {
      idx += 1;
    }
    LineBuffer.insertBlankLine(e.buffer, idx);
    if (!insertBefore) {
      moveCursorY(e, 1);
    }
    // TODO insert move cursor.x based on the whitespace of the new line
  };

  export const handleKeyboardEvent = async (e: Editor, ev: KeyboardEvent) => {
    let textChanged = false;

    ev.preventDefault();

    switch (e.mode) {
      case EditingMode.ViewOnly:
        {
          switch (ev.key) {
            case "Escape":
              e.mode = EditingMode.Normal;
              break;
          }
        }
        break;
      case EditingMode.Normal:
        {
          switch (ev.key) {
            case "h":
              moveCursorX(e, -1);
              break;
            case "j":
              moveCursorY(e, 1);
              break;
            case "k":
              moveCursorY(e, -1);
              break;
            case "l":
              moveCursorX(e, 1);
              break;
            case "q":
              e.mode = EditingMode.ViewOnly;
              break;
            case "O":
              insertBlankLine(e, true);
              e.mode = EditingMode.Insert;
              textChanged = true;
              break;
            case "o":
              insertBlankLine(e, false);
              e.mode = EditingMode.Insert;
              textChanged = true;
              break;
            case "i":
              e.mode = EditingMode.Insert;
              break;
            case "A":
              const currentLine = e.buffer.lines[e.cursor.actual.y];
              Cursor.setX(e.cursor, currentLine.str.length);
              e.mode = EditingMode.Insert;
              break;
            case "p":
            // paste(e, buffer, "asdf\n");
            case "v":
              // TODO update this
              if (ev.metaKey) {
                const text = await navigator.clipboard.readText();
                paste(e, text);
                textChanged = true;
              }
              break;
          }
        }
        break;
      case EditingMode.Insert:
        {
          if (isCharacterKey(ev)) {
            paste(e, ev.key);
            moveCursorX(e, 1);
            textChanged = true;
          } else {
            switch (ev.key) {
              case "Backspace":
                Editor.backspace(e);
                textChanged = true;
                // TODO move to previous line
                break;
              case "Tab":
                paste(e, "  ");
                moveCursorX(e, 2);
                textChanged = true;
                break;
              case "Enter":
                // TODO move cursor to start of new line
                paste(e, "\n");
                moveCursorY(e, 1);
                Cursor.setX(e.cursor, 0);
                textChanged = true;
                break;
              case "Escape":
                e.mode = EditingMode.Normal;
                break;
            }
          }
        }
        break;
    }

    return { textChanged };
  };
}
