import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/index";
import User from "@/models/user";
import connect from "@/utils/mongodb";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_FROM,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        access_token: access_token,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider == "google") {
        console.log(
          "Utilisateur coté serveur : ",
          user,
          "Differente information de connexion : ",
          account,
          "Utillisateur : ",
          profile,
          "Email utilisateur + verifed_email + name + surname : ",
          profile.email,
          profile.email_verified,
          profile.family_name,
          profile.given_name
        );
        await connect();
        try {
          const existingUser = await User.findOne({
            email: profile.email,
          });

          if (existingUser) {
            if (
              existingUser.email_verified !== profile.email_verified &&
              existingUser.email_verified
            ) {
              console.log(
                "Si email verified n'est pas = dans profil : ",
                existingUser.verified_email,
                profile.email_verified
              );
              User.updateOne(
                { _id: existingUser._id },
                { $set: { verified_email: profile.email_verified } },
                { new: true }
              ).exec();
            } else if (!existingUser.email_verified) {
              console.log(
                "Si verified n'existe pas : ",
                existingUser.email_verified,
                profile.email_verified
              );
              User.updateOne(
                { _id: existingUser._id },
                { $addToSet: { verified_email: profile.email_verified } },
                { new: true }
              ).exec();
            }

            if (existingUser.name !== profile.given_name) {
              User.updateOne(
                { _id: existingUser._id },
                { $set: { name: profile.given_name } },
                { new: true }
              ).exec();
            }

            if (existingUser.surname !== profile.family_name) {
              User.updateOne(
                { _id: existingUser._id },
                { $set: { surname: profile.family_name } },
                { new: true }
              ).exec();
            }

            if (existingUser.image_logo !== profile.picture)
              User.updateOne(
                { _id: existingUser._id },
                { $set: { image_logo: profile.picture } },
                { new: true }
              ).exec();

            return true;
          } else {
            const newUser = new User({
              surname: profile.family_name,
              name: profile.given_name,
              email: profile.email,
              email_verified: profile.verified_email,
              image_logo: profile.picture,
              done: false,
            });
            newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Erreur de sauvegarde de l'utilisareur", err);
          return false;
        }
      }
    },
    async session({ session, token, user }) {
      console.log(
        "Restitution des session : ",
        session,
        "Restitution des token : ",
        token,
        "Restitution des user : ",
        user
      );
      return true;
    },
  },
};

export default authOptions;
