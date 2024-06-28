"use server";
import Conditions from "@/components/main/mentionslegales/Conditions";
import { itemDataConditionGenerales } from "@/components/dictonnaries/DataDiaporama";
import Footer from "@/components/footer/Footer";


export default async function ConditionGenerale() {
  return (
    <>
    <Conditions itemData={itemDataConditionGenerales} />
    <Footer />
    </>
  );
}

