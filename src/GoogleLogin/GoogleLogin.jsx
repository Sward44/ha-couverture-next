"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Google } from "@/components/logo/Logo";


function GoogleLogin() {
  return (
    <button
    onClick={() => {
      signIn("google");
    }}
    className=""
    >
      <Google />
      <h3 className="">Connexion avec Google</h3>
    </button>
  );
}

export default GoogleLogin;
