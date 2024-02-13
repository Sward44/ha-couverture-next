import styles from "../layout.module.scss";
import connect from "../../../../Mongoose";
import Meta from "../../../../models/Meta";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_TRAV }).exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}/travaux-divers`,
      images: {
        url: `${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

function travauxDiversPage() {
  return <div className={styles.container}></div>;
}

export default travauxDiversPage;
