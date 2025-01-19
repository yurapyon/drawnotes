import { Component, Index } from "solid-js";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";

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

  return (
    <div class="flex flex-col h-full">
      <Index each={sortedNotes()}>
        {(note) => {
          const isSelected = () =>
            store.editor.getCurrentNoteId() === note().id;
          return (
            <div
              class="select-none"
              classList={{
                "bg-dn-gray-light cursor-auto": isSelected(),
                "hover:bg-dn-gray cursor-pointer": !isSelected(),
              }}
              onClick={() => {
                selectNote(note().id);
              }}
            >
              {note().title || <span class="text-dn-gray-light">untitled</span>}
            </div>
          );
        }}
      </Index>
    </div>
  );
};
