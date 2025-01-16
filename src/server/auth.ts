import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      if (!!process.env.ALLOW_SIGNUPS) {
        return;
      }

      throw new APIError("UNAUTHORIZED");
    }),
  },
});
