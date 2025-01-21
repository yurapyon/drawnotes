import { Image } from "@prisma/client";
import { Component, For, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Cursor } from "~/lib/editor/Cursor";
import { EditingMode, Editor } from "~/lib/editor/Editor";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { CursorComponent } from "./CursorComponent";
import { LineComponent } from "./LineComponent";

interface VimEditProps extends ClassProps {
  initialText: string;
  onTextChange: (text: string) => void;
}

export const VimEdit: Component<VimEditProps> = (props) => {
  const [editor, setEditor] = createStore(Editor.create(props.initialText));

  const store = useDataStoreContext();

  let textInput!: HTMLInputElement;
  onMount(() => {
    textInput.focus();
  });

  const lineNumberPad = () => Math.ceil(Math.log10(editor.buffer.lines.length));
  const validUploadNames = () =>
    store.images.getImages().map((image) => image.name);
  const actualCursorLocation = () =>
    Cursor.actualXYInLines(
      editor.cursor,
      editor.buffer.lines,
      validUploadNames()
    );

  const onKeyDown = async (e: KeyboardEvent) => {
    setEditor(
      produce((editor) => {
        Editor.handleKeyboardEvent(editor, e).then(({ textChanged }) => {
          if (textChanged) {
            const text = LineBuffer.toText(editor.buffer);
            props.onTextChange(text);
          }
        });
      })
    );
  };

  const onUpload = async (image: Image) => {
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
        <For each={editor.buffer.lines}>
          {(line, i) => {
            return (
              <LineComponent
                line={line}
                lineNumber={i()}
                pad={lineNumberPad()}
                mode={editor.mode}
                onUpload={onUpload}
              />
            );
          }}
        </For>
      </div>
      <CursorComponent
        classList={{ absolute: true }}
        x={actualCursorLocation().x + Math.max(lineNumberPad(), 2) + 1}
        y={actualCursorLocation().y}
        cursorClassList={{
          "border border-dn-gray w-full": editor.mode === EditingMode.ViewOnly,
          "bg-mode-normal w-full": editor.mode === EditingMode.Normal,
          "bg-mode-insert w-[0.25ch]": editor.mode === EditingMode.Insert,
        }}
      />
    </div>
  );
};
