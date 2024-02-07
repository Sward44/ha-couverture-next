import styles from "./Texte.module.scss";
import Image from "next/image";

function Texte({ itemData, index }) {
  return (
    <div key={index} className={styles.container}>
      <h2 className={`${styles.apparitionTitre} mb-20`}>
        <Image
          src={require(`../../${itemData[index].urlSvg}`).default}
          width={26}
          height={26}
          alt={itemData[index].altSvg}
          className={styles.apparitionImage}
        />{" "}
        {itemData[index].title}
      </h2>
      <p className={`${styles.apparitionTexte}`}>
        {itemData[index].description}
      </p>
    </div>
  );
}

export default Texte;
