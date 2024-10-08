"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loading } from "@/components/logo/Logo";
import DashBoardImages from "./DashBoardImages";
import { useRouter } from "next/navigation";

export function DashBoardMeta({ meta }) {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = React.useState({});
  const [titleLength, setTitleLength] = React.useState(0);
  const [descriptionLength, setDescriptionLength] = React.useState(0);
  const [keywordLength, setKeywordLength] = React.useState(0);
  const [titleRSLength, setTitleRSLength] = React.useState(0);
  const [descriptionRSLength, setDescriptionRSLength] = React.useState(0);
  const [altLength, setAltLength] = React.useState(0);

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

  const descriptionAll = schema.describe();
  const minTitle = descriptionAll.fields.title.tests[1].params.min;
  const maxTitle = descriptionAll.fields.title.tests[2].params.max;
  const minDescription = descriptionAll.fields.description.tests[1].params.min;
  const maxDescription = descriptionAll.fields.description.tests[2].params.max;
  const minKeyword = descriptionAll.fields.keyword.tests[0].params.min;
  const maxKeyword = descriptionAll.fields.keyword.tests[1].params.max;
  const minTitleRs = descriptionAll.fields.titleRS.tests[1].params.min;
  const maxTitleRs = descriptionAll.fields.titleRS.tests[2].params.max;
  const minDescriptionRs =
    descriptionAll.fields.descriptionRS.tests[1].params.min;
  const maxDescriptionRs =
    descriptionAll.fields.descriptionRS.tests[2].params.max;
  const minAlt = descriptionAll.fields.alt.tests[1].params.min;
  const maxAlt = descriptionAll.fields.alt.tests[2].params.max;

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
    if (Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
      setTitleLength(defaultValues.title.length);
      setDescriptionLength(defaultValues.description.length);
      setKeywordLength(defaultValues.keyword.length);
      setTitleRSLength(defaultValues.titleRS.length);
      setDescriptionRSLength(defaultValues.descriptionRS.length);
      setAltLength(defaultValues.alt.length);
    }
  }, [defaultValues, reset]);

  async function onSubmit(values) {
    try {
      console.log("Keywords:", values.keyword.length);
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
        const errorData = await response.json();
        toast.error(errorData.error || response.statusText);
      }
    } catch (e) {
      if (e) {
        toast.error(e.message || "Une erreur s'est produite");
      } else {
        toast.error("Une erreur inconnue s'est produite");
      }
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
        <span className="labelFormRight">
          <span className={titleLength < minTitle && "text-red-500"}>
            {minTitle}&#62;
          </span>
          {titleLength}
          <span className={titleLength > maxTitle && "text-red-500"}>
            &#62;{maxTitle}
          </span>
        </span>
        <input
          id="title"
          type="text"
          {...register("title", {})}
          className={`inputFormBase ${errors?.title && "bg-red-50"}`}
          onChange={(e) => {
            const title = e.target.value.length;
            setTitleLength(title);
            register("title").onChange(e);
          }}
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
        <span className="labelFormRight">
          <span
            className={descriptionLength < minDescription && "text-red-500"}
          >
            {minDescription}&#62;
          </span>
          {descriptionLength}
          <span
            className={descriptionLength > maxDescription && "text-red-500"}
          >
            &#62;{maxDescription}
          </span>
        </span>

        <textarea
          id="description"
          type="text"
          {...register("description")}
          className={`inputFormBase ${
            errors?.description && "bg-red-50"
          } min-h-44 resize-none sm:min-h-28 lg:min-h-24 xl:h-auto`}
          onChange={(e) => {
            const description = e.target.value.length;
            setDescriptionLength(description);
            register("title").onChange(e);
          }}
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
        <span className="labelFormRight">
          <span className={keywordLength < minKeyword && "text-red-500"}>
            {minKeyword}&#62;
          </span>
          {keywordLength}
          <span className={keywordLength > maxKeyword && "text-red-500"}>
            &#62;{maxKeyword}
          </span>
        </span>

        <textarea
          id="keyword"
          type="keyword"
          {...register("keyword")}
          className={`inputFormBase ${
            errors?.keyword && "bg-red-50"
          } min-h-48 resize-none sm:min-h-32 lg:min-h-24 xl:h-auto`}
          onChange={(e) => {
            const keyword = e.target.value.length;
            setKeywordLength(keyword);
            register("keyword").onChange(e);
          }}
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
        <span className="labelFormRight">
          <span className={titleRSLength < minTitleRs && "text-red-500"}>
            {minTitleRs}&#62;
          </span>
          {titleRSLength}
          <span className={titleRSLength > maxTitleRs && "text-red-500"}>
            &#62;{maxTitleRs}
          </span>
        </span>
        <input
          id="titleRS"
          type="text"
          {...register("titleRS")}
          className={`inputFormBase ${errors?.titleRS && "bg-red-50"}`}
          onChange={(e) => {
            const titleRS = e.target.value.length;
            setTitleRSLength(titleRS);
            register("titleRS").onChange(e);
          }}
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
          Description{" "}
          <span className="hidden sm:inline-block">Reseau Sociaux</span>
          <span className="inline-block sm:hidden">R.S.</span>
        </label>
        <span className="labelFormRight">
          <span
            className={descriptionRSLength < minDescriptionRs && "text-red-500"}
          >
            {minDescriptionRs}&#62;
          </span>
          {descriptionRSLength}
          <span
            className={descriptionRSLength > maxDescriptionRs && "text-red-500"}
          >
            &#62;{maxDescriptionRs}
          </span>
        </span>
        <textarea
          id="descriptionRS"
          type="text"
          {...register("descriptionRS")}
          className={`inputFormBase ${
            errors?.descriptionRS && "bg-red-50"
          } min-h-44 resize-none sm:min-h-32 lg:min-h-24 xl:h-auto`}
          onChange={(e) => {
            const descriptionRS = e.target.value.length;
            setDescriptionRSLength(descriptionRS);
            register("descriptionRS").onChange(e);
          }}
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
          <span className="labelFormRight">
            <span className={altLength < minAlt && "text-red-500"}>
              {minAlt}&#62;
            </span>
            {altLength}
            <span className={altLength > maxAlt && "text-red-500"}>
              &#62;{maxAlt}
            </span>
          </span>
          <input
            id="alt"
            type="alt"
            {...register("alt")}
            className={`inputFormBase ${
              errors?.alt && "bg-red-50"
            } w-full resize-none`}
            onChange={(e) => {
              const alt = e.target.value.length;
              setAltLength(alt);
              register("alt").onChange(e);
            }}
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
