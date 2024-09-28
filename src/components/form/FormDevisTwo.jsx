"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import heic2any from "heic2any";
import Image from "next/image";
import axios from "axios";
import { useViewport } from "@/hooks/viewPort";
import {
  AngleLeft,
  AngleRight,
  Mark,
  Ok,
  Upload,
} from "@/components/logo/Logo";

export function FormDevisTwo({ isActive, nextStep, prevStep, imagesDevis }) {
  const [files, setFiles] = React.useState([]);
  const [uploadProgress, setUploadProgress] = React.useState([]);
  const { isMobile } = useViewport();

  React.useEffect(() => {
    const initialFiles = imagesDevis;
    setFiles(initialFiles);
    setUploadProgress(
      initialFiles.map((file) => ({ fileName: file.name, percentage: 100 }))
    );
  }, [imagesDevis]);

  const onDrop = React.useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) {
      console.error("Aucun fichier accepté.");
      return;
    }

    try {
      const newFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          if (file.type === "image/heic") {
            try {
              const convertedBlob = await heic2any({
                blob: file,
                toType: "image/jpeg",
              });
              const convertedFile = new File(
                [convertedBlob],
                file.name.replace(".heic", ".jpeg"),
                { type: "image/jpeg" }
              );
              const preview = URL.createObjectURL(convertedFile);
              const pictureId = crypto.randomUUID();
              return Object.assign(convertedFile, { preview, pictureId });
            } catch (error) {
              console.error(
                `Erreur lors de la conversion du fichier ${file.name}:`,
                error
              );
              return null;
            }
          } else {
            const preview = URL.createObjectURL(file);
            const pictureId = crypto.randomUUID();
            return Object.assign(file, { preview, pictureId });
          }
        })
      );

      const validNewFiles = newFiles.filter(
        (file) => file !== null && file.pictureId
      );

      setFiles((prevFiles) => [...prevFiles, ...validNewFiles]);
      validNewFiles.forEach((file) => file && uploadFile(file));
    } catch (error) {
      console.error("Erreur lors de la gestion des fichiers acceptés:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadProgress((prevProgress) => [
            ...prevProgress.filter((p) => p.fileName !== file.name),
            { fileName: file.name, percentage },
          ]);
        },
      });
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

  if (!isActive) return null;

  return (
    <form className="relative mt-8 flex h-full flex-col sm:mx-4">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div
          className={`flex h-24 w-full flex-col items-center justify-center border-2 transition-colors sm:h-32 ${
            !isDragActive
              ? "border-neutral-300 bg-neutral-200 fill-neutral-500 text-neutral-500"
              : "border-dashed border-neutral-500 bg-neutral-400 fill-neutral-300 text-neutral-300"
          } rounded-lg`}
        >
          <div className="size-12">
            <Upload />
          </div>
          <p className="px-4 text-xs sm:text-sm md:px-0">
            Glissez-déposez des fichiers ici (8 max), ou cliquez pour
            sélectionner des fichiers...
          </p>
        </div>
      </div>
      <div className="my-6 grid size-full grid-cols-2 grid-rows-4 gap-6 sm:grid-cols-3 sm:grid-rows-3">
        {files.map((file) => (
          <div key={file.pictureId}>
            <div className="relative size-full">
              {file.type.startsWith("image/") ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              ) : file.type.startsWith("video/") ? (
                <video
                  src={file.preview}
                  controls
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <a
                  href={file.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200"
                >
                  <span className="text-center text-xs">{file.name}</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => deleteFile(file.pictureId)}
                className="absolute right-0 top-0 z-40 flex size-5 -translate-y-3 translate-x-3 items-center justify-center rounded-full border border-neutral-500 bg-neutral-300"
              >
                <div className="size-3 fill-neutral-500">
                  <Mark />
                </div>
              </button>
              <div
                className={`absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center`}
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
                }}
              >
                {uploadProgress.find(
                  (progress) =>
                    progress.fileName === file.name &&
                    progress.percentage >= 100
                ) ? (
                  <div className="size-5 fill-green-500">
                    <Ok />
                  </div>
                ) : (
                  `${
                    uploadProgress.find(
                      (progress) => progress.fileName === file.name
                    )?.percentage + "%" || "En attente..."
                  }`
                )}
              </div>
            </div>
            {isMobile ? (
              <p className="text-center text-xs">
                {file.name.slice(0, file.name.lastIndexOf(".")).length > 8
                  ? `${file.name.slice(0, 6)}...${file.name.slice(
                      file.name.lastIndexOf(".") + 1,
                      file.name.length
                    )}`
                  : `${file.name}`}
              </p>
            ) : (
              <p className="text-center text-xs">
                {file.name.slice(0, file.name.lastIndexOf(".")).length > 16
                  ? `${file.name.slice(0, 16)}...${file.name.slice(
                      file.name.lastIndexOf(".") + 1,
                      file.name.length
                    )}`
                  : `${file.name}`}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        <div className="flex flex-1 items-end justify-start">
          <button
            onClick={prevStep}
            className="rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
          >
            <div className="flex flex-1 items-center">
              <div className="mr-2 size-4">
                <AngleLeft />
              </div>
              <h3 className="font-bold">Précédent</h3>
            </div>
          </button>
        </div>
        <div className="flex flex-1 items-end justify-end">
          <button
            onClick={nextStep}
            className="rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
          >
            <div className="flex flex-1 items-center">
              <h3 className="font-bold">Suivant</h3>
              <div className="ml-2 size-4">
                <AngleRight />
              </div>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
