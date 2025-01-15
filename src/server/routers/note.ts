import { protectedProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const noteRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const notes = prisma.note.findMany({ where: { userId } });
    return notes;
  }),
});
