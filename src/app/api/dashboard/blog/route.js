import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/mongodb";
import { MetaModel, SousPageModel, BlogModel } from "@/models";

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
    
    if(body.blogId){
      const sousPage = await BlogModel.findOne({ _id: body._id }).exec();
      const {
        title: existingTitle,
        description: existingDescription,
        altWebp: existingAlt,
      } = sousPage;

      await BlogModel.updateOne(
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
    } else if(body?.alt){ 
      const sousPage = await SousPageModel.findOne({ _id: body._id }).exec();
      const {
        title: existingTitle,
        description: existingDescription,
        altWebp: existingAlt,
      } = sousPage;

      await SousPageModel.updateOne(
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
    } else {
      const sousPage = await SousPageModel.findOne({ _id: body._id }).exec();
      const {
        title: existingTitle,
        description: existingDescription,
      } = sousPage;

      await SousPageModel.updateOne(
        { _id: body._id },
        {
          $set: {
            title: existingTitle !== body.title ? body.title : existingTitle,
            description:
              existingDescription !== body.description
                ? body.description
                : existingDescription,
          },
        },
        { upsert: true }
      );
    }

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
