"use server";
import { RedirectionActivationEmail } from "@/lib/RedirectionReact";

export default async function NotFoundPage() {
  return (
    <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-8 text-5xl">
          Oups ! La page n&#39;est pas trouvée !
        </h1>
        <RedirectionActivationEmail
          timer={3000}
          url={"/"}
          arialLabel={"Lien vers la page d'accueil si elle n'est pas trouvée"}
        />
      </div>
    </div>
  );
}
