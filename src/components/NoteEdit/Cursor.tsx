import { Component } from "solid-js";
import { EditingMode } from "~/lib/editor/Editor";
import { ClassProps } from "../_misc/ClassProps";

interface CursorProps extends ClassProps {
  x: number;
  y: number;
  editingMode: EditingMode;
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
      <div
        class="h-full"
        classList={{
          "bg-blue-300 w-full": props.editingMode === EditingMode.Normal,
          "bg-green-300 w-[0.25ch]": props.editingMode === EditingMode.Insert,
        }}
      />
    </div>
  );
};
