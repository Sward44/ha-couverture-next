"use server";
import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth/next"; 
import Image from "next/image";
import { ProfileToRead } from "@/components/main/user/ProfileToRead";

export async function ProfileUser() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-center mt-4 mx-4 rouded-lg">
      <div className="flex flex-col items-center bg-neutral-100 py-4 sm:px-6 w-full md:w-[720px] rounded-lg shadow-ha">
        <div className="relative size-24">
          <Image src={session.user.image} alt={`Image du profile de ${session.user.name}`} fill className="rounded-full shadow-ha" />
        </div>
        <ProfileToRead session={session}/>

      </div> 
    </div>
  );
}