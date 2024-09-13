// import { google } from 'googleapis';
// import { readFile } from 'fs/promises';
// import { join } from "path";
// import { connectMongoose } from "@/utils/mongodb";
// import { ImageModel } from "@/models";
// import { NextResponse } from "next/server";
// import { verifyJwt } from "@/utils/jwt";

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_ID,
//   process.env.GOOGLE_SECRET,
//   process.env.HOST
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// const accessToken = oauth2Client.getAccessToken();

// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// const KEYFILEPATH = 'path/to/your/service-account-file.json'; // Remplacez ce chemin par le chemin de votre fichier de service

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

// const drive = google.drive({ version: 'v3', auth:{
//   ...auth,
//   type: "OAuth2",
//   user: "sav@buzz-ready.com",
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
//   refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//   accessToken: accessToken,
// } });

// export async function POST(request, res) {
//   const cookieStore = cookies();
//   const devisCookie = cookieStore.get("chiffrage");
//   const chiffrage = verifyJwt(devisCookie.value);
//   const formData = await request.formData();
//   const file = formData.get("file");
//   const pictureId = formData.get("pictureId");
//   const preview = formData.get("preview");

//   if (!file) {
//     return NextResponse.json(
//       { error: "File blob is required." },
//       { status: 400 }
//     );
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   await connectMongoose();
//   const updateDevis = new ImageModel(
//     {
//       userId: chiffrage.userId,
//       devisId: chiffrage.devisId,
//       pictureId: pictureId,
//       size: file.size,
//       type: file.type,
//       name: file.name,
//       preview: preview,
//       lastModified: file.lastModified,
//     }
//   );
//   await updateDevis.save();

//   // Uploader le fichier vers Google Drive
//   try {
//     const uploadDir = join(process.cwd(), "/public/uploads");
//     const filePath = `${uploadDir}/${file.name}`;
//     await writeFile(filePath, buffer);

//     const driveResponse = await drive.files.create({
//       requestBody: {
//         name: file.name,
//         mimeType: file.type,
//       },
//       media: {
//         mimeType: file.type,
//         body: buffer,
//       },
//     });

//     const fileId = driveResponse.data.id;

//     // Définir les permissions de partage
//     await drive.permissions.create({
//       fileId,
//       requestBody: {
//         role: 'reader',
//         type: 'anyone',
//       },
//     });

//     const fileMetadata = await drive.files.get({
//       fileId,
//       fields: 'webViewLink, webContentLink',
//     });

//     const finalFilePath = fileMetadata.data.webViewLink;

//     return NextResponse.json({ done: "ok", filename: file.name, httpfilepath: finalFilePath }, { status: 200 });
//   } catch (e) {
//     console.error("Error while uploading to Google Drive\n", e);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }


import { cookies } from "next/headers";
import { extname, join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { connectMongoose } from "@/utils/mongodb";
import { ImageModel } from "@/models";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";


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
  await connectMongoose();
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

