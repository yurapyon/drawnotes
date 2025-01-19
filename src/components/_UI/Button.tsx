import { ParentComponent } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

interface ButtonProps {
  onClick: (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: DOMElement }
  ) => void;
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class="px-[1ch] bg-dn-gray-dark text-white hover:bg-dn-gray-darker"
      on:click={props.onClick}
    >
      {props.children}
    </button>
  );
};
