import { Note } from "@prisma/client";
import { Component, Index, Show } from "solid-js";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { Cursor } from "./Cursor";
import { NoteStatus } from "./NoteStatus";

interface NoteEditProps extends ClassProps {}

export const NoteEdit: Component<NoteEditProps> = (props) => {
  const store = useDataStoreContext();

  const updateNote = useAutosave({
    immediate: store.notes.updateNote,
    debounced: async (id: string, updateObject: Partial<Note>) => {
      await trpc.note.updateNote.mutate({ id, updateObject });
    },
    delay: 500,
  });

  return (
    <Show when={store.editor.getSelectedNote()} fallback={"Error..."} keyed>
      {(note) => {
        return (
          <div class="flex flex-col" classList={props.classList}>
            <NoteStatus classList={{ "w-full": true }} noteId={note.id} />
            <div class="w-full min-h-0 grow relative">
              <div class="w-full h-full absolute">
                <Index each={note.lineBuffer.lines}>
                  {(line) => {
                    return <div class="h-[1lh]">{line()}</div>;
                  }}
                </Index>
              </div>
              <Cursor classList={{ "absolute -z-10": true }} />
            </div>
          </div>
        );
      }}
    </Show>
  );
};
