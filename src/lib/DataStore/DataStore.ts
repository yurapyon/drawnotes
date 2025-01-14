import { createStore } from "solid-js/store";
import {
  CommandSliceAPI,
  createCommandSlice,
  createCommandSliceAPI,
} from "./slices/command";
import { Image } from "@prisma/client";
import {
  createNoteSlice,
  createNoteSliceAPI,
  NoteSliceAPI,
} from "./slices/note";

export interface DataStoreAPI {
  commands: CommandSliceAPI;
  currentNote: string | null;
  notes: NoteSliceAPI;
  images: Image[];
}

export const createDataStore = () => {
  const [store, setStore] = createStore<DataStoreAPI>({
    commands: createCommandSliceAPI(),
    currentNote: null,
    notes: createNoteSliceAPI(),
    images: [],
  });

  const evaluateCommand = (command: string) => {
    console.log(command);
  };

  return {
    ...createCommandSlice(createStore(store.commands), evaluateCommand),
    ...createNoteSlice(createStore(store.notes)),
  };
};

export type DataStore = ReturnType<typeof createDataStore>;
