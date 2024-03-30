import connect from "@/utils/mongodb";
import Meta from "@/models/meta";
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

function couverturePage() {
  return (
    <div className={styles.container}>
      <PageCouverture indexActivites={0} />
    </div>
  );
}

export default couverturePage;
