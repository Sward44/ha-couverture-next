"use client";
import { getCsrfToken } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Favicon from "@/components/img/header/ha-couverture-favicon.svg";
import styles from "@/components/form/login/Login.module.scss";

export default function SignIn({ csrfToken, handleLogin }) {
  return (
    <form method="post" action="/api/auth/signin/email" className={styles.form}>
      <div className={`${styles.start} ${styles.positionEnTete}`}>
        <h2>Login</h2>
        <FontAwesomeIcon icon={faXmark} onClick={handleLogin} size={"2xl"} />
      </div>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className={styles.position}>
        E-mail
        <input
          type="email"
          id="email"
          name="email"
          className={`${styles.email} `}
        />
      </label>
      <button
        type="submit"
        className={`${styles.envoie} ${styles.positionPiedPage} ${styles.formatButton}`}
      >
        <Image src={Favicon} alt="ha-couverture" width={30} className="mr-20" />
        Connexion avec email
      </button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
