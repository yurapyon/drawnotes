import { Component, For } from "solid-js";
import { useDataStoreContext } from "~/components/_Providers/DataStoreProvider";
import { Button } from "~/components/_UI/Button";
import { trpc } from "~/lib/trpc-client";
import { TagComponent } from "./Tag";

export const TagList: Component = () => {
  const store = useDataStoreContext();
  const tags = () => store.tags.getTags();

  return (
    <div class="flex flex-col w-full">
      <For each={tags()}>{(tag) => <TagComponent tagId={tag.id} />}</For>
      <Button
        onClick={async () => {
          const newTag = store.tags.addTag();
          await trpc.tag.create.mutate(newTag);
        }}
      >
        add tag
      </Button>
    </div>
  );
};
