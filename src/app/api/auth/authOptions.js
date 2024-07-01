import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { sendVerificationRequest } from "@/email/sendVerificationRequest";
import { connect } from "@/utils/mongodb";
import {  UserModel } from "@/models";
import * as bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/adapterMongoDb";
// import { User } from "@/components/logo/Logo";
// import { signIn } from "next-auth/react";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/connexion",
    // error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credidentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Votre email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
        async authorize(credentials) {
            await connect();
            const user = await UserModel.findOne({ email: credentials?.username })
              .lean()
              .exec();
            if (!user) {
              throw new Error("L'email n'est pas enregistré...")
            } else if (user?.emailVerified === null ) {
              throw new Error("L'email n'est pas vérifié...")
            } else if (!user?.password) {
              throw new Error("Créer votre mot de passe...")
            };

            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordCorrect) throw new Error("Vous avez entrer un mauvais mot de passe");

            const { password, _id, __v, emailVerified, ...userWithoutPass } = user;
            return userWithoutPass;
        },
      }),
      // {
        //   id: "hacouverture",
        //   name: "Email",
        //   type: "email",
        //   sendVerificationRequest,
        // },
      ],
      
  callbacks: {
    async jwt({ token, user, account, profile }) {

      if (user && account?.provider === "google") {
        const userPerso = await UserModel.findOne({ email: profile.email }).lean().exec();
        if (!userPerso) {
          if (profile.email === "davidlaunay567@gmail.com" || profile.email === "ha.couverture44@gmail.com" ) {let role = "admin"}
          await UserModel.create({
            id: profile.sub,
            email: profile.email,
            phone: "",
            firstName: profile.given_name,
            lastName: profile.family_name,
            image: profile.picture,
            name: profile.name,
            emailVerified: profile.email_verified === true ? new Date() : null,
            role: role ? role : "user",
          });
        } else {
          await UserModel.findOneAndUpdate(
          {email: profile.email},
          {$set : 
            {
              firstName: user?.firstName ? user.firstName : profile.given_name,
              lastName: user?.lastName ? user.lastName : profile.family_name,
              image: profile.picture,
              emailVerified: user.emailVerified === null && profile.email_verified === true ? new Date() : user.emailVerified,
            }
          },
          { upsert: true},
        ).lean().exec();
      }
        const { id, password, _id, __v, emailVerified, ...userWithoutPass } = user;
        token.user = userWithoutPass;

        return token;
      } else if (user && account?.provider === "credentials") {
        token.user = user;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
        session.user = token?.user;
        session.accessToken = token?.accessToken;
      return session;
    },
  },
};

export default authOptions;
