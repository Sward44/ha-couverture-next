"use server";
import Conditions from "@/components/main/mentionslegales/Conditions";
import { itemDataPolitiqueConfidentialite } from "@/components/dictonnaries/DataDiaporama";

export default async function MentionLegales() {
  return (

      <Conditions itemData={itemDataPolitiqueConfidentialite}/>
  );
}
