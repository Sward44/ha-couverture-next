"use server";
import { RedirectionActivationEmail } from "@/lib/RedirectionReact";

export default async function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
      <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="text-5xl mb-8">Oups ! La page n'est pas trouvée !</h1>
      <RedirectionActivationEmail timer={3000} url={"/"} arialLabel={"Lien vers la page d'accueil si elle n'est pas trouvée"} />
      </div>
    </div>
  );
}

