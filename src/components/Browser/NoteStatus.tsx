import { Note } from "@prisma/client";
import { Component, Show } from "solid-js";
import { useAutosave } from "~/lib/_Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { formatDate } from "~/lib/utils/dates";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { NameEditor } from "../_UI/NameEditor";
import { SaveIndicator } from "../_UI/SaveIndicator";

interface NoteStatusProps extends ClassProps {
  noteId: string;
}

export const NoteStatus: Component<NoteStatusProps> = (props) => {
  const store = useDataStoreContext();
  const note = () => store.notes.getNote(props.noteId);

  const updateNote = useAutosave({
    immediate: store.notes.updateNote,
    debounced: async (id: string, updateObject: Partial<Note>) => {
      await trpc.note.updateById.mutate({ id, updateObject });
    },
    delay: 500,
  });

  return (
    <Show when={note()} keyed>
      {(note) => {
        const dateString = formatDate(note.createdAt);
        return (
          <div class="flex flex-col" classList={{ ...props.classList }}>
            <NameEditor
              value={note.title}
              onConfirm={(title) => updateNote(note.id, { title })}
            >
              <div>
                {note.title || <span class="text-dn-gray-light">untitled</span>}
              </div>
            </NameEditor>
            <div class="flex flex-row w-full">
              <div class="flex flex-row w-full gap-[1ch]">
                <div>tag1</div>
                <div>tag2</div>
                <div>tag3</div>
              </div>
              <div class="grow min-h-0" />
            </div>
            <div class="flex flex-row">
              <div class="w-[10ch] shrink-0">
                <div class="bg-black text-white whitespace-nowrap">
                  {dateString}
                </div>
              </div>
              <SaveIndicator />
            </div>
          </div>
        );
      }}
    </Show>
  );
};
