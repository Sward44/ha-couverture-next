import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendVerificationRequest } from "@/email/sendVerificationRequest";
import connect from "@/utils/mongodb";
import { UserModel } from "@/models";
import * as bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/adapterMongoDb";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "user";
        if (
          profile?.email === "davidlaunay567@gmail.com" ||
          profile?.email === "ha.couverture44@gmail.com"
        ) {
          userRole = "admin";
        }
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credidentials",
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Votre email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        async authorize(credentials) {
          await connect();
          const user = await UserModel.findOne({ email: credentials?.username })
            .lean()
            .exec();
          if (!user) throw new Error("L'email n'est pas enregistré");

          if (!credentials.password)
            throw new Error("Veuillez mettre votre mot de passe");
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect)
            throw new Error("Vous avez entrer un mauvais mot de passe");
          const { password, ...userWithoutPass } = user;
          return userWithoutPass;
        },
      },
    }),
    {
      id: "hacouverture",
      name: "Email",
      type: "email",
      sendVerificationRequest,
    },
  ],
  pages: {
    signIn: "/signin",
    error: "/error",
  },

  callbacks: {
    async signIn(user, account, email, profile) {
      console.log(
        "Account signIn : ",
        user.account,
        "Profile signIn : ",
        profile,
        "User signIn : ",
        user,
        "User signIn Email before : ",
        user.user.email,
        "Email signIn before : ",
        email
      );
      if (user.account.provider === "hacouverture") {
        user = {
          ...user,
          role:
            user.user.email === "davidlaunay567@gmail.com" ||
            user.user.email === "ha.couverture44@gmail.com"
              ? "admin"
              : "user",
          image: null,
        };
        console.log("User signIn Email after : ", user);
      } else if (account.provider === "google") {
        user = {
          ...user,
          id: profile.id,
          email: profile.email,
          image: profile.picture,
          role: profile.role,
        };
        console.log("User signIn Google after : ", user);
      }
      return user;
    },
    async jwt({ token, user, account }) {
      console.log("User JWT before : ", user);
      console.log("Account JWT before: ", account);
      if (user) {
        token.image = user.image;
        token.role = user.role;
        console.log("User JWT after : ", user);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.image = token.image;
      session.user.role = token.role;
      return session;
    },
  },
};

export default authOptions;
