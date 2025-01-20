import { prisma } from "../prisma";

export const storeUploadInDB = async (userId: string, url: string) => {
  const name = (await prisma.image.count({ where: { userId } })).toString();
  console.log("here");

  const image = await prisma.image.create({
    data: {
      userId,
      url,
      name,
    },
  });
  console.log("here2");

  return image;
};
