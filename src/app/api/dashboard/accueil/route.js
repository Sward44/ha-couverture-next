import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/mongodb";
import { MetaModel, HomePageModel } from "@/models";

export async function POST(request) {
  await connectMongoose();
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const body = await request.json();

  try {
    const homePage = await HomePageModel.findOne({ _id: body._id }).exec();

    const {
      title: existingTitle,
      description: existingDescription,
      altWebp: existingAlt,
    } = homePage;

    await HomePageModel.updateOne(
      { _id: body._id },
      {
        $set: {
          title: existingTitle !== body.title ? body.title : existingTitle,
          description:
            existingDescription !== body.description
              ? body.description
              : existingDescription,
          altWebp: existingAlt !== body.alt ? body.alt : existingAlt,
        },
      },
      { upsert: true }
    );

    await MetaModel.updateOne(
      { _id: body.metaId },
      { $set: { updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Mise OK côté serveur !" },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur de mise à jour sur serveur" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
