import { CombineFetch } from "@/lib/action";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID || "";
const githubClientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET_ID || "";
export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // 백엔드서버에서 토큰발급하기 그리고 밑에서 덮어쓰기
    // async signIn({ user, account, profile }) {
    //   const tokenResponse = await CombineFetch<{ token: string }>({
    //     path: "/api/token",
    //     method: "POST",
    //     body: { userId: user.id },
    //   });

    //   if (tokenResponse.status === "success") {
    //     const tokenData = tokenResponse.data;
    //     user.token = tokenData.token;
    //     return true;
    //   }
    //   return false;
    // },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    session({ token, session, newSession, user }) {
      session.user.role = token.role as RoleType;
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
        const body = {
          id: credentials?.email,
          password: credentials?.password,
        };
        try {
          const authResponse = await CombineFetch<User>({
            path: "/api/login",
            body,
            method: "POST",
          });
          if (authResponse.status === "success") {
            //쿠키 핸들링
            // let setCookie = authResponse.header?.set("Set-Cookie");
            // if (setCookie) {
            //   const parsed = cookie.parse(setCookie);
            //   cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심기
            // }
            const { email, id, image, nickname, role } = authResponse.data;
            console.log({
              id,
              email,
              name: nickname,
              image,
              role,
            });
            return {
              id,
              email,
              name: nickname,
              image,
              role,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error as any);
        }
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
