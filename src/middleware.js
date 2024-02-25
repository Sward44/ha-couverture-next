import { NextResponse } from "next/server";

export default async function middleware(request) {
  // console.log("middleware", request.url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/images).*)",
};
