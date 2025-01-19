import { Component, createSignal, Index } from "solid-js";
import { Editor } from "~/lib/editor/Editor";
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

  return (
    <div
      class="relative group"
      classList={props.classList}
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
          {(line) => {
            return <div class="h-[1lh]">{line()}</div>;
          }}
        </Index>
      </div>
      <Cursor
        classList={{ "absolute -z-10": true }}
        x={localCursor().actual.x}
        y={localCursor().actual.y}
        editingMode={localMode()}
      />
      <div class="w-full h-full absolute -z-20 group-focus:bg-gray-100" />
    </div>
  );
};
