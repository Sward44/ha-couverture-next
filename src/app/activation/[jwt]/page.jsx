"use server"; 
import { RedirectionActivationEmail } from "@/lib/redirectionReact";
import { redirect } from "next/navigation";
import { UserModel } from "@/models";
import { verifyJwt } from "@/utils/jwt"
import { connect } from "@/utils/mongodb";

export default async function activitionPage({params}) {
  const jwtUserId = verifyJwt(params.jwt)
  if (jwtUserId) {
    await connect();
    let dataUser = await UserModel.findOne({
      _id: jwtUserId.id,
    })
    .lean()
    .exec();
    }
  
  if (!jwtUserId) {
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8"> Votre url n'est pas valide !</h1>
          <RedirectionActivationEmail timer={3000} url={"inscription"} /> 
        </div>
      </div>
    )
  } else if(jwtUserId  && jwtUserId.exp < Date.now()/1000 && dataUser?.emailVerified === null) {
    dataUser = await UserModel.findOneAndUpdate(
      { _id: jwtUserId.id },
      { emailVerified: Date.now() },
      { upsert: true}
    )
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <h1 className="flex flex-1 justify-center items-center text-2xl sm:text-3xl md:text-5xl"> Votre email est enregistré !</h1>
        <RedirectionActivationEmail timer={3000} url={"connexion"} />
      </div>
    )
  } else if (jwtUserId && jwtUserId.exp < Date.now()/1000 && dataUser?.emailVerified !== null) {
    return(
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <h1 className="flex flex-1 justify-center items-center text-2xl sm:text-3xl md:text-5xl"> Votre email est déjà vérifié !</h1>
        <RedirectionActivationEmail timer={3000} url={"connexion"} />
      </div>
    )
  } else {
    return redirect("/connexion")
  }

  
}