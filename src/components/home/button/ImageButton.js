import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "./ImageButton.module.scss";

function ImageButton({
  itemData,
  index,
  handleNext,
  handlePrev,
  handleEveryImage,
}) {
  return (
    <>
      <>
        <button onClick={handleNext} className={styles.buttonGauche}>
          <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
        </button>
        <button onClick={handlePrev} className={styles.buttonDroite}>
          <FontAwesomeIcon icon={faAngleRight} size="2xl" />
        </button>
      </>

      <div className={`${styles.containeurButtonIcon} dFlex justify-around`}>
        {itemData.map((i, indexButton) => (
          <button
            key={indexButton}
            onClick={() => handleEveryImage(indexButton)}
            className={`mx-10 ${index === indexButton && styles.shining}`}
          >
            <Image src={require(`../../${i.urlSvg}`)} />
          </button>
        ))}
      </div>
    </>
  );
}

export default ImageButton;
