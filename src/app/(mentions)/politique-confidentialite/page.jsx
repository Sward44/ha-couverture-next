"use server";
import Conditions from "@/components/main/mentionslegales/Conditions";
import { itemDataPolitiqueConfidentialite } from "@/components/dictonnaries/DataDiaporama";
import Footer from "@/components/footer/Footer";

export default async function MentionLegales() {
  return (
    <>
      <Conditions itemData={itemDataPolitiqueConfidentialite}/>
      <Footer />
    </>
  );
}
