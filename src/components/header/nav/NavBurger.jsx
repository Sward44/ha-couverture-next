"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Charpente,
  Couverture,
  Isolation,
  Nettoyage,
  Travaux,
  Zinguerie,
  AngleDown,
  Phone,
  Login,
  Activites,
  AvisClients,
  Blog,
  User,
  Inscription,
  Logout,
  Parametre,
} from "@/components/logo/Logo";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import styles from "@/components/header/nav/NavBurger.module.scss";
import { signOut } from "next-auth/react";

export default function NavBurger({ handleBurger, burger, session }) {
  const [accordion, setAccordion] = useState(false);
  const ref = useRef(null);

  return (
    <div className="flex justify-between text-xl">
      {burger ? (
        <div
          onClick={handleBurger}
          className={`${styles.burger} ${styles.burgerActive}`}
        >
          <span></span>
        </div>
      ) : (
        <div onClick={handleBurger} className={`${styles.burger}`}>
          <span></span>
        </div>
      )}

      <CSSTransition
        in={burger}
        nodeRef={ref}
        unmountOnExit
        timeout={500}
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
          <div className="text-bg-neutral-100 absolute top-1/4 flex h-screen w-full flex-col items-center sm:top-1/3">
            <div
              className="flex min-w-48 items-center justify-between pb-4"
              onClick={() => setAccordion(!accordion)}
            >
              <span className="flex items-center">
                <span className="mr-3 flex size-6 fill-neutral-100">
                  <Activites />
                </span>
                <h3 className="">Activités</h3>
              </span>
              <div
                className={`flex size-6 justify-center self-center fill-neutral-100 transition duration-300 ${
                  accordion ? "rotate-0" : "rotate-180"
                }`}
              >
                <AngleDown />
              </div>
            </div>
            <ul
              className={`relative min-w-48 ${
                accordion
                  ? "max-h-56 overflow-auto transition-all duration-300"
                  : "max-h-0 overflow-hidden transition-all duration-300"
              }`}
            >
              <li>
                <Link
                  href="/couverture"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité de couverture"
                >
                  <span className="flex pb-2">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Couverture />
                    </span>
                    <h3>Couverture</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/zinguerie"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité de zinguerie"
                >
                  <span className="flex pb-2">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Zinguerie />
                    </span>
                    <h3>Zinguerie</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/nettoyage"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité de nettoyage"
                >
                  <span className="flex pb-2">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Nettoyage />
                    </span>
                    <h3>Nettoyage</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/isolation"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité d'isolation"
                >
                  <span className="flex pb-2">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Isolation />
                    </span>
                    <h3>Isolation</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/charpente"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité de charpente"
                >
                  <span className="flex pb-2">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Charpente />
                    </span>
                    <h3>Charpente</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/travaux-divers"
                  onClick={() => setBurger(false)}
                  aria-label="Lien vers la page de présentation de l'activité des travaux-divers"
                >
                  <span className="flex pb-4">
                    <span className="ml-4 mr-3 flex h-7 w-7 self-center fill-neutral-100">
                      <Travaux />
                    </span>
                    <h3>Travaux-divers</h3>
                  </span>
                </Link>
              </li>
            </ul>
            <Link
              href="/avis-clients"
              onClick={() => setBurger(false)}
              className="min-w-48 pb-4 text-neutral-100"
              aria-label="Lien vers la page de présentation des avis clients"
            >
              <span className="flex  items-center">
                <span className="mr-3 flex size-6 fill-neutral-100">
                  <AvisClients />
                </span>
                <h3 className="">Avis clients</h3>
              </span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setBurger(false)}
              className="min-w-48 pb-4 text-neutral-100"
              aria-label="Lien vers la page de présentation de blogs"
            >
              <span className="flex  items-center">
                <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                  <Blog />
                </span>
                <h3 className="">Blogs</h3>
              </span>
            </Link>

            <Link
              href="tel:+33634266400"
              onClick={() => setBurger(false)}
              className="min-w-48 pb-4 text-neutral-100"
              aria-label="Lien vers le numéro de téléphone"
            >
              <span className="flex items-center">
                <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                  <Phone />
                </span>
                <h3 className="">06 34 26 64 00</h3>
              </span>
            </Link>
            {session?.user ? (
              <>
                <Link
                  href="#"
                  onClick={() => setBurger(false)}
                  className="min-w-48 pb-4 text-neutral-100"
                  aria-label="Lien vers la page de profil de l'utilisateur"
                >
                  <span className="flex size-6 w-full items-center ">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session?.user?.name}
                        width={28}
                        height={28}
                        className="mr-2 rounded-full"
                      />
                    ) : (
                      <span className="mr-2 fill-neutral-100">
                        <User />
                      </span>
                    )}
                    <h3>{session.user.name}</h3>
                  </span>
                </Link>
                {session?.user?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="flex min-w-48 items-center pb-4"
                  >
                    <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                      <Parametre />
                    </span>
                    <h3>Paramètres</h3>
                  </Link>
                )}
                <div
                  onClick={() => signOut()}
                  className="min-w-48 pb-4 text-neutral-100"
                >
                  <span className="flex items-center">
                    <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                      <Logout />
                    </span>
                    <h3 className="">Deconnexion</h3>
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  onClick={() => setBurger(false)}
                  className="min-w-48 pb-4 text-neutral-100"
                  aria-label="Lien vers la page de connexion des utilisateurs"
                >
                  <span className="flex items-center">
                    <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                      <Login />
                    </span>
                    <h3 className="">Connexion</h3>
                  </span>
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setBurger(false)}
                  className="min-w-48 text-neutral-100"
                  aria-label="Lien vers la page d'inscription des utilisateurs"
                >
                  <span className="flex items-center">
                    <span className="mr-3 flex size-6 justify-center fill-neutral-100">
                      <Inscription />
                    </span>
                    <h3 className="">Inscription</h3>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
