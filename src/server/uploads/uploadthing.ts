import type { FileRouter } from "uploadthing/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { auth } from "../auth";
import { storeUploadInDB } from "./storeUploadInDB";

const f = createUploadthing();

export const uploadRouter = {
  image: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ name: z.string() }))
    .middleware(async ({ req, input }) => {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session) throw new UploadThingError("Unauthorized");
      return { session, input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const image = await storeUploadInDB(
        metadata.session.user.id,
        file.url,
        metadata.input.name
      );
      const imageNoCreatedAt = { ...image, createdAt: undefined };
      return { image: imageNoCreatedAt };
      // return { image };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
