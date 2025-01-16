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
    setCurrentNoteId: (id: string | null) => {
      setStore("currentNoteId", id);
    },
    getCurrentNoteId: () => {
      return store.currentNoteId;
    },
  };
};
