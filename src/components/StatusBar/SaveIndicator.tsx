import { Component, Show } from "solid-js";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";

export const SaveIndicator: Component = () => {
  const store = useDataStoreContext();
  const isSaving = () => store.autosave.isSaving();
  return (
    <Show when={isSaving()} fallback={<div class="bg-green-400">saved</div>}>
      <div class="bg-yellow-300 px-[1ch]">...</div>
    </Show>
  );
};
