"server only";
import connect from "@/utils/mongodb";
import { HomePageModel } from "@/models";
import ComponentsHomePage from "@/components/home/HomePage";

export default async function Home() {
  await connect();
  const itemsData = await HomePageModel.find().lean().exec();
  const itemData = JSON.parse(JSON.stringify(itemsData));
  return (
    <>
      <div className="relative min-h-screen w-full">
        <ComponentsHomePage itemData={itemData} />
      </div>
    </>
  );
}
