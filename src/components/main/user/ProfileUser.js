"use server";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { ProfileToRead } from "@/components/main/user/ProfileToRead";

export async function ProfileUser() {
  const session = await getServerSession(authOptions);
  return (
    <div className="rouded-lg mx-4 mt-4 flex justify-center">
      <div className="flex w-full flex-col items-center rounded-lg bg-neutral-100 py-4 shadow-ha sm:px-6 md:w-[720px]">
        <div className="relative size-24">
          <Image
            src={session.user.image}
            alt={`Image du profile de ${session.user.name}`}
            fill
            className="rounded-full shadow-ha"
          />
        </div>
        <ProfileToRead session={session} />
      </div>
    </div>
  );
}
