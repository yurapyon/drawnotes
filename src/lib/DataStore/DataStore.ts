import { createStore } from "solid-js/store";
import {
  CommandSliceAPI,
  createCommandSlice,
  createCommandSliceAPI,
} from "./slices/command";
import {
  createNoteSlice,
  createNoteSliceAPI,
  NoteSliceAPI,
} from "./slices/note";
import {
  AutosaveSliceAPI,
  createAutosaveSlice,
  createAutosaveSliceAPI,
} from "./slices/autosave";
import {
  createEditorSlice,
  createEditorSliceAPI,
  EditorSliceAPI,
} from "./slices/editor";

export interface DataStoreAPI {
  commands: CommandSliceAPI;
  editor: EditorSliceAPI;
  notes: NoteSliceAPI;
  autosave: AutosaveSliceAPI;
}

export const createDataStore = () => {
  const [store, setStore] = createStore<DataStoreAPI>({
    commands: createCommandSliceAPI(),
    editor: createEditorSliceAPI(),
    notes: createNoteSliceAPI(),
    autosave: createAutosaveSliceAPI(),
  });

  const evaluateCommand = (command: string) => {
    console.log(command);
  };

  return {
    commands: createCommandSlice(createStore(store.commands), evaluateCommand),
    editor: createEditorSlice(createStore(store.editor)),
    notes: createNoteSlice(createStore(store.notes)),
    autosave: createAutosaveSlice(createStore(store.autosave)),
  };
};

export type DataStore = ReturnType<typeof createDataStore>;
