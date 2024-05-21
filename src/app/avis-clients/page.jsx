import connect from "@/utils/mongodb";
import { MetaModel, PageModel } from "@/models";
import HeaderMain from "@/components/main/header/HeaderMain";

export async function generateMetadata() {
  await connect();
  const data = await MetaModel.findOne({
    _id: process.env.META_ID_AVIS,
  }).exec();
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

async function avisClients() {
  await connect();
  const Data = await PageModel.findOne({
    _id: process.env.PAGE_ID_AVIS,
  })
    .lean()
    .exec();
  const itemsData = {
    id: Data._id,
    title: Data.title,
    // description: DataPage,
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
    <div className="flex flex-col w-full min-h-screen">
      <HeaderMain itemDataCouverture={itemDataCouverture} />
    </div>
  );
}

export default avisClients;
