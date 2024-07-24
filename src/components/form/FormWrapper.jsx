"use client";
import React from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mark, User } from "@/components/logo/Logo";


export function FormWrapper({ children, handleForm, session, status, devis }) {
  const router = useRouter();
  
  const [step, setStep] = React.useState(1);
    // () => {
    // if (status === "authenticated" && session?.user?.phone !== "" || undefined || null) {
    //   return 2;
    // } else {
    //   return 1;
    // }}) 
    
    // if (step ===  2 && devis === null || !devis || new Date(devis?.createdAt).getTime() > Date.now() - (3 * 24 * 60 * 60 * 1000)){
    //   const newDevis = {
    //     firstName: session.user.firstName,
    //     lastName: session.user.lastName,
    //     email: session.user.email,
    //     number: session.user.phone,
    //   }
    //   const createDevis = fetch(`${process.env.NEXT_PUBLIC_HOST}/api/devis`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newDevis),
    //   })
    //   if (createDevis.ok) {
    //     console.log(createDevis);
    //     router.refresh()
    //   }
    // }

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className={`fixed flex justify-center items-center top-0 left-0 w-full h-screen py-8 px-4 z-30 animate-[apparitionEcran_0.5s_ease_forwards]`}>
      <div className="relative h-full w-full shadow-ha px-4 py-8 rounded-xl grid grid-cols-1 sm:grid-rows-[auto_1fr] sm:max-w-[640px] bg-neutral-100">
      {status === "authenticated" && <div className="absolute flex items-center top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10 bg-neutral-100 rounded-full border border-neutral-300 shadow-ha">
        <div className="size-8 ml-1 mr-2">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session?.user?.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center size-8 bg-neutral-300 rounded-full">
              <div className="size-6 fill-neutral-950">
                <User />
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="text-xs pr-4">{session?.user?.email}</p>
          <p className="text-xs pr-4 pb-1">{session?.user?.name}</p>
        </div>
      </div>}
        <div className="hidden sm:flex justify-between mb-8">
          <h2 className="sm:pl-4 text-2xl font-bold">Devis</h2>
          <div onClick={handleForm} className="sm:mr-4 size-6 md:hover:fill-mahogany-950 md:hover:scale-105 transition duration-300">
            <Mark />
          </div>
        </div>
        <div className="absolute sm:hidden top-0 right-0 translate-x-4 -translate-y-4 z-10">
          <div onClick={handleForm} className="flex items-center justify-center size-8 bg-neutral-100 border-neutral-300 border rounded-full">
            <div className="size-5 fill-neutral-950">
              <Mark />
            </div>
          </div>
        </div>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            isActive: index + 1 === step,
            nextStep,
            prevStep,
          });
        })}
        
      </div>
    </div>
  );
}
