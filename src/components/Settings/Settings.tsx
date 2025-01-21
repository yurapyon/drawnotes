import { Component, createSignal } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { Button } from "../_UI/Button";
import { Toggle } from "../_UI/Toggle";
import { TagList } from "./TagEditor/TagList";

export const Settings: Component = () => {
  const store = useDataStoreContext();

  const [useVimMode, setUseVimMode] = createSignal(true);

  return (
    <div class="flex flex-col w-full h-full text-white">
      <TagList />
      <div class="flex flex-row justify-between">
        <div>vim mode</div>
        <Toggle value={useVimMode()} onChange={setUseVimMode} />
      </div>
      <Button
        onClick={() => {
          console.log(store.toJSON());
        }}
      >
        export notes
      </Button>
    </div>
  );
};
