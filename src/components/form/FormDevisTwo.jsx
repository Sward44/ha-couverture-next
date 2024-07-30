"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import { useViewport } from "@/hooks/viewPort";
import { AngleLeft, AngleRight, Mark, Ok, Upload } from "../logo/Logo";
import { set } from "mongoose";
// import { loadSavedImages } from "@/utils/loadSavedImages";

function loadSavedImages(imagesDevis) {
  return imagesDevis.map((image) => ({
    pictureId: image.pictureId,
    size: image.size,
    type: image.type,
    name: image.name,
    preview: `${process.env.NEXT_PUBLIC_HOST}/uploads/${image.pictureId}.${image.type.slice(image.type.lastIndexOf('/') + 1, image.type.length + 1)}`,
    lastModified: image.lastModified,
  }));
}

export function FormDevisTwo({ isActive, nextStep, prevStep, imagesDevis }) {
  const [files, setFiles] = React.useState([]);
  const [uploadProgress, setUploadProgress] = React.useState([]);
  // const [picture, setPicture] = React.useState(false)
  const { isMobile } = useViewport();

  React.useEffect( () => {
    const initialFiles = loadSavedImages(imagesDevis);
    setFiles(initialFiles);
    setUploadProgress(initialFiles.map((file) => ({ fileName: file.name, percentage: 100 })));
  }, [imagesDevis]);

  const onDrop = React.useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      console.error('Aucun fichier accepté.');
      return;
    }
    const newFiles = acceptedFiles.map((file) => {

      if (!file.type.startsWith('image/')) {
        console.error(`Le fichier ${file.name} est ignoré car il n'a pas un type MIME valide.`);
        return null;
      } 
    try {
      const preview = URL.createObjectURL(file);
      const pictureId = crypto.randomUUID();
      if (!preview || !pictureId) {
        console.error(`Erreur: Aperçu ou UUID invalide pour le fichier ${file.name}`);
        return null;
      }
      return Object.assign(file, { preview, pictureId });
    } catch (error) {
      console.error(`Erreur lors de la génération de l'aperçu ou de l'UUID pour le fichier ${file.name}:`, error);
      return null;
    }
  }).filter(file => file !== null && typeof file.preview === 'string' && file.pictureId);
  setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  newFiles.forEach((file) => file && uploadFile(file));
}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg, image/webp, image/heic",
    multiple: true,
    maxFiles: 8,
  });

   const uploadFile = async (file) => {
    if (!file || !file.preview || !file.pictureId) {
      console.error(`Erreur: Le fichier est invalide ou manquant : ${file}`);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("preview", file.preview);
    formData.append("pictureId", file.pictureId);

    try {
      const response = await axios.post(
        "/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress((prevProgress) => [
              ...prevProgress.filter((p) => p.fileName !== file.name),
              { fileName: file.name, percentage },
            ]);
          },
        }
      );
    } catch (error) {
      console.error("Erreur de téléversement:", error);
    }
  };


  const deleteFile = async (fileId) => {
    try {
      const response = await axios.delete(`/api/upload?pictureId=${fileId}`);
      if (response.status === 200) {
        setFiles(files.filter((file) => file.pictureId !== fileId));
        setUploadProgress(
          uploadProgress.filter((progress) => progress.fileId !== fileId)
        );
      }
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  // const handlePicture = (e) => {
  //   e.preventDefault()
  //   setPicture(!picture)
  // }

  // React.useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  if (!isActive) return null;


  return (
    <form className="relative flex flex-col sm:mx-4 ">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
        {...getInputProps()} />
          <div className={`flex flex-col justify-center items-center h-24 sm:h-32 w-full border-2 transition-colors ${!isDragActive ? "text-neutral-500 border-neutral-300 bg-neutral-200 fill-neutral-500":"border-dashed text-neutral-300 border-neutral-500 bg-neutral-400 fill-neutral-300"}  rounded-lg`}>
            <div className="size-12">
              <Upload />
            </div>
            <p className="text-xs sm:text-sm px-4 md:px-0">Glissez-déposez des fichiers ici (8 max), ou cliquez pour sélectionner des fichiers...</p>
          </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-4 sm:grid-rows-3 size-full gap-6 my-6">
        {files.map((file) => (
          <div key={file.pictureId}>
            {/* {picture ? 
            <>

              <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-950 opacity-95 z-20">
                <div className="flex justify-center items-center m-20">
                  <button
                    type="button"
                    onClick={handlePicture}
                    className="absolute flex justify-center items-center size-12 top-0 right-0 -translate-x-8 translate-y-8 z-40">
                      <div className="size-12 fill-neutral-100">
                        <Mark />
                      </div>
                  </button>
                  <div className="relative w-full h-[calc(100vh-160px)] z-30">
                    <Image 
                      src={file.preview} 
                      alt={file.name} 
                      fill 
                      style={{ 
                        objectFit: 'contain',
                        objectPosition: "center"
                      }}
                    />
                  </div>
                </div>
              </div>
              </>
             : */}
              <div className="relative size-full">
                <Image
                  src={file.preview}
                  alt={file.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <button
                  type="button"
                  onClick={() => deleteFile(file.pictureId)}
                  className="absolute flex justify-center items-center size-5 top-0 right-0 translate-x-3 -translate-y-3 bg-neutral-300 border border-neutral-500 rounded-full z-40">
                  <div className="size-3 fill-neutral-500">
                    <Mark />
                  </div>
                </button>
              <div
                className={`absolute flex justify-center items-center top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2`}
                style={{
                  background: uploadProgress.find(
                    (progress) =>
                      progress.fileName === file.name &&
                      progress.percentage >= 100
                  )
                    ? ""
                    : "rgba(23, 23 ,23 , 0.8)",
                  fontSize: "1rem",
                  color: "rgb(245,245,245)",
                }}>
                {uploadProgress.find(
                  (progress) =>
                    progress.fileName === file.name && progress.percentage >= 100
                ) ? (
                  <div className="size-5 fill-green-500"><Ok /></div>
                ) : (
                  `${uploadProgress?.find((progress) => progress?.fileName === file?.name)?.percentage + "%" || "En attente..."}`
                )}
              </div>
            </div>
            {/* } */}
            {isMobile ? (
              <p className="text-xs text-center">
                {file.name.slice(0, file.name.lastIndexOf('.')).length > 8
                  ? `${file.name.slice(0, 6)}...${file.name.slice(file.name.lastIndexOf('.') + 1, file.name.length)}`
                  : `${file.name}`}
              </p>
            ) : (
              <p className="text-xs text-center">
                {file.name.slice(0, file.name.lastIndexOf('.')).length > 16
                  ? `${file.name.slice(0, 16)}...${file.name.slice(file.name.lastIndexOf('.') + 1, file.name.length)}`
                  : `${file.name}`}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        <div className="flex flex-1 items-end justify-start">
          <button onClick={prevStep} className=" bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
            <div className="flex flex-1 items-center">
              <div className="size-4 mr-2">
                <AngleLeft />
              </div>
              <h3 className="font-bold">Précédent</h3>
            </div>
          </button>
          
        </div>
        <div className="flex flex-1 items-end justify-end">
          <button onClick={nextStep} className=" bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
          <div className="flex flex-1 items-center">
              <h3 className="font-bold">Suivant</h3>
              <div className="size-4 ml-2">
                <AngleRight />
              </div>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
