import { router } from "../trpc";
import { noteRouter } from "./note";
import { tagRouter } from "./tag";
import { userRouter } from "./user";

export const appRouter = router({
  note: noteRouter,
  user: userRouter,
  tag: tagRouter,
});

export type AppRouter = typeof appRouter;
