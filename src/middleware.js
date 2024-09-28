import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(`${process.env.HOST}/connexion`);
  }
  if (pathname.startsWith("/dashboard") && token?.user?.role !== "admin") {
    return NextResponse.redirect(`${process.env.HOST}/connexion`);
  }
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: "/((?!api|_next/static|_next/images|sitemap.xml|robots.txt).*)",
  api: {
    bodyParser: false,
  },
};
