import { Tag } from "@prisma/client";
import { Component, Show } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";
import { NameEditor } from "~/components/_UI/NameEditor";
import { useAutosave } from "~/lib/_Hooks/useAutosave";
import { trpc } from "~/lib/trpc-client";

interface TagComponentProps {
  tagId: string;
}

export const TagComponent: Component<TagComponentProps> = (props) => {
  const store = useDataStoreContext();
  const tag = () => store.tags.getTagById(props.tagId);

  const updateTag = useAutosave({
    immediate: store.tags.updateTagById,
    debounced: async (id: string, updateObject: Partial<Tag>) => {
      await trpc.tag.updateById.mutate({ id, updateObject });
    },
  });

  return (
    <Show when={tag()}>
      {(tag) => {
        return (
          <div class="flex flex-row w-full">
            <div class="shrink-0">{tag().color}</div>
            <NameEditor
              classList={{ "grow min-w-0": true }}
              value={tag().name}
              onConfirm={(name) => {
                updateTag(tag().id, { name });
              }}
            >
              {tag().name}
            </NameEditor>
          </div>
        );
      }}
    </Show>
  );
};
