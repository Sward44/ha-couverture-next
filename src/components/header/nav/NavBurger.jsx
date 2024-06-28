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
  Logout
} from "@/components/logo/Logo";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import styles from "./NavBurger.module.scss";
import { useSession, signOut } from "next-auth/react";

function NavBurger({ handleBurger, burger }) {
  const [accordion, setAccordion] = useState(false);
  const {data: session, status} = useSession();
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
          className="fixed z-60 top-0 left-0 w-full h-screen bg-neutral-950 opacity-90 text-neutral-100"
        >
          <div className="flex flex-col w-full absolute h-screen top-1/4 sm:top-1/3 items-center text-bg-neutral-100"> 
            <div
              className="flex items-center min-w-48 pb-4 justify-between"
              onClick={() => setAccordion(!accordion)}
            >
              <span className="flex items-center">
                <span className="flex size-6 fill-neutral-100 mr-3">
                  <Activites />
                </span>
                  <h3 className="">Activités</h3>
              </span>
                <div className={`flex size-6 self-center justify-center transition duration-300 fill-neutral-100 ${accordion ? 'rotate-0' : 'rotate-180'}`} >
                  <AngleDown />
                </div>
            </div>
            <ul
              className={`relative min-w-48 ${
                accordion
                  ? "transition-all duration-300 max-h-56 overflow-auto"
                  : "transition-all duration-300 max-h-0 overflow-hidden"
              }`}
            >
              <li>
                <Link href="/couverture" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité de couverture">
                  <span className="flex pb-2">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
                      <Couverture />
                    </span>
                    <h3>Couverture</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/zinguerie" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité de zinguerie">
                  <span className="flex pb-2">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
                      <Zinguerie />
                    </span>
                    <h3>Zinguerie</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/nettoyage" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité de nettoyage">
                  <span className="flex pb-2">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
                      <Nettoyage />
                    </span>
                    <h3>Nettoyage</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/isolation" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité d'isolation">
                  <span className="flex pb-2">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
                      <Isolation />
                    </span>
                    <h3>Isolation</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/charpente" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité de charpente">
                  <span className="flex pb-2">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
                      <Charpente />
                    </span>
                    <h3>Charpente</h3>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/travaux-divers" onClick={() => setBurger(false)} aria-label="Lien vers la page de présentation de l'activité des travaux-divers">
                  <span className="flex pb-4">
                    <span className="flex self-center h-7 w-7 fill-neutral-100 mr-3 ml-4">
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
              className="text-neutral-100 min-w-48 pb-4"
              aria-label="Lien vers la page de présentation des avis clients"
            >
              <span className="flex  items-center">
                <span className="flex size-6 fill-neutral-100 mr-3">
                  <AvisClients />
                </span>
              <h3 className="">Avis clients</h3>
              </span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setBurger(false)}
              className="text-neutral-100 min-w-48 pb-4"
              aria-label="Lien vers la page de présentation de blogs"
            >
              <span className="flex  items-center">
                <span className="flex size-6 justify-center fill-neutral-100 mr-3">
                  <Blog />
                </span>
              <h3 className="">Blogs</h3>
              </span>
            </Link>

            <Link
              href="tel:+33634266400"
              onClick={() => setBurger(false)}
              className="text-neutral-100 min-w-48 pb-4"
              aria-label="Lien vers le numéro de téléphone"
            >
              <span className="flex items-center">
                <span className="flex size-6 justify-center fill-neutral-100 mr-3">
                  <Phone />
                </span>
              <h3 className="">06 34 26 64 00</h3>
              </span>
            </Link>
            {session && session.user ? (
              <>
                <Link 
                  href="#"
                  onClick={() => setBurger(false)}
                  className="text-neutral-100 min-w-48 pb-4"
                  aria-label="Lien vers la page de profil de l'utilisateur"
                  >
                    <span className="flex w-full items-center size-6 ">
                      {session?.user?.image ? (
                          <Image 
                          src={session.user.image} 
                          alt={session?.user?.name}
                          width={28}
                          height={28}
                          className="rounded-full mr-2"/>
                      ) : (
                          <span className="fill-neutral-100 mr-2">
                            <User />
                          </span>
                      )}
                      <h3>{session.user.name}</h3>
                    </span>
                </Link>
                <div onClick={() => signOut()} className="text-neutral-100 min-w-48 pb-4">
                  <span className="flex items-center">
                    <span className="flex size-6 justify-center fill-neutral-100 mr-3">
                      <Logout />
                    </span>
                  <h3 className="">Deconnexion</h3>
                  </span>
                </div>
              </>
            ):(
              <>
              <Link
                href="/connexion"
                onClick={() => setBurger(false)}
                className="text-neutral-100 min-w-48 pb-4"
                aria-label="Lien vers la page de connexion des utilisateurs"
              >
                <span className="flex items-center">
                  <span className="flex size-6 justify-center fill-neutral-100 mr-3">
                    <Login />
                  </span>
                <h3 className="">Connexion</h3>
                </span>
              </Link>
              <Link
                href="/inscription"
                onClick={() => setBurger(false)}
                className="text-neutral-100 min-w-48"
                aria-label="Lien vers la page d'inscription des utilisateurs"
              >
                <span className="flex items-center">
                  <span className="flex size-6 justify-center fill-neutral-100 mr-3">
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

export default NavBurger;
