"server only";
import connect from "@/utils/mongodb";
import Homepage from "@/models/homepage";
import ComponentsHomePage from "@/components/home/HomePage";
import styles from "@/app/page.module.scss";

export default async function Home() {
  await connect();
  const itemsData = await Homepage.find().exec();
  const itemData = JSON.parse(JSON.stringify(itemsData));
  return (
    <>
      <div className={styles.container}>
        <ComponentsHomePage itemData={itemData} />
      </div>
    </>
  );
}
