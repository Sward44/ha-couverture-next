import { connect } from "@/utils/mongodb";
import { UserModel } from "@/models";
import { NextResponse } from "next/server";
import * as bycrypt from "bcrypt";
import { signJwt } from "@/utils/jwt";
import email from "@/email/devis/email";

export async function POST(request) {
  const body = await request.json();

  body.email = body.email.slice(0, body.email.indexOf('@')).toLowerCase()+ "@" + body.email.slice(body.email.indexOf('@') + 1, body.email.length).toLowerCase(),
   
  await connect();
  let existingUser = await UserModel.findOne({ email: body.email }).lean().exec();
  let messageSend = "";
  if (!existingUser) {
  return NextResponse.json({message: "Votre email n'existe pas dans la base de données !"}, { status: 404 });    

  } else if (existingUser?.emailVerified == null) {
      messageSend = `Nous avons envoyé un email de confirmation à ${body.email}. Votre lien est valable pendant 24h.`;
      const jwtUserId = signJwt({ id: existingUser._id, },{ expiresIn: "1d" });
      await email.getTemplate("email-connexion", {
        subject: "Activation de compte pendant 24h",
        to: body.email,
        metadata: {
          name: body.name,
          url: `${process.env.NEXT_PUBLIC_HOST}/activation/email/${jwtUserId}`,
          message: "Activation de votre e-mail", 
        },
      });
    } else {
      messageSend = `Nous avons envoyé un email de réinitialisation à ${body.email}. Votre lien est valable pendant 1h`;
      const jwtUserId = signJwt({ id: existingUser._id },{ expiresIn:"1h" });
      await email.getTemplate("email-connexion", {
        subject: "Réinitialisation de votre mot de passe de compte pendant 1h",
        to: body.email,
        metadata: {
          name: body.name,
          url: `${process.env.NEXT_PUBLIC_HOST}/activation/mot-de-passe/${jwtUserId}`,
          message: "Réinitialisation de mot de passe", 
        },
      });
    }
    
    let messageReturn = `Votre profil existe déjà dans la base de données ! ${messagePassword}`;
    let statusReturn = 202;
    if ( messageSend.length > 0) {
      messageReturn = messageSend + messagePassword;
      statusReturn = 200;
    }
    
    
    return NextResponse.json(
      { message: messageReturn},
      { status: statusReturn }
    );

}
