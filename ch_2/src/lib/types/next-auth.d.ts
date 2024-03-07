import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      token?: string;
      role?: RoleType;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    role?: RoleType;
  }

  interface User extends DefaultUser {
    token?: string;
    role?: RoleType;
  }
}
