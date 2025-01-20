import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getUserSettings: protectedProcedure.query(async ({ ctx }) => {
    const settings = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        lastEditedNoteId: true,
        useVimMode: true,
        _count: {
          select: { images: true },
        },
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

  getTags: protectedProcedure.query(async ({ ctx }) => {
    const tags = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { tags: true },
    });

    if (!tags) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return tags.tags;
  }),
});
