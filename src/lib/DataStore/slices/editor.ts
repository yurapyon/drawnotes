import { CreateStoreReturn } from "../DataStore";

export interface EditorSliceAPI {
  // Saved in DB
  // TODO change this to current linebuffer id
  currentNoteId: string | null;

  // Not saved
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
    leftSidebarOpen: true,
    rightSidebarOpen: false,
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
  };
};
