import { createAuthClient } from "better-auth/solid";

export const authClient = createAuthClient({
  // TODO
  baseURL: "http://localhost:3000",
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
