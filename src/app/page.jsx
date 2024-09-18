"server only";
import { cookies } from "next/headers";
import { connectMongoose } from "@/utils/mongodb";
import { HomePageModel, AvisClientModel, AddressModel, DevisModel, ImageModel, UserModel } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
// import handler from "@/app/api/google_reviews/route";
import ComponentsHomePage from "@/components/home/HomePage";
import Footer from "@/components/footer/Footer";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import { Transition } from "@/components/main/avis-clients/Transition";
import EnteteAvisClient from "@/components/main/avis-clients/EnteteAvisClient";
import { verifyJwt } from "@/utils/jwt";
import { MultiForm } from "@/components/form/MultiForm";


export default async function Home() {
  await connectMongoose();
  const session = await getServerSession(authOptions);
  let newUserComplet;
  if(session){
    newUserComplet = await UserModel.findOne({email: session.user.email}).exec(); 
  }
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
                    .exec()
  const savedImages = devisComplet === null ? [] :
    await ImageModel.find({ devisId: verifyJwt(devisCookie.value).devisId })
                    .exec();
  const savedAddress = devisComplet === null ? null :
    await AddressModel.findOne({ userId: newUserComplet._id })
                    .sort({ _id: -1 })
                    .exec();

  const imagesDevis = savedImages === null ? [] : 
  savedImages.map((item) => {
    return {
      pictureId: item.pictureId,
      size: item.size,
      type: item.type,
      name: item.name,
      preview: `${process.env.NEXT_PUBLIC_HOST}/uploads/${item.pictureId}${item.extension}`,
      lastModified: new Date(item.lastModified).getTime(),
    };
  });

  const devis = devisComplet === null ? null : {
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
      <div id="encars_devis" className="relative flex flex-col justify-center items-center top-[72px] md:top-[81px] px-4 py-8 sm:py-16">
        <div className="bg-neutral-100 md:w-[720px] py-4 px-4 sm:px-8 border border-neutral-300 shadow-ha rounded-lg ">
          <MultiForm session={session} devis={devis} imagesDevis={imagesDevis} />
        </div>
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
