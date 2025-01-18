import { Component, Show } from "solid-js";
import { Browser } from "~/components/Browser/Browser";
import { ImageViewer } from "~/components/ImageViewer/ImageViewer";
import { NoteEdit } from "~/components/NoteEdit/NoteEdit";
import { CommandBar } from "./CommandBar/CommandBar";
import { useDataStoreContext } from "./_Providers/DataStoreProvider";

export const Editor: Component = () => {
  const store = useDataStoreContext();

  const [leftSidebarOpen, rightSidebarOpen] = store.editor.getSidebarState();

  return (
    <div class="flex flex-col w-full h-full">
      <div class="w-full h-full flex flex-row">
        <Show when={leftSidebarOpen()}>
          <Browser classList={{ "w-[30ch] shrink-0": true }} />
        </Show>
        <NoteEdit classList={{ "w-full": true }} />
        <Show when={rightSidebarOpen()}>
          <ImageViewer classList={{ "w-[50ch] shrink-0": true }} />
        </Show>
      </div>
      <CommandBar />
    </div>
  );
};
