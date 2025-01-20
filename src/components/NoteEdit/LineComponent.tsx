import type { Image } from "@prisma/client";
import { Component, Show } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { Line, LineType } from "~/lib/editor/Line";
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
      <Show when={props.line.type === LineType.Upload && props.line}>
        {(line) => (
          <UploadLineComponent line={line()} onUpload={props.onUpload} />
        )}
      </Show>
      <Show when={props.line.type === LineType.Youtube && props.line}>
        {(line) => (
          <YoutubeLineComponent id={line().id || ""} height={line().height} />
        )}
      </Show>
    </div>
  );
};
