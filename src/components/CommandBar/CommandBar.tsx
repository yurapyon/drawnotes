import { Component, createEffect } from "solid-js";
import { trpc } from "~/lib/trpc-client";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { TextInput } from "../_UI/TextInput";

export const CommandBar: Component = () => {
  const store = useDataStoreContext();

  // TODO need to handle onBlur
  let textInput!: HTMLInputElement;

  createEffect(() => {
    if (store.commands.getEnteringCommand()) {
      textInput.focus();
    }
  });

  return (
    <div
      class="flex flex-row"
      classList={{
        block: store.commands.getEnteringCommand(),
        hidden: !store.commands.getEnteringCommand(),
      }}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          const cmd = store.commands.stopCommandEntry();
          const command = cmd.trim();
          if (command === "new") {
            const newNote = store.notes.addNote();
            trpc.note.create.mutate(newNote);
            store.editor.setCurrentNoteId(newNote.id);
            // TODO focus the main editor?
          }
        }
      }}
    >
      {":"}
      <TextInput
        ref={textInput}
        classList={{ "w-full": true }}
        value={store.commands.getCurrentCommand()}
        onInput={(e) => {
          const cmd = e.target.value;
          store.commands.setCurrentCommand(cmd);
        }}
      />
    </div>
  );
};
