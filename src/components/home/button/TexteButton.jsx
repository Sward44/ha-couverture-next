import Link from "next/link";
import { Plus } from "@/components/logo/Logo";

export default function TexteButton({ itemData, index }) {
  return (
    <div className="absolute bottom-1/2 left-1/2 z-20 -translate-x-1/2 translate-y-32 sm:bottom-1/3 sm:translate-y-24 md:bottom-1/2">
      <Link
        href={itemData[index].url}
        aria-label={itemData[index].arialLabelLink}
      >
        <span className="apparitionButton group mb-4 mt-6 flex items-center justify-center ">
          <span className="mr-3 size-4 self-center fill-neutral-100 transition duration-300 md:group-hover:scale-110 md:group-hover:fill-supernova-500">
            <Plus />
          </span>

          <p className="text-neutral-100 transition duration-300 md:group-hover:scale-101 md:group-hover:text-supernova-500">
            Plus de détails sur{" "}
            {itemData[index].title === "Réparation diverses"
              ? `les ${itemData[index].title.toLowerCase()}`
              : itemData[index].title === "Isolation"
              ? `l'${itemData[index].title.toLowerCase()}`
              : `la ${itemData[index].title.toLowerCase()}`}
            ...
          </p>
        </span>
      </Link>
      <div className={`apparitionButton flex justify-center`}>
        <Link href="#encars_devis" scroll={true}>
          <button className=" rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-haDark">
            <h3>Demande de devis</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}
