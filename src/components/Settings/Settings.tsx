import { Component, createSignal } from "solid-js";
import { Toggle } from "../_UI/Toggle";

export const Settings: Component = () => {
  const [useVimMode, setUseVimMode] = createSignal(true);

  return (
    <div class="flex flex-col h-full text-white">
      <div>tags</div>
      <div class="flex flex-row justify-between">
        <div>vim mode</div>
        <Toggle value={useVimMode()} onChange={setUseVimMode} />
      </div>
    </div>
  );
};
