import { z } from "zod";
import { TagSchema } from "../../../prisma/generated/zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const tagRouter = router({
  create: protectedProcedure
    .input(TagSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.tag.create({
        data: { ...input, userId },
      });
    }),

  updateById: protectedProcedure
    .input(z.object({ id: z.string(), updateObject: TagSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.tag.update({
        where: { id: input.id, userId },
        data: { ...input.updateObject },
      });
    }),
});
