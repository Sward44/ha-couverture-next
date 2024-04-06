import { NextResponse } from "next/server";
import connect from "@/utils/mongodb";
import User from "@/models/user";
import Devis from "@/models/devis";
import email from "@/email/devis/email";

export const POST = async (request) => {
  const body = await request.json();
  try {
    await connect();
    let existingUser = await User.findOne({ email: body.email }).exec();
    let newDevis;
    if (!existingUser) {
      existingUser = new User({
        name: body.surname,
        surname: body.name,
        email: body.email,
        phone: body.number,
      });
      await existingUser.save().then((doc) => {
        // console.log("Utilisateur enregistré : ", doc);
      });
      newDevis = new Devis({
        user: existingUser._id,
        body: body.comments,
      });
      await newDevis.save().then((doc) => {
        // console.log("Devis enregistré : ", doc);
      });
      await email.getTemplate("email-devis", {
        subject: "[ha-couverture.com] Nouveau devis reçu, nouveau client",
        to: "Abraham Hognon <ha.couverture44@gmail.com>",
        metadata: {
          bienvenue: "Nouveau devis reçu d'un nouveau client",
          email: "davidlaunay567@gmail.com",
          ownerEmail: body.email,
          ownerName: body.surname,
          ownerSurname: body.name,
          ownerPhone: body.number,
          ownerComments: body.comments,
          siteUrl: "https://buzz-ready.com",
        },
      });
    } else {
      if (
        body.name &&
        body.name.length !== 0 &&
        existingUser.surnname !== body.name
      ) {
        await User.updateOne(
          { email: body.email },
          { $set: { surname: body.name } }
        );
      }
      if (
        body.surname &&
        body.surname.length !== 0 &&
        existingUser.name !== body.surname
      ) {
        await User.updateOne(
          { email: body.email },
          { $set: { name: body.surname } }
        );
      }
      if (
        body.number &&
        body.number.length !== 0 &&
        existingUser.phone !== body.number
      ) {
        await User.updateOne(
          { email: body.email },
          { $set: { phone: body.number } }
        );
      }

      await existingUser.save().then((doc) => {
        // console.log("Utilisateur enregistré : ", doc);
      });
      newDevis = new Devis({
        user: existingUser._id,
        body: body.comments,
      });
      await newDevis.save().then((doc) => {
        // console.log("Devis enregistré : ", doc);
      });
      await email.getTemplate("email-devis", {
        subject: "[ha-couverture.com] Nouveau devis reçu, client existant",
        to: "Abraham Hognon <ha.couverture44@gmail.com>",
        metadata: {
          bienvenue: "Nouveau devis reçu d'un client existant",
          email: "davidlaunay567@gmail.com",
          ownerEmail: body.email,
          ownerName: body.surname,
          ownerSurname: body.name,
          ownerPhone: body.number,
          ownerComments: body.comments,
          siteUrl: "https://buzz-ready.com",
        },
      });
    }
    return NextResponse.json(existingUser.toObject(), {
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
