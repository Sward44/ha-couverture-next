import Link from "next/link";
import { Plus } from "@/components/logo/Logo";


function TexteButton({ itemData, index }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-32 sm:translate-y-24 sm:bottom-1/3 md:bottom-1/2 z-20">
      <Link href={itemData[index].url} aria-label={itemData[index].arialLabelLink} >
        <span
          className="group flex justify-center items-center mt-6 mb-4 apparitionButton "
        >
          <span className="self-center size-4 mr-3 fill-neutral-100 md:group-hover:fill-supernova-500 md:group-hover:scale-110 transition duration-300">
            <Plus />
          </span>

          <p className="text-neutral-100 md:group-hover:text-supernova-500 md:group-hover:scale-101 transition duration-300">En savoir plus...</p>
        </span>
      </Link>
      <div className={`flex justify-center apparitionButton`}>
        <Link href="#encars_devis" scroll={true}>
          <button
            className=" bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark"
          >
            <h3>Demande de devis</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TexteButton;
