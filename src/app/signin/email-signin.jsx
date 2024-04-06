"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Favicon from "@/components/img/header/ha-couverture-favicon.svg";
import styles from "@/components/header/login/Login.module.scss";

export default function SignIn({ handleLogin, handleLoading }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(event) {
    // handleLoading();
    event.preventDefault();
    const formData = new FormData(event.target);
    await fetch("/api/auth/route", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        callbackUrl: callbackUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        signIn("nodemailer", { email, callbackUrl });
      } else {
        throw new Error("Failed to send email");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={`${styles.start} ${styles.positionEnTete}`}>
        <h2>Login</h2>
        <FontAwesomeIcon icon={faXmark} size={"2xl"} />
      </div>
      <label className={styles.position}>
        E-mail
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className={`${styles.email} `}
        />
      </label>
      <button
        type="submit"
        className={`${styles.envoie} ${styles.positionPiedPage} ${styles.formatButton}`}
      >
        <Image src={Favicon} alt="ha-couverture" width={30} className="mr-20" />
        <h3>Connexion avec E-mail</h3>
      </button>
    </form>
  );
}
