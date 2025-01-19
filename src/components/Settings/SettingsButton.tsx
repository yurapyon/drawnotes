import { Component } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";

interface SettingsMenuProps extends ClassProps {
  onClick: () => void;
}

export const SettingsButton: Component<SettingsMenuProps> = (props) => {
  // TODO colors
  return (
    <button
      class="group cursor-pointer"
      classList={props.classList}
      onClick={props.onClick}
    >
      <div class="block group-hover:hidden text-blue-300">drawnotes</div>
      <div class="hidden group-hover:block text-white">settings</div>
    </button>
  );
};
