"use server";
// import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import EmailLogin from "@/EmailLogin/EmailLogin";
import GoogleLogin from "@/GoogleLogin/GoogleLogin";

export default async function Connexion({ itemDataCouverture }) {
  // const { data: session, status } = useSession();

  return (
    <>
      <div className="flex flex-1 justify-center items-center h-[calc(100vh - 72px)] md:h-[calc(100vh - 81px)]">
        <div className="flex flex-col">
          <EmailLogin />
          <div
            className="flex items-center"
          >
            <hr className="w-full" />
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;OU&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <hr className="w-full" />
          </div>
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}