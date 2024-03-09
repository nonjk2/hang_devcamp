import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";
const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });

  if (session) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/signup"],
};
