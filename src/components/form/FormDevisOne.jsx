"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AngleRight, Connexion, Email, Inscription, Loading, Phone, User } from "@/components/logo/Logo";
import Link from "next/link";

export function FormDevisOne({ isActive, nextStep, session, status, devis }) {
  const nameRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const router = useRouter();
  console.log(devis);

  const schema = yup.object({
    email: yup
      .string()
      .required("Email est demandé...")
      .email("Votre email n'est pas conforme"),
    lastName: yup.string().required("Nom est demandé...").min(2, "Plus de 2 charactères").max(50, "Moins de 50 charactères"),
    firstName: yup.string().required("Prénom est demandé...").min(2, "Plus de 2 charactères minimum").max(50, "Moins de 50 charactères"),
    indicatif: yup.string(),
    number: yup
      .string()
      .required("Numéro de téléphone demandé...")
      .matches(nameRegex, "Numéro de téléphone non conforme"),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues :{
      firstName: session?.user?.firstName ? session.user.firstName : devis?.firstName ? devis.firstName : "",
      lastName: session?.user?.lastName ? session.user.lastName : devis?.lastName ? devis.lastName : "",
      email: session?.user?.email ? session.user.email : devis?.email ? devis.email : "",
      number: session?.user?.phone ? `0${session?.user?.phone.slice(3, session?.user?.phone.length + 1)}` : devis?.phone ?`0${devis?.phone.slice(3, devis?.phone.length + 1)}`: "" ,
    },
    resolver: yupResolver(schema),
  });

  async function submit(values) {
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
        router.refresh();


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
    } finally {
    nextStep();
    }
  }

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit(submit)} className="relative flex flex-col sm:mx-4 ">

      <div className="relative flex flex-col mb-8">
        <label htmlFor="firstName" className={`labelForm ${errors?.firstName ? "to-red-50": "to-neutral-50"}`}>Prénom</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className={`inputFormIconLeft ${errors?.firstName && "bg-red-50" }`} 
          placeholder="Votre prénom..."
        />
        <div className="iconLeft">
          <User />
        </div>
        {errors?.firstName && (
          <p className="errorsForm">{errors.firstName.message}</p>
        )}
      </div>

    <div className="relative flex flex-col mb-8">
      <label htmlFor="lastName" className={`labelForm ${errors?.lastName ? "to-red-50": "to-neutral-50"}`}>Nom</label>
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

    <div className="relative flex flex-col mb-8">
      <label htmlFor="email" className={`labelForm ${errors?.email ? "to-red-50": "to-neutral-50"}`}>E-mail</label>
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
      {errors?.email && (
        <p className="errorsForm">{errors.email.message}</p>
      )}
    </div>

    <div className="relative flex flex-col mb-4">
      <label htmlFor="number" className={`labelForm ${errors?.number ? "to-red-50": "to-neutral-50"}`}>N° de téléphone</label>
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

    <div
      className="flex flex-shrink items-center bg-neutral-100 "
    >
      <hr className="w-full mx-4" />
      <h3>OU</h3>
      <hr className="w-full mx-4" />
    </div>
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 items-center justify-center my-4">
        <Link href="/connexion" aria-label="Lien vers la page de connexion des utilisateurs">
          <button className="bg-neutral-300 py-2 px-4 rounded-xl min-w-64 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
            <span className="flex flex-1 items-center justify-center">
              <span className="mr-2 size-5">
                <Connexion />
              </span>
              <h3 className="font-bold">Connexion</h3>
            </span>
          </button>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center my-4">
        <Link href="/inscription" aria-label="Lien vers la page d'inscription des utilisateurs">
          <button className="bg-neutral-300 py-2 px-4 rounded-xl min-w-64 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
            <span className="flex flex-1 items-center justify-center">
              <span className="mr-2 size-5">
                <Inscription />
              </span>
              <h3 className="font-bold">Inscription</h3>
            </span>
          </button>
        </Link>
      </div>
  </div>
    <div className="flex flex-1">
      <div className="flex flex-1 items-end justify-end">
        <button disabled={isSubmitting} className="bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark">
          <div className="flex flex-1 items-center">
          <h3 className="font-bold">Suivante</h3>
            <div className="ml-2">
              {isSubmitting ? 
                <div className="size-4 animate-spin">
                  <Loading />
                </div>
                :  
                <div className="size-4">
                  <AngleRight />
                </div>
              } 
            </div>
          </div>
        </button>
      </div>
    </div>
  </form>
  );
}