"use client";
import { useViewport } from "@/hooks/viewPort";
import SvgMap from "@/components/logo/MappageLogo";
import { AngleLeft, AngleRight } from "@/components/logo/Logo";

function ImageButton({
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
            className=" z-10 absolute top-1/2  left-16"
            id="buttonGauche"
            aria-label="Button pour aller à l'image précédente"
          >
            <div className="fill-neutral-100 md:size-10 md:hover:fill-supernova-500 md:hover:scale-105 transition duration-300">
              <AngleLeft />
            </div>
          </button>
          <button
            onClick={handlePrev}
            className="z-10 absolute top-1/2 right-16"
            id="buttonDroite"
            aria-label="Button pour aller à l'image suivante"
          >
            <div className="fill-neutral-100 md:size-10 md:hover:fill-supernova-500 md:hover:scale-105 transition duration-300">
              <AngleRight />
            </div>
          </button>
        </>
      )}

      <div className="absolute md:bottom-16 bottom-6 right-1/2 z-10 flex translate-x-1/2">
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
              className={`mx-2 bg-neutral-300 rounded-lg md:hover:bg-supernova-500 md:hover:fill-mahogany-950 transition-all duration-300 md:hover:scale-105 md:hover:shadow-haDark ${
                index === indexButton && "bg-supernova-500 fill-mahogany-950"
              }`}
            >
              <div className="md:h-8 md:w-8 h-7 w-7">
                <SvgComponent />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default ImageButton;
