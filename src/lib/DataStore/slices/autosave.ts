import { CreateStoreReturn } from "../DataStore";

export interface AutosaveSliceAPI {
  saveStatuses: string[];
}

export const createAutosaveSliceAPI = () => {
  const ret: AutosaveSliceAPI = {
    saveStatuses: [],
  };
  return ret;
};

export const createAutosaveSlice = (
  storeSetStore: CreateStoreReturn<AutosaveSliceAPI>
) => {
  const [store, setStore] = storeSetStore;

  return {
    startSaving: (id: string) => {
      setStore("saveStatuses", (previousStatuses) => {
        return [...previousStatuses, id];
      });
    },
    stopSaving: (id: string) => {
      setStore("saveStatuses", (previousStatuses) => {
        return previousStatuses.filter((statusId) => statusId !== id);
      });
    },
    isSaving: () => {
      return store.saveStatuses.length > 0;
    },
  };
};
