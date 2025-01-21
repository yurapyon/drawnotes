import { Note, Tag } from "@prisma/client";
import { useRequiredAuth } from "~/components/_Providers/RequiredAuthProvider";
import { trpc } from "~/lib/trpc-client";
import { createId } from "~/lib/utils/createId";
import { CreateStoreReturn } from "../DataStore";

interface ClientSideNode extends Note {
  tags: Tag[];
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
  storeSetStore: CreateStoreReturn<NoteSliceAPI>
) => {
  const [store, setStore] = storeSetStore;

  const session = useRequiredAuth();

  const loadNotes = async () => {
    if (store.notes === null) {
      const notes = await trpc.note.getAllWithTags.query();
      setStore("notes", notes);
    }
  };

  return {
    loadNotes,
    getNotes: () => {
      return store.notes;
    },
    addNote: () => {
      const newNote: ClientSideNode = {
        id: createId(),
        title: "",
        text: "",
        userId: session.user.id,
        tags: [],
        createdAt: new Date(),
      };
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
