import { createStore } from "solid-js/store";
import {
  CommandSliceAPI,
  createCommandSlice,
  createCommandSliceAPI,
} from "./slices/command";
import { Note, Image } from "@prisma/client";

export interface DataStoreAPI {
  commands: CommandSliceAPI;
  currentNote: string | null;
  notes: Note[];
  images: Image[];
}

export const createDataStore = () => {
  const [store, setStore] = createStore<DataStoreAPI>({
    commands: createCommandSliceAPI(),
    currentNote: null,
    notes: [],
    images: [],
  });

  const evaluateCommand = (command: string) => {
    console.log(command);
  };

  return {
    ...createCommandSlice(createStore(store.commands), evaluateCommand),
  };
};
