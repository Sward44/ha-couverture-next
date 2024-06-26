"use server"; 
import { RedirectionActivationEmail } from "@/lib/RedirectionReact";
import { redirect } from "next/navigation";
import { UserModel } from "@/models";
import { verifyJwt } from "@/utils/jwt"
import { connect } from "@/utils/mongodb";

export default async function activitionPage({params}) {
  const jwtUserId = verifyJwt(params.jwt)
  await connect();
  const dataUser = jwtUserId ? await UserModel.findOne({ _id: jwtUserId.id,}).lean().exec() : null;
  if (!jwtUserId) {
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8"> Votre url n&#39;est pas valide !</h1>
          <RedirectionActivationEmail timer={3000} url={"/inscription"} /> 
        </div>
      </div>
    )
  } else if(jwtUserId  && jwtUserId.exp > Date.now()/1000 && dataUser?.emailVerified === null) {
    await UserModel.findOneAndUpdate(
      { _id: jwtUserId.id },
      { emailVerified: Date.now() },
      { upsert: true}
    )
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8">Votre email est validé et enregistré !</h1>
          <RedirectionActivationEmail timer={3000} url={"/connexion"} />
        </div>
      </div>
    )
  } else if (jwtUserId && jwtUserId.exp > Date.now()/1000 && dataUser?.emailVerified !== null) {
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8">Votre email est déjà vérifié !</h1>
          <RedirectionActivationEmail timer={3000} url={"/connexion"} />
        </div>
      </div>
    )
  } else if (jwtUserId && jwtUserId.exp < Date.now()/1000) {
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8">Votre url n'est plus valable</h1>
          <RedirectionActivationEmail timer={3000} url={"/connexion"} />
        </div>
      </div>
    )
  } else {
    return redirect("/connexion")
  }

  
}