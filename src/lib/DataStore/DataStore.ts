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
import { Maths } from "../utils/maths";

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

  const functions = {
    commands: createCommandSlice(createStore(store.commands)),
    editor: createEditorSlice(createStore(store.editor)),
    notes: createNoteSlice(createStore(store.notes)),
    autosave: createAutosaveSlice(createStore(store.autosave)),
  };

  const advanceSelectedNote = (amount: number) => {
    const notes = functions.notes.getNotes();
    if (!notes) return;

    const sortedNotes = [...notes];
    sortedNotes.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const currentNoteId = functions.editor.getCurrentNoteId();
    if (!currentNoteId) return;

    const currentNoteIndex = sortedNotes.findIndex(
      (note) => note.id === currentNoteId
    );
    if (currentNoteIndex < 0) return;

    const newIndex = Maths.mod(currentNoteIndex + amount, sortedNotes.length);
    const newId = sortedNotes[newIndex].id;
    functions.editor.setCurrentNoteId(newId);
    functions.editor.setTextBuffer(sortedNotes[newIndex].text);
  };

  return { ...functions, editor: { ...functions.editor, advanceSelectedNote } };
};

export type DataStore = ReturnType<typeof createDataStore>;
