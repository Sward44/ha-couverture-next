"use client";
import { useRef } from "react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Email, Loading, Mark, Phone, Send, User } from "@/components/logo/Logo";

export default function FormAdd({ handleForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const isFinish = useRef(false);
  const nameRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const defaultvalues = {
    email: "",
  };

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
    comments: yup.string().required("Le sujet de votre email est demandé..."),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultvalues,
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    try {
      setIsLoading(true);
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
        isFinish.current = true;
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
    setIsLoading(false);
  }

  return (
    <div className={`fixed flex justify-center items-center top-0 left-0 w-full h-screen  z-30 animate-[apparitionEcran_0.5s_ease_forwards]`}>
      {isFinish.current ? (
        <div className={`flex flex-col p-8 bg-neutral-300 `}>
          <div className="">
            <div className="">
              <h3 className="mb-20">
                Merci, nous avons bien reçu votre message, nous vous repondrons
                dans 48h maximum.
              </h3>
            </div>
            <div className="">
              <button className="" onClick={handleForm}>
                <h3>Ok</h3>
              </button>
            </div>
          </div>
        </div>
      ) : (
          <form onSubmit={handleSubmit(submit)} className="relative shadow-ha px-4 py-8 rounded-xl grid grid-cols-[minmax(260px,500px)] mx-8 my-4 sm:grid-cols-2 md:grid-cols-4 sm:grid-rows-[auto_1fr_1fr_3fr_60px] grid-rows-[1fr_1fr_1fr_1fr_3fr_60px] md:max-w-[800px] bg-neutral-100">
            <div className="hidden sm:flex justify-between sm:col-span-2 md:col-span-4 mb-8">
              <h2 className="sm:pl-4 text-2xl font-bold">Devis</h2>
              <div onClick={handleForm} className="sm:mr-4 size-6 md:hover:fill-mahogany-950 md:hover:scale-105 transition duration-300">
                <Mark />
              </div>
            </div>
            <div className="absolute sm:hidden top-0 right-0 translate-x-4 -translate-y-4 z-10">
              <div onClick={handleForm} className="flex items-center justify-center size-8 bg-neutral-100 border-neutral-300 border rounded-full">
                <div className="size-5 fill-neutral-950">
                  <Mark />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8">
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

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8">
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

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8">
              <label htmlFor="email" className={`labelForm ${errors?.email ? "to-red-50": "to-neutral-50"}`}>E-mail</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                defaultvalues={"email"}
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

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8">
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

            <div className="relative flex flex-col sm:col-span-2 md:col-span-4 sm:mx-4 mb-8">
              <label htmlFor="comments" className={`labelForm ${errors?.comments ? "to-red-50": "to-neutral-50"}`}>Demande précis</label>
              <textarea
                id="comments"
                type="text"
                {...register("comments")}
                className={`h-full inputFormBase resize-none ${errors?.comments && "bg-red-50"}`}
                placeholder="Préciser votre demande..."
              />
              {errors?.comments && (
                <p className="absolute text-red-500 text-[12px] top-[213px] pl-2">{errors.comments.message}</p>
              )}
            </div>
            
            <div className="flex sm:col-span-2 md:col-start-2">
              <div className="flex flex-1 items-center justify-center">
                <button disabled={isSubmitting} className=" bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark">
                  <div className="flex flex-1 items-center">
                    <div className="mr-2">
                      {isLoading ? 
                        <div className="size-4 animate-spin">
                          <Loading />
                        </div>
                       :  
                        <div className="size-4">
                          <Send />
                        </div>
                      } 
                    </div>
                    <h3 className="font-bold">Envoyer</h3>
                  </div>
                </button>
              </div>
            </div>
          </form>
      )}
    </div>
  );
}