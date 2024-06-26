import NextAuth from "next-auth/next";
import authOptions from "@/app/api/auth/authOptions";

const  handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
