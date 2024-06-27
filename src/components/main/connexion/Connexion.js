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
  },[status, router])
  
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-col sm:m-auto w-full justify-center items-center">
        <div className="flex flex-col mt-4 mx-8 md:mx-auto shadow-ha rounded-xl md:max-w-[800px]">
          <div className="flex flex-col justify-center items-center  bg-neutral-100 ">
            <EmailLogin />
          </div>
          <div
            className="flex items-center bg-neutral-100 "
          >
            <hr className="w-full mx-4" />
            <h3>OU</h3>
            <hr className="w-full mx-4" />
          </div>
          <div className="flex flex-col  justify-center items-center bg-neutral-100 md:max-w-[800px]">
            <GoogleLogin />
          </div>
        </div>
        <Link href="/inscription">
          <span className="group flex mx-8 mt-4 mb-2 md:mb-8 text-center items-center">
            <span className="size-6 mr-2 md:mr-4 group-hover:fill-mahogany-950 md:group-hover:scale-105 transition duration-300">
              <Login />
            </span>
            <p className="underline md:group-hover:text-mahogany-950  md:group-hover:scale-101 transition duration-300">Vous n&#39;avez pas de compte ? Inscrivez-vous</p>
          </span>
        </Link>
      </div>
    </>
  )
}