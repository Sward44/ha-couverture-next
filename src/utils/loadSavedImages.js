"use server";
export async function loadSavedImages(imagesDevis) {
  return imagesDevis.map((image) => ({
    pictureId: image.pictureId,
    size: image.size,
    type: image.type,
    name: image.name,
    preview: `${process.env.NEXT_PUBLIC_HOST}/uploads/${image.pictureId}.${image.type.slice(image.type.lastIndexOf('/') + 1, image.type.length + 1)}`,
    lastModified: image.lastModified,
  }));
};