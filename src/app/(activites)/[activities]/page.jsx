"use server";
import { connectMongoose } from "@/utils/mongodb";
import {
  PageModel,
  SousPageModel,
  MetaModel,
  AvisClientModel,
  AddressModel,
  BlogModel,
} from "@/models";
import {
  getEnvVarForActivity,
  getEnvVarForBlog,
} from "@/app/(activites)/layout";
import AvisGlobal from "@/components/main/avis-clients/AvisGlobal";
import EnteteAvisClient from "@/components/main/avis-clients/EnteteAvisClient";
import { Transition } from "@/components/main/avis-clients/Transition";
import HeaderMain from "@/components/main/header/HeaderMain";
import Activites from "@/components/main/activites/Activites";
import Connexion from "@/components/main/connexion/Connexion";
import Inscription from "@/components/main/inscription/Inscription";
import MotDePasseInitialisation from "@/components/form/MotDePasseInitialisation";
import AvisClient from "@/components/main/avis-clients/AvisClient";
import { ProfileUser } from "@/components/main/user/ProfileUser";
import { CardBlogPage } from "@/components/main/blog/CardBlog";
import { formatDate } from "@/app/api/devis/route";

export async function generateMetadata({ params }) {
  let { activities } = params;
  if (
    activities === "travaux-divers" ||
    activities === "avis-clients" ||
    activities === "mot-de-passe-oublie"
  )
    activities = activities.slice(0, activities.indexOf("-"));
  const metaId = await getEnvVarForActivity(activities, "meta");

  await connectMongoose();
  const data = await MetaModel.findOne({
    _id: metaId,
  })
    .lean()
    .exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.url}`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

export default async function activitesPage({ params }) {
  let { activities } = params;
  if (
    activities === "travaux-divers" ||
    activities === "avis-clients" ||
    activities === "mot-de-passe-oublie"
  )
    activities = activities.slice(0, activities.indexOf("-"));
  const pageId = await getEnvVarForActivity(activities, "page");
  await connectMongoose();
  const Data = await PageModel.findOne({
    _id: pageId,
  })
    .lean()
    .exec();
  const DataPage = await SousPageModel.find({
    _pageId: pageId,
  })
    .sort({ index: 1 })
    .lean()
    .exec();

  const itemsData = {
    id: Data._id,
    title: Data.title,
    description: DataPage,
    urlWebp: Data.urlWebp,
    position: Data.position,
    altWebp: Data.altWebp,
    urlSvg: Data.urlSvg,
    altSvg: Data.altSvg,
    width: Data.width,
    height: Data.height,
  };

  const itemDataCouverture = JSON.parse(JSON.stringify(itemsData));
  if (
    activities === "couverture" ||
    activities === "zinguerie" ||
    activities === "nettoyage" ||
    activities === "isolation" ||
    activities === "charpente" ||
    activities === "travaux"
  ) {
    const data = await AvisClientModel.find()
      .sort({ note: -1, date_review: -1 })
      .populate("userId")
      .exec();

    const NoteGlobal = (
      data.reduce((acc, item) => (acc += item.note), 0) / data.length
    ).toFixed(2);
    const Note = Math.floor(Number(NoteGlobal) * 10) / 10;
    const NoteEntiere = Number(NoteGlobal[0]);
    const NoteDecimal = Number(NoteGlobal.slice(2, NoteGlobal.length + 1));
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

    const itemDataAvisClient = dataAddresses
      .filter((item, index) => index < 5)
      .map((item) => {
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
      <>
        <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
          <HeaderMain itemDataCouverture={itemDataCouverture} />
          <Activites itemDataCouverture={itemDataCouverture} />
        </div>
        <div className="relative top-[72px] flex flex-col items-center justify-center md:top-[81px]">
          <div className="flex w-full justify-center px-4 sm:px-8">
            <AvisGlobal
              Note={Note}
              NoteEntiere={NoteEntiere}
              NoteDecimal={NoteDecimal}
              NoteAvis={NoteAvis}
            />
          </div>
          <div className="flex flex-col items-center">
            <EnteteAvisClient />
            <Transition item={itemDataAvisClient} />
          </div>
        </div>
      </>
    );
  } else if (activities === "avis") {
    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <AvisClient />
      </div>
    );
  } else if (activities === "connexion") {
    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <Connexion itemDataCouverture={itemDataCouverture} />
      </div>
    );
  } else if (activities === "inscription") {
    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <Inscription />
      </div>
    );
  } else if (activities === "mot") {
    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <MotDePasseInitialisation />
      </div>
    );
  } else if (activities === "user") {
    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <ProfileUser />
      </div>
    );
  } else if (activities === "blog") {
    await connectMongoose();
    const Data = await BlogModel.find().sort({ updatedAt: -1 }).lean().exec();

    const itemsData = Data.map((Data) => ({
      id: Data._id,
      title: Data.title,
      description: Data.description,
      urlWebp: Data.urlWebp,
      altWebp: Data.altWebp,
      createdAt: formatDate(new Date(Data.createdAt) / 1000),
      url: Data.url,
    }));

    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <CardBlogPage itemsData={itemsData} />
      </div>
    );
  }
}
