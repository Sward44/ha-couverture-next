import { cookies } from "next/headers";
import { extname, join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { connect } from "@/utils/mongodb";
import { DevisModel, ImageModel } from "@/models";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";

// function sanitizeFilename(filename) {
//   return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
// }


export async function POST(request, res) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage");
  const chiffrage = verifyJwt(devisCookie.value);
  const formData = await request.formData();
  const file = formData.get("file");
  const pictureId = formData.get("pictureId");
  const preview = formData.get("preview");


  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await connect();
  const updateDevis = new ImageModel(
    {
      userId: chiffrage.userId,
      devisId: chiffrage.devisId,
      pictureId: pictureId,
      size: file.size,
      type: file.type,
      name: file.name,
      preview: preview,
      lastModified: file.lastModified,
    }
  );
  await updateDevis.save();
  const uploadDir = join(process.cwd(), "/public/uploads");
  // const pathDist = join(process.cwd(), "/src/components/img/uploads");
  // const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  // const uploadDir = join(pathDist, relativeUploadDir);


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
  await connect();

  try {
    const image = await ImageModel.findOne({ pictureId });

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    const filename = `${image.pictureId}${extname(image.name)}`;
    const filepath = `${uploadDir}/${filename}`;

    // Supprimer le fichier du SSD
    await unlink(filepath);

    // Supprimer la référence de l'image dans MongoDB
    await ImageModel.deleteOne({ pictureId });

    return NextResponse.json({ message: "Image deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

