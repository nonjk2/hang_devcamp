import NextAuth from "next-auth";

import { authOption } from "@/lib/action/auth/authoption";

const handlers = NextAuth(authOption);

export { handlers as GET, handlers as POST };
