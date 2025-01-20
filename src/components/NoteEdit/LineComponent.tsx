import { Component, Show } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { Line } from "~/lib/editor/LineBuffer";

interface LineProps {
  line: Line;
  lineNumber: number;
  pad: number;
  mode: EditingMode;
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
      <Show when={props.line.type === "image" && props.line}>
        {(line) => {
          return (
            <div
              style={{
                height: `${line().height}lh`,
                width: `${line().height}lh`,
              }}
            ></div>
          );
        }}
      </Show>
    </div>
  );
};
