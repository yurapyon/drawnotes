import { Image } from "@prisma/client";
import { trpc } from "~/lib/trpc-client";
import { CreateStoreReturn } from "../DataStore";

export interface ImageSliceAPI {
  images: Image[];
}

export const createImageSliceAPI = () => {
  const ret: ImageSliceAPI = {
    images: [],
  };
  return ret;
};

export const createImageSlice = (
  storeSetStore: CreateStoreReturn<ImageSliceAPI>
) => {
  const [store, setStore] = storeSetStore;

  const loadImages = async () => {
    const images = await trpc.image.getAll.query();
    setStore("images", images);
  };

  return {
    loadImages,
    addImageOnClient: (image: Image) => {
      setStore("images", (previousImages) => [...previousImages, image]);
    },
    getImageByName: (name: string) => {
      return store.images.find((image) => image.name === name);
    },
  };
};
