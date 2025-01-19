import { Tag } from "@prisma/client";
import { useRequiredAuth } from "~/components/_Providers/RequiredAuthProvider";
import { trpc } from "~/lib/trpc-client";
import { createId } from "~/lib/utils/createId";
import { CreateStoreReturn } from "../DataStore";

export interface TagSliceAPI {
  tags: Tag[];
}

export const createTagSlice = (
  storeSetStore: CreateStoreReturn<TagSliceAPI>
) => {
  const [store, setStore] = storeSetStore;

  const session = useRequiredAuth();

  const loadTags = async () => {
    const tags = await trpc.user.getTags.query();
    setStore("tags", tags);
  };

  return {
    loadTags,
    addTag: () => {
      const newTag: Tag = {
        id: createId(),
        userId: session.user.id,
        createdAt: new Date(),
        name: "",
        color: "#808080",
      };
      return newTag;
    },
    getTags: () => {
      return store.tags;
    },
  };
};
