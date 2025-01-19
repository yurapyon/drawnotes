import { Note, Tag } from "@prisma/client";
import { SetStoreFunction } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";
import { LineBuffer } from "~/lib/editor/LineBuffer";
import { trpc } from "~/lib/trpc-client";

interface ClientSideNode extends Note {
  tags: Tag[];
  lineBuffer: LineBuffer;
}

export interface NoteSliceAPI {
  notes: ClientSideNode[] | null;
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
      const notes = await trpc.note.getAllWithTags.query();
      const notesWithBuffers = notes.map((note) => {
        const newNote = {
          ...note,
          lineBuffer: LineBuffer.create(),
        };

        LineBuffer.setFromText(newNote.lineBuffer, note.text);

        return newNote;
      });
      setStore("notes", notesWithBuffers);
    }
  };

  return {
    loadNotes,
    getNotes: () => {
      return store.notes;
    },
    addNote: (userId: string) => {
      const newNote: ClientSideNode = {
        id: uuidv4(),
        title: "",
        text: "",
        userId,
        tags: [],
        createdAt: new Date(),
        lineBuffer: LineBuffer.create(),
      };
      LineBuffer.setFromText(newNote.lineBuffer, "");
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
      return store.notes?.find((note) => note.id === noteId) || null;
    },
    updateNote: (noteId: string, updateObject: Partial<ClientSideNode>) => {
      setStore("notes", (note) => note.id === noteId, updateObject);
    },
  };
};
