"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loading, Send, EyeOpen, EyeClose, Password, Phone, Email, User } from "@/components/logo/Logo";

export default function FormInscription() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = React.useState(false);
  let newEmailResponse;
  const nameRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const defaultvalues = {
    email: "",
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email est demandé...")
      .email("Votre email n'est pas conforme"),
    lastName: yup
      .string()
      .required("Nom est demandé...")
      .min(2, "Deux charactères minimum")
      .max(50, "Moins de 50 charactères"),
    firstName: yup
      .string()
      .required("Prénom est demandé...")
      .min(2, "Deux charactères minimum")
      .max(50, "Moins de 50 charactères"),
    number: yup
      .string()
      .required("Numéro de téléphone demandé...")
      .matches(nameRegex, "Numéro de téléphone non conforme"),
    password: yup
      .string()
      .required("Mot de passe demandé...")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: yup
      .string()
      .required("Confirmation demandé...")
      .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
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
      const {confirmPassword, ...newEmail} = values;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmail),
        }
      );
      if (response.ok) {
        reset();
        newEmailResponse = await response.json();
        toast.success(newEmailResponse.message);
      } else {
        toast.error(response.error);
      }
    } catch (e) {
      setError("generic", {
        type: "generic",
        message: "Problèmes serveurs catch",
      });
    }
    setIsLoading(false);
  }

return(
  <form onSubmit={handleSubmit(submit)} className="shadow-ha px-4 py-8 rounded-xl grid grid-cols-[minmax(260px,500px)] mx-8 my-4 sm:grid-cols-2 md:grid-cols-4 sm:grid-rows-[auto_auto_auto_auto_60px]
  grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr_60px] md:max-w-[800px] bg-neutral-100">
    <div className="hidden md:block md:col-span-4 mb-8 ml-5">
      <h2 className="text-2xl font-bold">Inscription</h2>
    </div>
    <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8">
      <label htmlFor="firstName" className={`labelForm  ${errors?.firstName ? "to-red-50": "to-neutral-50"}`} >Prénom</label>
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
      <label htmlFor="email" className={`labelForm ${errors?.email ? "to-red-50": "to-neutral-100"}`}>E-mail</label>
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

    <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8" >
      <label htmlFor="password" className={`labelForm ${errors?.password? "to-red-50": "to-neutral-50"} z-10`}>Mot de passe</label>
        <input
          id="password"
          type={isVisiblePassword ? "text" :"password"}
          {...register("password")}
          className={`inputFormIconBoth ${errors?.password && "bg-red-50"}`}
          placeholder="Votre mot de passe..." />
             <div className="iconLeft">
              <Password />
            </div>
            <div onClick={() => setIsVisiblePassword(!isVisiblePassword)} className="iconRight">
              {!isVisiblePassword ? <EyeOpen /> : <EyeClose />}
            </div>
        {errors?.password && (
        <p className="errorsForm">{errors.password.message}</p>
      )}
    </div>

    <div className="relative flex flex-col md:col-span-2 sm:mx-4 mb-8" >
      <label htmlFor="password" className={`labelForm ${errors?.confirmPassword ? "to-red-50": "to-neutral-50"} z-10`}>Confimez votre mot de passe</label>
        <input
          id="confirmPassword"
          type={isVisibleConfirmPassword ? "text" :"password"}
          {...register("confirmPassword")}
          className={`inputFormIconBoth ${errors?.confirmPassword && "bg-red-50"}`}
          placeholder="Votre mot de passe..." />
            <div className="iconLeft">
              <Password />
            </div>
            <div onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)} className="iconRight">
              {!isVisibleConfirmPassword ? <EyeOpen /> : <EyeClose />}
            </div>
        {errors?.confirmPassword && (
        <p className="errorsForm">{errors.confirmPassword.message}</p>
      )}
    </div>
    
    <div className="flex sm:col-span-2 md:col-span-4">
      <div className="flex flex-1 items-center justify-center">
        <button disabled={isSubmitting} className=" bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 min-w-64 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
          <div className="flex flex-1 items-center justify-center">
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
)

}
