"use client";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Logout, Parametre, User } from "@/components/logo/Logo";
import styles from "@/components/header/nav/Nav.module.scss";

export default function NavMenuUser({ session }) {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const ref = React.useRef(null);
  const handleShowMenuUser = (e) => {
    e.stopPropagation();
    setShowMenuUser(!showMenuUser);
  };

  return (
    <>
      <div onMouseEnter={handleShowMenuUser} onMouseLeave={handleShowMenuUser}>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-300 transition duration-300 hover:scale-105 hover:bg-supernova-500 hover:md:shadow-ha">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session?.user?.name}
              fill
              className="rounded-xl"
            />
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
          <div
            ref={ref}
            className="absolute right-1 top-[63px] flex flex-col rounded-xl bg-neutral-100 shadow-ha"
          >
            <ul>
              <li className="group mx-2 mb-1 mt-2 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                <Link
                  href="/user"
                  className="flex items-center"
                  aria-label="Lien vers la page de profile utilisateur"
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session?.user?.name}
                      width={28}
                      height={28}
                      className="mr-2 rounded-xl"
                    />
                  ) : (
                    <span className="mr-2 size-4 fill-neutral-950 group-hover:fill-mahogany-950">
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
              {session?.user?.role === "admin" && (
                <li className="group mx-2 mb-1 mt-2 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link href="/dashboard" className="flex items-center">
                    <span className="mr-2 size-4 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Parametre />
                    </span>
                    <h2>Paramètres</h2>
                  </Link>
                </li>
              )}

              <li
                onClick={() => signOut()}
                className="group mx-2 my-2 flex items-center rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950"
              >
                <span className="mr-2 size-4 fill-neutral-950 group-hover:fill-mahogany-950">
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
}
