import { connect } from "@/utils/mongodb";
import { AccountModel, UserModel } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connect();
  const existingAccount = await AccountModel.findOne({email: body.user.email, provider: body.account.provider}).lean().exec();
    if (!existingAccount) {
      const existingUser = await UserModel.findOne({email: body.user.email}).lean().exec();
      if (!existingUser) {
        await UserModel.create({
          email: body.profile.email,
          name: body.profile.name,
          firstName: body.profile.given_name,
          lastName: body.profile.family_name,
          image: body.profile.image,
          emailVerified: new Date(),
          role: body.user.role,
        });
      } else {
        if(existingUser?.firstName !== body.profile.given_name) {
          await UserModel.updateOne(
            { email: user.email },
            { $set: { firstName: body.profile.given_name } },
            { upsert: true }
          );
        }
        if(existingUser?.lastName !== body.profile.family_name) {
          await UserModel.updateOne(
            { email: user.email },
            { $set: { lastName: body.profile.family_name } },
            { upsert: true }
          );
        }
        if(existingUser?.name !== body.profile.name) {
          await UserModel.updateOne(
            { email: user.email },
            { $set: { name: body.profile.name } },
            { upsert: true }
          );
        }
        if(existingUser?.image !== body.profile.image) {
          await UserModel.updateOne(
            { email: user.email },
            { $set: { image: body.profile.image } },
            { upsert: true }
          );
        }
        if(existingUser?.emailVerified === null) {
          await UserModel.updateOne(
            { email:user.email },
            { $set: { emailVerified: new Date() } }
          );
        }
      }
      await AccountModel.create({
        ...body.account,
        userId: existingUser._id,
      });
    } else {
      if(existingAccount?.accessToken !== body.account.accessToken) {
        await AccountModel.updateOne(
          { email: body.user.email, provider: body.account.provider },
          { $set: { accessToken: body.account.accessToken } },
          { upsert: true }
        );
      }
      if(existingAccount?.id_token !== body.account.id_token) {
        await AccountModel.updateOne(
          { email: body.user.email, provider: body.account.provider },
          { $set: { id_token: body.account.id_token } },
          { upsert: true }
        );
      }
      if(existingAccount?.expires_at !== body.account.expires_at) {
        await AccountModel.updateOne(
          { email: body.user.email, provider: body.account.provider },
          { $set: { expires_at: body.account.expires_at } },
          { upsert: true }
        );
      }
      if(existingAccount?.providerAccountId !== body.account.providerAccountId) {
        await AccountModel.updateOne(
          { email: body.user.email, provider: body.account.provider },
          { $set: { providerAccountId: body.account.providerAccountId } },
          { upsert: true }
        );
      }
    }
  return NextResponse.redirect("/");
  }
