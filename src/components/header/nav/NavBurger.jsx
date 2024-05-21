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
} from "@/components/logo/Logo";
import { CSSTransition } from "react-transition-group";
import styles from "./NavBurger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function NavBurger({ handleBurger, burger }) {
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
          className="fixed z-60 top-0 left-0 w-full h-screen bg-neutral-950 opacity-90 text-neutral-100"
        >
          <div className="flex flex-col w-full absolute h-screen top-1/3 items-center text-bg-neutral-100">
            <div
              className="flex items-center min-w-48 pb-2"
              onClick={() => setAccordion(!accordion)}
            >
              <h3 className="">Activités</h3>
              <div className="pl-2">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`${
                    accordion
                      ? "flex self-center justify-center rotate-0 transition duration-300"
                      : "flex self-center justify-center  rotate-180 transition duration-300"
                  }`}
                />
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
                <Link href="/couverture" onClick={() => setBurger(false)}>
                  <div className="flex pb-1">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Couverture />
                    </div>
                    <h3>Couverture</h3>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/zinguerie" onClick={() => setBurger(false)}>
                  <div className="flex pb-1">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Zinguerie />
                    </div>
                    <h3>Zinguerie</h3>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/nettoyage" onClick={() => setBurger(false)}>
                  <div className="flex pb-1">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Nettoyage />
                    </div>
                    <h3>Nettoyage</h3>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/isolation" onClick={() => setBurger(false)}>
                  <div className="flex pb-1">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Isolation />
                    </div>
                    <h3>Isolation</h3>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/charpente" onClick={() => setBurger(false)}>
                  <div className="flex pb-1">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Charpente />
                    </div>
                    <h3>Charpente</h3>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/travaux-divers" onClick={() => setBurger(false)}>
                  <div className="flex pb-2">
                    <div className="flex self-center h-7 w-7 fill-neutral-100 mr-2 ml-4">
                      <Travaux />
                    </div>
                    <h3>Travaux-divers</h3>
                  </div>
                </Link>
              </li>
            </ul>
            <Link
              href="/avis-clients"
              onClick={() => setBurger(false)}
              className="text-neutral-100 min-w-48 pb-2"
            >
              <h3 className="">Avis clients</h3>
            </Link>
            <Link
              href="/blog"
              onClick={() => setBurger(false)}
              className="text-neutral-100 min-w-48"
            >
              <h3 className="">Blogs</h3>
            </Link>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavBurger;
