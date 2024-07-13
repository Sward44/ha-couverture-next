"use client";
import { Star, StarUnDemi } from "@/components/logo/Logo";

export default function CardAvisUseClients({ itemData, count }) {
  function getStarType(item, i) {
    if (i < item - 0.5) {
      return "full";
    } else if (item > i && item < i + 1) {
      return "half";
    } else {
      return "empty";
    }
  }

  return (
    <div className="relative lg:mx-20 sm:mx-8 mx-4">
      <div className="bg-neutral-100 mb-4 py-4 px-6 md:w-[720px] min-h-[330px] md:min-h-[252px] w-full rounded-lg shadow-ha overflow-hidden">
        <div className="absolute top-0 left-0 bg-supernova-500" style={{ width: `${count}%`, height: "1px" }} />
        <div className="flex justify-between">
          <div className="font-bold text-lg mb-4 mr-4">{itemData.title}</div>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => {
              const starType = getStarType(itemData.note, i);
              return (
                <span
                  key={i}
                  className={`size-4 mr-1 ${starType === "full" ? "fill-supernova-500" : "fill-neutral-500"}`}
                >
                  {starType === "full" && <Star />}
                  {starType === "half" && <StarUnDemi />}
                  {starType === "empty" && <Star />}
                </span>
              );
            })}
          </div>
        </div>
        <div className="mb-4">{itemData.description}</div>
        <div className="text-right text-xs">
          {itemData.firstName && itemData.lastName ? (
            <>
              Par {itemData.firstName} {itemData.lastName}
              {itemData.date ? <>, le {itemData.date}</> : ""}
              {itemData.adresse ? <> à {itemData.adresse}</> : ""}
            </>
          ) : (
            <>
              {itemData.date ? <>Le {itemData.date}</> : ""}
              {itemData.adresse ? <> à {itemData.adresse}</> : ""}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

{/* <div className="bg-neutral-100 mb-4 py-4 px-6 md:w-[720px] min-h-[330px] md:min-h-[252px] w-full rounded-lg shadow-ha overflow-hidden"></div> */}