import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const imageRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const images = await prisma.image.findMany({
      where: { userId: ctx.session.user.id },
    });
    return images;
  }),
});
