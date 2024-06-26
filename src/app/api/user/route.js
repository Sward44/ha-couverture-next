import { connect } from "@/utils/mongodb";
import { UserModel } from "@/models";
import { NextResponse } from "next/server";
import * as bycrypt from "bcrypt";
import { signJwtOneDay } from "@/utils/jwt";
import email from "@/email/devis/email";

export async function POST(request) {
  const body = await request.json();

  let phoneNumberDigits = body.number.replace(/\D/g, "");
  let numberDigits;

    if (phoneNumberDigits.length === 10) {
      numberDigits = `+33${phoneNumberDigits.slice(1, phoneNumberDigits.length)}`;
      phoneNumberDigits = numberDigits;
    } else if (phoneNumberDigits.length === 11) {
      numberDigits = "+" + phoneNumberDigits;
      phoneNumberDigits = numberDigits;
    } else if (phoneNumberDigits.length === 13 && phoneNumberDigits.slice(0, 4) === "0033") {
      numberDigits = "+" + phoneNumberDigits.slice(2, phoneNumberDigits.length);
      phoneNumberDigits = numberDigits;
    } else if (phoneNumberDigits.length === 9) {
      numberDigits = "+33" + phoneNumberDigits;
      phoneNumberDigits = numberDigits;
    } else if (phoneNumberDigits.slice(0, 2) === "00") {
      numberDigits = "+" + phoneNumberDigits.slice(2, phoneNumberDigits.length);
      phoneNumberDigits = numberDigits;
    } else {
      phoneNumberDigits = "+" + phoneNumberDigits;
    }

    
  body.firstName = body.firstName.trim(),
  body.lastName = body.lastName.trim(),
  body.firstName = body.firstName.slice(0, 1).toUpperCase() + body.firstName.slice(1, body.firstName.length).toLowerCase(),
  body.lastName = body.lastName.slice(0, 1).toUpperCase() + body.lastName.slice(1, body.lastName.length).toLowerCase(),
  body.name = body.firstName + " " + body.lastName,
  body.email = body.email.slice(0, body.email.indexOf('@')).toLowerCase()+ "@" + body.email.slice(body.email.indexOf('@') + 1, body.email.length).toLowerCase(),
  body.number = phoneNumberDigits;
  if(body.email === "davidlaunay567@gmail.com" || body.email === "ha.couverture44@gmail.com" )
    {
      body.role = "admin";
    }    
  await connect();
  let existingUser = await UserModel.findOne({ email: body.email }).lean().exec();
  if (!existingUser) {
     await UserModel.create({
      name: body.name,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.number,
      role: body?.role,
      password: await bycrypt.hash(body.password, 10),
      emailVerified: null,
    });
    const messageReturn = `Succès ! Nous avons envoyé un email de confirmation à ${body.email}. Votre lien est valable pendant 24h.`;
    const newUser = await UserModel.findOne({ email: body.email }).lean().exec();
      const jwtUserId = signJwtOneDay({ id: newUser._id });
      await email.getTemplate("email-connexion", {
        subject: "Activation de compte pendant 24h",
        to: body.email,
        metadata: {
          name: body.name,
          url: `${process.env.NEXT_PUBLIC_HOST}/activation/email/${jwtUserId}`,
          message: "Activation de votre e-mail",
        }});
    return NextResponse.json(
      { message:messageReturn }, 
      { status: 201 }
    );
  } else {
    if (existingUser?.firstName !== body.firstName) {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { firstName: body.firstName } },
        { upsert:true } 
      );
    }
    if (existingUser?.lastName !== body.lastName) {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { lastName: body.lastName } },
        { upsert:true }
      );
    }
    if (existingUser?.name !== body.name) {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { name: body.name } },
        { upsert:true }
      );
    }
    if (existingUser?.phone !== body.number) {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { phone: body.number } },
        { upsert:true }
      );
    }
    if (existingUser?.role !== body.role) {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { role: body.role } },
        { upsert:true }
      );
    }
    let messagePassword = "";
    if (!existingUser?.password && existingUser?.password !== null || "") {
      existingUser = await UserModel.updateOne(
        { email: body.email },
        { $set: { password: await bycrypt.hash(body.password,10) } },
        { upsert:true }
      );
      messagePassword = " Votre mot de passe a été crée !";
    }
    let messageSend= "";
    if (existingUser?.emailVerified === null ) {
      messageSend = `Nous avons envoyé un email de confirmation à ${body.email}. Votre lien est valable pendant 24h.`;
      const jwtUserId = signJwtOneDay({ id: existingUser._id });
      await email.getTemplate("email-connexion", {
        subject: "Activation de compte pendant 24h",
        to: body.email,
        metadata: {
          name: body.name,
          url: `${process.env.NEXT_PUBLIC_HOST}/activation/email/${jwtUserId}`,
          message: "Activation de votre e-mail", 
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
}
