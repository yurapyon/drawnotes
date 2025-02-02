import { Component, Show } from "solid-js";
import { useAutosave } from "~/lib/_Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "./_Providers/DataStoreProvider";
import { CommandBarComponent } from "./CommandBar/CommandBar";
import { ImageViewer } from "./ImageViewer/ImageViewer";
import { LeftSidebar } from "./LeftSidebar";
import { VimEdit } from "./NoteEdit/VimEdit";

export const Editor: Component = () => {
  const store = useDataStoreContext();

  const [leftSidebarOpen, rightSidebarOpen] = store.editor.getSidebarState();

  const updateNoteText = useAutosave({
    immediate: async (id: string, text: string) => {
      store.notes.updateNote(id, { text });
    },
    debounced: async (id: string, text: string) => {
      await trpc.note.updateById.mutate({ id, updateObject: { text } });
    },
  });

  return (
    <div class="flex flex-col w-full h-full bg-dn-gray-darker">
      <div class="w-full h-full flex flex-row">
        <Show when={leftSidebarOpen()}>
          <LeftSidebar classList={{ "w-[30ch] shrink-0": true }} />
        </Show>
        <Show when={store.editor.getSelectedNote()} keyed fallback={"Error..."}>
          {(note) => {
            return (
              <div class="flex flex-col w-full h-full">
                <VimEdit
                  classList={{ "w-full grow min-h-0": true }}
                  initialText={note.text}
                  onTextChange={(text) => updateNoteText(note.id, text)}
                />
              </div>
            );
          }}
        </Show>
        <Show when={rightSidebarOpen()}>
          <ImageViewer classList={{ "w-[60ch] shrink-0": true }} />
        </Show>
      </div>
      <CommandBarComponent onCommand={console.log} />
    </div>
  );
};
