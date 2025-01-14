import { Component } from "solid-js";
import { Folders } from "./Folders";
import { FolderViewerControls } from "./FolderViewerControls";

export const FolderViewer: Component = () => {
  return (
    <div class="flex flex-col gap-2">
      <FolderViewerControls />
      <Folders />
    </div>
  );
};
