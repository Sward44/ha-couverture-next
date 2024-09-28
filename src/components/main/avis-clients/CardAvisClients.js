"use server";
import { Star, StarUnDemi } from "@/components/logo/Logo";

export default async function CardAvisClients({ itemData }) {
  function getStarType(item, index) {
    if (index < item - 0.5) {
      return "full";
    } else if (item > index && item < index + 1) {
      return "half";
    } else {
      return "empty";
    }
  }

  return (
    <>
      {itemData.map((item) => (
        <div key={item.id} className="my-4 w-full md:w-auto">
          <div className="w-full rounded-lg bg-neutral-100 px-6  py-4 shadow-ha md:w-[720px]">
            <div className="flex items-center justify-between">
              <div className="mb-4 mr-4 text-lg font-bold">{item.title}</div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, index) => {
                  const starType = getStarType(item.note, index);
                  return (
                    <span
                      key={index}
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
            <div className="mb-4">{item.description}</div>
            <div className="text-right text-xs">
              {item.firstName && item.lastName ? (
                <>
                  Par {item.firstName} {item.lastName}
                  {item.date ? <>, le {item.date}</> : ""}
                  {item.adresse ? <> à {item.adresse}</> : ""}
                </>
              ) : (
                <>
                  {item.date ? <>Le {item.date}</> : ""}
                  {item.adresse ? <> à {item.adresse}</> : ""}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
