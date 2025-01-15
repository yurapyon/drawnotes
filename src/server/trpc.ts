import { initTRPC, TRPCError } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { auth } from "./auth";

export const createTRPCContext = async ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => {
  const session = await auth.api.getSession({ headers: req.headers });
  return { req, resHeaders, session };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({ transformer: SuperJSON });

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  const session = ctx.session;
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session: session,
    },
  });
});
