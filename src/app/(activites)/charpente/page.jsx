"server only";
import connect from "@/utils/mongodb";
import Page from "@/models/page";
import SousPage from "@/models/sousPage";
import Meta from "@/models/meta";
import PageAnnexes from "@/components/main/PageAnnexes";
import styles from "@/app/(activites)/activites.module.scss";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_CHAR }).exec();
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

export default async function charpentePage() {
  await connect();
  const Data = await Page.findOne({
    _id: process.env.PAGE_ID_CHAR,
  })
    .lean()
    .exec();
  const DataPage = await SousPage.find({
    _pageId: process.env.PAGE_ID_CHAR,
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
      <PageAnnexes itemDataCouverture={itemDataCouverture} />
    </div>
  );
}
