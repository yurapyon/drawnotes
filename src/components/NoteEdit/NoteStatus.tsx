import { Component, Show } from "solid-js";
import { formatDate } from "~/lib/utils/formatDate";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { SaveIndicator } from "../_UI/SaveIndicator";

interface NoteStatusProps extends ClassProps {
  noteId: string;
}

export const NoteStatus: Component<NoteStatusProps> = (props) => {
  const store = useDataStoreContext();
  const note = () => store.notes.getNote(props.noteId);

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
              <div class="w-[10ch] shrink-0">
                <SaveIndicator classList={{ "w-full": true }}>
                  <div class="bg-black text-white whitespace-nowrap">
                    {dateString}
                  </div>
                </SaveIndicator>
              </div>
            </div>
          </div>
        );
      }}
    </Show>
  );
};
