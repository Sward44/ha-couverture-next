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
    };
  }


  return  (
    <>
      {itemData.map((item) => (
        <div key={item.id} className="w-full md:w-auto my-4">
          <div className="bg-neutral-100 py-4 px-6 w-full  md:w-[720px] rounded-lg shadow-ha">
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg mb-4 mr-4">{item.title}</div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => {
                const starType =  getStarType(item.note, index);
                return (
                  <span
                    key={index}
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
  )
}