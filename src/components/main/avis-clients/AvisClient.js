import React from "react";
import Image from "next/image";
import { itemDataCouverture } from "@/components/dictonnaries/DataDiaporama";
import styles from "./AvisClient.module.scss";

function AvisClient({ indexActivites }) {
  return (
    <>
      <div className={styles.overlay}>
        <Image
          src={
            require(`../../${itemDataCouverture[indexActivites].urlWebp}`)
              .default
          }
          alt={itemDataCouverture[indexActivites].altWebp}
          fill={itemDataCouverture[indexActivites].position}
          style={{
            objectFit: "cover",
            objectPosition: `${itemDataCouverture[indexActivites].position}`,
          }}
        />
      </div>
      <div className={styles.description}>
        <Image
          src={require(`../../${itemDataCouverture[indexActivites].urlSvg}`)}
          width={itemDataCouverture[indexActivites].width}
          height={itemDataCouverture[indexActivites].height}
          alt={itemDataCouverture[indexActivites].altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className={styles.fontH1}>
          {itemDataCouverture[indexActivites].title}
        </h1>
      </div>
    </>
  );
}

export default AvisClient;
