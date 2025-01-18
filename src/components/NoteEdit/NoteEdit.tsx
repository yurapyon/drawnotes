import { Component, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { trpc } from "~/lib/trpc-client";
import { Note } from "@prisma/client";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { NoteStatus } from "./NoteStatus";
import { ClassProps } from "../_misc/ClassProps";
import { Cursor } from "./Cursor";

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
    <Show when={store.editor.getCurrentNoteId()} keyed fallback={"Error..."}>
      {(noteId) => {
        const note = store.notes.getNote(noteId);
        return (
          <Show when={note} fallback={"Error..."}>
            {(note) => {
              return (
                <div class="flex flex-col" classList={props.classList}>
                  <NoteStatus
                    classList={{ "w-full": true }}
                    noteId={note().id}
                  />
                  <div class="w-full min-h-0 grow relative">
                    <div class="absolute w-full h-full">{note().text}</div>
                    <Cursor classList={{ "absolute -z-10": true }} />
                  </div>
                  {/*
                  <textarea
                    class="grow min-h-0 resize-none bg-gray-200"
                    value={note().text}
                    onInput={(e) => {
                      const text = e.target.value;
                      updateNote(note().id, { text });
                    }}
                  />
                  */}
                </div>
              );
            }}
          </Show>
        );
      }}
    </Show>
  );
};
