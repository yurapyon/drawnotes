export interface StringLine {
  type: "string";
  str: string;
}

export interface ImageLine {
  type: "image";
  str: string;
  id: string | null;
  height: number;
}

export type Line = ImageLine | StringLine;

export const DEFAULT_IMAGE_HEIGHT = 3;

export namespace Line {
  export const lineFromString = (str: string): Line => {
    if (
      str.length >= 3 &&
      str[0] === "=" &&
      str[1] === "[" &&
      str[str.length - 1] === "]"
    ) {
      const [id_, height_] = str.substring(2, str.length - 1).split(":");
      const id = id_ || null;
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

  export const height = (line: Line) => {
    switch (line.type) {
      case "string":
        return 1;
      case "image":
        if (!line.id) {
          return 2;
        } else {
          return line.height + 1;
        }
    }
  };
}
