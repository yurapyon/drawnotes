import { Component } from "solid-js";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: Component<ToggleProps> = (props) => {
  const valueString = () => (props.value ? " " : "x");
  return (
    <button
      class="hover:bg-dn-gray-dark bg-dn-gray-darker text-white"
      onClick={() => {
        props.onChange(!props.value);
      }}
    >
      [{valueString()}]
    </button>
  );
};
