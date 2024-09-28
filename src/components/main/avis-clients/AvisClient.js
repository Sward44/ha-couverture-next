"use server";
import { connectMongoose } from "@/utils/mongodb";
import { AvisClientModel, AddressModel } from "@/models";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import EnteteAvisClient from "@/components/main/avis-clients/EnteteAvisClient";
import CardAvisClients from "@/components/main/avis-clients/CardAvisClients";

export default async function AvisClient() {
  await connectMongoose();
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

  const NoteGlobal = (
    dataAddresses.reduce((acc, item) => (acc += item.note), 0) /
    dataAddresses.length
  ).toFixed(2);
  const Note = Math.floor(Number(NoteGlobal) * 10) / 10;
  const NoteEntiere = Number(NoteGlobal[0]);
  const NoteDecimal = Number(NoteGlobal.slice(2, NoteGlobal.length + 1));
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
    <div className="flex w-full flex-col items-center justify-center px-4">
      <AvisGlobal
        Note={Note}
        NoteEntiere={NoteEntiere}
        NoteDecimal={NoteDecimal}
        NoteAvis={NoteAvis}
      />
      <EnteteAvisClient />
      <CardAvisClients itemData={itemData} />
    </div>
  );
}
