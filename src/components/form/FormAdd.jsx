"use client";
import { useRef } from "react";
import React, { useState } from "react";
import styles from "./FormAdd.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function FormAdd({ handleForm }) {
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
    lastName: yup.string().required("Nom est demandé..."),
    firstName: yup.string().required("Prénom est demandé..."),
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
        console.log(newEmailResponse);
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
    <div className={`fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-neutral-950 bg-opacity-90 z-30   text-lg`}>
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
        <div className={`flex flex-1 sm:flex-none flex-col p-20 mx-4 max-w-[480px] sm:max-w-none bg-neutral-100 rounded-xl ${styles.apparition}`}>
          <form onSubmit={handleSubmit(submit)} className="grid  sm:grid-cols-2 md:grid-cols-4 sm:grid-rows-[50px_1fr_1fr_3fr_60px]
          grid-rows-[50px_1fr_1fr_1fr_1fr_3fr_60px]">
            <div className="flex justify-between sm:col-span-2 md:col-span-4">
              <h2 className="sm:pl-4 text-2xl font-bold">Devis</h2>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleForm}
                size={"2xl"}
                className="sm:pr-4"
              />
            </div>

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-4 sm:mb-6">
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className={`px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50 ${errors?.firstName && "bg-red-50"}`} 
                placeholder="Votre prénom..."
              />
              {errors?.firstName && (
                <p className="absolute text-red-500 text-sm top-[74px] pl-2">{errors.firstName.message}</p>
              )}
            </div>

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-4 sm:mb-6">
              <label htmlFor="lastName">Nom</label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className={`px-4 py-2 border border-neutral-300 rounded-lg ${errors?.lastName && "bg-red-50"}`}
                placeholder="Votre nom..."
              />
              {errors?.lastName && (
                <p className="absolute text-red-500 text-sm top-[74px] pl-2">{errors.lastName.message}</p>
              )}
            </div>

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-4 sm:mb-6">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                defaultvalues={"email"}
                className={`px-4 py-2 border border-neutral-300 rounded-lg ${errors?.email && "bg-red-50"}`}
                placeholder="Votre email..."
              />
              {errors?.email && (
                <p className="absolute text-red-500 text-sm top-[74px] pl-2">{errors.email.message}</p>
              )}
            </div>

            <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-4 sm:mb-6">
              <label htmlFor="number">N° de téléphone</label>
              <input
                id="number"
                type="text"
                {...register("number")}
                className={`px-4 py-2 border border-neutral-300 rounded-lg ${errors?.number && "bg-red-50"}`}
                placeholder="Votre n° de téléphone..."
              ></input>
              {errors?.number && (
                <p className="absolute text-red-500 text-sm top-[74px] pl-2">{errors.number.message}</p>
              )}
            </div>

            <div className="relative flex flex-col sm:col-span-2 md:col-span-4 sm:mx-4 mb-4 sm:mb-6">
              <label htmlFor="comments">Demande précis</label>
              <textarea
                id="comments"
                type="text"
                {...register("comments")}
                className={`px-4 py-2 h-full border border-neutral-300 rounded-lg resize-none ${errors?.comments && "bg-red-50"}`}
                placeholder="Préciser votre demande..."
              />
              {errors?.comments && (
                <p className="absolute text-red-500 text-sm top-[254px] sm:top-[270px] pl-2">{errors.comments.message}</p>
              )}
            </div>
            <div className="flex sm:col-span-2 md:col-start-2">
              <div className="flex flex-1 items-center justify-center">
                <button disabled={isSubmitting} className=" bg-neutral-300 py-2 px-4 rounded-xl">
                  <div className="flex ">
                    <div className="mr-2">
                      {isLoading ?  <FontAwesomeIcon
                        icon={faSpinner}
                        spinPulse
                        className="size-4"
                      /> :  <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="size-4"
                      /> }
                      
                      
                    </div>
                    <h3 className="font-bold">Envoyer</h3>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormAdd;
