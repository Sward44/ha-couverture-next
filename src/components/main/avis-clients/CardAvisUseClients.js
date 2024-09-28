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
    <div className="relative mx-4 sm:mx-8 lg:mx-20">
      <div className="mb-4 min-h-[330px] w-full overflow-hidden rounded-lg bg-neutral-100 px-6 py-4 shadow-ha md:min-h-[252px] md:w-[720px]">
        <div
          className="absolute left-0 top-0 bg-supernova-500"
          style={{ width: `${count}%`, height: "1px" }}
        />
        <div className="flex justify-between">
          <div className="mb-4 mr-4 text-lg font-bold">{itemData.title}</div>
          <div className="mb-4 flex">
            {[...Array(5)].map((_, i) => {
              const starType = getStarType(itemData.note, i);
              return (
                <span
                  key={i}
                  className={`mr-1 size-4 ${
                    starType === "full"
                      ? "fill-supernova-500"
                      : "fill-neutral-500"
                  }`}
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
