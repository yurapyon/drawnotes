import { createStore, produce } from "solid-js/store";
import { Editor } from "../editor/Editor";
import { Maths } from "../utils/maths";
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
  createNoteSlice,
  createNoteSliceAPI,
  NoteSliceAPI,
} from "./slices/note";

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
    handleKeyboardEvent: (ev: KeyboardEvent) => {
      let wasHandled = false;
      setStore(
        produce((state) => {
          const noteId = functions.editor.getCurrentNoteId();
          if (!noteId) return null;
          const note = state.notes.notes?.find((note) => note.id === noteId);

          if (note) {
            wasHandled = Editor.handleKeyboardEvent(
              state.editor.editor,
              ev,
              note.lineBuffer
            );
          }
        })
      );
      return wasHandled;
    },
    /*
    insertTextAtCursor: (text: string) => {
      setStore(
        produce((store) => {
          const currentLineBuffer = getSelectedNote()?.lineBuffer;
          if (currentLineBuffer) {
            Editor.paste(store.editor.editor, currentLineBuffer, text);
          }
        })
      );
    },
    */
  };

  return {
    ...functions,
    editor: { ...functions.editor, ...editorIntegrations },
  };
};

export type DataStore = ReturnType<typeof createDataStore>;
