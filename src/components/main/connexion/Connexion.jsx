"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import EmailLogin from "@/EmailLogin/EmailLogin";
import GoogleLogin from "@/GoogleLogin/GoogleLogin";

function Connexion({ itemDataCouverture }) {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="">
        <Image
          src={require(`../../${itemDataCouverture.urlWebp}`).default}
          alt={itemDataCouverture.altWebp}
          fill={itemDataCouverture.position}
          style={{
            objectFit: "cover",
            objectPosition: `${itemDataCouverture.position}`,
          }}
        />
      </div>
      <div className="">
        <Image
          src={require(`../../${itemDataCouverture.urlSvg}`)}
          width={itemDataCouverture.width}
          height={itemDataCouverture.height}
          alt={itemDataCouverture.altSvg}
          style={{ padding: "auto 0", marginRight: "1rem" }}
        />
        <h1 className="">{itemDataCouverture.title}</h1>
      </div>
      <div className="">
        {status === "loading" && (
          <FontAwesomeIcon
            icon={faSpinner}
            spinPulse
            className=""
          />
        )}
        <div className="">
          <EmailLogin />
          <div
            className={`$""PiedPage} $""tton}`}
            style={{ margin: "8rem 0" }}
          >
            <hr style={{ width: "100%", margin: "0" }} />
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;OU&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <hr style={{ width: "100%", margin: "0" }} />
          </div>
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}

export default Connexion;
