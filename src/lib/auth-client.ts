import { createAuthClient } from "better-auth/solid";
import { getBaseUrl } from "./getBaseUrl";

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
  // TODO refresh page
};
