import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";
import { connect } from "@/utils/mongodb";
import { UserModel, DevisModel, AddressModel, ImageModel } from "@/models";
import email from "@/email/devis/email";

export async function POST(request) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage");
  const chiffrage = verifyJwt(devisCookie.value);
  console.log("Chiffrage : ", chiffrage);
  const body = await request.json();
  
  body.comments = body.comments.trim();
  body.voie = body.voie.trim();
  body.ville = body.ville.trim();
  try {
    await connect();
    let address = await AddressModel.findOne({ userId: chiffrage.userId }).sort({_id: -1}).exec();
    console.log("Address de MongoDB : ",address.address,"Address de FormDevisThree : ", body.voie, address.code_postal, body.codePostal, address.ville, body.ville);
    if(!address){
      address = new AddressModel({
        userId: chiffrage.userId,
        devisId: chiffrage.devisId,
        address: body.voie,
        code_postal: body.codePostal,
        ville: body.ville,
      });
      await address.save();
    } else if(address.address !== body.voie || address.code_postal !== body.codePostal || address.ville !== body.ville){ {
      address = new AddressModel({
        userId: chiffrage.userId,
        devisId: chiffrage.devisId,
        address: body.voie,
        code_postal: body.codePostal,
        ville: body.ville,
      });
      await address.save();
      }
    }

    const comments = await DevisModel.updateOne(
      { userId: chiffrage.userId, _id: chiffrage.devisId }, 
      { $set: { body :body.comments, done: true }},
      { upsert:true }
    )
    .exec();

    const user = await UserModel.findOne({ _id: chiffrage.userId }).exec();
    const image= await ImageModel.find({ userId: chiffrage.userId, devisId: chiffrage.devisId }).exec();

    await email.getTemplate("email-devis", {
          subject: `[${process.env.NEXT_PUBLIC_HOST.slice(process.env.NEXT_PUBLIC_HOST.indexOf(':') + 3, process.env.NEXT_PUBLIC_HOST.length + 1)}] Nouveau devis de ${user.firstName} ${user.lastName}`,
          to: "Abraham Hognon <ha.couverture44@gmail.com>",
          metadata: {
            bienvenue: `Nouveau devis reçu de ${user.firstName} ${user.lastName}`,
            email: "ha.couverture@gmail.com",
            ownerEmail: user.email,
            ownerName: user.firstName,
            ownerSurname: user.lastName,
            ownerPhone: user.phone,
            ownerVoie: address.address,
            ownerCodePostal: address.code_postal,
            ownerVille: address.ville,
            ownerComments: body.comments,
            ownerImages: image.map((item) => 
              {
                return {
                name: item.name,
                path:`${process.env.NEXT_PUBLIC_HOST}/uploads/${item.pictureId}.${item.type.slice(item.type.lastIndexOf('/') + 1, item.type.length + 1)}`}
              }),
            siteUrl: `${process.env.NEXT_PUBLIC_HOST}`,
          },
        });
    const response = NextResponse.json({ message: "Message envoyé"}, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.cookies.delete("chiffrage");
    return response;

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
  
}