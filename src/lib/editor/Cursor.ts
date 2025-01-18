import { Maths } from "../utils/maths";

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

  export const moveX = (c: Cursor, lines: string[], dx: number) => {
    if (dx !== 0) {
      const currentLine = lines[c.actual.y];
      const newX = Maths.clamp(c.actual.x + dx, 0, currentLine.length);
      c.actual.x = newX;
      c.desiredX = newX;
    }
  };

  export const moveY = (c: Cursor, lines: string[], dy: number) => {
    if (dy !== 0) {
      const newY = Maths.clamp(c.actual.y + dy, 0, lines.length - 1);
      c.actual.y = newY;

      const newLine = lines[newY];
      c.actual.x = Math.min(newLine.length, c.desiredX);
    }
  };
}
