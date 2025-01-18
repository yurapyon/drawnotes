import { SetStoreFunction } from "solid-js/store";
import { EditingMode } from "~/lib/editor/Editor";
import { Maths } from "~/lib/utils/maths";

export interface EditorSliceAPI {
  // Saved in DB
  currentNoteId: string | null;

  // Not saved
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  mode: EditingMode;

  cursor: Maths.Point;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
    leftSidebarOpen: true,
    rightSidebarOpen: false,
    mode: EditingMode.Normal,
    cursor: Maths.Point.zero(),
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
    getCurrentMode: () => {
      return store.mode;
    },
    setCurrentMode: (to: EditingMode) => {
      setStore("mode", to);
    },
    moveCursor: (x: number, y: number) => {
      setStore("cursor", "x", store.cursor.x + x);
      setStore("cursor", "y", store.cursor.y + y);
    },
    getCursor: () => {
      return store.cursor;
    },
  };
};
