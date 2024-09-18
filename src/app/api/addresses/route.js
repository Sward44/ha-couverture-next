import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { signJwtThreeDay, verifyJwt } from "@/utils/jwt";
import { connectMongoose } from "@/utils/mongodb";
import { DevisModel, UserModel } from "@/models";

export async function POST(request) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage") ||  null;
  const session = await getServerSession(authOptions);
  await connectMongoose();
  let devis = devisCookie === null ? null : await DevisModel.findOne({_id : verifyJwt(devisCookie.value).devisId}).exec() ;
  let sessionId = session?.user?.email ? await UserModel.findOne({email : session.user.email}).exec() : null;
  let chiffrage = devisCookie?.value;

  const body = await request.json();
  body.comments = body.comments.trim();
  try {
    let comments;
    if(!devis && sessionId ) {
      comments = new DevisModel({
                  userId : sessionId._id,
                  body: body.comments,
                })
      await comments.save();
      chiffrage = signJwtThreeDay({devisId: comments._id});
    } else if(!devis && !sessionId) {
      comments = new DevisModel({
                  body : body.comments,
                })
      await comments.save();
      chiffrage = signJwtThreeDay({devisId: comments._id});
    } else if(devis && sessionId) {
      comments = await DevisModel.updateOne({_id: devis._id }, 
                { $set: { 
                      userId : sessionId._id,
                      body :body.comments 
                    }
                },
                { upsert: true }).exec();
    } else {
      comments = await DevisModel.updateOne({_id: devis._id },
                {$set:{
                        body: body.comments,
                }},
                { upsert:true }).exec()
    }

    const response = NextResponse.json({ message: "Message envoyé à Ha Couverture !" }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
      response.headers.set('Set-Cookie', `chiffrage=${chiffrage}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${3 * 24 * 60 * 60}`);
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