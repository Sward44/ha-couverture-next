"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { EyeClose, EyeOpen, Loading, Password, Send, } from "@/components/logo/Logo";
import { redirect } from "next/navigation";

export default function MotDePasseReinitialisation({dataUser}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = React.useState(false);

  let newEmailResponse;

  const defaultvalues = {
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object({
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
      newEmail.email = dataUser;
      console.log(newEmail);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/motdepasse`,
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
        redirect("/");
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
  <div className="flex flex-col-reverse sm:flex-col justify-center items-center m-auto w-full">
    <form onSubmit={handleSubmit(submit)} className="shadow-ha px-4 py-8 rounded-xl grid grid-cols-[minmax(260px,500px)] mx-8 my-4 sm:grid-rows-[auto_auto_auto_60px]
    grid-rows-[1fr_1fr_60px] md:max-w-[800px] bg-neutral-100">
      <div className=" md:block  mb-8 mx-5">
        <h2 className="text-xl sm:text-2xl font-bold">Réinitialisation de mot de passe</h2>
      </div>
      <div className="relative flex flex-col  sm:mx-4 mb-8" >
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

    <div className="relative flex flex-col sm:mx-4 mb-8" >
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
      
      
      <div className="flex ">
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
  </div>
)

}
