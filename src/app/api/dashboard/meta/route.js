import { NextResponse } from "next/server";
import { connectMongoose } from "@/utils/mongodb";
import { MetaModel } from "@/models";

export async function POST(request) {
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
  await connectMongoose();
  const body = await request.json();
  try {
    const metas = await MetaModel.findOne({ _id: body._id }).exec();

    const {
      title: existingTitle,
      description: existingDescription,
      keywords: existingKeywords,
      openGraph: {
        title: existingTitleRS,
        description: existingDescriptionRS,
        images: existingImages,
      },
    } = metas;

    await MetaModel.updateOne(
      { _id: body._id },
      {
        $set: {
          title: existingTitle !== body.title ? body.title : existingTitle,
          description:
            existingDescription !== body.description
              ? body.description
              : existingDescription,
          keywords:
            existingKeywords !== body.keyword ? body.keyword : existingKeywords,
          "openGraph.title":
            existingTitleRS !== body.titleRS ? body.titleRS : existingTitleRS,
          "openGraph.description":
            existingDescriptionRS !== body.descriptionRS
              ? body.descriptionRS
              : existingDescriptionRS,
          "openGraph.images.alt":
            existingImages.alt !== body.alt ? body.alt : existingImages.alt,
          "openGraph.images.width":
            existingImages.width !== body.width
              ? body.width
              : existingImages.width,
          "openGraph.images.height":
            existingImages.height !== body.height
              ? body.height
              : existingImages.height,
          updatedAt: new Date().toISOString(),
        },
      },
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
