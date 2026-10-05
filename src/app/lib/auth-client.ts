import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://bangla-news24-7.vercel.app/",
});

export const { signIn, signUp, signOut, useSession,updateUser } = authClient;
