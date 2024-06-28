"server only";
import {connect} from "@/utils/mongodb";
import { HomePageModel } from "@/models";
import ComponentsHomePage from "@/components/home/HomePage";
import Footer from "@/components/footer/Footer";

export default async function Home() {
  await connect();
  const itemsData = await HomePageModel.find().lean().exec();
  const itemData = JSON.parse(JSON.stringify(itemsData));
  return (
    <>
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <ComponentsHomePage itemData={itemData} />
      </div>
      <Footer />
    </>
  );
}
