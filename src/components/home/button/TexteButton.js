import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./TexteButton.module.scss";

function TexteButton({ handleForm }) {
  return (
    <>
      <div className={styles.enSavoirPlus}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="lg"
          style={{ marginRight: "1rem" }}
        />
        <p>En savoir plus...</p>
      </div>
      <button onClick={handleForm} style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ padding: "0.5rem 1rem" }}>Demande de devis</h3>
      </button>
    </>
  );
}

export default TexteButton;
