import { Maths } from "../utils/maths";

export enum SelectionDireciton {
  None = "none",
  Left = "left",
  Right = "right",
}

export interface Selection {
  anchor: Maths.Point;
  endpoint: Maths.Point;
  isFullLine: boolean;
}

export namespace Selection {
  export const create = (): Selection => {
    return {
      anchor: Maths.Point.zero(),
      endpoint: Maths.Point.zero(),
      isFullLine: false,
    };
  };

  export const start = (
    s: Selection,
    anchor: Maths.Point,
    isFullLine: boolean
  ) => {
    s.anchor = anchor;
    s.endpoint = anchor;
    s.isFullLine = isFullLine;
  };

  export const copy = (s: Selection, lines: string[]) => {
    // TODO
  };

  export const cut = (s: Selection, lines: string[]) => {
    // TODO
  };

  export const getDirection = (s: Selection) => {
    if (s.anchor.y === s.endpoint.y) {
      if (s.anchor.x === s.endpoint.x) {
        return SelectionDireciton.None;
      } else if (s.anchor.x < s.endpoint.x) {
        return SelectionDireciton.Right;
      } else if (s.anchor.x > s.endpoint.x) {
        return SelectionDireciton.Left;
      }
    } else if (s.anchor.y < s.endpoint.y) {
      return SelectionDireciton.Right;
    } else if (s.anchor.y > s.endpoint.y) {
      return SelectionDireciton.Left;
    }
  };

  export const getHighlight = (
    s: Selection,
    lines: string[]
  ): { startX: number; endX: number } => {
    let left: Maths.Point, right: Maths.Point;
    if (getDirection(s) === SelectionDireciton.Left) {
      left = s.endpoint;
      right = s.anchor;
    } else {
      left = s.anchor;
      right = s.endpoint;
    }
    let startX: number, endX: number;
    if (s.isFullLine) {
      startX = 0;
      endX = lines[right.y].length;
    } else {
      startX = left.x;
      endX = right.x;
    }
    return {
      startX,
      endX,
    };
  };
}
