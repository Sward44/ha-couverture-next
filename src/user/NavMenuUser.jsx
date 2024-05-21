"use client";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavMenuUser = () => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const ref = useRef(null);
  const { data: session, status } = useSession();
  const handleShowMenuUser = (e) => {
    e.stopPropagation();
    setShowMenuUser(!showMenuUser);
  };
  return (
    <div
      className=""
      onMouseEnter={handleShowMenuUser}
      onMouseLeave={handleShowMenuUser}
    >
      <button className="">
        {session?.user?.image ? (
          <Image src={session.user.image} alt={session?.user?.name} fill />
        ) : (
          <FontAwesomeIcon icon={faUser} size="2x" />
        )}
      </button>
      <CSSTransition
        nodeRef={ref}
        in={showMenuUser}
        timeout={{ enter: 400, exit: 400 }}
        unmountOnExit
        classNames=""
      >
        <div ref={ref} className="">
          <ul>
            <li style={{ padding: "10px 20px" }}>
              <div className="">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session?.user?.name}
                    width={32}
                    height={32}
                    style={{ marginRight: "0.5rem", borderRadius: "50%" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    alt="User Image"
                    color="#000000"
                    style={{ marginRight: "1rem" }}
                  />
                )}
                <div className="">
                  <p className="">
                    {session?.user?.name ? session.user.name : "Utilisateur"}
                  </p>
                  <p className="">{session.user.email}</p>
                  <p className="">{session.user.role}</p>
                </div>
              </div>
            </li>
            <li style={{ padding: "0 20px 10px" }}>
              <Link href="/couverture" className="">
                <FontAwesomeIcon
                  icon={faUserGear}
                  color="#000000"
                  style={{ marginRight: "0.5rem" }}
                />
                Paramètres
              </Link>
            </li>
            <li style={{ padding: "0 20px 10px" }}>
              <span onClick={() => signOut()} className="">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color="#000000"
                  style={{ marginRight: "0.5rem" }}
                />
                Deconnexion
              </span>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NavMenuUser;
