import { NextResponse } from "next/server";
import connect from "../../../../Mongoose";
import User from "../../../../models/User";
import Devis from "../../../../models/Devis";
import email from "@/utils/email";

export const POST = async (req) => {
  const body = await req.json();
  try {
    await connect();
    const existingUser = await User.findOne({ _id: body._id }).exec();
    if (!existingUser) {
      const newUser = new User({
        surname: body.surname,
        name: body.name,
        email: body.email,
        phone: body.phone,
      });
      await newUser.save();
      const newDevis = new Devis({
        user: newUser._id,
        body: body.comments,
      });
      await newDevis.save();
      await email.getTemplate("ha-couverture", {
        subject: "[ha-couverture.com] Nouveau devis reçu",
        to: "ha.couverture44@gmail.com",
        metadata: {
          bienvenue: "Nouveau devis reçu d'un client existant",
          email: "davidlaunay567@gmail.com",
          ownerEmail: newUser.email,
          ownerSurname: newUser.surname,
          ownerName: newUser.name,
          ownerPhone: newUser.phone,
          ownerComments: newDevis.body,
          siteUrl: "https://buzz-ready.com",
        },
      });
    } else {
      if (
        body.email &&
        body.name.length !== 0 &&
        existingUser.email !== body.email
      ) {
        existingUser.email = body.email;
      }
      if (
        body.name &&
        body.name.length !== 0 &&
        existingUser.name !== body.name
      ) {
        existingUser.name = body.name;
      }
      if (
        body.surname &&
        body.surname.length !== 0 &&
        existingUser.surname !== body.surname
      ) {
        existingUser.surname = body.surname;
      }
      if (
        body.phone &&
        body.phone.length !== 0 &&
        existingUser.phone !== body.phone
      ) {
        existingUser.phone = body.phone;
      }
    }
    await existingUser.save();
    const newDevis = new Devis({
      user: existingUser._id,
      body: body.comments,
    });
    await newDevis.save();
    await email.getTemplate("ha-couverture", {
      subject: "[ha-couverture.com] Nouveau devis reçu",
      to: "ha.couverture44@gmail.com",
      metadata: {
        bienvenue: "Nouveau devis reçu d'un nouveau client",
        email: "ha.couverture44@gmail.com",
        ownerEmail: existingUser.email,
        ownerSurname: existingUser.surname,
        ownerName: existingUser.name,
        ownerPhone: existingUser.phone,
        ownerComments: newDevis.body,
      },
    });
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
