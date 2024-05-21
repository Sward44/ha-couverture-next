"use client";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession } from "next-auth/react";
// import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faRightToBracket,
  faUser,
  faA,
  faB,
  faC,
  faD,
  faE,
  faF,
  faG,
  faH,
  faI,
  faJ,
  faK,
  faL,
  faM,
  faN,
  faO,
  faP,
  faQ,
  faR,
  faS,
  faT,
  faU,
  faV,
  faW,
  faX,
  faY,
  faZ,
} from "@fortawesome/free-solid-svg-icons";
import NavMenuUser from "@/user/NavMenuUser";
import {
  Charpente,
  Couverture,
  Isolation,
  Nettoyage,
  Travaux,
  Zinguerie,
} from "@/components/logo/Logo";
import styles from "@/components/header/nav/Nav.module.scss";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const ref = useRef(null);
  const { data: session, status } = useSession();

  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div className="flex justify-end items-center text-lg">
        <div
          className="px-2 flex items-center my-1 py-[6px]  bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
          onMouseEnter={handleShowMenu}
          onMouseLeave={handleShowMenu}
        >
          <h2 className="transition-colors duration-300 hover:text-mahogany-950 ">
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
              className="flex flex-col absolute top-[60px] right-60 rounded-xl bg-neutral-100 shadow-ha"
            >
              <ul className="">
                <li className="group mx-2 px-2 mt-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/couverture" className="flex items-center">
                    <div className="h-6 w-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Couverture />
                    </div>
                    <h2>Couverture</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/zinguerie" className="flex items-center">
                    <div className="h-5 w-5 mr-3 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Zinguerie />
                    </div>
                    <h2>Zinguerie</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/nettoyage" className="flex items-center">
                    <div className="h-4 w-4 mr-4 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Nettoyage />
                    </div>
                    <h2>Nettoyage</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/isolation" className="flex items-center">
                    <div className="h-5 w-5 mr-3 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Isolation />
                    </div>
                    <h2>Isolation</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-1 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/charpente" className="flex items-center">
                    <div className="h-6 w-6 mr-2 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Charpente />
                    </div>
                    <h2>Charpente</h2>
                  </Link>
                </li>
                <li className="group mx-2 px-2 mb-2 py-1 hover:text-mahogany-950 bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300">
                  <Link href="/travaux-divers" className="flex items-center">
                    <div className="h-4 w-4 mr-4 fill-neutral-950 group-hover:fill-mahogany-950">
                      <Travaux />
                    </div>
                    <h2></h2>Travaux-divers
                  </Link>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>
        <Link
          href="/avis-clients"
          className="px-2 flex items-center my-1 py-[6px]  bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
        >
          <h2 className=" hover:text-mahogany-950 transition-colors duration-300">
            Avis clients
          </h2>
        </Link>
        <Link
          href="/blog"
          className="px-2 flex items-center my-1 py-[6px] mr-14  bg-neutral-100 hover:bg-neutral-300 rounded-lg transition-colors duration-300"
        >
          <h2 className=" hover:text-mahogany-950 transition-colors duration-300">
            Blogs
          </h2>
        </Link>
        {session ? (
          <NavMenuUser />
        ) : (
          <Link href="/signin">
            <div className="flex justify-center items-center bg-neutral-300 rounded-xl w-10 h-10 hover:scale-105 hover:bg-supernova-500 transition-all duration-300 hover:text-mahogany-950">
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="size-6"
                alt="Connexion au site"
              />
            </div>
          </Link>
        )}
      </div>
      <a href="tel:+33634266400" target="_blank " rel="noopener noreferrer">
        <div className="absolute flex justify-start items-center overflow-x-hidden top-[20px] md:right-16 lg:right-20 2xl:right-[112px] bg-neutral-300 rounded-xl pl-2 min-h-10 w-10 hover:justify-start hover:scale-105 transition-all duration-500 hover:w-44 flex-nowrap flex-row whitespace-nowrap hover:bg-supernova-500 hover:text-mahogany-950">
          <FontAwesomeIcon
            icon={faPhone}
            className="size-6 pr-4"
            alt="Téléphone imagée"
          />
          <p className="mr-2">06 34 26 64 00</p>
        </div>
      </a>
    </div>
  );
}

export default Nav;
