import connect from "@/utils/mongodb";
import { UserModel, AccountModel } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, surname, email, image_logo } = await request.json();
  await connect();
  const existingUser = await UserModel.findOne({ email }).lean().exec();
  if (!existingUser) {
    await User.create({ name, surname, email, image_logo });
    return NextResponse.json(
      { message: "Nouvel utilisateur ajouté dans la base de données" },
      { status: 201 }
    );
  } else {
    if (
      existingUser.name !== name ||
      existingUser.surname !== surname ||
      existingUser.image_logo !== image_logo
    ) {
      await UserModel.updateOne(
        { email },
        { $set: { name, surname, image_logo } }
      )
        .lean()
        .exec();
    }
  }
}
