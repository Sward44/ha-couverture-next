"use server";
import Conditions from "@/components/main/mentionslegales/Conditions";
import { itemDataConditionGenerales } from "@/components/dictonnaries/DataDiaporama";


export default async function ConditionGenerale() {
  return (
    <Conditions itemData={itemDataConditionGenerales} />
  );
}

