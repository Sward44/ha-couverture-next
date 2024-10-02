import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/mongodb";
import { UserModel, AvisClientModel } from "@/models";

export async function POST(request) {
  const body = await request.json();
  await connectMongoose();
  try {
    const existingUser = await UserModel.findOne({ email: body.email }).exec();
    const newPosts = new AvisClientModel({
      userId: existingUser._id,
      title: body.title,
      description: body.comments,
      note: body.notes,
      date_review: new Date(),
    });
    await newPosts.save();

    return NextResponse.json(
      { message: "Votre avis est enregistré" },
      { status: 200 }
    );
  } catch (error) {
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
