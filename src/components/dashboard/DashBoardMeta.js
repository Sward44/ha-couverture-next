"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loading } from "@/components/logo/Logo";
import DashBoardImages from "./DashBoardImages";

export function DashBoardMeta({ meta }) {
  const [defaultValues, setDefaultValues] = React.useState({});

  React.useEffect(() => {
    const fetchDefaultValuesSession = async () => {
      const values = {
        title: meta.title,
        description: meta.description,
        keyword: meta.keyword,
        titleRS: meta.titleRS,
        descriptionRS: meta.descriptionRS,
        alt: meta.alt,
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesSession();
  }, [meta]);

  const schema = yup.object({
    title: yup
      .string()
      .required("Le titre est obligatoire...")
      .min(20, "Longueur mimnimum 20 caractères")
      .max(60, "Longueur maximum 60 caractères"),
    description: yup
      .string()
      .required("Description obligatoire...")
      .min(160, "Longueur mimnimum 160 caractères")
      .max(220, "Longueur maximum 220 caractères"),
    keyword: yup
      .string()
      // .required("Keyword obligatoire dans notre cas...")
      .min(40, "Longueur mimnimum 40 caractères")
      .max(320, "Longueur maximum 320 caractères"),
    titleRS: yup
      .string()
      .required("Le titre est obligatoire...")
      .min(20, "Longueur mimnimum 20 caractères")
      .max(60, "Longueur maximum 60 caractères"),
    descriptionRS: yup
      .string()
      .required("Description obligatoire...")
      .min(160, "Longueur mimnimum 160 caractères")
      .max(220, "Longueur maximum 220 caractères"),
    alt: yup
      .string()
      .required("Déscription de l'image est obligatoire...")
      .min(20, "Longueur mimnimum 20 caractères")
      .max(320, "Longueur maximum 320 caractères"),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  async function onSubmit(values) {
    try {
      clearErrors();
      const newMeta = { ...values, _id: meta._id };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/dashboard/meta`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMeta),
        }
      );
      if (response.ok) {
        const newEmailResponse = await response.json();
        reset();
        router.refresh();
        toast.success(
          newEmailResponse.message || "Message envoyé avec succès !"
        );
      } else {
        setError("generic", {
          type: "generic",
          message: "Problèmes serveurs else",
        });
      }
    } catch (e) {
      setError("generic", {
        type: "generic",
        message: "Problèmes serveurs catch",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex h-full w-full flex-col px-4 lg:min-w-[860px] lg:px-12 xl:min-w-[1160px] 2xl:min-w-[1400px]"
    >
      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="title"
          className={`labelForm ${
            errors?.title ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Titre
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={`inputFormBase ${errors?.title && "bg-red-50"}`}
        />
        {errors?.title && <p className="errorsForm">{errors.title.message}</p>}
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="description"
          className={`labelForm ${
            errors?.description ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Description
        </label>
        <textarea
          id="description"
          type="text"
          {...register("description")}
          className={`inputFormBase ${
            errors?.description && "bg-red-50"
          } min-h-44 resize-none sm:min-h-28 lg:min-h-24 xl:h-auto`}
        />
        {errors?.description && (
          <p className="errorsFormBottom">{errors.description.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="keyword"
          className={`labelForm ${
            errors?.keyword ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Keyword
        </label>
        <textarea
          id="keyword"
          type="keyword"
          {...register("keyword")}
          className={`inputFormBase ${
            errors?.keyword && "bg-red-50"
          } min-h-48 resize-none sm:min-h-32 lg:min-h-24 xl:h-auto`}
        />
        {errors?.keyword && (
          <p className="errorsFormBottom">{errors.keyword.message}</p>
        )}
      </div>

      <div className="mx-auto my-4 flex h-full w-full max-w-[1500px] flex-col items-center sm:my-8 ">
        <h2 className="mb-4 px-6 text-xl font-bold sm:mb-8 sm:text-2xl">
          Balises metadonnées pour Facebook, X, etc...{" "}
        </h2>
        <DashBoardImages meta={meta} />
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="titleRS"
          className={`labelForm ${
            errors?.titleRS ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Titre Reseaux Sociaux
        </label>
        <input
          id="titleRS"
          type="text"
          {...register("titleRS")}
          className={`inputFormBase ${errors?.titleRS && "bg-red-50"}`}
        />
        {errors?.titleRS && (
          <p className="errorsFormBottom">{errors.titleRS.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="descriptionRS"
          className={`labelForm ${
            errors?.descriptionRS ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Description Reseau Sociaux
        </label>
        <textarea
          id="descriptionRS"
          type="text"
          {...register("descriptionRS")}
          className={`inputFormBase ${
            errors?.descriptionRS && "bg-red-50"
          } min-h-44 resize-none sm:min-h-32 lg:min-h-24 xl:h-auto`}
        />
        {errors?.descriptionRS && (
          <p className="errorsFormBottom">{errors.descriptionRS.message}</p>
        )}
      </div>

      <div className=" flex flex-col md:mb-8 md:flex-row">
        <div className="relative mb-8 w-full md:mb-0 md:mr-2">
          <label
            htmlFor="alt"
            className={`labelForm ${
              errors?.alt ? "to-red-50" : "to-neutral-50"
            }`}
          >
            Alt d&#39;image
          </label>
          <input
            id="alt"
            type="alt"
            {...register("alt")}
            className={`inputFormBase ${
              errors?.alt && "bg-red-50"
            } w-full resize-none`}
          />
          {errors?.alt && <p className="errorsForm">{errors.alt.message}</p>}
        </div>
      </div>

      <div className="item-end flex w-full flex-1 justify-start">
        <div className="flex w-full flex-1 items-end justify-end">
          <button
            disabled={isSubmitting}
            type="submit"
            className="mb-8 rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
          >
            <div className="flex flex-1 items-center">
              {isSubmitting ? (
                <>
                  <h3 className="font-bold">En cours...</h3>
                  <div className="ml-2">
                    <div className="size-4 animate-spin">
                      <Loading />
                    </div>
                  </div>
                </>
              ) : (
                <h3 className="font-bold">Sauvegarder</h3>
              )}
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
