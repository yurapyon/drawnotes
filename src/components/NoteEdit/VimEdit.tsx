import { Component, createSignal, Index, onMount } from "solid-js";
import { EditingMode, Editor } from "~/lib/editor/Editor";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { Cursor } from "./Cursor";

interface LineProps {
  line: string;
  lineNumber: number;
  pad: number;
}

const Line: Component<LineProps> = (props) => {
  const lineNumber = () => {
    const actualPad = Math.max(2, props.pad);
    return props.lineNumber.toString().padStart(actualPad, "0");
  };

  let trailingWhitespaceCount = () => {
    const str = props.line;
    let i = str.length;
    for (; i > 0; i--) {
      if (str[i - 1] !== " ") {
        break;
      }
    }
    return str.length - i;
  };

  const whitespace = () => ".".repeat(trailingWhitespaceCount());
  const trimmed = () => props.line.trimEnd();

  return (
    <div class="flex flex-row h-[1lh] whitespace-pre">
      <span class="text-dn-gray group-focus:text-dn-gray-light whitespace-pre">
        {lineNumber()}{" "}
      </span>
      {trimmed()}
      <span class="text-blue-300">{whitespace()}</span>
    </div>
  );
};

interface VimEditProps extends ClassProps {
  buffer: LineBuffer;
  onBufferChange: (buffer: LineBuffer) => void;
}

export const VimEdit: Component<VimEditProps> = (props) => {
  const store = useDataStoreContext();

  const editor = Editor.create();

  const [localCursor, setLocalCursor] = createSignal(editor.cursor);

  let textInput!: HTMLInputElement;
  onMount(() => {
    textInput.focus();
  });

  const lineNumberPad = () => Math.ceil(Math.log10(props.buffer.lines.length));

  return (
    <div
      class="relative group focus:outline-none overflow-y-auto"
      classList={props.classList}
      ref={textInput}
      onKeyDown={(e) => {
        const copiedBuffer: LineBuffer = {
          ...props.buffer,
          lines: [...props.buffer.lines],
        };
        const { wasChanged } = Editor.handleKeyboardEvent(
          editor,
          e,
          copiedBuffer
        );
        if (wasChanged.buffer) {
          props.onBufferChange(copiedBuffer);
        }
        if (wasChanged.cursor) {
          setLocalCursor({
            ...editor.cursor,
            actual: { ...editor.cursor.actual },
          });
        }
        if (wasChanged.mode) {
          store.editor.setMode(editor.mode);
        }
      }}
      tabIndex={0}
    >
      <div class="w-full min-h-full absolute text-white z-20">
        <Index each={props.buffer.lines}>
          {(line, i) => (
            <Line line={line()} lineNumber={i} pad={lineNumberPad()} />
          )}
        </Index>
      </div>
      <Cursor
        classList={{ "absolute z-10": true }}
        x={localCursor().actual.x + 3}
        y={localCursor().actual.y}
        cursorClassList={{
          "border border-dn-gray": true,
          "group-focus:bg-mode-normal group-focus:border-0 w-full":
            store.editor.getMode() === EditingMode.Normal,
          "group-focus:bg-mode-insert group-focus:border-0 w-[0.25ch]":
            store.editor.getMode() === EditingMode.Insert,
        }}
      />
      <div
        class="w-full min-h-full absolute group-focus:bg-dn-gray-darker bg-dn-gray-dark"
        style={{
          height: `${props.buffer.lines.length}lh`,
        }}
      />
    </div>
  );
};
