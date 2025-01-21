import { createStore } from "solid-js/store";
import { Maths } from "../utils/maths";
import { jsonFromDataStore } from "./export";
import {
  AutosaveSliceAPI,
  createAutosaveSlice,
  createAutosaveSliceAPI,
} from "./slices/autosave";
import {
  CommandSliceAPI,
  createCommandSlice,
  createCommandSliceAPI,
} from "./slices/command";
import {
  createEditorSlice,
  createEditorSliceAPI,
  EditorSliceAPI,
} from "./slices/editor";
import {
  createImageSlice,
  createImageSliceAPI,
  ImageSliceAPI,
} from "./slices/image";
import {
  createNoteSlice,
  createNoteSliceAPI,
  NoteSliceAPI,
} from "./slices/note";
import { createTagSlice, createTagSliceAPI, TagSliceAPI } from "./slices/tag";

export type CreateStoreReturn<T extends object> = ReturnType<
  typeof createStore<T>
>;

export interface DataStoreAPI {
  autosave: AutosaveSliceAPI;
  commands: CommandSliceAPI;
  editor: EditorSliceAPI;
  images: ImageSliceAPI;
  notes: NoteSliceAPI;
  tags: TagSliceAPI;
}

export const createDataStore = () => {
  const [store, setStore] = createStore<DataStoreAPI>({
    autosave: createAutosaveSliceAPI(),
    commands: createCommandSliceAPI(),
    editor: createEditorSliceAPI(),
    images: createImageSliceAPI(),
    notes: createNoteSliceAPI(),
    tags: createTagSliceAPI(),
  });

  const functions = {
    autosave: createAutosaveSlice(createStore(store.autosave)),
    commands: createCommandSlice(createStore(store.commands)),
    editor: createEditorSlice(createStore(store.editor)),
    images: createImageSlice(createStore(store.images)),
    notes: createNoteSlice(createStore(store.notes)),
    tags: createTagSlice(createStore(store.tags)),
  };

  const getSelectedNote = () => {
    const noteId = functions.editor.getCurrentNoteId();
    if (!noteId) return null;
    const note = functions.notes.getNote(noteId);
    return note || null;
  };

  const editorIntegrations = {
    getSelectedNote,
    advanceSelectedNote: (amount: number) => {
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
    },
  };

  const toJSON = () => {
    return jsonFromDataStore(store);
  };

  return {
    ...functions,
    /**
     * @deprecated Only use for debugging
     */
    _store: store,
    /**
     * @deprecated Only use for debugging
     */
    _setStore: setStore,
    editor: { ...functions.editor, ...editorIntegrations },
    toJSON,
  };
};

export type DataStore = ReturnType<typeof createDataStore>;
