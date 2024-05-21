"only server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "@/components/home/texte/Texte.module.scss";
import Link from "next/link";

function TexteButton({ handleForm, itemData, index }) {
  return (
    <>
      <Link href={itemData[index].url}>
        <div
          className={`flex justify-center items-center mt-6 mb-4 ${styles.apparitionButton}`}
        >
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faCirclePlus} className="size-4 mr-3" />
          </div>

          <p>En savoir plus...</p>
        </div>
      </Link>
      <div className={`flex justify-center ${styles.apparitionButton}`}>
        <button
          onClick={handleForm}
          className="bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark"
        >
          <h3>Demande de devis</h3>
        </button>
      </div>
    </>
  );
}

export default TexteButton;
