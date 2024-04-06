import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/index";
import connect from "@/utils/mongodb";
import User from "@/models/user";
import Email from "@/email/devis/email";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    {
      id: "nodemailer",
      type: "email",
      async sendVerificationRequest({ identifier: email, url, callbacks }) {
        const { host } = new URL(url);

        try {
          await Email.getTemplate("email-connexion", {
            subject: `Connexion demandée de ${email}`,
            to: process.env.EMAIL_FROM,
            metadata: {
              bienvenue: "Nouvelle connexion demandée",
              email: email,
              ownerEmail: body.email,
              ownerName: body.surname || "",
              ownerSurname: body.name || "",
              ownerPhone: body.number || "",
              ownerComments: body.comments,
              siteUrl: host,
            },
          });
        } catch (e) {
          throw new Error(e);
        }
      },
    },
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export default authOptions;
// callbacks: {
//   async signIn({ user, account, profile }) {
//     if (account?.provider == "email") {
//       console.log(
//         "Utilisateur coté serveur : ",
//         user,
//         "Differente information de connexion : ",
//         account,
//         "Utillisateur : ",
//         profile,
//         "Email utilisateur : ",
//         profile.email
//       );
//       return true;
//     } else if (account?.provider == "google") {
//       console.log(
//         "Utilisateur coté serveur : ",
//         user,
//         "Differente information de connexion : ",
//         account,
//         "Utillisateur : ",
//         profile,
//         "Email utilisateur + verifed_email + name + surname : ",
//         profile.email,
//         profile.email_verified,
//         profile.family_name,
//         profile.given_name
//       );
//       await connect();
//       try {
//         const existingUser = await User.findOne({
//           email: profile.email,
//         });

//         if (existingUser) {
//           if (
//             existingUser.email_verified !== profile.email_verified &&
//             existingUser.email_verified
//           ) {
//             console.log(
//               "Si email verified n'est pas = dans profil : ",
//               existingUser.verified_email,
//               profile.email_verified
//             );
//             User.updateOne(
//               { _id: existingUser._id },
//               { $set: { verified_email: profile.email_verified } },
//               { new: true }
//             ).exec();
//           } else if (!existingUser.email_verified) {
//             console.log(
//               "Si verified n'existe pas : ",
//               existingUser.email_verified,
//               profile.email_verified
//             );
//             User.updateOne(
//               { _id: existingUser._id },
//               { $set: { verified_email: profile.email_verified } },
//               { new: true }
//             ).exec();
//           }

//           if (existingUser.name !== profile.given_name) {
//             User.updateOne(
//               { _id: existingUser._id },
//               { $set: { name: profile.given_name } },
//               { new: true }
//             ).exec();
//           }

//           if (existingUser.surname !== profile.family_name) {
//             User.updateOne(
//               { _id: existingUser._id },
//               { $set: { surname: profile.family_name } },
//               { new: true }
//             ).exec();
//           }

//           if (existingUser.image_logo !== profile.picture)
//             User.updateOne(
//               { _id: existingUser._id },
//               { $set: { image_logo: profile.picture } },
//               { new: true }
//             ).exec();

//           return true;
//         } else {
//           const newUser = new User({
//             surname: profile.family_name,
//             name: profile.given_name,
//             email: profile.email,
//             email_verified: profile.verified_email,
//             image_logo: profile.picture,
//             done: false,
//           });
//           newUser.save();
//         }
//         return true;
//       } catch (err) {
//         console.log("Erreur de sauvegarde de l'utilisareur", err);
//         return false;
//       }
//     }
// },
// async session({ session, token, user }) {
//   console.log(
//     "Restitution des session : ",
//     session,
//     "Restitution des token : ",
//     token,
//     "Restitution des user : ",
//     user
//   );
//   return true;
