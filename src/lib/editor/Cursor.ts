import { Maths } from "../utils/maths";
import { Line } from "./Line";

// Differences from Vim
//   Cursor can always be at line.length

export interface Cursor {
  desiredX: number;
  actual: Maths.Point;
}

export namespace Cursor {
  export const create = (): Cursor => {
    return {
      desiredX: 0,
      actual: Maths.Point.zero(),
    };
  };

  export const setX = (c: Cursor, x: number) => {
    c.actual.x = x;
    c.desiredX = x;
  };

  export const setY = (c: Cursor, y: number) => {
    c.actual.y = y;
  };

  export const moveX = (c: Cursor, lines: Line[], dx: number) => {
    if (dx !== 0) {
      const currentLine = lines[c.actual.y];
      const newX = Maths.clamp(c.actual.x + dx, 0, currentLine.str.length);
      c.actual.x = newX;
      c.desiredX = newX;
    }
  };

  export const moveY = (c: Cursor, lines: Line[], dy: number) => {
    if (dy !== 0) {
      const newY = Maths.clamp(c.actual.y + dy, 0, lines.length - 1);
      c.actual.y = newY;

      const newLine = lines[newY];
      c.actual.x = Math.min(newLine.str.length, c.desiredX);
    }
  };

  export const actualXYInLines = (
    c: Cursor,
    lines: Line[],
    validUploadNames: string[]
  ) => {
    if (lines.every((line) => line.type === "string")) {
      return c.actual;
    } else {
      const x = c.actual.x;
      const y = lines.slice(0, c.actual.y).reduce((acc, line) => {
        return acc + Line.height(line, validUploadNames);
      }, 0);
      return { x, y };
    }
  };
}
