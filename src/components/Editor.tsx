import { Component } from "solid-js";
import { FolderViewer } from "~/components/Browser/Browser";
import { ImageViewer } from "~/components/ImageViewer/ImageViewer";
import { NoteEdit } from "~/components/NoteEdit/NoteEdit";
import { CommandBar } from "./CommandBar/CommandBar";

export const Editor: Component = () => {
  return (
    <div class="flex flex-col w-full h-full">
      <div class="grid grid-cols-[30ch_1fr_50ch] grid-rows-[1fr_min-content_min-content] w-full h-full">
        <FolderViewer />
        <NoteEdit />
        <ImageViewer />
        <div class="col-span-full">
          <CommandBar />
        </div>
      </div>
    </div>
  );
};
