"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "@/components/main/connexion/Connexion.module.scss";

function GoogleLogin() {
  return (
    <button
      className={`${styles.google} ${styles.positionPiedPage} ${styles.formatButton}`}
      onClick={() => {
        signIn("google");
      }}
    >
      <Image
        src={require("@/components/img/header/google-svg-login.svg")}
        alt="google"
        width={20}
        className={`mr-20 ${styles.formatImage}`}
      />
      <h3 className={styles.formatH3}>Connexion avec Google</h3>
    </button>
  );
}

export default GoogleLogin;
