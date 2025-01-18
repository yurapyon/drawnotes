import { ParentComponent, Show } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";

export interface SaveIndicatorProps extends ClassProps {}

export const SaveIndicator: ParentComponent<SaveIndicatorProps> = (props) => {
  const store = useDataStoreContext();
  return (
    <Show
      when={!store.autosave.isSaving()}
      fallback={
        <div class="bg-yellow-300 text-right" classList={props.classList}>
          ...
        </div>
      }
    >
      {props.children}
    </Show>
  );
};
