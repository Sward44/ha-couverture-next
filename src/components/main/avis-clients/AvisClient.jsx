import React from "react";
import Image from "next/image";
import styles from "@/components/main/avis-clients/AvisClient.module.scss";

function AvisClient({ itemDataCouverture }) {
  return (
    <>
      <div className={styles.overlay}>
        <Image
          src={require(`@/components/${itemDataCouverture.urlWebp}`).default}
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
          src={require(`@/components/${itemDataCouverture.urlSvg}`)}
          width={itemDataCouverture.width}
          height={itemDataCouverture.height}
          alt={itemDataCouverture.altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className={styles.fontH1}>{itemDataCouverture.title}</h1>
      </div>
    </>
  );
}

export default AvisClient;
