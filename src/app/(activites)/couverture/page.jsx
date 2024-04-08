import connect from "@/utils/mongodb";
import Meta from "@/models/meta";
import Page from "@/models/page";
import SousPage from "@/models/sousPage";
import PageCouverture from "@/components/main/PageAnnexes";
import styles from "@/app/(activites)/activites.module.scss";

export const generateMetadata = async () => {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_COUV }).exec();
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
};

export default async function couverturePage() {
  await connect();
  const Data = await Page.findOne({
    _id: process.env.PAGE_ID_COUV,
  })
    .lean()
    .exec();
  const DataPage = await SousPage.find({
    _pageId: process.env.PAGE_ID_COUV,
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
    <div className={styles.container}>
      <PageCouverture itemDataCouverture={itemDataCouverture} />
    </div>
  );
}
