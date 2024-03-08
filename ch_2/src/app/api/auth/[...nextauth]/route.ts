import { CombineFetch } from "@/lib/action";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import { createClient } from "@supabase/supabase-js";
import {
  supabaseURL,
  supabaseAnon,
  supabaseKEY,
  googleClientID,
  googleClientSecret,
  githubClientID,
  githubClientSecret,
} from "@/lib/constant";

const supabase = createClient(supabaseURL, supabaseAnon, {
  db: { schema: "next-auth" },
});
export const authOption: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: supabaseURL,
    secret: supabaseKEY,
  }) as Adapter,
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
    //     user.to = tokenData.token;
    //     return true;
    //   }
    //   return false;
    // },
    jwt({ token, user }) {
      // console.log("URL : ", supabaseURL, "key : ", supabaseKEY);
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
        if (!(credentials?.email && credentials.password)) {
          return null;
        }
        const { email, password } = credentials;
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({ email, password });
        console.log(user);
        console.log("message : ", error?.message);
        if (!user) {
          return null;
        }

        // .from("users")
        // .select("*")
        // .eq("email", credentials?.email)
        // .single();

        // // 비밀번호 검증
        // const isValid = bcrypt.compareSync(
        //   credentials?.password,
        //   user.password
        // );

        // if (!isValid) throw new Error("Incorrect password");

        // // 여기서 사용자 정보를 데이터베이스에 저장하는 로직 구현 (신규 사용자인 경우)
        // if (!user) {
        //   const { error: insertError } = await supabase.from("users").insert([
        //     {
        //       email: credentials?.email,
        //       password: bcrypt.hashSync(
        //         credentials?.password,
        //         10
        //       ),
        //     },
        //   ]);

        //   if (insertError)
        //     throw new Error("An error occurred while inserting user data.");
        // }

        return {
          id: user.id,
          email: user.email,
          name: "asd",
          image: "asd",
        };
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
