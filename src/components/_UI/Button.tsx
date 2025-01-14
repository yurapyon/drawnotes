import { Component, ParentComponent } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

interface ButtonProps {
  onClick: (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: DOMElement }
  ) => void;
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return <button on:click={props.onClick}>{props.children}</button>;
};
