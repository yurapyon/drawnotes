import { SetStoreFunction } from "solid-js/store";
import { EditingMode, Editor } from "~/lib/editor/Editor";

export interface EditorSliceAPI {
  // Saved in DB
  // TODO change this to current linebuffer id
  currentNoteId: string | null;

  // Not saved
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;

  editor: Editor;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
    leftSidebarOpen: true,
    rightSidebarOpen: false,
    editor: Editor.create(),
  };
  return ret;
};

export const createEditorSlice = (
  storeSetStore: [EditorSliceAPI, SetStoreFunction<EditorSliceAPI>]
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
    setCurrentMode: (to: EditingMode) => {
      setStore("editor", "mode", to);
    },
    getCurrentMode: () => {
      return store.editor.mode;
    },
    getCursor: () => {
      return store.editor.cursor;
    },
  };
};
