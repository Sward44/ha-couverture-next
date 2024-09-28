"use client";
import { useViewport } from "@/hooks/viewPort";
import SvgMap from "@/components/logo/MappageLogo";
import { AngleLeft, AngleRight } from "@/components/logo/Logo";

export default function ImageButton({
  itemData,
  index,
  handleNext,
  handlePrev,
  handleEveryImage,
}) {
  const { isMobile, isTablet } = useViewport();

  return (
    <>
      {isMobile || isTablet ? null : (
        <>
          <button
            onClick={handleNext}
            className=" absolute left-16 top-1/2  z-10"
            id="buttonGauche"
            aria-label="Button pour aller à l'image précédente"
          >
            <div className="fill-neutral-100 transition duration-300 md:size-10 md:hover:scale-105 md:hover:fill-supernova-500">
              <AngleLeft />
            </div>
          </button>
          <button
            onClick={handlePrev}
            className="absolute right-16 top-1/2 z-10"
            id="buttonDroite"
            aria-label="Button pour aller à l'image suivante"
          >
            <div className="fill-neutral-100 transition duration-300 md:size-10 md:hover:scale-105 md:hover:fill-supernova-500">
              <AngleRight />
            </div>
          </button>
        </>
      )}

      <div className="absolute bottom-6 right-1/2 z-10 flex translate-x-1/2 md:bottom-16">
        {itemData.map((i, indexButton) => {
          let svgName = i.url.slice(i.url.lastIndexOf("/") + 1);
          if (svgName === "travaux-divers")
            svgName = svgName.slice(0, svgName.lastIndexOf("-"));

          const SvgComponent = SvgMap[svgName];

          if (!SvgComponent) return null;
          return (
            <button
              id={i.buttonId}
              aria-label={i.arialLabel}
              key={indexButton}
              onClick={() => handleEveryImage(indexButton)}
              className={`mx-2 rounded-lg bg-neutral-300 transition-all duration-300 md:hover:scale-105 md:hover:bg-supernova-500 md:hover:fill-mahogany-950 md:hover:shadow-haDark ${
                index === indexButton && "bg-supernova-500 fill-mahogany-950"
              }`}
            >
              <div className="h-7 w-7 md:h-8 md:w-8">
                <SvgComponent />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
