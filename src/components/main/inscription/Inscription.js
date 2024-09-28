"use server";
import FormInscription from "@/components/form/FormInscription";
import { Login } from "@/components/logo/Logo";
import Link from "next/link";

export default async function Inscription() {
  return (
    <div className="mx-auto mb-4 flex w-full flex-col-reverse items-center justify-center sm:m-auto sm:flex-col">
      <FormInscription />
      <Link
        href="/connexion"
        aria-label="Lien vers la page de connexion des utilisateurs"
      >
        <span className="group mx-8 mb-2 mt-4 flex items-center text-center md:mb-8">
          <span className="mr-2 size-6 transition duration-300 group-hover:fill-mahogany-950 md:mr-4 md:group-hover:scale-105">
            <Login />
          </span>
          <p className="underline transition  duration-300 md:group-hover:scale-101 md:group-hover:text-mahogany-950">
            Vous avez déjà un compte ? Connectez-vous
          </p>
        </span>
      </Link>
    </div>
  );
}
