import connect from "@/utils/mongodb";
import Meta from "@/models/meta";
import Page from "@/models/page";
import AvisClient from "@/components/main/avis-clients/AvisClient";
import styles from "@/app/avis-clients/avisClients.module.scss";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_AVIS }).exec();
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
  // await connect();
  // const itemsData = await Page.find().exec();
  // console.log(itemsData);
  // const itemData = JSON.parse(JSON.stringify(itemsData));
  // console.log(itemData);
  return (
    <div className={styles.container}>
      <AvisClient indexActivites={6} />
    </div>
  );
}

export default avisClients;
