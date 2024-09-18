import { cookies } from "next/headers";
import { extname, join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { connectMongoose } from "@/utils/mongodb";
import { UserModel, ImageModel } from "@/models";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";


export async function POST(request, res) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage");
  const session = await getServerSession(authOptions);
  const chiffrage = verifyJwt(devisCookie.value);
  const formData = await request.formData();
  const file = formData.get("file");
  const pictureId = formData.get("pictureId");
  const preview = formData.get("preview");
  await connectMongoose();
  const sessionId = session?.user?.email ? await UserModel.findOne({email : session.user.email}).exec() : null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const updateDevis = new ImageModel(
    {
      userId: sessionId._id,
      devisId: chiffrage.devisId,
      pictureId: pictureId,
      extension: extname(file.name),
      size: file.size,
      type: file.type,
      name: file.name,
      preview: preview,
      lastModified: file.lastModified,
    }
  );
  await updateDevis.save();
  const uploadDir = join(process.cwd(), "/public/uploads");

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );

    }
  }

  try {
    const fileExtension = extname(file.name);
    const filename = `${pictureId}${fileExtension}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const finalFilePath = `${process.env.NEXT_PUBLIC_HOST}/uploads/${filename}`;
    return NextResponse.json({ done: "ok", filename: filename, httpfilepath: finalFilePath }, { status: 200 });

  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const pictureId = searchParams.get("pictureId");

  if (!pictureId) {
    return NextResponse.json({ error: "Picture ID is required." }, { status: 400 });
  }

  const uploadDir = join(process.cwd(), "/public/uploads");
  await connectMongoose();

  try {
    const image = await ImageModel.findOne({ pictureId });

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    const filename = `${image.pictureId}${extname(image.name)}`;
    const filepath = `${uploadDir}/${filename}`;

    await unlink(filepath);

    await ImageModel.deleteOne({ pictureId });

    return NextResponse.json({ message: "Image deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

