import { Component } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { ClassProps } from "../_misc/ClassProps";

interface CursorProps extends ClassProps {}

export const Cursor: Component<CursorProps> = (props) => {
  const store = useDataStoreContext();

  return (
    <div
      class="w-[1ch] h-[1lh]"
      classList={{
        ...props.classList,
      }}
      style={{
        left: `${store.editor.getCursor().actual.x}ch`,
        top: `${store.editor.getCursor().actual.y}lh`,
      }}
    >
      <div
        class="h-full"
        classList={{
          "bg-blue-300 w-full":
            store.editor.getCurrentMode() === EditingMode.Normal,
          "bg-green-300 w-[0.25ch]":
            store.editor.getCurrentMode() === EditingMode.Insert,
        }}
      />
    </div>
  );
};
