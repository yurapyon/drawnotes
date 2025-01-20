import { first, last } from "radash";

export interface StringLine {
  type: "string";
  str: string;
}

export interface ImageLine {
  type: "image";
  str: string;
  id: string;
  height: number;
}

export type Line = ImageLine | StringLine;

export const DEFAULT_IMAGE_HEIGHT = 3;

export interface LineBuffer {
  lines: Line[];
}

export namespace LineBuffer {
  export const create = (): LineBuffer => {
    return {
      lines: [],
    };
  };

  export const lineFromString = (str: string): Line => {
    if (
      str.length >= 3 &&
      str[0] === "=" &&
      str[1] === "[" &&
      str[str.length - 1] === "]"
    ) {
      const [id, height_] = str.substring(2, str.length - 1).split(":");
      const height = parseInt(height_) || DEFAULT_IMAGE_HEIGHT;
      return {
        type: "image",
        str,
        id,
        height,
      };
    } else {
      return {
        type: "string",
        str,
      };
    }
  };

  export const stringFromLine = (line: Line) => {
    return line.str;
  };

  const splitText = (text: string) => {
    return text.split("\n");
  };

  export const setFromText = (buffer: LineBuffer, text: string) => {
    buffer.lines = splitText(text).map(lineFromString);
  };

  export const toText = (buffer: LineBuffer) => {
    return buffer.lines.map(stringFromLine).join("\n");
  };

  export const insertText = (
    buffer: LineBuffer,
    text: string,
    x: number,
    y: number
  ) => {
    const linesFromText = splitText(text);

    let newLines: string[] = linesFromText;

    const previousLine = stringFromLine(buffer.lines[y]);
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

    buffer.lines.splice(y, 1, ...newLines.map(lineFromString));
  };

  export const insertBlankLine = (buffer: LineBuffer, at: number) => {
    // TODO insert whitespace
    buffer.lines.splice(at, 0, lineFromString(""));
  };
}
