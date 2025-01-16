import { Component, Index, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { trpc } from "~/lib/trpc-client";
import { Note } from "@prisma/client";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { TextInput } from "../_UI/TextInput";

interface NoteEditProps {}

export const NoteEdit: Component<NoteEditProps> = (props) => {
  const store = useDataStoreContext();
  const note = () => store.notes.getNote(store.editor.getCurrentNoteId() || "");

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
                <div class="flex flex-col">
                  <div class="flex flew-row gap-[1ch]">
                    <TextInput
                      value={note().title}
                      onInput={(e) => {
                        const title = e.target.value;
                        updateNote(note().id, { title });
                      }}
                    />
                    <div class="grow min-w-0" />
                    <Index each={note().tags}>
                      {(tag) => {
                        return <div class="bg-green-300">{tag().name}</div>;
                      }}
                    </Index>
                  </div>
                  <textarea
                    class="grow min-h-0 resize-none bg-gray-200"
                    value={note().text}
                    onInput={(e) => {
                      const text = e.target.value;
                      updateNote(note().id, { text });
                    }}
                  />
                </div>
              );
            }}
          </Show>
        );
      }}
    </Show>
  );
};
