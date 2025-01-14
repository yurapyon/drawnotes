import { PrismaClient } from "@prisma/client";
import type { APIEvent } from "@solidjs/start/server";

export const GET = async (event: APIEvent) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: { id: "asdf" },
    include: { images: { select: { id: true } } },
  });
  user?.images;
};
