"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loading } from "@/components/logo/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DashBoardPageHome({ page }) {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = React.useState({});
  const [titleLength, setTitleLength] = React.useState(0);
  const [descriptionLength, setDescriptionLength] = React.useState(0);
  const [altLength, setAltLength] = React.useState(0);

  React.useEffect(() => {
    const fetchDefaultValuesSession = async () => {
      const values = {
        id: page._id,
        title: page.title,
        description: page.description,
        alt: page.altWebp,
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesSession();
  }, [page]);

  const schema = yup.object({
    title: yup
      .string()
      .required("Le titre est obligatoire...")
      .min(8, "Longueur mimnimum 8 caractères")
      .max(20, "Longueur maximum 20 caractères"),
    description: yup
      .string()
      .required("Description obligatoire...")
      .min(140, "Longueur mimnimum 140 caractères")
      .max(380, "Longueur maximum 380 caractères"),
    alt: yup
      .string()
      .required("Keyword obligatoire dans notre cas...")
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
    if (Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
      setTitleLength(defaultValues.title.length);
      setDescriptionLength(defaultValues.description.length);
      setAltLength(defaultValues.alt.length);
    }
  }, [defaultValues, reset]);

  async function onSubmit(values) {
    try {
      clearErrors();
      const newHomePage = { ...values, _id: page._id, metaId: page.metaId };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/dashboard/accueil`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHomePage),
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
    <form key={page._id} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col xl:flex-row">
        <div className="relative mb-8 h-[220px] sm:h-[360px] sm:min-w-full lg:mr-8 lg:w-[400px] xl:mb-0 xl:h-80 xl:min-w-[350px]">
          <Image
            src={require(`@/components/${page.urlWebp}`).default}
            alt={page.altWebp}
            fill
            style={{
              objectFit: "cover",
              objectPosition: `${page.position}`,
            }}
            className="absolute shadow-ha"
            title="Image en pixel: 1920x1080"
          />
        </div>
        <div className="flex h-full w-full flex-col">
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
              <span className={titleLength < 8 && "text-red-500"}>8&#62;</span>
              {titleLength}
              <span className={titleLength > 20 && "text-red-500"}>
                &#62;20
              </span>
            </span>

            <input
              id="title"
              type="text"
              {...register("title")}
              className={`inputFormBase ${errors?.title && "bg-red-50"}`}
              onChange={(e) => {
                const title = e.target.value.length;
                setTitleLength(title);
                register("title").onChange(e);
              }}
            />
            {errors?.title && (
              <p className="errorsFormBottom">{errors.title.message}</p>
            )}
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
              <span className={descriptionLength < 140 && "text-red-500"}>
                140&#62;
              </span>
              {descriptionLength}
              <span className={descriptionLength > 380 && "text-red-500"}>
                &#62;380
              </span>
            </span>
            <textarea
              id="description"
              type="text"
              {...register("description")}
              className={`inputFormBase ${
                errors?.description && "bg-red-50"
              } min-h-60 resize-none sm:min-h-44 md:min-h-32 lg:min-h-44 xl:min-h-32`}
              onChange={(e) => {
                const description = e.target.value.length;
                setDescriptionLength(description);
                register("description").onChange(e);
              }}
            />
            {errors?.description && (
              <p className="errorsFormBottom">{errors.description.message}</p>
            )}
          </div>

          <div className=" mb-8 flex">
            <div className="relative  mr-2 w-full">
              <label
                htmlFor="alt"
                className={`labelForm ${
                  errors?.alt ? "to-red-50" : "to-neutral-50"
                }`}
              >
                Alt d&#39;image
              </label>
              <span className="labelFormRight">
                <span className={altLength < 20 && "text-red-500"}>
                  20&#62;
                </span>
                {altLength}
                <span className={altLength > 320 && "text-red-500"}>
                  &#62;320
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
                  setTitleLength(alt);
                  register("alt").onChange(e);
                }}
              />
              {errors?.alt && (
                <p className="errorsFormBottom">{errors.alt.message}</p>
              )}
            </div>
          </div>
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

export function DashBoardPageMain({ page }) {
  const [defaultValues, setDefaultValues] = React.useState({});
  const [titleLength, setTitleLength] = React.useState(0);
  const [descriptionLength, setDescriptionLength] = React.useState(0);
  const [altLength, setAltLength] = React.useState(0);

  React.useEffect(() => {
    const fetchDefaultValuesSession = async () => {
      const values = {
        title: page.title,
        description: page.description,
        alt: page.altWebp,
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesSession();
  }, [page]);

  const schema = yup.object({
    title: yup
      .string()
      .required("Le titre est obligatoire...")
      .min(10, "Longueur mimnimum 10 caractères")
      .max(30, "Longueur maximum 30 caractères"),
    description: yup
      .string()
      .required("Description obligatoire...")
      .min(260, "Longueur mimnimum 260 caractères")
      .max(700, "Longueur maximum 700 caractères"),
    alt: yup
      .string()
      .required("Keyword obligatoire dans notre cas...")
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
    if (Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
      setTitleLength(defaultValues.title.length);
      setDescriptionLength(defaultValues.description.length);
      setAltLength(defaultValues.alt.length);
    }
  }, [defaultValues, reset]);

  async function onSubmit(values) {
    try {
      clearErrors();
      const newActivities = { ...values, _id: page._id, metaId: page.metaId };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/dashboard/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivities),
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
    <form key={page._id} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col xl:flex-row">
        <div
          className="relative mb-8 h-[220px] sm:h-[360px] sm:min-w-full lg:mr-8 lg:w-[400px] xl:mb-0 xl:h-80 xl:min-w-[350px]
        "
        >
          <Image
            src={require(`@/components/${page.urlWebp}`).default}
            alt={page.altWebp}
            fill
            style={{
              objectFit: "cover",
              objectPosition: `${page.position}`,
            }}
            className="absolute shadow-ha"
          />
        </div>
        <div className="flex h-full w-full flex-col">
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
              <span className={titleLength < 10 && "text-red-500"}>
                10&#62;
              </span>
              {titleLength}
              <span className={titleLength > 30 && "text-red-500"}>
                &#62;30
              </span>
            </span>
            <input
              id="title"
              type="text"
              {...register("title")}
              className={`inputFormBase ${errors?.title && "bg-red-50"}`}
              onChange={(e) => {
                const title = e.target.value.length;
                setTitleLength(title);
                register("title").onChange(e);
              }}
            />
            {errors?.title && (
              <p className="errorsFormBottom">{errors.title.message}</p>
            )}
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
              <span className={descriptionLength < 260 && "text-red-500"}>
                260&#62;
              </span>
              {descriptionLength}
              <span className={descriptionLength > 700 && "text-red-500"}>
                &#62;700
              </span>
            </span>
            <textarea
              id="description"
              type="text"
              {...register("description")}
              className={`inputFormBase ${
                errors?.description && "bg-red-50"
              } min-h-96 resize-none sm:min-h-60 md:min-h-48 lg:min-h-44 xl:min-h-44`}
              onChange={(e) => {
                const description = e.target.value.length;
                setDescriptionLength(description);
                register("description").onChange(e);
              }}
            />
            {errors?.description && (
              <p className="errorsFormBottom">{errors.description.message}</p>
            )}
          </div>
          <div className=" mb-8 flex">
            <div className="relative  mr-2 w-full">
              <label
                htmlFor="alt"
                className={`labelForm ${
                  errors?.alt ? "to-red-50" : "to-neutral-50"
                }`}
              >
                Alt d&#39;image
              </label>
              <span className="labelFormRight">
                <span className={altLength < 20 && "text-red-500"}>
                  20&#62;
                </span>
                {altLength}
                <span className={altLength > 320 && "text-red-500"}>
                  &#62;320
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
                  setTitleLength(alt);
                  register("alt").onChange(e);
                }}
              />
              {errors?.alt && (
                <p className="errorsFormBottom">{errors.alt.message}</p>
              )}
            </div>
          </div>
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
