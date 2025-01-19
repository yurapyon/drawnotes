import { Component, createSignal, Index, onMount } from "solid-js";
import { EditingMode, Editor } from "~/lib/editor/Editor";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { ClassProps } from "../_misc/ClassProps";
import { Cursor } from "./Cursor";

interface VimEditProps extends ClassProps {
  buffer: LineBuffer;
  onBufferChange: (buffer: LineBuffer) => void;
}

export const VimEdit: Component<VimEditProps> = (props) => {
  const editor = Editor.create();

  const [localCursor, setLocalCursor] = createSignal(editor.cursor);
  const [localMode, setLocalMode] = createSignal(editor.mode);

  let textInput!: HTMLInputElement;
  onMount(() => {
    textInput.focus();
  });

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
          setLocalMode(editor.mode);
        }
      }}
      tabIndex={0}
    >
      <div class="w-full min-h-full absolute text-white z-20">
        <Index each={props.buffer.lines}>
          {(line, i) => {
            // TODO max len
            const lineNumber = `${i.toString().padStart(2, "0")} `;
            let trailingWhitespaceCount = () => {
              const str = line();
              let i = str.length;
              for (; i > 0; i--) {
                if (str[i - 1] !== " ") {
                  break;
                }
              }
              return str.length - i;
            };
            const whitespace = () => ".".repeat(trailingWhitespaceCount());
            const trimmed = () => line().trimEnd();
            return (
              <div class="flex flex-row">
                <span class="text-dn-gray group-focus:text-dn-gray-light whitespace-pre">
                  {lineNumber}
                </span>
                <div class="h-[1lh] whitespace-pre">
                  {trimmed()}
                  <span class="text-blue-300">{whitespace()}</span>
                </div>
              </div>
            );
          }}
        </Index>
      </div>
      <Cursor
        classList={{ "absolute z-10": true }}
        x={localCursor().actual.x + 3}
        y={localCursor().actual.y}
        cursorClassList={{
          "border border-dn-gray": true,
          "group-focus:bg-mode-normal group-focus:border-0 w-full":
            localMode() === EditingMode.Normal,
          "group-focus:bg-mode-insert group-focus:border-0 w-[0.25ch]":
            localMode() === EditingMode.Insert,
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
