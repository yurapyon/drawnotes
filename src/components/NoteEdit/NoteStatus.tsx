import { Component, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { Note } from "@prisma/client";
import { trpc } from "~/lib/trpc-client";
import { TextInput } from "../_UI/TextInput";
import { formatDate } from "~/lib/utils/formatDate";

interface NoteStatusProps {
  classList?: Record<string, boolean | undefined>;
  noteId: string;
}

export const NoteStatus: Component<NoteStatusProps> = (props) => {
  const store = useDataStoreContext();
  const note = () => store.notes.getNote(props.noteId);
  const isSaving = () => store.autosave.isSaving();

  return (
    <Show when={note()}>
      {(note) => {
        const dateString = formatDate(note().createdAt);
        return (
          <div class="flex flex-col" classList={{ ...props.classList }}>
            <div class="flex flex-row w-full">
              <div class="flex flex-row w-full gap-[1ch]">
                <div>tag1</div>
                <div>tag2</div>
                <div>tag3</div>
              </div>
              <div class="grow min-h-0" />
              <Show
                when={!isSaving()}
                fallback={
                  <div class="bg-yellow-300 shrink-0 w-[10ch]">...</div>
                }
              >
                <div class="bg-black text-white whitespace-nowrap">
                  {dateString}
                </div>
              </Show>
            </div>
          </div>
        );
      }}
    </Show>
  );
};
