"server only";
import connect from "@/utils/mongodb";
import homepage from "@/models/homepage";
import HomePage from "@/components/home/HomePage";
import styles from "@/app/page.module.scss";

export default async function Home() {
  connect();
  const item = await homepage.find().exec();
  const itemData = item.map((item) => item.toObject());
  return (
    <>
      <div className={styles.container}>
        <HomePage itemData={itemData} />
      </div>
    </>
  );
}
