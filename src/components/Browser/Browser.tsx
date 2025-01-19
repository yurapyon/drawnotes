import { Component } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { NoteList } from "./NoteList";
import { NoteStatus } from "./NoteStatus";

interface BrowserProps extends ClassProps {}

export const Browser: Component<BrowserProps> = (props) => {
  const store = useDataStoreContext();

  return (
    <div class="flex flex-col gap-[1lh]" classList={props.classList}>
      <NoteStatus noteId={store.editor.getCurrentNoteId()!} />
      <NoteList />
    </div>
  );
};
