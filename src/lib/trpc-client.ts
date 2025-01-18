import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { getBaseUrl } from "./utils/getBaseUrl";
import { AppRouter } from "~/server/routers";
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
