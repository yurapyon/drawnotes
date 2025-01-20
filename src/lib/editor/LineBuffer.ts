import { first, last } from "radash";
import { Line } from "./Line";

export interface LineBuffer {
  lines: Line[];
}

export namespace LineBuffer {
  export const create = (): LineBuffer => {
    return {
      lines: [],
    };
  };

  const splitText = (text: string) => {
    return text.split("\n");
  };

  export const setFromText = (buffer: LineBuffer, text: string) => {
    buffer.lines = splitText(text).map(Line.lineFromString);
  };

  export const toText = (buffer: LineBuffer) => {
    return buffer.lines.map(Line.stringFromLine).join("\n");
  };

  export const insertText = (
    buffer: LineBuffer,
    text: string,
    x: number,
    y: number
  ) => {
    const linesFromText = splitText(text);

    let newLines: string[] = linesFromText;

    const previousLine = Line.stringFromLine(buffer.lines[y]);
    if (previousLine.length > 0) {
      const lineStart = previousLine.slice(0, x);
      const lineEnd = previousLine.slice(x);
      if (linesFromText.length === 1) {
        newLines = [`${lineStart}${first(linesFromText)}${lineEnd}`];
      } else {
        const newFirstLine = `${lineStart}${first(linesFromText)}`;
        const newLastLine = `${last(linesFromText)}${lineEnd}`;
        newLines = [newFirstLine, ...newLines.slice(1, -1), newLastLine];
      }
    }

    buffer.lines.splice(y, 1, ...newLines.map(Line.lineFromString));
  };

  export const insertBlankLine = (buffer: LineBuffer, at: number) => {
    // TODO insert whitespace
    buffer.lines.splice(at, 0, Line.lineFromString(""));
  };
}
