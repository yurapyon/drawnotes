import { Component } from "solid-js";
import { FolderViewer } from "~/components/Browser";
import { ImageViewer } from "~/components/ImageViewer";
import { NoteEdit } from "~/components/NoteEdit";
import { StatusBar } from "~/components/StatusBar";

export const Editor: Component = () => {
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
