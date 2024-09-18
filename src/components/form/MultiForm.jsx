'use server';
import Image from "next/image";
import { Inscription, Login, User } from "@/components/logo/Logo";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormDevisOne } from "@/components/form/FormDevisOne";
import { FormDevisTwo } from "@/components/form/FormDevisTwo";
import { FormDevisThree } from "@/components/form/FormDevisThree";
import Link from "next/link";

export async function MultiForm({  devis, imagesDevis, session }) {
  const comments = devis?.comments;
  const address = {comments, ...devis}

  return (
    <>
    <div className="flex justify-between">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl ">Votre projet</h2>
          {session?.user?.image ? (
            <div className="relative size-10 ml-1 mr-2">
            <Image
              src={session.user.image}
              alt={session?.user?.name}
              fill
              className="rounded-xl"  
            />
            </div>
          ) : (
            <div className="flex">
            <Link href="/connexion" aria-label="Lien vers la page de connexion des utilisateurs">
            <span className="flex group justify-center items-center bg-neutral-300 rounded-xl size-10 hover:scale-105 hover:bg-supernova-500 transition-all duration-300 hover:md:shadow-ha mr-2">
              <span className="flex size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                <Login />
              </span>
            </span>
          </Link>
          <Link href="/connexion" aria-label="Lien vers la page de connexion des utilisateurs">
          <span className="flex group justify-center items-center bg-neutral-300 rounded-xl size-10 hover:scale-105 hover:bg-supernova-500 transition-all duration-300 hover:md:shadow-ha">
            <span className="flex size-6 fill-neutral-950 group-hover:fill-mahogany-950">
              <Inscription />
            </span>
          </span>
        </Link>
        </div>
          )}
        </div>
        
        <div className="h-[640px] w-full">
        <FormWrapper>
          <FormDevisOne devis={comments} />
          <FormDevisTwo  imagesDevis={imagesDevis} /> 
          <FormDevisThree  devis={address} session={session}/>
        </FormWrapper>
        </div>
  
  
  </>
  );
}