import { Component } from "solid-js";
import { NoteList } from "./NoteList";
import { FolderViewerControls } from "./FolderViewerControls";
import { Button, ButtonVariant } from "../_UI/Button";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { useRequiredAuth } from "../_Providers/RequiredAuthProvider";
import { trpc } from "~/lib/trpc-client";

export const FolderViewer: Component = () => {
  const store = useDataStoreContext();
  const session = useRequiredAuth();
  return (
    <div class="flex flex-col">
      <FolderViewerControls />
      <NoteList />
      <Button
        variant={ButtonVariant.Dark}
        onClick={() => {
          const newNote = store.notes.addNote(session.user.id);
          trpc.note.createNote.mutate(newNote);
        }}
      >
        create note
      </Button>
    </div>
  );
};
