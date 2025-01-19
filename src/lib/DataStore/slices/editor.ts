import { EditingMode } from "~/lib/editor/Editor";
import { CreateStoreReturn } from "../DataStore";

export interface EditorSliceAPI {
  // Saved in DB
  // TODO change this to current linebuffer id
  currentNoteId: string | null;

  // Not saved
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;

  // TODO NODE
  // This won't work as well if you allow multipled VimEdit boxes
  mode: EditingMode;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
    leftSidebarOpen: true,
    rightSidebarOpen: false,
    mode: EditingMode.Normal,
  };
  return ret;
};

export const createEditorSlice = (
  storeSetStore: CreateStoreReturn<EditorSliceAPI>
) => {
  const [store, setStore] = storeSetStore;

  return {
    setCurrentNoteId: (id: string | null) => {
      setStore("currentNoteId", id);
    },
    getCurrentNoteId: () => {
      return store.currentNoteId;
    },
    getSidebarState: () => {
      return [() => store.leftSidebarOpen, () => store.rightSidebarOpen];
    },
    toggleSidebar: (toggleLeft: boolean) => {
      if (toggleLeft) {
        setStore("leftSidebarOpen", !store.leftSidebarOpen);
      } else {
        setStore("rightSidebarOpen", !store.rightSidebarOpen);
      }
    },
    setMode: (mode: EditingMode) => {
      setStore("mode", mode);
    },
    getMode: () => {
      return store.mode;
    },
  };
};
