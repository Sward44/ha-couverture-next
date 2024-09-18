"use client";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {  signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Logout, Parametre, User } from "@/components/logo/Logo";
import styles from "@/components/header/nav/Nav.module.scss";


const NavMenuUser = ({session}) => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const ref = React.useRef(null);
  const handleShowMenuUser = (e) => {
    e.stopPropagation();
    setShowMenuUser(!showMenuUser);
  };
  
  return (
    <>
    <div
      onMouseEnter={handleShowMenuUser}
      onMouseLeave={handleShowMenuUser}
    >
      <button className="relative flex justify-center items-center bg-neutral-300 rounded-xl w-10 h-10 hover:scale-105 hover:bg-supernova-500 transition duration-300 hover:md:shadow-ha">
        {session?.user?.image ? (
          <Image src={session.user.image} alt={session?.user?.name} fill className="rounded-xl"/>
        ) : (
          <div className="size-6">
            <User />
          </div>
          
        )}
      </button>
    
      <CSSTransition
        nodeRef={ref}
        in={showMenuUser}
        timeout={{ enter: 300, exit: 300 }}
        unmountOnExit
        classNames={{
          enter: styles["enter"],
          enterActive: styles["enterActive"],
          enterDone: styles["enterDone"],
          exit: styles["exit"],
          exitActive: styles["exitActive"],
          exitDone: styles["exitDone"],
        }}
      >
        <div ref={ref} className="flex flex-col absolute top-[63px] right-1 rounded-xl bg-neutral-100 shadow-ha">
          <ul>
            <li className="group mx-2 px-2 mt-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
              <Link href="/user" className="flex items-center" aria-label="Lien vers la page de profile utilisateur">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session?.user?.name}
                    width={28}
                    height={28}
                    className="rounded-xl mr-2"
                  />
                ) : (
                  <span className="size-4 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                    <User />
                  </span>
                )}
                <span className="">
                  <p className="text-sm font-bold">
                    {session?.user?.name ? session.user.name : "Utilisateur"}
                  </p>
                  <p className="text-xs">{session.user.email}</p>
                </span>
              </Link>
            </li>
            <li className="group mx-2 px-2 mt-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
              <Link href="/couverture" className="flex items-center">
                <span className="size-4 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                  <Parametre />
                </span>
                <h2>Paramètres</h2>
              </Link>
            </li>
            <li onClick={() => signOut()} className="flex items-center group mx-2 px-2 my-2 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
              <span  className="size-4 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                <Logout />
              </span>
                <h2>Deconnexion</h2>
            </li>
          </ul>
        </div>
      </CSSTransition>
      </div>
    </>
  );
};

export default NavMenuUser;
