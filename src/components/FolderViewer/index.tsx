import { Component } from "solid-js";
import { Folders } from "./Folders";
import { FolderViewerControls } from "./FolderViewerControls";
import { Button, ButtonVariant } from "../_UI/Button";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { authClient } from "~/lib/auth-client";

export const FolderViewer: Component = () => {
  const store = useDataStoreContext();
  const session = authClient.useSession();
  const userId = () => session()?.data?.user.id;
  return (
    <div class="flex flex-col gap-2">
      <FolderViewerControls />
      <Folders />
      <Button
        variant={ButtonVariant.Dark}
        onClick={() => {
          const id = userId();
          if (id) {
            store.addBlankNote(id);
          }
        }}
      >
        create note
      </Button>
    </div>
  );
};
