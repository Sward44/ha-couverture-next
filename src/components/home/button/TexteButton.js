import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./TexteButton.module.scss";
import Link from "next/link";

function TexteButton({ handleForm, itemData, index }) {
  return (
    <>
      <Link href={itemData[index].url} className={styles.link}>
        <div className={styles.enSavoirPlus}>
          <FontAwesomeIcon
            icon={faCirclePlus}
            size="lg"
            style={{ marginRight: "1rem" }}
          />
          <p>En savoir plus...</p>
        </div>
      </Link>
      <button onClick={handleForm} style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ padding: "0.5rem 1rem" }}>Demande de devis</h3>
      </button>
    </>
  );
}

export default TexteButton;
