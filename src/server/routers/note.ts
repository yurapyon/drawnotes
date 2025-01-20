import { z } from "zod";
import { NoteSchema } from "../../../prisma/generated/zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const noteRouter = router({
  getAllWithTags: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const notes = await prisma.note.findMany({
      where: { userId },
      include: { tags: true },
    });
    return notes;
  }),

  create: protectedProcedure
    .input(NoteSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.note.create({
        data: { ...input, userId },
      });
    }),

  updateById: protectedProcedure
    .input(z.object({ id: z.string(), updateObject: NoteSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      // TODO do something with update error, ie if userId is wrong
      await prisma.note.update({
        where: { id: input.id, userId },
        data: { ...input.updateObject },
      });
    }),
});
