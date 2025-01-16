import { Component } from "solid-js";
import { NoteList } from "./NoteList";
import { FolderViewerControls } from "./FolderViewerControls";

export const FolderViewer: Component = () => {
  return (
    <div class="flex flex-col">
      {/*
      <FolderViewerControls />
       */}
      <NoteList />
    </div>
  );
};
