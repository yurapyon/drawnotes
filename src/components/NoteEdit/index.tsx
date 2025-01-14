import { Component, createEffect, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";

interface NoteEditProps {}

export const NoteEdit: Component<NoteEditProps> = (props) => {
  const store = useDataStoreContext();
  const currentNoteId = store.editor.getCurrentNoteId();

  const note = () => store.notes.getNote(currentNoteId || "");

  createEffect(() => {
    console.log(currentNoteId);
    console.log(note()?.text);
  });

  return (
    <Show when={note()} keyed fallback={"Error..."}>
      {(note) => (
        <div class="flex flex-col">
          <div class="flex flew-row gap-[1ch]">
            <div>{note.id}</div>
            <div class="grow min-w-0" />
            <div class="bg-green-300">tag 1</div>
            <div class="bg-blue-300">tag 2</div>
            <div class="bg-yellow-300">tag 3</div>
          </div>
          <textarea
            class="grow min-h-0 resize-none bg-gray-200"
            value={note.text}
            onInput={(e) => {
              const text = e.target.value;
              store.notes.updateNote(note.id || "", { text });
            }}
          />
        </div>
      )}
    </Show>
  );
};
