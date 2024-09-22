// import { cookies } from "next/headers";
// import { join, extname } from "path";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/authOptions";
// import { connectMongoose } from "@/utils/mongodb";
// import { UserModel, ImageModel, DevisModel } from "@/models";
// import { NextResponse } from "next/server";
// import { verifyJwt } from "@/utils/jwt";
// import { findFolderIdByPath, findFolderIdByName, uploadToDrive, setFilePermissions, deleteFileFromDrive } from "@/utils/googleDrive";
// import { Readable } from 'stream';


// export async function POST(request) {
//   const cookieStore = cookies();
//   const devisCookie = cookieStore.get("chiffrage");
//   const session = await getServerSession(authOptions);
//   const chiffrage = verifyJwt(devisCookie.value);
//   const formData = await request.formData();
//   const file = formData.get("file");
//   const pictureId = formData.get("pictureId");
//   const preview = formData.get("preview");
//   await connectMongoose();
//   const sessionId = session?.user?.email ? await UserModel.findOne({ email: session.user.email }).exec() : null;

//   if (!file) {
//     return NextResponse.json(
//       { error: "File blob is required." },
//       { status: 400 }
//     );
//   }

//   // Convertir le fichier en stream
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const readableFile = new Readable();
//   readableFile.push(buffer);
//   readableFile.push(null);

//   // Métadonnées pour la sauvegarde
//   const fileInfo = {
//     name: file.name,
//     type: file.type,
//     stream: readableFile
//   };

//   try {
//     // Trouver l'ID du dossier existant
//     const clientHaCouvertureFolderId = await findFolderIdByPath("Personnel/Ha-Couverture/Client-Ha-Couverture");

//     // Formate la date du timestamp du JWT
//     // const formattedDate = formatDate(chiffrage.iat);

//     // Nom dynamique pour le dossier final
//     const finalFolderName =`${chiffrage.devisId}`;

//     // Rechercher ou créer le dossier final
//     const finalFolderId = await findFolderIdByName(chiffrage.devisId, clientHaCouvertureFolderId);


//     // Noté le dossier dans devis
//     const devis = await DevisModel.findOne({_id : chiffrage.devisId}).exec();
//     if(!devis?.driveFolderId){
//       await DevisModel.updateOne({_id : chiffrage.devisId },{
//         $set : {driveFolderId : finalFolderId.id}
//       },{upsert: true}).exec();
//       }   
//     // Envoyer le fichier sur Google Drive et récupérer les informations de retour
//     const fileData = await uploadToDrive(fileInfo, finalFolderId.id);
      
//     // Définir les permissions pour rendre le fichier public
//     await setFilePermissions(fileData.id, 'reader');
    
//     // URL du fichier sur Google Drive
//     const finalFilePath = fileData.webViewLink;

//     // Enregistrer les informations nécessaires sur la base de données
//     const updateDevis = new ImageModel({
//       userId: sessionId?._id,
//       devisId: chiffrage.devisId,
//       pictureId: pictureId,
//       extension: extname(file.name),
//       size: file.size,
//       type: file.type,
//       name: file.name,
//       preview: `https://drive.google.com/uc?export=view&id=${fileData.id}`,
//       lastModified: file.lastModified,
//       driveFileId: fileData.id // Add driveFileId for deletion reference
//     });

//     await updateDevis.save();

//     return NextResponse.json({ done: "ok", filename: file.name, httpfilepath: finalFilePath }, { status: 200 });
//   } catch (e) {
//     console.error("Erreur lors de l'upload sur Google Drive\n", e);
//     return NextResponse.json(
//       { error: "Quelque chose n'a pas fonctionné." },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   const { searchParams } = new URL(request.url);
//   const pictureId = searchParams.get("pictureId");

//   if (!pictureId) {
//     return NextResponse.json({ error: "Picture ID is required." }, { status: 400 });
//   }

//   await connectMongoose();

//   try {
//     const image = await ImageModel.findOne({ pictureId });

//     if (!image) {
//       return NextResponse.json({ error: "Image not found." }, { status: 404 });
//     }

//     // Supprimer le fichier sur Google Drive
//     await deleteFileFromDrive(image.driveFileId); // Ajouter une fonction deleteFileFromDrive dans googleDrive.js pour gérer la suppression

//     await ImageModel.deleteOne({ pictureId });

//     return NextResponse.json({ message: "L'image a été supprimée avec succès." }, { status: 200 });
//   } catch (error) {
//     console.error("Erreur de suppression de l'image : ", error);
//     return NextResponse.json({ error: "Quelque chose n'a pas fonctionné." }, { status: 500 });
//   }
// }


import { cookies } from "next/headers";
import { extname } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { connectMongoose } from "@/utils/mongodb";
import { UserModel, ImageModel, DevisModel } from "@/models";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";
import { findFolderIdByPath, findFolderIdByName, uploadToDrive, setFilePermissions, deleteFileFromDrive } from "@/utils/googleDrive";
import { Readable } from 'stream';
import sharp from 'sharp';

export async function POST(request) {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage");
  const session = await getServerSession(authOptions);
  const chiffrage = verifyJwt(devisCookie.value);
  const formData = await request.formData();
  const file = formData.get("file");
  const pictureId = formData.get("pictureId");
  const preview = formData.get("preview");
  await connectMongoose();
  const sessionId = session?.user?.email ? await UserModel.findOne({ email: session.user.email }).exec() : null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  // Si le fichier est un HEIC, le convertir en JPEG
  let uploadFile = file;
  if (file.type === 'image/heic') {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const convertedBuffer = await sharp(buffer)
        .jpeg()
        .toBuffer();
      uploadFile = new File([convertedBuffer], file.name.replace('.heic', '.jpeg'), { type: 'image/jpeg' });
    } catch (error) {
      console.error(`Erreur lors de la conversion du fichier ${file.name}:`, error);
      return NextResponse.json(
        { error: 'Erreur lors de la conversion du fichier.' },
        { status: 500 }
      );
    }
  }

  // Convertir le fichier en stream
  const buffer = Buffer.from(await uploadFile.arrayBuffer());
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  // Métadonnées pour la sauvegarde
  const fileInfo = {
    name: uploadFile.name,
    type: uploadFile.type,
    stream: readableFile
  };

  try {
    // Trouver l'ID du dossier existant
    const clientHaCouvertureFolderId = await findFolderIdByPath("Personnel/Ha-Couverture/Client-Ha-Couverture");

    // Nom dynamique pour le dossier final
    const finalFolderName = `${chiffrage.devisId}`;

    // Rechercher ou créer le dossier final
    const finalFolderId = await findFolderIdByName(finalFolderName, clientHaCouvertureFolderId);

    // Noté le dossier dans devis
    const devis = await DevisModel.findOne({ _id: chiffrage.devisId }).exec();
    if (!devis?.driveFolderId) {
      await DevisModel.updateOne({ _id: chiffrage.devisId }, {
        $set: { driveFolderId: finalFolderId.id }
      }, { upsert: true }).exec();
    }

    // Envoyer le fichier sur Google Drive et récupérer les informations de retour
    const fileData = await uploadToDrive(fileInfo, finalFolderId.id);

    // Définir les permissions pour rendre le fichier public
    await setFilePermissions(fileData.id, 'reader');

    // URL du fichier sur Google Drive
    const finalFilePath = fileData.webViewLink;

    // Enregistrer les informations nécessaires sur la base de données
    const updateDevis = new ImageModel({
      userId: sessionId?._id,
      devisId: chiffrage.devisId,
      pictureId: pictureId,
      extension: extname(uploadFile.name),
      size: uploadFile.size,
      type: uploadFile.type,
      name: uploadFile.name,
      preview: `https://drive.google.com/uc?export=view&id=${fileData.id}`,
      lastModified: uploadFile.lastModified,
      driveFileId: fileData.id // Add driveFileId for deletion reference
    });

    await updateDevis.save();

    return NextResponse.json({ done: "ok", filename: uploadFile.name, httpfilepath: finalFilePath }, { status: 200 });
  } catch (e) {
    console.error("Erreur lors de l'upload sur Google Drive\n", e);
    return NextResponse.json(
      { error: "Quelque chose n'a pas fonctionné." },
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

  await connectMongoose();

  try {
    const image = await ImageModel.findOne({ pictureId });

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    // Supprimer le fichier sur Google Drive
    await deleteFileFromDrive(image.driveFileId); // Ajouter une fonction deleteFileFromDrive dans googleDrive.js pour gérer la suppression

    await ImageModel.deleteOne({ pictureId });

    return NextResponse.json({ message: "L'image a été supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("Erreur de suppression de l'image : ", error);
    return NextResponse.json({ error: "Quelque chose n'a pas fonctionné." }, { status: 500 });
  }
}