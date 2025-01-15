import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  hi: publicProcedure.input(z.object({})).query(async ({ input }) => {
    console.log("hi");
  }),
});

export type AppRouter = typeof appRouter;
