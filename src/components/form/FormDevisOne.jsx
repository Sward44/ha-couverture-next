"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AngleRight, Loading } from "../logo/Logo";
import { toast } from "react-toastify";

export function FormDevisOne({ isActive, nextStep, devis }) {
  const [defaultValues, setDefaultValues] = React.useState({});
  const router = useRouter();

  React.useEffect(() => {
    const fetchDefaultValuesComments = async () => {
      const values = {
        comments: devis ? devis : "",
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesComments();
  }, [devis]);

  const schema = yup.object().shape({
    comments: yup
      .string()
      .required("Le sujet de votre email est demandé...")
      .min(10, "Votre message doit contenir au moins 10 caractères"),
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  async function onSubmit(data) {
    try {
      clearErrors();
      const newEmail = data;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addresses`,
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
        const errorData = await response.json();
        toast.error(errorData.error || response.statusText);
      }
    } catch (error) {
      if (error) {
        toast.error(error.message || "Une erreur s'est produite");
      } else {
        toast.error("Une erreur inconnue s'est produite");
      }
    } finally {
      nextStep();
    }
  }

  if (!isActive) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex h-full flex-col"
    >
      <div className="relative mb-8 flex grow flex-col">
        <label
          htmlFor="comments"
          className={`labelForm ${
            errors?.comments ? "to-red-50" : "to-neutral-50"
          }`}
        >
          Votre demande
        </label>
        <textarea
          id="comments"
          type="text"
          {...register("comments")}
          className={`inputFormBase h-full resize-none ${
            errors?.comments && "bg-red-50"
          }`}
          placeholder="Notez tous ce que vous voulez..."
        />
        {errors?.comments && (
          <p className="errorsFormBottom">{errors.comments.message}</p>
        )}
      </div>
      <div className="flex w-full items-end justify-end">
        <button
          type="submit"
          className="rounded-xl bg-neutral-300 px-4 py-2 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:shadow-ha"
        >
          <div className="flex items-center">
            <h3 className="font-bold">Suivante</h3>
            {isSubmitting ? (
              <div className="ml-2 size-4 animate-spin">
                <Loading />
              </div>
            ) : (
              <div className="ml-2 size-4">
                <AngleRight />
              </div>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
