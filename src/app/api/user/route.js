import connect from "@/utils/mongodb";
import { UserModel } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, name, firstName, lastName, image, role, emailVerified } =
    await request.json();
  await connect();
  const existingUser = await UserModel.findOne({ email }).lean().exec();
  if (!existingUser) {
    await User.create({
      email,
      name,
      firstName,
      lastName,
      image,
      role,
      emailVerified,
    });
    return NextResponse.json(
      { message: "Nouvel utilisateur ajouté dans la base de données" },
      { status: 201 }
    );
  }
}
