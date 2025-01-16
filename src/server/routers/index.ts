import { router } from "../trpc";
import { noteRouter } from "./note";
import { userRouter } from "./user";

export const appRouter = router({
  note: noteRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
