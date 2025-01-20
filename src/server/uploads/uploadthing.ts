import type { FileRouter } from "uploadthing/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { auth } from "../auth";
import { storeUploadInDB } from "./storeUploadInDB";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session) throw new UploadThingError("Unauthorized");
      return { session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(metadata);
      const image = await storeUploadInDB(metadata.session.user.id, file.url);
      console.log(image);
      const imageNoCreatedAt = { ...image, createdAt: undefined };
      return { image: imageNoCreatedAt };
      // return { image };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
