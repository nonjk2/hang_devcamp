import {
  githubClientID,
  githubClientSecret,
  googleClientID,
  googleClientSecret,
  supabaseKEY,
  supabaseURL,
} from "@/lib/constant";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { authenticateUser } from "./user";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { createClient } from "@supabase/supabase-js";

export const authOption: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: supabaseURL,
    secret: supabaseKEY,
  }) as Adapter,
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: (err) => console.log(err),
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // console.log("user : ", user, "token : ", token, "account : ", account);
        token.uid = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      // console.log("token : ", token);
      return token;
    },
    async session({ session, token, user }) {
      if (token.uid) {
        // console.log("session : ", session, "token : ", token);
        session.user.id = token.uid as string;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.nickname = token.name;
        session.user.role = token.role;
        // session.user.role =
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    signOut(data) {},
    session(data) {},
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { value: "asdfasd@nasdd", type: "email", label: "email" },
        password: { value: "12312411", type: "password", label: "password" },
      },
      async authorize(credentials, req) {
        if (!(credentials?.email && credentials.password)) {
          return null;
        }
        const response = await authenticateUser(
          credentials.email,
          credentials.password
        );
        return response;
      },
    }),
    GoogleProvider({
      clientId: googleClientID,
      clientSecret: googleClientSecret,
    }),
    GitHubProvider({
      clientId: githubClientID,
      clientSecret: githubClientSecret,
    }),
  ],
};
