import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";

const t = initTRPC.create({ transformer: SuperJSON });

export const router = t.router;
export const publicProcedure = t.procedure;

// ===

export function createTRPCContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  // TODO
  const user = { name: req.headers.get("username") ?? "anonymous" };
  return { req, resHeaders, user };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
