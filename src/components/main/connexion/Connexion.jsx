"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "@/components/main/connexion/Connexion.module.scss";
import EmailLogin from "./EmailLogin/EmailLogin";
import GoogleLogin from "./GoogleLogin/GoogleLogin";

function Connexion({ itemDataCouverture }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLoading = (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className={styles.overlay}>
        <Image
          src={require(`../../${itemDataCouverture.urlWebp}`).default}
          alt={itemDataCouverture.altWebp}
          fill={itemDataCouverture.position}
          style={{
            objectFit: "cover",
            objectPosition: `${itemDataCouverture.position}`,
          }}
        />
      </div>
      <div className={styles.description}>
        <Image
          src={require(`../../${itemDataCouverture.urlSvg}`)}
          width={itemDataCouverture.width}
          height={itemDataCouverture.height}
          alt={itemDataCouverture.altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className={styles.fontH1}>{itemDataCouverture.title}</h1>
      </div>
      <div className={styles.formulaire}>
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            spinPulse
            className={styles.loadingSpin}
          />
        )}
        <div className={styles.containerFormulaire}>
          <EmailLogin handleLoading={handleLoading} callbackUrl={callbackUrl} />
          <div
            className={`${styles.or} ${styles.positionPiedPage} ${styles.formatButton}`}
            style={{ margin: "8rem 0" }}
          >
            <hr style={{ width: "100%", margin: "0" }} />
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;OU&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <hr style={{ width: "100%", margin: "0" }} />
          </div>
          <GoogleLogin handleLoading={handleLoading} />
        </div>
      </div>
    </>
  );
}

export default Connexion;
