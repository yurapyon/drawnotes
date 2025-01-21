import { DataStoreAPI } from "./DataStore";

export const jsonFromDataStore = (store: DataStoreAPI) => {
  const images = store.images.images.map((image) => {
    return {
      id: image.id,
      createdAt: image.createdAt.toISOString(),
      name: image.name,
      url: image.url,
    };
  });

  const notes =
    store.notes.notes?.map((note) => {
      const tags = note.tags.map((tag) => {
        return tag.id;
      });
      return {
        id: note.id,
        createdAt: note.createdAt.toISOString(),
        tags,
        title: note.title,
        text: note.text,
      };
    }) || [];

  const tags = store.tags.tags.map((tag) => {
    return {
      createdAt: tag.createdAt.toISOString(),
      id: tag.id,
      name: tag.name,
      color: tag.color,
    };
  });

  return { notes, images, tags };
};
