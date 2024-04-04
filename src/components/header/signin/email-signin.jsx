"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Favicon from "@/components/img/header/ha-couverture-favicon.svg";
import styles from "@/components/header/login/Login.module.scss";

export default function SignIn({ handleLogin }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    console.log(
      "Email sortie du navigateur : ",
      email,
      "Le callback avec searchParams : ",
      callbackUrl
    );
    signIn("nodemailer", { email, callbackUrl });
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
          className={`${styles.email} `}
        />
      </label>
      <button
        type="submit"
        // onClick={handleLogin}
        className={`${styles.envoie} ${styles.positionPiedPage} ${styles.formatButton}`}
      >
        <Image src={Favicon} alt="ha-couverture" width={30} className="mr-20" />
        <h3>Connexion avec email</h3>
      </button>
    </form>
  );
}
