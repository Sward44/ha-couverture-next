import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";
import { connectMongoose } from "@/utils/mongodb";
import { UserModel, DevisModel, AddressModel, ImageModel } from "@/models";
import email from "@/email/devis/email";

export async function POST(request) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage") || null;
  const devisIdInterne = verifyJwt(devisCookie.value).devisId;

  const body = await request.json();
  let phoneNumberDigits = body.number.replace(/\D/g, "");
  let numberDigits;

  if (phoneNumberDigits.length === 10) {
    numberDigits = `+33${phoneNumberDigits.slice(1)}`;
  } else if (phoneNumberDigits.length === 11) {
    numberDigits = `+${phoneNumberDigits}`;
  } else if (phoneNumberDigits.length === 13 && phoneNumberDigits.slice(0, 4) === "0033") {
    numberDigits = `+${phoneNumberDigits.slice(2)}`;
  } else if (phoneNumberDigits.length === 9) {
    numberDigits = `+33${phoneNumberDigits}`;
  } else if (phoneNumberDigits.slice(0, 2) === "00") {
    numberDigits = `+${phoneNumberDigits.slice(2)}`;
  } else {
    numberDigits = `+${phoneNumberDigits}`;
  }
  phoneNumberDigits = numberDigits;

  body.firstName = body.firstName.trim().charAt(0).toUpperCase() + body.firstName.slice(1).toLowerCase();
  body.lastName = body.lastName.trim().charAt(0).toUpperCase() + body.lastName.slice(1).toLowerCase();
  body.name = `${body.firstName} ${body.lastName}`;
  body.email = body.email.toLowerCase();
  body.number = phoneNumberDigits;

  try {
    await connectMongoose();
    let existingUser = await UserModel.findOne({ email: body.email }).lean().exec();
    let newAddress = existingUser
      ? await AddressModel.findOne({ userId: existingUser._id }).sort({ _id: -1 }).exec()
      : null;

    if (!existingUser) {
      existingUser = new UserModel({
        name: body.name,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.number,
      });
      await existingUser.save();

      newAddress = new AddressModel({
        userId: existingUser._id,
        devisId: devisIdInterne,
        address: body.voie,
        code_postal: body.codePostal,
        ville: body.ville,
      });
      await newAddress.save();
    } else {
      const userUpdates = {};
      if (body.firstName && existingUser.firstName !== body.firstName) userUpdates.firstName = body.firstName;
      if (body.lastName && existingUser.lastName !== body.lastName) userUpdates.lastName = body.lastName;
      if (body.name && existingUser.name !== body.name) userUpdates.name = body.name;
      if (body.number && existingUser.phone !== body.number) userUpdates.phone = body.number;

      if (Object.keys(userUpdates).length > 0) {
        await UserModel.updateOne({ email: body.email }, { $set: userUpdates });
      }

      if (newAddress && newAddress.code_postal === body.codePostal) {
       newAddress = await AddressModel.updateOne(
          { userId: existingUser._id, code_postal: body.codePostal },
          {$set: {
              devisId: devisIdInterne,
              address: newAddress.address === body.voie ? newAddress.address : body.voie,
              ville: newAddress.ville === body.ville ? newAddress.ville : body.ville,
            }},
          { upsert: true }
        ).exec();
      } else {
        newAddress = new AddressModel({
          userId: existingUser._id,
          devisId: devisIdInterne,
          address: body.voie,
          code_postal: body.codePostal,
          ville: body.ville,
        });
        await newAddress.save();
      }
    }

    await DevisModel.updateOne({ _id: devisIdInterne },{$set: {userId: existingUser._id,done: true,}},{ new: true, upsert: true }).exec();
    await ImageModel.updateMany({ devisId: devisIdInterne },{ $set: { userId: existingUser._id } },{new: true, upsert: true }).exec();
    const devis = await DevisModel.findOne({_id : devisIdInterne, userId : existingUser._id}).exec();
    const images = await ImageModel.find({devisId : devisIdInterne, userId : existingUser._id}).exec();

    await email.getTemplate("email-devis", {
      subject: `[${process.env.NEXT_PUBLIC_HOST}] Nouveau devis de ${existingUser.firstName} ${existingUser.lastName}`,
      to: "Abraham Hognon <ha.couverture44@gmail.com>",
      metadata: {
        bienvenue: `Nouveau devis reçu de ${existingUser.firstName} ${existingUser.lastName}`,
        email: "ha.couverture@gmail.com",
        ownerEmail: existingUser.email,
        ownerName: existingUser.firstName,
        ownerSurname: existingUser.lastName,
        ownerPhone: existingUser.phone,
        ownerVoie: newAddress.address,
        ownerCodePostal: newAddress.code_postal,
        ownerVille: newAddress.ville,
        ownerComments: devis.body,
        ownerImages: images.map((item) => ({
          name: item.name,
          path: `${process.env.NEXT_PUBLIC_HOST}/uploads/${item.pictureId}${item.extension}`
        })),
        siteUrl: process.env.NEXT_PUBLIC_HOST,
      },
    });

    const response = NextResponse.json({ message: "Message remis avec succès à Ha Couverture" }, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    response.cookies.delete("chiffrage");
    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur de serveur" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};