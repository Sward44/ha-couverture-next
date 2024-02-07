import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./TexteButton.module.scss";

function TexteButton({ handleForm }) {
  return (
    <>
      <div
        className={`dFlex justifyContentCenter alignItemsCenter mb-20 ${styles.enSavoirPlus}`}
      >
        <FontAwesomeIcon icon={faCirclePlus} className="mr-10" />
        <p>En savoir plus...</p>
      </div>
      <button onClick={handleForm}>
        <h3>Demande de devis</h3>
      </button>
    </>
  );
}

export default TexteButton;
