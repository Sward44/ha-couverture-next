import { NextResponse } from "next/server";
import connect from "@/utils/mongodb";
import User from "@/models/user";
import Post from "@/models/post";

export async function GET() {
  await connect();
  try {
    const itemDataComments = await Post.find().exec();
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
