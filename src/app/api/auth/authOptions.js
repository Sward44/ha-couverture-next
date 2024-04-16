import GoogleProvider from "next-auth/providers/google";
import { sendVerificationRequest } from "@/email/sendVerificationRequest";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/adapterMongoDb";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile, account) {
        console.log("Profile Google :", profile, "Account Google :", account);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
    {
      id: "hacouverture",
      type: "email",
      sendVerificationRequest,
    },
  ],
  pages: {
    signIn: "/signin",
    error: "/error",
  },

  callbacks: {
    async session({ session, token, user }) {
      console.log("Session :", session, "Token :", token, "User :", user);
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      console.log(
        "Token :",
        token,
        "User :",
        user,
        "Trigger :",
        trigger,
        "Session :",
        session
      );
      if (user) {
        token.role = user.role;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
  },
};

export default authOptions;
