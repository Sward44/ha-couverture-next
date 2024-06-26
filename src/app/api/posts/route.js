import { NextResponse } from "next/server";
import connect from "@/utils/mongodb";
import { UserModel, PostModel } from "@/models";

export async function POST() {
  await connect();
  try {
    const itemDataComments = await PostModel.find().exec();
    return NextResponse.json(itemDataComments, {
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
}
