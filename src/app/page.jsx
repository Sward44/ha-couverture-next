"server only";
import { cookies } from "next/headers";
import { connectMongoose } from "@/utils/mongodb";
import { HomePageModel, AvisClientModel, AddressModel, DevisModel, ImageModel } from "@/models";
// import handler from "@/app/api/google_reviews/route";
import ComponentsHomePage from "@/components/home/HomePage";
import Footer from "@/components/footer/Footer";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import { Transition } from "@/components/main/avis-clients/Transition";
import EnteteAvisClient from "@/components/main/avis-clients/EnteteAvisClient";
import { verifyJwt } from "@/utils/jwt";

export default async function Home() {
  const cookieStore = cookies();
  const devisCookie = cookieStore.get("chiffrage") ||  null;
  // const googleReviews = await handler();
  // console.log(googleReviews);
    
  await connectMongoose();
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

  const devisComplet = devisCookie === null ? null : 
    await DevisModel.findOne({_id: verifyJwt(devisCookie.value).devisId})
                    .sort({ createdAt: -1 })
                    .populate("userId")
                    .exec()
  const savedImages = devisComplet === null ? [] :
    await ImageModel.find({ devisId: verifyJwt(devisCookie.value).devisId, userId: verifyJwt(devisCookie.value).userId })
                    .exec();
  const savedAddress = devisComplet === null ? null :
    await AddressModel.findOne({ userId: verifyJwt(devisCookie.value).userId })
                    .sort({ _id: -1 })
                    .exec();
  const imagesDevis = savedImages === null ? [] : 
  savedImages.map((item) => {
    return {
      pictureId: item.pictureId,
      size: item.size,
      type: item.type,
      name: item.name,
      preview: item.preview,
      lastModified: new Date(item.lastModified).getTime(),
    };
  });

  const devis = devisComplet === null ? null : {
    firstName: devisComplet.userId.firstName,
    lastName: devisComplet.userId.lastName,
    email: devisComplet.userId.email,
    phone: devisComplet.userId.phone,
    createdAt: devisComplet.createdAt,
    voie: savedAddress?.address || "",
    codePostal: savedAddress?.code_postal || "",
    ville: savedAddress?.ville || "",
    comments: devisComplet?.body || "",
  };   

  return (
    
    <>
      <div className="relative flex flex-col min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] min-w-full top-[72px] md:top-[81px]">
        <ComponentsHomePage itemData={itemData} devis={devis} imagesDevis={imagesDevis}/>
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
