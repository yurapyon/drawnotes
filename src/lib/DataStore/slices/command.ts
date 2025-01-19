import { CreateStoreReturn } from "../DataStore";

export interface CommandSliceAPI {
  isEnteringCommand: boolean;
  currentCommand: string;
  history: string[];
}

export const createCommandSliceAPI = () => {
  const ret: CommandSliceAPI = {
    isEnteringCommand: false,
    currentCommand: "",
    history: [],
  };
  return ret;
};

export const createCommandSlice = (
  storeSetStore: CreateStoreReturn<CommandSliceAPI>
) => {
  const [store, setStore] = storeSetStore;
  return {
    getEnteringCommand: () => {
      return store.isEnteringCommand;
    },
    startCommandEntry: () => {
      setStore((previousStore) => {
        return {
          ...previousStore,
          isEnteringCommand: true,
          currentCommand: "",
        };
      });
    },
    stopCommandEntry: () => {
      const command = store.currentCommand;
      setStore((previousStore) => {
        return {
          ...previousStore,
          isEnteringCommand: false,
          currentCommand: "",
        };
      });
      return command;
    },
    getCurrentCommand: () => {
      return store.currentCommand;
    },
    setCurrentCommand: (value: string) => {
      setStore((previousStore) => {
        return { ...previousStore, currentCommand: value };
      });
    },
    getHistory: () => {
      return store.history;
    },
  };
};
