"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Favicon from "@/components/img/header/ha-couverture-favicon.svg";
import styles from "@/components/main/connexion/Connexion.module.scss";

export default function EmailLogin({ handleLoading, callbackUrl }) {
  async function handleSubmit(event) {
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
        // onClick={handleLoading}
      >
        <Image
          src={Favicon}
          alt="Présentation du bouton de connexion via Email"
          width={30}
          className={`mr-20 ${styles.formatImage}`}
        />
        <h3 className={styles.formatH3}>Connexion avec E-mail</h3>
      </button>
    </form>
  );
}
