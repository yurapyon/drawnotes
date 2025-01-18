import { Component, createEffect } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { ClassProps } from "../_misc/ClassProps";

interface CursorProps extends ClassProps {}

export const Cursor: Component<CursorProps> = (props) => {
  const store = useDataStoreContext();

  return (
    <div
      class="bg-blue-300 w-[1ch] h-[1lh]"
      classList={props.classList}
      style={{
        left: `${store.editor.getCursor().actual.x}ch`,
        top: `${store.editor.getCursor().actual.y}lh`,
      }}
    />
  );
};
