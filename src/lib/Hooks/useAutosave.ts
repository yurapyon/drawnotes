import { debounce } from "radash";
import { createUniqueId } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";

interface UseAutosaveProps<Args extends any[]> {
  immediate?: (...args: Args) => void;
  debounced: (...args: Args) => Promise<void>;
  delay?: number;
}

export const useAutosave = <Args extends any[]>({
  immediate,
  debounced,
  delay,
}: UseAutosaveProps<Args>) => {
  const store = useDataStoreContext();

  const id = createUniqueId();

  const debouncedUpdateDB = debounce(
    { delay: delay || 250 },
    async (...args: Args) => {
      await debounced(...args);
      store.autosave.stopSaving(id);
    }
  );

  const update = (...args: Args) => {
    store.autosave.startSaving(id);
    immediate?.(...args);
    debouncedUpdateDB(...args);
  };

  return update;
};
