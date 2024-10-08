"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  AngleLeft,
  Email,
  Loading,
  Phone,
  Send,
  User,
} from "@/components/logo/Logo";
import { toast } from "react-toastify";

export function FormDevisThree({
  isActive,
  initialStep,
  prevStep,
  devis,
  session,
}) {
  const [defaultValues, setDefaultValues] = React.useState({});
  const nameRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const router = useRouter();

  React.useEffect(() => {
    const fetchDefaultValuesSession = async () => {
      const values = {
        firstName: session?.user?.firstName ? session.user.firstName : "",
        lastName: session?.user?.lastName ? session.user.lastName : "",
        email: session?.user?.email ? session.user.email : "",
        number: session?.user?.phone
          ? `0${session?.user?.phone.slice(3, session?.user?.phone.length + 1)}`
          : "",
        voie: devis?.voie ? devis.voie : "",
        codePostal: devis?.codePostal ? devis.codePostal : "",
        ville: devis?.ville ? devis.ville : "",
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesSession();
  }, [devis, session]);

  const schema = yup.object({
    email: yup
      .string()
      .required("Email est demandé...")
      .email("Votre email n'est pas conforme"),
    lastName: yup
      .string()
      .required("Nom est demandé...")
      .min(2, "Plus de 2 charactères")
      .max(50, "Moins de 50 charactères"),
    firstName: yup
      .string()
      .required("Prénom est demandé...")
      .min(2, "Plus de 2 charactères minimum")
      .max(50, "Moins de 50 charactères"),
    indicatif: yup.string(),
    number: yup
      .string()
      .required("Numéro de téléphone demandé...")
      .matches(nameRegex, "Numéro de téléphone non conforme"),
    voie: yup.string().required("Adresse est requise"),
    codePostal: yup
      .string()
      .required("Code postal est requis")
      .matches(/^[0-9]{5}$/, "Votre code postal doit contenir 5 chiffres"),
    ville: yup.string().required("Ville est requise"),
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
      const newEmail = values;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/devis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmail),
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
    } finally {
      initialStep();
    }
  }

  if (!isActive) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex h-full flex-col sm:mx-4 "
    >
      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="firstName"
          className={`labelForm ${
            errors?.firstName ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Prénom
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className={`inputFormIconLeft ${errors?.firstName && "bg-red-50"}`}
          placeholder="Votre prénom..."
        />
        <div className="iconLeft">
          <User />
        </div>
        {errors?.firstName && (
          <p className="errorsForm">{errors.firstName.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="lastName"
          className={`labelForm ${
            errors?.lastName ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Nom
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          className={`inputFormIconLeft ${errors?.lastName && "bg-red-50"}`}
          placeholder="Votre nom..."
        />
        <div className="iconLeft">
          <User />
        </div>
        {errors?.lastName && (
          <p className="errorsForm">{errors.lastName.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col">
        <label
          htmlFor="email"
          className={`labelForm ${
            errors?.email ? "to-red-50" : "to-neutral-50"
          }`}
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`inputFormIconLeft ${errors?.email && "bg-red-50"}`}
          placeholder="Votre email..."
        />
        <div className="iconLeft">
          <Email />
        </div>
        {errors?.email && <p className="errorsForm">{errors.email.message}</p>}
      </div>

      <div className="relative mb-4 flex flex-col">
        <label
          htmlFor="number"
          className={`labelForm ${
            errors?.number ? "to-red-50" : "to-neutral-50"
          }`}
        >
          N° de téléphone
        </label>
        <input
          id="number"
          type="text"
          {...register("number")}
          className={`inputFormIconLeft ${errors?.number && "bg-red-50"}`}
          placeholder="Votre n° de téléphone..."
        />
        <div className="iconLeft">
          <Phone />
        </div>
        {errors?.number && (
          <p className="errorsForm">{errors.number.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col  sm:col-span-2">
        <label
          htmlFor="voie"
          className={`labelForm ${
            errors?.voie ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Voie
        </label>
        <input
          id="voie"
          type="text"
          className={`inputFormBase ${errors?.title && "bg-red-50"}`}
          placeholder="Rue, Avenue, Lieu-dit, etc..."
          {...register("voie")}
        />
        {errors?.voie && (
          <p className="errorsFormBottom">{errors.voie.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col sm:col-span-2">
        <label
          htmlFor="codePostal"
          className={`labelForm ${
            errors?.codePostal ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Code postal
        </label>
        <input
          id="CodePostal"
          type="text"
          className={`inputFormBase ${errors?.codePostal && "bg-red-50"}`}
          placeholder="Code postal"
          {...register("codePostal")}
        />
        {errors?.codePostal && (
          <p className="errorsFormBottom">{errors.codePostal.message}</p>
        )}
      </div>

      <div className="relative mb-8 flex flex-col sm:col-span-2">
        <label
          htmlFor="ville"
          className={`labelForm ${
            errors?.ville ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Ville
        </label>
        <input
          id="ville"
          type="text"
          className={`inputFormBase ${errors?.ville && "bg-red-50"}`}
          placeholder="Ville"
          {...register("ville")}
        />
        {errors?.ville && (
          <p className="errorsFormBottom">{errors.ville.message}</p>
        )}
      </div>
      <div className="item-end flex w-full flex-1 justify-start">
        <div className="flex flex-1 items-end justify-start">
          <button
            onClick={prevStep}
            className=" rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
          >
            <div className="flex flex-1 items-center">
              <div className="mr-2 size-4">
                <AngleLeft />
              </div>
              <h3 className="font-bold">Précédent</h3>
            </div>
          </button>
        </div>
        <div className="flex w-full flex-1 items-end justify-end">
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
          >
            <div className="flex flex-1 items-center">
              <h3 className="font-bold">Envoyer</h3>
              <div className="ml-2">
                {isSubmitting ? (
                  <div className="size-4 animate-spin">
                    <Loading />
                  </div>
                ) : (
                  <div className="size-4">
                    <Send />
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
