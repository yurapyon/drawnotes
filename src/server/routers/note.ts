import { protectedProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { z } from "zod";
import { NoteSchema } from "../../../prisma/generated/zod";

export const noteRouter = router({
  getAllWithTags: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const notes = await prisma.note.findMany({
      where: { userId },
      include: { tags: true },
    });
    return notes;
  }),

  createNote: protectedProcedure
    .input(NoteSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.note.create({
        data: { ...input, userId },
      });
    }),

  updateNote: protectedProcedure
    .input(z.object({ id: z.string(), updateObject: NoteSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.note.update({
        where: { id: input.id, userId },
        data: { ...input.updateObject },
      });
    }),
});
