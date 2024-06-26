"use server"; 
import { redirect } from "next/navigation";
import { UserModel } from "@/models";
import { verifyJwt } from "@/utils/jwt"
import { connect } from "@/utils/mongodb";
import MotDePasseReinitialisation from "@/components/form/MotDePasseReinitialisation";
import { RedirectionActivationEmail } from "@/lib/RedirectionReact";

export default async function reinitialisationPage({params}) {
  const jwtUserId = verifyJwt(params.jwt)

  await connect();
  const data = jwtUserId ? await UserModel.findOne({ _id: jwtUserId.id}).lean().exec() : null;
  const dataUser = data.email.toString();


  if (!jwtUserId) {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-5xl mb-8"> Votre url n&#39;est pas valide !</h1>
          <RedirectionActivationEmail timer={3000} url={"/mot-de-passe-oublie"} /> 
        </div>
      </div>
    )
  } else if(jwtUserId  && jwtUserId.exp < Date.now()/1000) {
    return (
      <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
        <div className="flex flex-1 flex-col justify-center items-center">
        <h1 className="text-5xl mb-8"> Votre url n'est plus active</h1>
          <RedirectionActivationEmail timer={3000} url={"/mot-de-passe-oublie"} />
        </div>
      </div>
    )
  }
  return ( 
  <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
    <div className="flex flex-1 flex-col justify-center items-center">
      <MotDePasseReinitialisation dataUser={dataUser} />
    </div>
  </div>
)
  
}