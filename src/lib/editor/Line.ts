export enum LineType {
  String = "string",
  Upload = "upload",
  Youtube = "youtube",
}

export interface StringLine {
  type: LineType.String;
  str: string;
}

export interface UploadLine {
  type: LineType.Upload;
  str: string;
  name: string | null;
  height: number;
}

export interface YoutubeLine {
  type: LineType.Youtube;
  str: string;
  id: string | null;
  height: number;
}

export type Line = StringLine | UploadLine | YoutubeLine;

//

export const DEFAULT_IMAGE_HEIGHT = 3;
export const DEFAULT_YOUTUBE_HEIGHT = 15;

export namespace Line {
  const dataSection = (str: string): string | null => {
    if (str.length < 3 || str.substring(0, 2) !== "=[") {
      return null;
    } else {
      const rest = str.substring(2);
      const endData = rest.indexOf("]");
      if (endData < 0) {
        return null;
      }
      return rest.substring(0, endData);
    }
  };

  const userTypeToType = (userType: string) => {
    const lookup: Record<string, LineType> = {
      up: LineType.Upload,
      yt: LineType.Youtube,
    } as const;

    return lookup[userType] || null;
  };

  const createUploadLine = (data: string, fullStr: string): UploadLine => {
    const [name_, height_] = data.split(":");
    const name = name_ || null;
    const height = parseInt(height_) || DEFAULT_IMAGE_HEIGHT;
    return {
      type: LineType.Upload,
      str: fullStr,
      name,
      height,
    };
  };

  const createYoutubeLine = (data: string, fullStr: string): YoutubeLine => {
    const [id_, height_] = data.split(":");
    const id = id_ || null;
    const height = parseInt(height_) || DEFAULT_YOUTUBE_HEIGHT;
    return {
      type: LineType.Youtube,
      str: fullStr,
      id,
      height,
    };
  };

  export const lineFromString = (str: string): Line => {
    const data = dataSection(str);
    if (!!data) {
      const firstBreakIndex = data.indexOf(":");
      if (firstBreakIndex < 2) {
        return createUploadLine("", str);
      } else {
        const type = userTypeToType(data.substring(0, 2)) || LineType.Upload;

        const rest = data.substring(firstBreakIndex + 1);

        switch (type) {
          case LineType.Upload:
            return createUploadLine(rest, str);
          case LineType.Youtube:
            return createYoutubeLine(rest, str);
        }
      }
    }

    return {
      type: LineType.String,
      str,
    };
  };

  export const stringFromLine = (line: Line) => {
    return line.str;
  };

  export const height = (line: Line, validUploadNames: string[]) => {
    switch (line.type) {
      case LineType.String:
        return 1;
      case LineType.Upload:
        if (
          !line.name ||
          (line.name && !validUploadNames.includes(line.name))
        ) {
          return 2;
        } else {
          return line.height + 1;
        }
      case LineType.Youtube:
        if (!line.id) {
          return 2;
        } else {
          return line.height + 1;
        }
    }
  };
}
