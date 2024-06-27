"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { Google, Loading } from "@/components/logo/Logo";

function GoogleLogin() {

  const {handleSubmit, formState : { isSubmitting }} = useForm();

  async function onSubmit() {
    try {
      const response = await signIn("google", {});
      if (response.ok) {
        toast.success("Bienvenue sur Ha Couverture");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center my-8">
      <button
      disabled={ isSubmitting }
      className="bg-neutral-300 py-2 px-4 rounded-xl min-w-64 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha"
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="mr-2">
            {isSubmitting ? 
              <div className="size-4 animate-spin">
                <Loading />
              </div>
              :  
              <div className="size-3">
                <Google />
              </div>
            } 
          </div>
          <h3 className="font-bold">Connexion Google</h3>
        </div>
      </button>
    </form>
    
  );
}

export default GoogleLogin;
