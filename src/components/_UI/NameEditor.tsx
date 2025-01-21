import { createEffect, createSignal, ParentComponent, Show } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

interface NameEditorProps extends ClassProps {
  value: string;
  onConfirm: (value: string) => void;
  reverseUI?: boolean;
}

export const NameEditor: ParentComponent<NameEditorProps> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [localValue, setLocalValue] = createSignal(props.value);

  // TODO handle on blur
  let textInput!: HTMLInputElement;

  createEffect(() => {
    if (isEditing()) {
      textInput.focus();
    }
  });

  return (
    <div
      class="flex"
      classList={{
        "flex-row": !props.reverseUI,
        "flex-row-reverse": !!props.reverseUI,
        "gap-[1ch]": !isEditing(),
        ...props.classList,
      }}
    >
      <Show when={!isEditing()}>
        <div class="grow min-w-0">{props.children}</div>
        <Button
          onClick={() => {
            setLocalValue(props.value);
            setIsEditing(true);
          }}
        >
          #
        </Button>
      </Show>
      <Show when={isEditing()}>
        <TextInput
          ref={textInput}
          classList={{ "grow min-w-0": true }}
          value={localValue()}
          onInput={(e) => {
            setLocalValue(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            props.onConfirm(localValue());
            setIsEditing(false);
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          x
        </Button>
      </Show>
    </div>
  );
};
