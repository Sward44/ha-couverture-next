"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AvisClients,
  Blog,
  Blogger,
  Charpente,
  Connexion,
  Couverture,
  Inscription,
  Isolation,
  LogoMobile,
  Logout,
  Nettoyage,
  Travaux,
  User,
  Zinguerie,
} from "@/components/logo/Logo";
import styles from "@/components/dashboard/header/HeaderDashBoard.module.scss";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { CSSTransition } from "react-transition-group";

export default function HeaderDashBoard({ session }) {
  const [burger, setBurger] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [login, setLogin] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const handleBurger = (e) => {
    e.preventDefault();
    setBurger(!burger);
  };

  return (
    <>
      <header
        className={` fixed z-30 flex w-full bg-neutral-100  px-4 shadow-ha transition-transform duration-300 lg:px-8 2xl:px-16 ${
          !visible && !burger ? styles.maskBarreNavigation : ""
        }`}
      >
        <div className="flex w-full items-center justify-between px-3 py-2">
          <Link
            href="/"
            className="size-14"
            aria-label="Lien vers la page d'accueil"
          >
            <LogoMobile />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between pr-4">
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
        </div>
        <div className="flex items-center justify-between pr-3 md:pr-0">
          {burger ? (
            <div
              onClick={handleBurger}
              className={`${styles.burger} ${styles.burgerActive} `}
            >
              <span></span>
            </div>
          ) : (
            <div onClick={handleBurger} className={`${styles.burger}`}>
              <span></span>
            </div>
          )}

          <CSSTransition
            nodeRef={ref}
            in={burger}
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
              className="fixed left-0 top-0 z-60 h-screen w-full bg-neutral-950 text-neutral-100 opacity-90"
            >
              <div className="text-bg-neutral-100 absolute top-1/4 flex h-screen w-full flex-col items-center sm:top-1/3 md:top-0 md:justify-center">
                <div className="flex min-w-48 items-center justify-between pb-4"></div>
                <ul className={`relative min-w-48 `}>
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <LogoMobile />
                        </span>
                        <h3 className="text-xl md:text-3xl">/</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/couverture"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Couverture />
                        </span>
                        <h3 className="text-xl md:text-3xl">/couverture</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/zinguerie"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Zinguerie />
                        </span>
                        <h3 className="text-xl md:text-3xl">/zinguerie</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/isolation"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Isolation />
                        </span>
                        <h3 className="text-xl md:text-3xl">/isolation</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/nettoyage"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Nettoyage />
                        </span>
                        <h3 className="text-xl md:text-3xl">/nettoyage</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/charpente"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Charpente />
                        </span>
                        <h3 className="text-xl md:text-3xl">/charpente</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/travaux-divers"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Travaux />
                        </span>
                        <h3 className="text-xl md:text-3xl">/travaux-divers</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/blog"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page blog global"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Blogger />
                        </span>
                        <h3 className="text-xl md:text-3xl">/blog</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/renovation-verenda-pouliguen"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de renovation de verenda au Pouliguen"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Blog />
                        </span>
                        <h3 className="text-xl md:text-3xl">
                          /renovation-verenda-pouliguen
                        </h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/reparation-toit-sautron"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de reparation de toit ardoise à Sautron"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Blog />
                        </span>
                        <h3 className="text-xl md:text-3xl">
                          /reparation-toit-sautron
                        </h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/avis-clients"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <AvisClients />
                        </span>
                        <h3 className="text-xl md:text-3xl">/avis-clients</h3>
                      </span>
                    </Link>

                    <Link
                      href="/dashboard/connexion"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Connexion />
                        </span>
                        <h3 className="text-xl md:text-3xl">/connexion</h3>
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/inscription"
                      onClick={() => setBurger(false)}
                      aria-label="Lien vers la page de présentation de l'activité de couverture"
                    >
                      <span className="flex pb-2">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Inscription />
                        </span>
                        <h3 className="text-xl md:text-3xl">/inscription</h3>
                      </span>
                    </Link>
                    <span
                      onClick={() => signOut()}
                      className=" pb-4 text-neutral-100"
                    >
                      <span className="flex items-center">
                        <span className="ml-4 mr-3 flex size-8 self-center fill-neutral-100 md:size-12">
                          <Logout />
                        </span>
                        <h3 className="text-xl md:text-3xl">Deconnexion</h3>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CSSTransition>
        </div>
      </header>
    </>
  );
}
