"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "@/components/main/GoogleLogin/GoogleLogin.module.scss";

function Login({ handleLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleLoading(e) {
    e.preventDefault();
    setIsLoading(!isLoading);
  }

  return (
    <div className={styles.formulaire}>
      {isLoading && (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          className={styles.loadingSpin}
        />
      )}
      <div className={styles.containerFormulaire}>
        <div
          className={`${styles.or} ${styles.positionPiedPage} ${styles.formatButton}`}
        >
          - OR -
        </div>
        <button
          className={`${styles.google} ${styles.positionPiedPage} ${styles.formatButton}`}
          onClick={() => {
            signIn("google"), handleLoading(e);
          }}
        >
          <Image
            src={require("@/components/img/header/google-svg-login.svg")}
            alt="google"
            width={20}
            className="mr-20"
          />
          <h3>Connexion avec Google</h3>
        </button>
      </div>
    </div>
  );
}

export default Login;
