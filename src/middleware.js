import { NextResponse } from "next/server";

export default async function middleware(request) {}

export const config = {
  matcher: "/((?!api|_next/static|_next/images).*)",
};
