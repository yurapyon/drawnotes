import { SetStoreFunction } from "solid-js/store";

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
  storeSetStore: [CommandSliceAPI, SetStoreFunction<CommandSliceAPI>],
  evaluateCommand: (command: string) => void
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
    stopCommandEntry: (runCommand: boolean) => {
      if (runCommand) {
        const command = store.currentCommand;
        evaluateCommand(command);
        setStore((previousStore) => {
          const newHistory = [...previousStore.history, command];
          return { ...previousStore, history: newHistory };
        });
      }
      setStore((previousStore) => {
        return {
          ...previousStore,
          isEnteringCommand: false,
          currentCommand: "",
        };
      });
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
