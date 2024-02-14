import connect from "../../../../Mongoose";
import Meta from "../../../../models/Meta";
import PageAnnexes from "@/components/main/PageAnnexes";
import styles from "../layout.module.scss";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_ZING }).exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}/zinguerie`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

function zingueriePage() {
  return (
    <div className={styles.container}>
      <PageAnnexes indexActivites={1} />
    </div>
  );
}

export default zingueriePage;
