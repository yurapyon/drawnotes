import { Maths } from "../utils/maths";
import { Line } from "./LineBuffer";

export enum SelectionDireciton {
  None = "none",
  Left = "left",
  Right = "right",
}

export interface Selection {
  anchor: Maths.Point;
  endpoint: Maths.Point;
}

export namespace Selection {
  export const create = (): Selection => {
    return {
      anchor: Maths.Point.zero(),
      endpoint: Maths.Point.zero(),
    };
  };

  export const start = (s: Selection, anchor: Maths.Point) => {
    s.anchor = anchor;
    s.endpoint = anchor;
  };

  export const copy = (
    s: Selection,
    lines: Line[],
    copyFullLines: boolean
  ): string[] => {
    const { start, end } = getBounds(s);
    if (copyFullLines) {
      start.x = 0;
      end.x = lines[end.y].str.length;
    }

    // TODO
    return [];
  };

  export const cut = (s: Selection, lines: Line[], cutFullLines: boolean) => {
    const copiedLines = copy(s, lines, cutFullLines);
    const newLines = [""];
    // TODO
    return { copiedLines, newLines };
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

  export const getBounds = (s: Selection) => {
    let start: Maths.Point, end: Maths.Point;
    if (getDirection(s) === SelectionDireciton.Left) {
      start = s.endpoint;
      end = s.anchor;
    } else {
      start = s.anchor;
      end = s.endpoint;
    }
    return { start, end };
  };
}
