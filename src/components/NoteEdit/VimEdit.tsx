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
      class="relative group focus:outline-none"
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
      <div class="w-full h-full absolute">
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
                <span
                  class="text-gray-200 whitespace-pre"
                  classList={{ "group-focus:text-gray-500": true }}
                >
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
        classList={{ "absolute -z-10": true }}
        x={localCursor().actual.x + 3}
        y={localCursor().actual.y}
        editingMode={localMode()}
        cursorClassList={{
          "border border-gray-200": true,
          "group-focus:bg-blue-300 group-focus:border-0 w-full":
            localMode() === EditingMode.Normal,
          "group-focus:bg-green-300 group-focus:border-0 w-[0.25ch]":
            localMode() === EditingMode.Insert,
        }}
      />
      <div class="w-full h-full absolute -z-20 group-focus:bg-gray-100" />
    </div>
  );
};
