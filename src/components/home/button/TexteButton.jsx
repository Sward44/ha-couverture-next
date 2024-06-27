"only server";
import Link from "next/link";
import { Plus } from "@/components/logo/Logo";


function TexteButton({ handleForm, itemData, index }) {
  return (
    <>
      <Link href={itemData[index].url}>
        <span
          className="group flex justify-center items-center mt-6 mb-4 apparitionButton "
        >
          <span className="flex justify-center items-center size-4 mr-3 fill-neutral-100 md:group-hover:fill-supernova-500 md:group-hover:scale-110 transition duration-300">
            <Plus />
          </span>

          <p className="md:group-hover:text-supernova-500 md:group-hover:scale-101 transition duration-300">En savoir plus...</p>
        </span>
      </Link>
      <div className={`flex justify-center apparitionButton`}>
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
