import type { Image } from "@prisma/client";
import { Component, Match, Switch } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { Line, LineType, UploadLine, YoutubeLine } from "~/lib/editor/Line";
import { UploadLineComponent } from "./Lines/UploadLineComponent";
import { YoutubeLineComponent } from "./Lines/YoutubeLineComponent";

interface LineProps {
  line: Line;
  lineNumber: number;
  pad: number;
  mode: EditingMode;
  onUpload: (image: Image) => void;
}

export const LineComponent: Component<LineProps> = (props) => {
  const lineNumber = () => {
    const actualPad = Math.max(2, props.pad);
    return props.lineNumber.toString().padStart(actualPad, "0");
  };

  let trailingWhitespaceCount = () => {
    const str = props.line.str;
    let i = str.length;
    for (; i > 0; i--) {
      if (str[i - 1] !== " ") {
        break;
      }
    }
    return str.length - i;
  };

  const whitespace = () => ".".repeat(trailingWhitespaceCount());
  const trimmed = () => props.line.str.trimEnd();

  return (
    <div class="flex flex-col">
      <div class="flex flex-row h-[1lh] whitespace-pre">
        <div
          class="text-dn-gray whitespace-pre"
          classList={{
            "text-dn-gray": props.mode !== EditingMode.ViewOnly,
            "text-dn-gray-light": props.mode === EditingMode.ViewOnly,
          }}
        >
          {lineNumber()}{" "}
        </div>
        {trimmed()}
        <div class="text-blue-300">{whitespace()}</div>
      </div>
      <Switch>
        <Match when={props.line.type === LineType.Upload}>
          <UploadLineComponent
            line={props.line as UploadLine}
            onUpload={props.onUpload}
          />
        </Match>
        <Match when={props.line.type === LineType.Youtube}>
          <YoutubeLineComponent
            id={(props.line as YoutubeLine).id || ""}
            height={(props.line as YoutubeLine).height}
          />
        </Match>
      </Switch>
    </div>
  );
};
