import { router } from "../trpc";
import { imageRouter } from "./image";
import { noteRouter } from "./note";
import { tagRouter } from "./tag";
import { userRouter } from "./user";

export const appRouter = router({
  note: noteRouter,
  user: userRouter,
  tag: tagRouter,
  image: imageRouter,
});

export type AppRouter = typeof appRouter;
