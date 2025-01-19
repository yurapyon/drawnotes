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
  });

  onMount(() => {
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      switch (ev.key) {
        case "ArrowLeft":
          store.editor.toggleSidebar(true);
          break;
        case "ArrowRight":
          store.editor.toggleSidebar(false);
          break;
        case "ArrowUp":
          // TODO update settings in db
          store.editor.advanceSelectedNote(-1);
          break;
        case "ArrowDown":
          // TODO update settings in db
          store.editor.advanceSelectedNote(1);
          break;
        case ":":
          store.commands.startCommandEntry();
          break;
        case "Escape":
          ev.preventDefault();
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
