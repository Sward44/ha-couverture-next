import { connect } from "@/utils/mongodb";
import { MetaModel, PageModel } from "@/models";
import HeaderMain from "@/components/main/header/HeaderMain";


export async function generateMetadata() {
  await connect();
  const data = await MetaModel.findOne({
    _id: process.env.META_ID_USER,
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

async function userPage() {

  await connect();
  const Data = await PageModel.findOne({
    _id: process.env.PAGE_ID_USER,
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
    <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
      <HeaderMain itemDataCouverture={itemDataCouverture} />
    </div>
  );
}

export default userPage;