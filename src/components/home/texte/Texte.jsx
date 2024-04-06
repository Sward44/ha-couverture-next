import TexteButton from "../button/TexteButton";
import styles from "./Texte.module.scss";
import Image from "next/image";

function Texte({ itemData, index, handleForm }) {
  return (
    <div key={index} className={styles.containerTexte}>
      <div key={index} className={styles.container}>
        <div className={styles.apparition}>
          <Image
            src={require(`../../${itemData[index].urlSvg}`).default}
            width={itemData[index].width}
            height={itemData[index].height}
            alt={itemData[index].altSvg}
            className={styles.apparitionImage}
          />{" "}
          <h2
            className={`${styles.apparitionTitre}`}
            style={{ fontSize: "2.8rem" }}
          >
            {itemData[index].title}
          </h2>
        </div>
        <p
          className={`${styles.apparitionTexte}`}
          style={{ fontSize: "1.8rem" }}
        >
          {itemData[index].description}
        </p>
        <TexteButton
          handleForm={handleForm}
          itemData={itemData}
          index={index}
        />
      </div>
    </div>
  );
}

export default Texte;
