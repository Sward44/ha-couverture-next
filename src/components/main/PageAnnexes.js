import Image from "next/image";
import styles from "./PageAnnexes.module.scss";

function PageCouverture({ itemDataCouverture }) {
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
          src={require(`@/components/${itemDataCouverture.urlSvg}`).default}
          width={itemDataCouverture.width}
          height={itemDataCouverture.height}
          alt={itemDataCouverture.altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className={styles.fontH1}>{itemDataCouverture.title}</h1>
      </div>
      <div className={styles.grid}>
        {itemDataCouverture.description.map((item, id) => (
          <>
            <div key={id} className={styles.item}>
              <h2 className={styles.fontH2}>{item.title}</h2>
              <p className={styles.fontP}>{item.description}</p>
            </div>
            <div className={styles.image}>
              <Image
                src={require(`@/components/${item.urlWebp}`).default}
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
