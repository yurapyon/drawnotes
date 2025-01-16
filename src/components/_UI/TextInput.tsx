import { Component } from "solid-js";

interface TextInputProps {
  classList?: Record<string, boolean | undefined>;
  placeholder?: string;
  value: string;
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  type?: "text" | "email" | "password";
  ref?: HTMLInputElement;
}

export const TextInput: Component<TextInputProps> = (props) => {
  return (
    <input
      class="focus:outline-none focus:bg-black focus:text-white"
      classList={{ ...props.classList }}
      on:input={props.onInput}
      on:change={props.onChange}
      placeholder={props.placeholder}
      type={props.type || "text"}
      value={props.value}
      ref={props.ref}
    />
  );
};
