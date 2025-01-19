import { Component, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";

export interface SaveIndicatorProps {}

export const SaveIndicator: Component<SaveIndicatorProps> = (props) => {
  const store = useDataStoreContext();
  return (
    <Show when={store.autosave.isSaving()}>
      <div class="bg-yellow-300">*</div>
    </Show>
  );
};
