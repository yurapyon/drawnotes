import { ParentComponent } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

export enum ButtonVariant {
  Normal = "normal",
  Dark = "dark",
}

interface ButtonProps {
  onClick: (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: DOMElement }
  ) => void;
  variant?: ButtonVariant;
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class="px-[1ch]"
      classList={{
        "bg-white text-black hover:bg-black hover:text-white":
          !props.variant || props.variant === ButtonVariant.Normal,
        "bg-black text-white hover:bg-white hover:text-black":
          props.variant === ButtonVariant.Normal,
      }}
      on:click={props.onClick}
    >
      {props.children}
    </button>
  );
};
