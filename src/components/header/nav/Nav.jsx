"use client";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import NavMenuUser from "@/components/header/user/NavMenuUser";
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

export default function Nav({ session }) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = React.useRef(null);

  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div className="flex items-center justify-end text-lg">
        <div
          className="my-1 flex items-center rounded-lg bg-neutral-100 px-2 py-[6px] transition-colors duration-300 hover:bg-neutral-300"
          onMouseEnter={handleShowMenu}
          onMouseLeave={handleShowMenu}
        >
          <h2 className="transition duration-300 hover:scale-105 hover:text-mahogany-950">
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
              className="absolute right-60 top-[62px] flex flex-col rounded-xl bg-neutral-100 shadow-ha"
            >
              <ul className="">
                <li className="group mx-2 mb-1 mt-2 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/couverture"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité de couverture"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Couverture />
                    </span>
                    <h2>Couverture</h2>
                  </Link>
                </li>
                <li className="group mx-2 mb-1 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/zinguerie"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité de zinguerie"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Zinguerie />
                    </span>
                    <h2>Zinguerie</h2>
                  </Link>
                </li>
                <li className="group mx-2 mb-1 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/nettoyage"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité de nettoyage"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Nettoyage />
                    </span>
                    <h2>Nettoyage</h2>
                  </Link>
                </li>
                <li className="group mx-2 mb-1 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/isolation"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité d'isolation"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Isolation />
                    </span>
                    <h2>Isolation</h2>
                  </Link>
                </li>
                <li className="group mx-2 mb-1 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/charpente"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité de charpente"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Charpente />
                    </span>
                    <h2>Charpente</h2>
                  </Link>
                </li>
                <li className="group mx-2 mb-2 rounded-lg bg-neutral-100 px-2 py-1 transition duration-300 hover:scale-105 hover:bg-neutral-300 hover:text-mahogany-950">
                  <Link
                    href="/travaux-divers"
                    className="flex items-center"
                    aria-label="Lien vers la page de présentation de l'activité de travaux-divers"
                  >
                    <span className="mr-2 size-6 fill-neutral-950 group-hover:fill-mahogany-950">
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
          className="my-1 flex items-center rounded-lg bg-neutral-100  px-2 py-[6px] transition-colors duration-300 hover:bg-neutral-300"
          aria-label="Lien vers la page de présentation des avis clients"
        >
          <h2 className=" transition duration-300 hover:scale-105 hover:text-mahogany-950">
            Avis clients
          </h2>
        </Link>
        <Link
          href="/blog"
          className="my-1 mr-14 flex items-center rounded-lg bg-neutral-100  px-2 py-[6px] transition-colors duration-300 hover:bg-neutral-300"
          aria-label="Lien vers la page de présentation des blogs"
        >
          <h2 className=" transition duration-300 hover:scale-105 hover:text-mahogany-950">
            Blogs
          </h2>
        </Link>
        {session?.user ? (
          <NavMenuUser session={session} />
        ) : (
          <Link
            href="/connexion"
            aria-label="Lien vers la page de connexion des utilisateurs"
          >
            <span className="group flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-300 transition-all duration-300 hover:scale-105 hover:bg-supernova-500 hover:md:shadow-ha">
              <span className="flex size-6 fill-neutral-950 group-hover:fill-mahogany-950">
                <Login />
              </span>
            </span>
          </Link>
        )}
      </div>
      <Link
        href="tel:+33634266400"
        target="_blank "
        rel="noopener noreferrer"
        className="group absolute top-[20px] flex min-h-10 w-10 flex-row flex-nowrap items-center justify-start overflow-x-hidden whitespace-nowrap rounded-xl bg-neutral-300 pl-2 transition-all duration-500 hover:w-44 hover:scale-105 hover:justify-start hover:bg-supernova-500 hover:text-mahogany-950 md:right-16 hover:md:shadow-ha lg:right-20 2xl:right-[112px] "
        aria-label="Lien vers l'appel de la personne responsable"
      >
        <span className="mr-2 flex size-6 min-w-6 fill-neutral-950 group-hover:fill-mahogany-950">
          <Phone />
        </span>
        <p className="mr-2">06 34 26 64 00</p>
      </Link>
    </div>
  );
}
