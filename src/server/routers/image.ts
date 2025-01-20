import { z } from "zod";
import { ImageSchema } from "../../../prisma/generated/zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const imageRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const images = await prisma.image.findMany({
      where: { userId: ctx.session.user.id },
    });
    return images;
  }),

  updateById: protectedProcedure
    .input(z.object({ id: z.string(), updateObject: ImageSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      // TODO do something with update error, ie if userId is wrong
      await prisma.image.update({
        where: { id: input.id, userId },
        data: { ...input.updateObject },
      });
    }),
});
