"use server";
import FormInscription from "@/components/form/FormInscription";
import { Login } from "@/components/logo/Logo";
import Link from "next/link";


export default async function Inscription() {
  return (
    <div className="flex flex-col-reverse sm:flex-col justify-center items-center mx-auto mb-4 sm:m-auto w-full">
      <FormInscription />
      <Link href="/connexion">
        <span className="group flex mx-8 mt-4 mb-2 md:mb-8 text-center items-center">
          <span className="size-6 mr-2 md:mr-4 group-hover:fill-mahogany-950 md:group-hover:scale-105 transition duration-300">
            <Login />
          </span>
        <p className="underline md:group-hover:text-mahogany-950  md:group-hover:scale-101 transition duration-300">Vous avez déjà un compte ? Connectez-vous</p>
        </span>
        </Link>
    </div>
  )
}