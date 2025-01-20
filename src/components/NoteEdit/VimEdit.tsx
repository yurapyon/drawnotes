import { Image } from "@prisma/client";
import {
  Component,
  createEffect,
  createSignal,
  Index,
  onMount,
} from "solid-js";
import { Cursor } from "~/lib/editor/Cursor";
import { EditingMode, Editor } from "~/lib/editor/Editor";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { CursorComponent } from "./CursorComponent";
import { LineComponent } from "./LineComponent";

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
    // store.editor.setMode(editor.mode);
    editor.mode = store.editor.getMode();
    textInput.focus();
  });

  const lineNumberPad = () => Math.ceil(Math.log10(props.buffer.lines.length));
  const mode = () => store.editor.getMode();

  const actualCursorLocation = () =>
    Cursor.actualXYInLines(localCursor(), props.buffer.lines);

  const onKeyDown = (e: KeyboardEvent) => {
    const copiedBuffer: LineBuffer = {
      ...props.buffer,
      lines: [...props.buffer.lines],
    };
    const { wasChanged } = Editor.handleKeyboardEvent(editor, e, copiedBuffer);
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
  };

  createEffect(() => {
    console.log(props.buffer);
  });

  const onImageUpload = async (image: Image) => {
    store.images.addImageOnClient(image);
  };

  return (
    <div
      class="relative group focus:outline-none overflow-y-auto w-full h-full"
      classList={props.classList}
      ref={textInput}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div class="absolute w-full text-white z-10">
        <Index each={props.buffer.lines}>
          {(line, i) => (
            <LineComponent
              line={line()}
              lineNumber={i}
              pad={lineNumberPad()}
              mode={mode()}
              onImageUpload={onImageUpload}
            />
          )}
        </Index>
      </div>
      <CursorComponent
        classList={{ absolute: true }}
        x={actualCursorLocation().x + Math.max(lineNumberPad(), 2) + 1}
        y={actualCursorLocation().y}
        cursorClassList={{
          "border border-dn-gray w-full": mode() === EditingMode.ViewOnly,
          "bg-mode-normal w-full": mode() === EditingMode.Normal,
          "bg-mode-insert w-[0.25ch]": mode() === EditingMode.Insert,
        }}
      />
    </div>
  );
};
