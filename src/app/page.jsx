"server only";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/authOptions";
import connect from "@/utils/mongodb";
import { HomePageModel } from "@/models";
import ComponentsHomePage from "@/components/home/HomePage";
import styles from "@/app/page.module.scss";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/signin?callbackUrl=/");
  // }

  await connect();
  const itemsData = await HomePageModel.find().exec();
  const itemData = JSON.parse(JSON.stringify(itemsData));
  return (
    <>
      <div className={styles.container}>
        <ComponentsHomePage itemData={itemData} />
      </div>
    </>
  );
}
