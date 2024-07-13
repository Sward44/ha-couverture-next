"server only";
import { connect } from "@/utils/mongodb";
import { HomePageModel, AvisClientModel, AddressModel } from "@/models";
import ComponentsHomePage from "@/components/home/HomePage";
import Footer from "@/components/footer/Footer";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import { Transition } from "@/components/main/avis-clients/Transition";
import EnteteAvisClient from "@/components/main/avis-clients/EnteteAvisClient";

export default async function Home() {
  await connect();
  const itemsData = await HomePageModel.find().lean().exec();
  const itemData = JSON.parse(JSON.stringify(itemsData));

  const data = await AvisClientModel.find()
    .sort({ note:-1, date_review: -1 })
    .populate("userId")
    .exec();

    const NoteGlobal = (data.reduce((acc, item) => acc += item.note, 0) / data.length).toFixed(2);
    const Note = (Math.floor(Number(NoteGlobal)*10)/10);
    const NoteEntiere = Number(NoteGlobal[0]);
    const NoteDecimal = Number(NoteGlobal.slice(2,NoteGlobal.length + 1));
    const NoteAvis = data.length;

  const dataAddresses = await Promise.all(
    data.map(async (item) => {
      const address = await AddressModel.findOne({ userId: item.userId });
      return {
        ...item.toObject(),
        address: address ? address.toObject() : null,
      };
    })
  );

  const itemDataAvisClient = dataAddresses.filter((item, index) => index < 5).map((item) => {
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
  console.log(itemDataAvisClient.length - 1 )

  return (
    <>
      <div className="relative flex flex-col min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <ComponentsHomePage itemData={itemData} />
      </div>
      <div className="relative flex flex-col justify-center items-center top-[72px] md:top-[81px]">
        <div className="flex w-full px-4 sm:px-8 justify-center">
          <AvisGlobal Note={Note} NoteEntiere={NoteEntiere} NoteDecimal={NoteDecimal} NoteAvis={NoteAvis} />
        </div>
        <div className="flex flex-col items-center">
          <EnteteAvisClient />
          <Transition item={itemDataAvisClient} />
        </div>
      </div>
      <Footer />
   </>
   );
}
