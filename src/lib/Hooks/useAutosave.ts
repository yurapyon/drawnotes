import { debounce } from "radash";
import { createUniqueId } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";

interface UseAutosaveProps {
  updateClient: any;
  updateDB: any;
}

export const useAutosave = ({ updateClient, updateDB }: UseAutosaveProps) => {
  const store = useDataStoreContext();

  const id = createUniqueId();

  const debouncedUpdateDB = debounce({ delay: 250 }, async () => {
    await updateDB();
    store.autosave.stopSaving(id);
  });

  const update = () => {
    store.autosave.startSaving(id);
    updateClient();
    debouncedUpdateDB();
  };

  return update;
};
