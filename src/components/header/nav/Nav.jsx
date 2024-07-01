"use client";
import React, { use, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavMenuUser from "@/user/NavMenuUser";
import {
  Charpente,
  Couverture,
  Isolation,
  Nettoyage,
  Travaux,
  Zinguerie,
  Phone,
  Login,
} from "@/components/logo/Logo";
import styles from "@/components/header/nav/Nav.module.scss";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();
  const ref = React.useRef(null);



  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div className="flex justify-end items-center text-lg">
        <div
          className="px-2 flex items-center my-1 py-[6px] bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
          onMouseEnter={handleShowMenu}
          onMouseLeave={handleShowMenu}
        >
          <h2 className="transition duration-300 hover:text-mahogany-950 hover:scale-105">
            Activités
          </h2>
          <CSSTransition
            nodeRef={ref}
            in={showMenu}
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
              className="flex flex-col absolute top-[62px] right-60 rounded-xl bg-neutral-100 shadow-ha"
            >
              <ul className="">
                <li className="group mx-2 px-2 mt-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/couverture" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité de couverture">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Couverture />
                    </span>
                    <h2>Couverture</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/zinguerie" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité de zinguerie">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Zinguerie />
                    </span>
                    <h2>Zinguerie</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/nettoyage" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité de nettoyage">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Nettoyage />
                    </span>
                    <h2>Nettoyage</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/isolation" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité d'isolation">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Isolation />
                    </span>
                    <h2>Isolation</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/charpente" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité de charpente">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Charpente />
                    </span>
                    <h2>Charpente</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-2 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition duration-300 hover:scale-105">
                  <Link href="/travaux-divers" className="flex items-center" aria-label="Lien vers la page de présentation de l'activité de travaux-divers">
                    <span className="size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Travaux />
                    </span>
                    <h2>Travaux-divers</h2>
                  </Link>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>
        <Link
          href="/avis-clients"
          className="px-2 flex items-center my-1 py-[6px]  bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
          aria-label="Lien vers la page de présentation des avis clients"
        >
          <h2 className=" hover:text-mahogany-950 transition duration-300 hover:scale-105">
            Avis clients
          </h2>
        </Link>
        <Link
          href="/blog"
          className="px-2 flex items-center my-1 py-[6px] mr-14  bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
          aria-label="Lien vers la page de présentation des blogs"
        >
          <h2 className=" hover:text-mahogany-950 transition duration-300 hover:scale-105">
            Blogs
          </h2>
        </Link>
        {session && session.user ? (
          <NavMenuUser session={session} status={status} />
        ) : (
          <Link href="/connexion" aria-label="Lien vers la page de connexion des utilisateurs">
            <span className="flex group justify-center items-center bg-neutral-300 rounded-xl w-10 h-10 hover:scale-105 hover:bg-supernova-500 transition-all duration-300 hover:md:shadow-ha">
              <span className="flex size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                <Login />
              </span>
            </span>
          </Link>
        )}
      </div>
        <Link href="tel:+33634266400"
              target="_blank " 
              rel="noopener noreferrer" 
              className="absolute group flex flex-nowrap flex-row justify-start items-center overflow-x-hidden top-[20px] md:right-16 lg:right-20 2xl:right-[112px] bg-neutral-300 rounded-xl pl-2 min-h-10 w-10 hover:justify-start hover:scale-105 transition-all duration-500 hover:w-44 whitespace-nowrap hover:bg-supernova-500 hover:text-mahogany-950 hover:md:shadow-ha "
              aria-label="Lien vers l'appel de la personne responsable">
            <span className="flex min-w-6 size-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
              <Phone />
            </span>
            <p className="mr-2">06 34 26 64 00</p>
        </Link>
    </div>
  );
}

export default Nav;
