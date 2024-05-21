"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Favicon from "@/components/img/header/ha-couverture-favicon.svg";

export default function EmailLogin() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    signIn("hacouverture", {
      email,
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
          placeholder="votre-nom@exemple.com"
          autoComplete="email"
          className={`${styles.email} `}
          required
        />
      </label>
      <button
        type="submit"
        className={`${styles.envoie} ${styles.positionPiedPage} ${styles.formatButton}`}
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
