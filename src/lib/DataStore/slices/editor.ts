import { produce, SetStoreFunction, unwrap } from "solid-js/store";
import { Cursor } from "~/lib/editor/Cursor";
import { EditingMode, Editor } from "~/lib/editor/Editor";
import { Maths } from "~/lib/utils/maths";

export interface EditorSliceAPI {
  // Saved in DB
  currentNoteId: string | null;

  // Not saved
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;

  lines: string[];
  cursor: Cursor;

  // ref
  editor: Editor;
}

export const createEditorSliceAPI = () => {
  const ret: EditorSliceAPI = {
    currentNoteId: null,
    leftSidebarOpen: true,
    rightSidebarOpen: false,
    lines: [],
    editor: Editor.create(),
    cursor: Cursor.create(),
  };
  return ret;
};

export const createEditorSlice = (
  storeSetStore: [EditorSliceAPI, SetStoreFunction<EditorSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  const unwrappedEditor = unwrap(store).editor;
  unwrappedEditor.signals = {
    onCursorChange: (c) => setStore("cursor", c),
    onLinesChange: (l) => setStore("lines", l),
    onSelectionChange: () => {},
  };

  return {
    setCurrentNoteId: (id: string | null) => {
      setStore("currentNoteId", id);
    },
    getCurrentNoteId: () => {
      return store.currentNoteId;
    },
    getSidebarState: () => {
      return [() => store.leftSidebarOpen, () => store.rightSidebarOpen];
    },
    toggleSidebar: (toggleLeft: boolean) => {
      if (toggleLeft) {
        setStore("leftSidebarOpen", !store.leftSidebarOpen);
      } else {
        setStore("rightSidebarOpen", !store.rightSidebarOpen);
      }
    },
    setTextBuffer: (buffer: string) => {
      Editor.setTextBuffer(unwrappedEditor, buffer);
    },
    setCurrentMode: (to: EditingMode) => {
      // setStore("mode", to);
    },
    moveCursor: (dx: number, dy: number) => {
      Editor.moveCursorX(unwrappedEditor, dx);
      Editor.moveCursorY(unwrappedEditor, dy);
    },
    getCursor: () => {
      return store.cursor;
    },
    insertBlankLine: (insertBefore: boolean) => {
      Editor.insertBlankLine(unwrappedEditor, insertBefore);
    },
    getLines: () => {
      return store.lines;
    },
  };
};
