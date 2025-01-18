import { Title } from "@solidjs/meta";
import { createResource, onMount, Show, type Component } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";
import { Editor } from "~/components/Editor";
import { trpc } from "~/lib/trpc-client";

const Dashboard: Component = () => {
  const store = useDataStoreContext();

  const [initialLoad] = createResource(async () => {
    await store.notes.loadNotes();
    const settings = await trpc.user.getUserSettings.query();
    store.editor.setCurrentNoteId(settings.lastEditedNoteId);
    if (settings.lastEditedNoteId) {
      const note = store.notes.getNote(settings.lastEditedNoteId);
      if (note) {
        store.editor.setTextBuffer(note.text);
      }
    }
  });

  onMount(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          store.editor.toggleSidebar(true);
          break;
        case "ArrowRight":
          store.editor.toggleSidebar(false);
          break;
        case "ArrowUp":
          store.editor.advanceSelectedNote(-1);
          break;
        case "ArrowDown":
          store.editor.advanceSelectedNote(1);
          break;
        case "h":
          store.editor.moveCursor(-1, 0);
          break;
        case "j":
          store.editor.moveCursor(0, 1);
          break;
        case "k":
          store.editor.moveCursor(0, -1);
          break;
        case "l":
          store.editor.moveCursor(1, 0);
          break;
        case "O":
          store.editor.insertBlankLine(true);
          break;
        case "o":
          store.editor.insertBlankLine(false);
          break;
        case ":":
          e.preventDefault();
          store.commands.startCommandEntry();
          break;
        case "Escape":
          e.preventDefault();
          store.commands.stopCommandEntry();
          break;
      }
    });
  });

  return (
    <main class="font-mono w-screen h-screen text-sm">
      <Title>notes</Title>
      <Show when={initialLoad.loading}>Loading...</Show>
      <Show when={!initialLoad.loading}>
        <Editor />
      </Show>
    </main>
  );
};

export default Dashboard;
