import { SetStoreFunction } from "solid-js/store";
import { trpc } from "~/lib/trpc-client";

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
  storeSetStore: [AutosaveSliceAPI, SetStoreFunction<AutosaveSliceAPI>]
) => {
  const [store, setStore] = storeSetStore;

  return {
    startSaving: (id: string) => {
      setStore("saveStatuses", store.saveStatuses.length, id);
    },
    stopSaving: (id: string) => {
      setStore("saveStatuses", (previousStatuses) => {
        return previousStatuses.filter((statusId) => statusId !== id);
      });
    },
  };
};
