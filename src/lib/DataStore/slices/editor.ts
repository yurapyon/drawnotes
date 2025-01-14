import { SetStoreFunction } from "solid-js/store";

export interface EditorSliceAPI {
  currentNoteId: string | null;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
  };
  return ret;
};

export const createEditorSlice = (
  storeSetStore: [EditorSliceAPI, SetStoreFunction<EditorSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  return {
    setCurrentNoteId: (id: string) => {
      console.log("here", id);
      setStore("currentNoteId", id);
    },
    getCurrentNoteId: () => {
      console.log("here2", store.currentNoteId);
      return store.currentNoteId;
    },
  };
};
