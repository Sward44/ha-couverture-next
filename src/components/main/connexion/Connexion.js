"use client";
import React from "react";
import EmailLogin from "@/EmailLogin/EmailLogin";
import GoogleLogin from "@/GoogleLogin/GoogleLogin";
import Link from "next/link";
import { Login } from "@/components/logo/Logo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Connexion() {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
      <div className="flex w-full flex-col-reverse items-center justify-center sm:m-auto sm:flex-col">
        <div className="mx-8 mt-4 flex flex-col rounded-xl shadow-ha md:mx-auto md:max-w-[800px]">
          <div className="flex flex-col items-center justify-center  bg-neutral-100 ">
            <EmailLogin />
          </div>
          <div className="flex items-center bg-neutral-100 ">
            <hr className="mx-4 w-full" />
            <h3>OU</h3>
            <hr className="mx-4 w-full" />
          </div>
          <div className="flex flex-col  items-center justify-center bg-neutral-100 md:max-w-[800px]">
            <GoogleLogin />
          </div>
        </div>
        <Link
          href="/inscription"
          aria-label="Lien vers la page d'inscription des utilisateurs"
        >
          <span className="group mx-8 mb-2 mt-4 flex items-center text-center md:mb-8">
            <span className="mr-2 size-6 transition duration-300 group-hover:fill-mahogany-950 md:mr-4 md:group-hover:scale-105">
              <Login />
            </span>
            <p className="underline transition  duration-300 md:group-hover:scale-101 md:group-hover:text-mahogany-950">
              Vous n&#39;avez pas de compte ? Inscrivez-vous
            </p>
          </span>
        </Link>
      </div>
    </>
  );
}
