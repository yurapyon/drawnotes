import { first, last } from "radash";

export interface LineBuffer {
  lines: string[];
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
    buffer.lines = splitText(text);
  };

  export const insertText = (
    buffer: LineBuffer,
    text: string,
    x: number,
    y: number
  ) => {
    const linesFromText = splitText(text);

    let newLines: string[] = linesFromText;

    const previousLine = buffer.lines[y];
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

    buffer.lines.splice(y, 1, ...newLines);
  };

  export const insertBlankLine = (buffer: LineBuffer, at: number) => {
    // TODO insert whitespace
    buffer.lines.splice(at, 0, "");
  };
}
