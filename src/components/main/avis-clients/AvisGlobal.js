"use client";
import { 
  Star, 
  StarTroisHuitieme, 
  StarUnQuart,
  StarUnDemi, 
  StarTroisQuart, 
  StarCinqHuitieme, 
  Trophy 
} from "@/components/logo/Logo";
import { useViewport } from "@/hooks/viewPort";
import Link from "next/link";


export default  function AvisGlobal({Note, NoteEntiere, NoteDecimal, NoteAvis}) {
  const { isMobile, isTablet } = useViewport();
  

  return (
    <div className="w-full md:w-auto mt-6 md:mt-12 mb-2 md:mb-6">
      <div className="bg-neutral-100 py-4 px-6 w-full md:w-[720px] rounded-lg shadow-ha">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-center">Note moyenne de Ha Couverture</h2>
        <p className="text-center text-sm mb-6">Découvrez tous les avis de nos clients</p>
        
          {isMobile || isTablet ? (
              <>
                <div className="flex justify-between max-w-[320px] mx-auto items-center mb-8">
                  <div className="flex flex-col items-center justify-center bg-supernova-500 p-6 rounded-full size-24 sm:size-32">
                    <span className="size-8 sm:size-10 fill-neutral-100"><Trophy /></span>
                    <span className="font-bold text-xs sm:text-sm text-neutral-100">{Note}/5</span>
                    <span className="font-bold text-xs sm:text-sm text-neutral-100">{NoteAvis} avis</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className=" text-sm md:text-lg mb-2 ">Note globale : <span className="text-lg md:text-xl font-bold">{Note}</span>/5</span>
                    <div className="flex justify-center sm:mb-none">
                      {[...Array(5)].map((_, index) => {
                          if (NoteEntiere > index) {
                            return (
                              <span
                                key={index}
                                className="size-6 md:size-8 mr-1 fill-supernova-500">
                                <Star />
                              </span>
                              );
                            } else if (NoteEntiere === index) {
                              if (NoteDecimal < (1/4*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarUnQuart />
                                  </span>
                                );
                              } else if (NoteDecimal < (3/8*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarTroisHuitieme/>
                                  </span>
                                );
                              } else if (NoteDecimal < (1/2*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarUnDemi />
                                  </span>
                                );
                              } else if (NoteDecimal < (5/8*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarCinqHuitieme />
                                  </span>
                                );
                              } else if (NoteDecimal < (3/4*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarTroisQuart />
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-supernova-500">
                                    <Star />
                                  </span>
                                );
                              }
                            } else {
                              return (
                                <span
                                  key={index}
                                  className="size-6 md:size-8 mr-1 fill-neutral-500">
                                  <Star />
                                </span>
                              );
                            }
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <Link href="#" className="bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
                    Ajouter votre avis
                  </Link>
                </div>
              </>
              ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col  items-center justify-center bg-supernova-500 p-6 rounded-full size-24 sm:size-32">
                    <span className="size-8 sm:size-10 fill-neutral-100"><Trophy /></span>
                    <span className="font-bold text-xs sm:text-sm text-neutral-100">{Note}/5</span>
                    <span className="font-bold text-xs sm:text-sm text-neutral-100">{NoteAvis} avis</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className=" text-sm md:text-lg mb-2 sm:mr-4">Note globale : <span className="text-lg md:text-xl font-bold">{Note}</span>/5</span>
                    <div className="flex justify-center mb-6 sm:mb-none">
                      {[...Array(5)].map((_, index) => {
                          if (Note > index) {
                            return (
                              <span
                                key={index}
                                className="size-6 md:size-8 mr-1 fill-supernova-500">
                                <Star />
                              </span>
                              );
                            } else if (Note === index) {
                              if (NoteDecimal < (1/4*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarUnQuart />
                                  </span>
                                );
                              } else if (NoteDecimal < (3/8*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarTroisHuitieme/>
                                  </span>
                                );
                              } else if (NoteDecimal < (1/2*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarUnDemi />
                                  </span>
                                );
                              } else if (NoteDecimal < (5/8*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarCinqHuitieme />
                                  </span>
                                );
                              } else if (NoteDecimal < (3/4*100)) {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-neutral-500">
                                    <StarTroisQuart />
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    key={index}
                                    className="size-6 md:size-8 mr-1 fill-supernova-500">
                                    <Star />
                                  </span>
                                );
                              }
                            } else {
                              return (
                                <span
                                  key={index}
                                  className="size-6 md:size-8 mr-1 fill-neutral-500">
                                  <Star />
                                </span>
                              );
                            }
                      })}
                    </div>
                  </div>
                <div className={`flex justify-center`}>
                  <Link href="#" className="bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha">
                    Ajouter votre avis
                  </Link>
                </div>
                </div>
              </>
            )
          }
      </div>
    </div>
  );
}
