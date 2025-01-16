import { TRPCError } from "@trpc/server";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUserSettings: protectedProcedure.query(async ({ ctx }) => {
    const settings = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        lastEditedNoteId: true,
        useVimMode: true,
      },
    });

    if (!settings) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return settings;
  }),

  updateUserSettings: protectedProcedure
    .input(
      z
        .object({
          lastEditedNoteId: z.string().nullable(),
          useVimMode: z.boolean(),
        })
        .partial()
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
});
