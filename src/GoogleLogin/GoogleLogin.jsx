"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";


function GoogleLogin() {
  return (
    <button
      className=""
      onClick={() => {
        signIn("google");
      }}
    >
      <Image
        src={require("@/components/img/header/google-svg-login.svg")}
        alt="google"
        width={20}
        className=""
      />
      <h3 className="">Connexion avec Google</h3>
    </button>
  );
}

export default GoogleLogin;
