import { createContext, ParentComponent, useContext } from "solid-js";
import { createDataStore, DataStore } from "~/lib/DataStore/DataStore";

const DataStoreContext = createContext<DataStore>();

export const DataStoreProvider: ParentComponent = (props) => {
  const store = createDataStore();

  return (
    <DataStoreContext.Provider value={store}>
      {props.children}
    </DataStoreContext.Provider>
  );
};

export const useDataStoreContext = () => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error(
      "useDataStoreContext must be a child of a DataStoreProvider"
    );
  }
  return context;
};
