import { Component, Show } from "solid-js";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "./_Providers/DataStoreProvider";
import { CommandBar } from "./CommandBar/CommandBar";
import { ImageViewer } from "./ImageViewer/ImageViewer";
import { LeftSidebar } from "./LeftSidebar";
import { VimEdit } from "./NoteEdit/VimEdit";

export const Editor: Component = () => {
  const store = useDataStoreContext();

  const [leftSidebarOpen, rightSidebarOpen] = store.editor.getSidebarState();

  const updateNoteText = useAutosave({
    immediate: async (id: string, buffer: LineBuffer) => {
      store.notes.updateNote(id, { lineBuffer: buffer });
    },
    debounced: async (id: string, buffer: LineBuffer) => {
      const text = LineBuffer.toText(buffer);
      await trpc.note.updateById.mutate({ id, updateObject: { text } });
    },
    delay: 500,
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
                  buffer={note.lineBuffer}
                  onBufferChange={(buffer) => updateNoteText(note.id, buffer)}
                />
              </div>
            );
          }}
        </Show>
        <Show when={rightSidebarOpen()}>
          <ImageViewer classList={{ "w-[60ch] shrink-0": true }} />
        </Show>
      </div>
      <CommandBar />
    </div>
  );
};
