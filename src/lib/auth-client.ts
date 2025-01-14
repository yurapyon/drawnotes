import { createAuthClient } from "better-auth/solid";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});

export const signIn = async (email: string, password: string) => {
  await authClient.signIn.email({
    email,
    password,
  });
};

export const signUp = async (email: string, password: string) => {
  await authClient.signUp.email({
    email,
    password,
    name: email,
  });
};

export const signOut = async () => {
  await authClient.signOut();
};
