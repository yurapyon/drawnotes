import { Component, createEffect, createSignal } from "solid-js";
import { Action } from "~/lib/CommandBar/Action";
import { CommandBar } from "~/lib/CommandBar/CommandBar";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { TextInput } from "../_UI/TextInput";

interface CommandBarProps {
  onCommand: (action: Action) => void;
}

export const CommandBarComponent: Component<CommandBarProps> = (props) => {
  // const cb = CommandBar.create();

  const [cb, setCb] = createSignal(CommandBar.create());

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
          let str!: string;
          setCb((previousCb) => {
            const newCb = CommandBar.clone(previousCb);
            str = CommandBar.stopCommandEntry(newCb);
            return newCb;
          });
          const action = Action.fromString(str);
          if (action) {
            props.onCommand(action);
          }
          /*
          const command = cmd.trim();
          if (command === "new") {
            const newNote = store.notes.addNote();
            trpc.note.create.mutate(newNote);
            store.editor.setCurrentNoteId(newNote.id);
            // TODO focus the main editor?
          }
            */
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
