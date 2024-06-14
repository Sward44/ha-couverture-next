"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Google, Loading } from "@/components/logo/Logo";


function GoogleLogin() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="flex items-center justify-center my-8">
      <button
      onClick={() => {
        // setIsLoading(true);
        signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_HOST}` });
      }}
      className="bg-neutral-300 py-2 px-4 rounded-xl min-w-64 md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha"
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="mr-2">
            {isLoading ? 
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
    </div>
    
  );
}

export default GoogleLogin;
