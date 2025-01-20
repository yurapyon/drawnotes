import { Image } from "@prisma/client";
import { Component, Match, Show, Switch } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";
import { UploadButton } from "~/components/_UI/UploadButton";
import { UploadLine } from "~/lib/editor/Line";

interface UploadLineComponentProps {
  line: UploadLine;
  onUpload: (image: Image) => void;
}

export const UploadLineComponent: Component<UploadLineComponentProps> = (
  props
) => {
  const store = useDataStoreContext();

  const imageById = (id: string) => store.images.getImageByName(id);

  return (
    <Show
      when={props.line.name !== "" && props.line.name}
      fallback={"please enter a name"}
    >
      {(id) => (
        <Switch>
          <Match when={!imageById(id())}>
            <div>
              <UploadButton onUpload={props.onUpload} uploadName={id()} />
            </div>
          </Match>
          <Match when={imageById(id())}>
            {(image) => {
              return (
                <div
                  style={{
                    height: `${props.line.height}lh`,
                    // width: `${line().height}lh`,
                  }}
                >
                  <img class="block h-full" src={image().url} />
                </div>
              );
            }}
          </Match>
        </Switch>
      )}
    </Show>
  );
};
