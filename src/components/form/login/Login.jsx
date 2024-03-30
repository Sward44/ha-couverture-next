"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "@/components/form/login/Login.module.scss";
import SignIn from "@/app/api/auth/email-signin";

function Login({ handleLogin }) {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        spinPulse
        className={styles.loadingSpin}
      />
    );
  }

  return (
    <div className={styles.formulaire}>
      <div className={styles.containerFormulaire}>
        <SignIn handleLogin={handleLogin} />
        <div
          className={`${styles.or} ${styles.positionPiedPage} ${styles.formatButton}`}
        >
          - OR -
        </div>
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
            className="mr-20"
          />
          <h3>Connexion avec Google</h3>
        </button>
      </div>
    </div>
  );
}

export default Login;
