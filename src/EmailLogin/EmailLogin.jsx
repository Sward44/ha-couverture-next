"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Email, EyeClose, EyeOpen, Loading, LogoMobile, Password } from "@/components/logo/Logo";

export default function EmailLogin() {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const defaultvalues = {
    email: "",
    password: "",
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email est demandé...")
      .email("Votre email n'est pas conforme"),
    password: yup
      .string()
      .required("Mot de passe demandé...")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultvalues,
    resolver: yupResolver(schema),
  });

  async function onSubmit(values) {
    try {      
      const response = await signIn("credentials", {
        redirect: false,
        username: values.email,
        password: values.password,
      }); 
      if (response.ok) {
        reset();
        toast.success("Bienvenue sur Ha Couverture");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-8 grid grid-cols-[minmax(260px,610px)]
    grid-rows-[auto_auto_auto] md:grid-rows-[auto_auto_auto_auto_60px]">
      <div className="hidden md:block mb-8 ml-5">
        <h2 className="text-2xl font-bold">Connexion</h2>
      </div>
      <div className="relative flex flex-col sm:mx-4 mb-8">
        <label className={`labelForm ${errors?.email ? "to-red-50": "to-neutral-50"}`}>
          E-mail
        </label>
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
      <div className="relative flex flex-col sm:mx-4 mb-6">
        <label className={`labelForm ${errors?.password? "to-red-50": "to-neutral-50"}`}>
          Mot de passe
        </label>
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
      <div className="flex ml-2 sm:ml-4 mb-6">
        <Link href="/mot-de-passe-oublie" className="font-bold" aria-label="Lien vers la page de réinitialisation du mot de passe de chaques utilisateurs">Mot de passe oublié ?</Link>
      </div>
      <div className="flex">
      <div className="flex flex-1 items-center justify-center">
        <button disabled={isSubmitting} className="bg-neutral-300 py-2 px-4 rounded-xl min-w-64 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
          <div className="flex flex-1 items-center justify-center">
            <div className="mr-2">
              {isSubmitting ? 
                <div className="size-4 animate-spin">
                  <Loading />
                </div>
               :  
                <div className="size-4">
                  <LogoMobile />
                </div>
              } 
            </div>
            <h3 className="font-bold">Connexion avec HA</h3>
          </div>
        </button>
      </div>
    </div>
    </form>
  );
}
