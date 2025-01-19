import { Component, Show } from "solid-js";
import { Browser } from "~/components/Browser/Browser";
import { ImageViewer } from "~/components/ImageViewer/ImageViewer";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "./_Providers/DataStoreProvider";
import { CommandBar } from "./CommandBar/CommandBar";
import { VimEdit } from "./NoteEdit/VimEdit";

export const Editor: Component = () => {
  const store = useDataStoreContext();

  const [leftSidebarOpen, rightSidebarOpen] = store.editor.getSidebarState();

  const updateNoteText = useAutosave({
    immediate: async (id: string, buffer: LineBuffer) => {
      store.notes.updateNote(id, { lineBuffer: buffer });
    },
    debounced: async (id: string, buffer: LineBuffer) => {
      const text = [...buffer.lines].join("\n");
      await trpc.note.updateNote.mutate({ id, updateObject: { text } });
    },
    delay: 500,
  });

  return (
    <div class="flex flex-col w-full h-full">
      <div class="w-full h-full flex flex-row gap-[1ch]">
        <Show when={leftSidebarOpen()}>
          <Browser classList={{ "w-[30ch] shrink-0": true }} />
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
          <ImageViewer classList={{ "w-[50ch] shrink-0": true }} />
        </Show>
      </div>
      <CommandBar />
    </div>
  );
};
