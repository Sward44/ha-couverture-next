"use server";
import { connect } from "@/utils/mongodb";
import { PageModel, SousPageModel, MetaModel } from "@/models";
import { getEnvVarForActivity } from "@/app/(activites)/layout";
import HeaderMain from "@/components/main/header/HeaderMain";
import Activites from "@/components/main/activites/Activites";
import Connexion from "@/components/main/connexion/Connexion";
import Inscription from "@/components/main/inscription/Inscription";
import MotDePasseInitialisation from "@/components/form/MotDePasseInitialisation";
import AvisClient from "@/components/main/avis-clients/AvisClient";

export async function generateMetadata({ params }) {
  let { activities } = params;
  if ( activities === "travaux-divers" || activities === "avis-clients" || activities === "mot-de-passe-oublie") activities = activities.slice(0, activities.indexOf('-'));
  const metaId = await getEnvVarForActivity(activities, "meta");

  await connect();
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

export default async function activitesPage({params}) {
  let { activities } = params;
  if ( activities === "travaux-divers" || activities === "avis-clients" || activities === "mot-de-passe-oublie") activities = activities.slice(0, activities.indexOf('-'));
  const pageId = await getEnvVarForActivity(activities, "page");
  await connect();
  const Data = await PageModel.findOne({
    _id: pageId,
  })
    .lean()
    .exec();
  const DataPage = await SousPageModel.find({
    _pageId: pageId,
  })
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
  if (activities === "couverture" || activities === "zinguerie" || activities === "nettoyage" || activities === "isolation" || activities === "charpente" || activities === "travaux") {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <Activites itemDataCouverture={itemDataCouverture} />
      </div>
    );
  } else if (activities === "avis") {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <AvisClient />
      </div>
    );
  } else if (activities === "connexion") {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <Connexion itemDataCouverture={itemDataCouverture} />
      </div>
    );
  } else if (activities === "inscription"){
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
      <HeaderMain itemDataCouverture={itemDataCouverture} />
      <Inscription />
    </div>
    );
  } else if (activities === "mot") {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <HeaderMain itemDataCouverture={itemDataCouverture} />
        <MotDePasseInitialisation />
      </div>
    )
  } else if (activities === "user") {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
      <HeaderMain itemDataCouverture={itemDataCouverture} />
    </div>
    )
  }
}