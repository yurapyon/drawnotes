import { Title } from "@solidjs/meta";
import { createResource, Show, type Component } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";
import { Editor } from "~/components/Editor";

const Dashboard: Component = () => {
  const store = useDataStoreContext();

  const [initialLoad] = createResource(async () => {
    await store.notes.loadNotes();
    store.editor.setCurrentNoteId("asdf");
  });

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
      case ":":
        e.preventDefault();
        store.commands.startCommandEntry();
        break;
      case "Escape":
        e.preventDefault();
        store.commands.stopCommandEntry(false);
        break;
    }
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
