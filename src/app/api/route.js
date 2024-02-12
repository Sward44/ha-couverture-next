import { NextResponse } from "next/server";
import connect from "../../../Mongoose";

export async function GET({ params: { id } }) {
  console.log({ params });
  await connect();
  const data = await Meta.find((data) => data._id === id);
  return NextResponse.json(data);
}
