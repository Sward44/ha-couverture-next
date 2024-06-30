"use server";
import { connect } from "@/utils/mongodb";
import { PageModel, SousPageModel, MetaModel } from "@/models";
import { getEnvVarForActivity } from "@/app/(activites)/layout";
import HeaderMain from "@/components/main/header/HeaderMain";
import Activites from "@/components/main/activites/Activites";

export async function generateMetadata({ params }) {
  let { activities } = params;
  if ( activities === "travaux-divers") activities = activities.slice(0, activities.lastIndexOf('-'));
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
  if ( activities === "travaux-divers") activities = activities.slice(0, activities.lastIndexOf('-'));
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
  return (
    <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
      <HeaderMain itemDataCouverture={itemDataCouverture} />
      <Activites itemDataCouverture={itemDataCouverture} />
    </div>
  );
}