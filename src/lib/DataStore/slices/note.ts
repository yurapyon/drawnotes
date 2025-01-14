import { Note } from "@prisma/client";
import { SetStoreFunction } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";

export interface NoteSliceAPI {
  notes: Note[];
}

export const createNoteSliceAPI = () => {
  const ret: NoteSliceAPI = {
    notes: [],
  };
  return ret;
};

export const createNoteSlice = (
  storeSetStore: [NoteSliceAPI, SetStoreFunction<NoteSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  return {
    addBlankNote: (userId: string) => {
      setStore((previousStore) => {
        const newNote: Note = { id: uuidv4(), text: "", userId };
        return {
          ...previousStore,
          notes: [...previousStore.notes, newNote],
        };
      });
    },
  };
};
