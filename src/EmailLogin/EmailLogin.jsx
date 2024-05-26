"use client";
import { signIn } from "next-auth/react";
import { LogoMobile } from "@/components/logo/Logo";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function EmailLogin() {

  const defaultvalues = {
    email: "",
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email est demandé...")
      .email("Votre email n'est pas conforme"),
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

  async function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    signIn("hacouverture", {
      email,
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col">
      <label>
        E-mail
      </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="votre-nom@exemple.com"
          autoComplete="email"
          className={`px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50 ${errors?.firstName && "bg-red-50"}`} 
          required
        />
      
      <button
        type="submit"
        className="flex bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark"
      >
        <div className="size-6 mr-2">
          <LogoMobile />
        </div>
          <h3 className="">Connexion avec E-mail</h3>
        
      </button>
    </form>
  );
}
