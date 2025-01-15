import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/server.ts/routers";
import { createTRPCContext } from "~/server.ts/trpc";

const handler = (event: { request: Request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: event.request,
    router: appRouter,
    createContext: createTRPCContext,
  });
};

export const GET = handler;
export const POST = handler;
