import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendVerificationRequest } from "@/email/sendVerificationRequest";
import { connect } from "@/utils/mongodb";
import { AccountModel, UserModel } from "@/models";
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
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile: async (user) => {
        console.log("C'est GoogleProvider : ", user);
        const role = user?.hasOwnProperty("role") ? user.role : "user";
        const isVerifiedEmail = user?.hasOwnProperty("email_verified")
          ? user?.email_verified
          : true;
        const image = user?.picture;
        const createdAt = user?.hasOwnProperty("createdAt")
          ? user?.createdAt
          : new Date().toISOString();
        const updatedAt = user?.hasOwnProperty("updatedAt")
          ? user?.updatedAt
          : new Date().toISOString();
        const id = user?.id ? user?.id : user?.sub;
        return {
          id,
          name: user?.name,
          email: user?.email,
          role,
          isVerifiedEmail,
          avatar,
          createdAt,
          updatedAt,
        };
      },
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
    signIn: "/connexion",
    error: "/error",
  },

  callbacks: {
    async signIn(user, account, profile, email, credentials) {
      return true;
      },
    async session({ session, token, user }) {
      if (token) {
        session.user = token?.user;
        session.accessToken = token?.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token && user) {
        const _user = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          avatar: user.avatar,
        };
        // create a fn generate access token
        const accessToken = await generateAccessToken({
          accessToken: token?.accessToken,
          user: _user,
          isRefresh: false,
        });
        token.user = _user;
        token.accessToken = accessToken;
      }
      if (token && !user) {
        const _user = token?.user;
        // create a fn generate access token
        const accessToken = await generateAccessToken({
          accessToken: token?.accessToken,
          user: _user,
          isRefresh: true,
        });
        token.user = _user;
        token.accessToken = accessToken;
      }
      return token;
    },
  },
};

export default authOptions;
