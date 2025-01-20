import { createId } from "~/lib/utils/createId";
import { prisma } from "../prisma";

export const storeUploadInDB = async (
  userId: string,
  url: string,
  name: string
) => {
  const id = createId();
  const image = await prisma.image.create({
    data: {
      id,
      userId,
      url,
      name,
    },
  });

  return image;
};
