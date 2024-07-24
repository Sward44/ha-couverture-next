"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AngleLeft, Loading, Send } from "../logo/Logo";
import { toast } from "react-toastify";


export function FormDevisThree({ isActive, prevStep, handleForm, devis }) {
  const [defaultValues, setDefaultValues] = React.useState({});
  console.log(devis);

  React.useEffect(() => {
    const fetchDefaultValues = async () => {
      const values = {
        voie: devis?.voie ? devis.voie : "",
        codePostal: devis?.codePostal ? devis.codePostal : "",
        ville: devis?.ville ? devis.ville : "",
        comments: devis?.comments ? devis.comments : "",
      };
      setDefaultValues(values);
    };
    fetchDefaultValues();
  }, [devis]);

  const schema = yup.object().shape({
    voie: yup.string().required("Adresse est requise"),
    codePostal: yup.string().required("Code postal est requis").matches(/^[0-9]{5}$/, 'Votre code postal doit contenir 5 chiffres'),
    ville: yup.string().required("Ville est requise"),
    comments: yup.string().required("Le sujet de votre email est demandé...").min(10, "Votre message doit contenir au moins 10 caractères"),
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
        const newEmailResponse = await response.json();
        reset();
        toast.success(newEmailResponse.message || "Message envoyé avec succès !");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || response.statusText);
      }
    } catch (error) {
      if (error) {
        toast.error(e.message || "Une erreur s'est produite");
      } else {
        toast.error("Une erreur inconnue s'est produite");
      }
    } finally {
      handleForm();
    }
  };

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col sm:mx-4 ">
      <div className="relative flex flex-col sm:col-span-2  mb-8">
        <label htmlFor="voie" className={`labelForm ${errors?.voie ? "to-red-50": "to-neutral-50"}`} >Voie</label>
        <input
         id="voie" 
         type="text"  
         className={`inputFormBase ${errors?.title && "bg-red-50"}`}
         placeholder="Rue, Avenue, Lieu-dit, etc..."
         {...register("voie")} />
         {errors?.voie && (
            <p className="errorsFormBottom">{errors.voie.message}</p>
          )}
      </div>
      <div className="relative flex flex-col sm:col-span-2 mb-8">
        <label htmlFor="codePostal" className={`labelForm ${errors?.codePostal ? "to-red-50": "to-neutral-50"}`} >Code postal</label>
        <input
         id="CodePostal" 
         type="text"  
         className={`inputFormBase ${errors?.codePostal && "bg-red-50"}`}
         placeholder="Code postal"
         {...register("codePostal")} />
         {errors?.codePostal && (
            <p className="errorsFormBottom">{errors.codePostal.message}</p>
          )}
      </div>
      <div className="relative flex flex-col sm:col-span-2 mb-8">
        <label htmlFor="ville" className={`labelForm ${errors?.ville ? "to-red-50": "to-neutral-50"}`} >Ville</label>
        <input
         id="ville" 
         type="text"  
         className={`inputFormBase ${errors?.ville && "bg-red-50"}`}
         placeholder="Ville"
         {...register("ville")} />
         {errors?.ville && (
            <p className="errorsFormBottom">{errors.ville.message}</p>
          )}
      </div>
      <div className="relative flex flex-col h-full sm:col-span-2 mb-8">
        <label htmlFor="comments" className={`labelForm ${errors?.comments ? "to-red-50": "to-neutral-50"}`} >Votre demande</label>
        <textarea
          id="comments"
          type="text"
          {...register("comments")}
          className={`h-full inputFormBase resize-none ${errors?.comments && "bg-red-50"}`}
          placeholder="Notez tous ce que vous voulez..."
        />
        {errors?.comments && (
          <p className="errorsFormBottom">{errors.comments.message}</p>
        )}
      </div>
      <div className="flex flex-1">
        <div className="flex flex-1 items-end justify-start">
        <button
          onClick={prevStep}
          className="bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha"
        >
          <div className="flex flex-1 items-end">
            <div className="size-4 mr-2">
              <AngleLeft />
            </div>
            <h3 className="font-bold">Précédent</h3>
          </div>
        </button>
        <div className="flex flex-1 items-end justify-end">
        <button type="submit" className="bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
          <div className="flex flex-1 items-center">
            <h3 className="font-bold">Soumettre</h3>
            {isSubmitting ? 
                <div className="size-4 ml-2 animate-spin">
                  <Loading />
                </div>
                :  
                <div className="size-4 ml-2">
                  <Send />
                </div>
              } 
          </div>
        </button>
        </div>
      </div>
      </div>
    </form>
  );
}