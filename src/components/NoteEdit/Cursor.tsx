import { Component } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";

interface CursorProps extends ClassProps {
  x: number;
  y: number;
  cursorClassList: Record<string, boolean | undefined>;
}

export const Cursor: Component<CursorProps> = (props) => {
  return (
    <div
      class="w-[1ch] h-[1lh]"
      classList={props.classList}
      style={{
        left: `${props.x}ch`,
        top: `${props.y}lh`,
      }}
    >
      <div class="absolute w-full h-full" classList={props.cursorClassList} />
    </div>
  );
};
