import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";

import {
  supabaseURL,
  supabaseAnon,
  supabaseKEY,
  googleClientID,
  googleClientSecret,
  githubClientID,
  githubClientSecret,
} from "@/lib/constant";
import { authenticateUser } from "@/lib/action/auth/user";
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
    //   async redirect({ url, baseUrl }) {
    //   // 로그인 실패 시 사용자를 로그인 페이지로 리다이렉트하고, 에러 메시지를 쿼리 파라미터에 추가
    //   if (url === '/api/auth/signin?error=CredentialsSignin') {
    //     return `${baseUrl}/signin?error=로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.`;
    //   }
    //   return baseUrl;
    // },
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
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.name = token.name;
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

const handlers = NextAuth(authOption);

export { handlers as GET, handlers as POST };
