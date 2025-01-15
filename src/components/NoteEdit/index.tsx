import { Component, createEffect, Index, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { debounce } from "radash";
import { trpc } from "~/lib/trpc-client";
import { Note } from "@prisma/client";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { destructureNoteText } from "~/lib/noteUtils";

interface NoteEditProps {}

export const NoteEdit: Component<NoteEditProps> = (props) => {
  const store = useDataStoreContext();
  const currentNoteId = store.editor.getCurrentNoteId();

  const note = () => store.notes.getNote(currentNoteId || "");

  const updateNote = useAutosave({
    immediate: store.notes.updateNote,
    debounced: async (id: string, updateObject: Partial<Note>) => {
      await trpc.note.updateNote.mutate({ id, updateObject });
    },
    delay: 500,
  });

  return (
    <Show when={note()} keyed fallback={"Error..."}>
      {(note) => {
        const destructured = () => destructureNoteText(note.text);
        return (
          <div class="flex flex-col">
            <div class="flex flew-row gap-[1ch]">
              <div>{destructured().title}</div>
              <div class="grow min-w-0" />
              <Index each={destructured().tags}>
                {(tag) => {
                  return <div class="bg-green-300">{tag()}</div>;
                }}
              </Index>
            </div>
            <textarea
              class="grow min-h-0 resize-none bg-gray-200"
              value={note.text}
              onInput={(e) => {
                const text = e.target.value;
                updateNote(note.id, { text });
              }}
            />
          </div>
        );
      }}
    </Show>
  );
};
