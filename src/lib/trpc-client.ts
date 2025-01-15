import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { getBaseUrl } from "./getBaseUrl";
import { AppRouter } from "~/server.ts/routers";
import SuperJSON from "superjson";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: SuperJSON,
    }),
  ],
});
