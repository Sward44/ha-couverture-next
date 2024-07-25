import { getToken } from "next-auth/jwt";
import { NextResponse}  from "next/server";

export async function middleware(req) { 
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  console.log(pathname);

  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(`${process.env.HOST}/connexion`);
  }
  if (pathname.startsWith("/dashboard") && token?.user?.role !== "admin") {
    return NextResponse.redirect(`${process.env.HOST}/connexion`);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/images).*)",
  api: {
    bodyParser: false,
  },
};
