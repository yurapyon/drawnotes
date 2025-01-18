import { Component } from "solid-js";
import { NoteList } from "./NoteList";
import { ClassProps } from "../_misc/ClassProps";

interface BrowserProps extends ClassProps {}

export const Browser: Component<BrowserProps> = (props) => {
  return (
    <div class="flex flex-col" classList={props.classList}>
      <NoteList />
    </div>
  );
};
