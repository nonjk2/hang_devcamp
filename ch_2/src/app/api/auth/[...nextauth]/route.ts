import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handlers = NextAuth({
  pages: {
    signIn: "/",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token }) {
      console.log("auth.ts jwt", token);
      return token;
    },
    session({ session, newSession, user }) {
      console.log("auth.ts session", session, newSession, user);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  events: {
    signOut(data) {
      console.log(
        "auth.ts events signout",
        "session" in data && data.session,
        "token" in data && data.token
      );
      // if ('session' in data) {
      //   data.session = null;
      // }
      // if ('token' in data) {
      //   data.token = null;
      // }
    },
    session(data) {
      console.log(
        "auth.ts events session",
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      name: "myCredentials",
      credentials: {
        email: { value: "asdfasd@nasdd", type: "email", label: "email" },
        password: { value: "12312411", type: "password", label: "password" },
      },
      async authorize(credentials, req) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials?.email,
            password: credentials?.password,
          }),
        });
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        // if (setCookie) {
        //   const parsed = cookie.parse(setCookie);
        //   cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        // }
        console.log(authResponse.json());
        if (authResponse) {
          return authResponse.json();
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handlers as GET, handlers as POST };
