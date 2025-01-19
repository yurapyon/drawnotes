import { Component } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { ClassProps } from "../_misc/ClassProps";

interface CursorProps extends ClassProps {
  x: number;
  y: number;
  editingMode: EditingMode;
  cursorClassList: Record<string, boolean | undefined>;
}

export const Cursor: Component<CursorProps> = (props) => {
  return (
    <div
      class="w-[1ch] h-[1lh]"
      classList={{
        ...props.classList,
      }}
      style={{
        left: `${props.x}ch`,
        top: `${props.y}lh`,
      }}
    >
      <div class="h-full" classList={props.cursorClassList} />
    </div>
  );
};
