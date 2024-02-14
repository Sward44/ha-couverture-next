import connect from "../../../../Mongoose";
import Meta from "../../../../models/Meta";
import styles from "../layout.module.scss";
import PageAnnexes from "@/components/main/PageAnnexes";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_CHAR }).exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}/charpente`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

function charpentePage() {
  return (
    <div className={styles.container}>
      <PageAnnexes indexActivites={4} />
    </div>
  );
}

export default charpentePage;
