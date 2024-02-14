import styles from "../layout.module.scss";
import connect from "../../../../Mongoose";
import Meta from "../../../../models/Meta";
import PageAnnexes from "@/components/main/PageAnnexes";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_NETT }).exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}/nettoyage`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

function nettoyagePage() {
  return (
    <div className={styles.container}>
      <PageAnnexes indexActivites={2} />
    </div>
  );
}

export default nettoyagePage;
