import type { Image } from "@prisma/client";
import { Component, Index } from "solid-js";
import { useAutosave } from "~/lib/Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";
import { formatDate, sortByCreatedAt } from "~/lib/utils/dates";
import { ClassProps } from "../_misc/ClassProps";
import { useDataStoreContext } from "../_Providers/DataStoreProvider";
import { NameEditor } from "../_UI/NameEditor";

export interface ImageViewerProps extends ClassProps {}

// TODO
//   delete images
//   selectively preview
//     click on url and it opens in viewer
//   click to insert image at line
//   rename

export const ImageViewer: Component<ImageViewerProps> = (props) => {
  const store = useDataStoreContext();

  const sortedImages = () => {
    const newImages = [...store.images.getImages()];
    sortByCreatedAt(newImages);
    return newImages;
  };

  const updateImage = useAutosave({
    immediate: store.images.updateImage,
    debounced: async (id: string, updateObject: Partial<Image>) => {
      await trpc.image.updateById.mutate({ id, updateObject });
    },
  });

  return (
    <div
      class="bg-dn-gray-dark text-white pl-[1ch]"
      classList={props.classList}
    >
      <Index each={sortedImages()}>
        {(image) => {
          return (
            <div class="flex flex-row gap-[1ch]">
              <div class="bg-black whitespace-nowrap h-fit">
                {formatDate(image().createdAt)}
              </div>
              <div class="grow min-w-0">
                <NameEditor
                  value={image().name}
                  onConfirm={(name) => updateImage(image().id, { name })}
                  reverseUI
                >
                  {image().name}
                </NameEditor>
              </div>
              <a
                class="break-all underline hover:text-black"
                href={image().url}
                target="_blank"
              >
                url
              </a>
            </div>
          );
        }}
      </Index>
    </div>
  );
};
