import { NextResponse } from "next/server";
import connect from "@/utils/mongodb";
import { UserModel, DevisModel } from "@/models";
import email from "@/email/devis/email";

export const POST = async (request) => {
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

  try {
    await connect();
    let existingUser = await UserModel.findOne({ email: body.email }).lean().exec();
    let newDevis;
    if (!existingUser) {
      existingUser = new UserModel({
        name: body.name,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.number,
      });
      await existingUser.save();

      newDevis = new DevisModel({
        user: existingUser._id,
        body: body.comments,
      });
      await newDevis.save();

      await email.getTemplate("email-devis", {
        subject: "[ha-couverture.com] Nouveau devis reçu, nouveau client",
        to: "Abraham Hognon <ha.couverture44@gmail.com>",
        metadata: {
          bienvenue: "Nouveau devis reçu d'un nouveau client",
          email: "davidlaunay567@gmail.com",
          ownerEmail: body.email,
          ownerName: body.firstName,
          ownerSurname: body.lastName,
          ownerPhone: body.number,
          ownerComments: body.comments,
          siteUrl: "https://buzz-ready.com",
        },
      });
    } else {
      if (
        body.firstName &&
        body.firstName.length !== 0 &&
        existingUser?.firstName !== body.firstName
      ) {
        existingUser = await UserModel.updateOne(
          { email: body.email },
          { $set: { firstName: body.firstName } },
          { upsert:true } 
        );
      }
      if (
        body.lastName &&
        body.lastName.length !== 0 &&
        existingUser?.lastName !== body.lastName
      ) {
        existingUser = await UserModel.updateOne(
          { email: body.email },
          { $set: { lastName: body.lastName } },
          { upsert:true }
        );
      }
      if (
        body.name &&
        body.name.length !== 0 &&
        existingUser?.name !== body.name
      ) {
        existingUser = await UserModel.updateOne(
          { email: body.email },
          { $set: { name: body.name } },
          { upsert:true }
        );
      }
      if (
        body.number &&
        body.number.length !== 0 &&
        existingUser.phone !== body.number
      ) {
        existingUser = await UserModel.updateOne(
          { email: body.email },
          { $set: { phone: body.number } },
          { upsert:true }
        );
      }

      newDevis = new DevisModel({
        user: existingUser._id,
        body: body.comments,
      });
      await newDevis.save();
      await email.getTemplate("email-devis", {
        subject: "[ha-couverture.com] Nouveau devis reçu, client existant",
        to: "Abraham Hognon <ha.couverture44@gmail.com>",
        metadata: {
          bienvenue: "Nouveau devis reçu d'un client existant",
          email: "davidlaunay567@gmail.com",
          ownerEmail: body.email,
          ownerName: body.firstName,
          ownerSurname: body.lastName,
          ownerPhone: body.number,
          ownerComments: body.comments,
          siteUrl: "https://buzz-ready.com",
        },
      });
    }
    return NextResponse.json({auteur : body.name, message: "Ok"}, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur de serveur" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
