import { Component, Suspense } from "solid-js";
import { FolderViewer } from "~/components/Browser";
import { ImageViewer } from "~/components/ImageViewer";
import { NoteEdit } from "~/components/NoteEdit";
import { StatusBar } from "~/components/StatusBar";
import { useInitialLoad } from "~/lib/Hooks/useInitialLoad";

export const Editor: Component = () => {
  // const initialLoad = useInitialLoad();

  return (
    <div class="flex flex-col w-full h-full">
      <div class="grid grid-cols-[30ch_1fr_50ch] grid-rows-[1fr_min-content_min-content] w-full h-full">
        <FolderViewer />
        <NoteEdit />
        <ImageViewer />
        <div class="col-span-full">
          <StatusBar />
        </div>
      </div>
    </div>
  );
};
