import { Note } from "@prisma/client";
import { SetStoreFunction } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "~/lib/trpc-client";

export interface NoteSliceAPI {
  notes: Note[] | null;
}

export const createNoteSliceAPI = () => {
  const ret: NoteSliceAPI = {
    notes: null,
  };
  return ret;
};

export const createNoteSlice = (
  storeSetStore: [NoteSliceAPI, SetStoreFunction<NoteSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  const loadNotes = async () => {
    if (store.notes === null) {
      const notes = await trpc.note.getAll.query();
      setStore("notes", notes);
    }
  };

  return {
    loadNotes,
    addNote: (userId: string) => {
      const newNote: Note = { id: uuidv4(), text: "", userId };
      setStore((previousStore) => {
        if (previousStore.notes === null) {
          return previousStore;
        }

        return {
          ...previousStore,
          notes: [...previousStore.notes, newNote],
        };
      });
      return newNote;
    },
    getNote: (noteId: string) => {
      return store.notes?.find((note) => note.id === noteId);
    },
    updateNote: (noteId: string, updateObject: Partial<Note>) => {
      setStore("notes", (note) => note.id === noteId, updateObject);
    },
  };
};
