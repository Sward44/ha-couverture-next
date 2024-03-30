import connect from "@/utils/mongodb";
import Meta from "@/models/meta";
// import Pages from "@/models/page";
import PageAnnexes from "@/components/main/PageAnnexes";
import styles from "@/app/(activites)/activites.module.scss";
// import { ObjectId } from "mongodb";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_ZING }).exec();

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

async function zingueriePage() {
  // await connect();
  // const id = process.env.NEXT_PUBLIC_PAGE_ID_ZING;
  // console.log("Transmission de la variable 'id' : ", id);
  // const response = await Pages.find({
  //   _id: new ObjectId("65f4c3e125d09d3973d9199e"),
  // }).exec();
  // // const response = await Pages.findById("id").exec();
  // console.log("Reponse de mongodb pour 'response' : ", response);

  // const items = response
  //   .filter(response._id === process.env.NEXT_PUBLIC_PAGE_ID_ZING)
  //   .map((item) => item.toObject());
  // console.log(items);
  return (
    <div className={styles.container}>
      <PageAnnexes indexActivites={1} />
    </div>
  );
}

export default zingueriePage;
