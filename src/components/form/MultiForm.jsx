"use client";
import { useSession } from "next-auth/react";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormDevisOne } from "@/components/form/FormDevisOne";
import { FormDevisTwo } from "@/components/form/FormDevisTwo";
import { FormDevisThree } from "@/components/form/FormDevisThree";

export function MultiForm({ handleForm, devis, imagesDevis }) {
  const { data: session, status } = useSession();

  return (
    <FormWrapper handleForm={handleForm} session={session} status={status} devis={devis}>
      <FormDevisOne session={session} status={status} devis={devis} />
      <FormDevisTwo  imagesDevis={imagesDevis} /> 
      <FormDevisThree handleForm={handleForm} devis={devis} />
    </FormWrapper>
  );
}