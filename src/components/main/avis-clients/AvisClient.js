"use server";
import { connect } from "@/utils/mongodb";
import { AvisClientModel, AddressModel } from "@/models";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import { Star } from "@/components/logo/Logo";

export default async function AvisClient() {
  await connect();
  const data = await AvisClientModel.find()
    .sort({ date_review: -1 })
    .populate("userId")
    .exec();

  const dataAddresses = await Promise.all(
    data.map(async (item) => {
      const address = await AddressModel.findOne({ userId: item.userId });
      return {
        ...item.toObject(),
        address: address ? address.toObject() : null,
      };
    })
  );
  
  const NoteGlobal = (dataAddresses.reduce((acc, item) => acc += item.note, 0) / dataAddresses.length).toFixed(2);
  const Note = (Math.floor(Number(NoteGlobal)*10)/10);
  const NoteEntiere = Number(NoteGlobal[0]);
  const NoteDecimal = Number(NoteGlobal.slice(2,NoteGlobal.length + 1));
  const NoteAvis = dataAddresses.length;

  const itemData = dataAddresses.map((item) => {
    return {
      id: item._id.toString(),
      firstName: `${item.userId.firstName.slice(0, 1)}.`,
      lastName: item.userId.lastName,
      adresse: item.address ? item.address.ville : "",
      title: item.title,
      description: item.description,
      note: item.note,
      date: new Date(item.date_review).toLocaleDateString(),
    };
  });

  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <AvisGlobal Note={Note} NoteEntiere={NoteEntiere} NoteDecimal={NoteDecimal} NoteAvis={NoteAvis} />
      <h2 className="font-bold text-2xl text-center mt-6 sm:mt-8 mb-2">Avis de nos clients</h2>
      <hr className="w-32 border-neutral-300 mb-6 sm:mb-8" />
      {itemData.map((item) => (
        <div key={item.id} className="w-full md:w-auto my-4">
          <div className="bg-neutral-100 py-4 px-6 w-full md:w-[720px] rounded-lg shadow-ha">
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg mb-4 mr-4">{item.title}</div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => {
                  return (
                    <span
                      key={`${item.id}-star-${index}`}
                      className={`size-4 mr-1 ${
                        index >= item.note
                          ? "fill-neutral-500"
                          : "fill-supernova-500"
                      }`}
                    >
                      <Star />
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
    </div>
  );
}
