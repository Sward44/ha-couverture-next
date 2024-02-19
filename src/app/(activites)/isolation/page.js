import connect from "../../../../Mongoose";
import Meta from "../../../../models/Meta";
import PageAnnexes from "@/components/main/PageAnnexes";
import styles from "../activites.module.scss";

export const generateMetadata = async () => {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_ISOL }).exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}/isolation`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
};

function isolationPage() {
  return (
    <div className={styles.container}>
      <PageAnnexes indexActivites={3} />
    </div>
  );
}

export default isolationPage;
