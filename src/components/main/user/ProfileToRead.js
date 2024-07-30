"use server"
import { Write } from "@/components/logo/Logo";

export async function ProfileToRead({session}) {
  return (
    <div className="my-8 md:m-8 grid grid-cols-[auto_1fr] grid-rows-3">
      <p className="mb-4 sm:mr-8 mr-1">Nom :</p>
      <p className=" font-bold">{session.user.name}</p>
      <p className="mb-4 sm:mr-8 mr-1">Email :</p>
      <p className=" font-bold">{session.user.email}</p>
      <p className="mb-4 sm:mr-8 mr-1">Téléphone :</p>
      <p className=" font-bold">{`0${session?.user?.phone.slice(3, session?.user?.phone.length + 1)}`}</p>
      {/* <div className="col-start-3 row-start-1 row-span-3 justify-self-end">
        <div className="size-10 fill-neutral-950">
          <Write />
        </div>
      </div> */}
    </div>
  );
}

