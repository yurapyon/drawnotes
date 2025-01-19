import { Note } from "@prisma/client";
import { Component, Index } from "solid-js";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { NameEditor } from "../_UI/NameEditor";

export const NoteList: Component = () => {
  const store = useDataStoreContext();

  // TODO use creatememo
  const sortedNotes = () => {
    const notes = store.notes.getNotes();
    if (!notes) {
      return null;
    }
    const newNotes = [...notes];
    newNotes.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return newNotes;
  };

  const selectNote = useAutosave({
    immediate: (noteId) => store.editor.setCurrentNoteId(noteId),
    debounced: async (noteId) =>
      trpc.user.updateUserSettings.mutate({
        lastEditedNoteId: noteId,
      }),
    delay: 100,
  });

  const updateNote = useAutosave({
    immediate: store.notes.updateNote,
    debounced: async (id: string, updateObject: Partial<Note>) => {
      await trpc.note.updateNote.mutate({ id, updateObject });
    },
    delay: 500,
  });

  return (
    <div class="flex flex-col h-full">
      <Index each={sortedNotes()}>
        {(note) => {
          const isSelected = () =>
            store.editor.getCurrentNoteId() === note().id;
          return (
            <NameEditor
              value={note().title}
              onConfirm={(title) => updateNote(note().id, { title })}
              reverseUI
            >
              <div
                class="select-none"
                classList={{
                  "bg-gray-200 cursor-auto": isSelected(),
                  "hover:bg-gray-200 cursor-pointer": true,
                }}
                onClick={() => {
                  selectNote(note().id);
                }}
              >
                {note().title || <span class="text-gray-500">untitled</span>}
              </div>
            </NameEditor>
          );
        }}
      </Index>
    </div>
  );
};
