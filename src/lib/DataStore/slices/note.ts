import { Note } from "@prisma/client";
import { SetStoreFunction } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";
import { authClient } from "~/lib/auth-client";

export interface NoteSliceAPI {
  notes: Note[];
}

export const createNoteSliceAPI = () => {
  const ret: NoteSliceAPI = {
    notes: [{ id: "asdf", text: "", userId: "" }],
    //notes: [],
  };
  return ret;
};

export const createNoteSlice = (
  storeSetStore: [NoteSliceAPI, SetStoreFunction<NoteSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  const addNoteOnClient = (userId: string, newNote: Note) => {
    setStore((previousStore) => {
      return {
        ...previousStore,
        notes: [...previousStore.notes, newNote],
      };
    });
    return newNote;
  };

  const addNoteInDB = () => {};

  return {
    addNote: (userId: string) => {
      const newNote: Note = { id: uuidv4(), text: "", userId };
      setStore((previousStore) => {
        return {
          ...previousStore,
          notes: [...previousStore.notes, newNote],
        };
      });
      return newNote;
    },
    getNote: (noteId: string) => {
      return store.notes.find((note) => note.id === noteId);
    },
    updateNote: (noteId: string, updateObject: Partial<Note>) => {
      setStore("notes", (note) => note.id === noteId, updateObject);
    },
  };
};
