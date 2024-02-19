import Image from "next/image";
import { itemDataCouverture } from "../dictonnaries/DataDiaporama";
import styles from "./PageAnnexes.module.scss";

function PageCouverture({ indexActivites }) {
  return (
    <>
      <div className={styles.overlay}>
        <Image
          src={
            require(`../${itemDataCouverture[indexActivites].urlWebp}`).default
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
          src={require(`../${itemDataCouverture[indexActivites].urlSvg}`)}
          width={itemDataCouverture[indexActivites].width}
          height={itemDataCouverture[indexActivites].height}
          alt={itemDataCouverture[indexActivites].altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className={styles.fontH1}>
          {itemDataCouverture[indexActivites].title}
        </h1>
      </div>
      <div className={styles.grid}>
        {itemDataCouverture[indexActivites].description.map((item, i) => (
          <>
            <div key={i} className={styles.item}>
              <h2 className={styles.fontH2}>{item.title}</h2>
              <p className={styles.fontP}>{item.description}</p>
            </div>
            <div className={styles.image}>
              <Image
                src={require(`../${item.urlWebp}`).default}
                alt={item.altWebp}
                fill={item.position}
                style={{
                  objectFit: "cover",
                  objectPosition: `${item.position}`,
                }}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default PageCouverture;
