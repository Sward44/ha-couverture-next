"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import styles from "./NavBurger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function NavBurger() {
  const [burger, setBurger] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const ref = useRef(null);

  return (
    <div className={styles.navBurger}>
      {burger ? (
        <div
          onClick={() => setBurger(!burger)}
          className={` ${styles.burger} ${styles.burgerActive}`}
        >
          <span></span>
        </div>
      ) : (
        <div onClick={() => setBurger(!burger)} className={`${styles.burger}`}>
          <span></span>
        </div>
      )}
      <CSSTransition
        in={burger}
        nodeRef={ref}
        unmountOnExit
        timeout={800}
        classNames={styles}
      >
        <div ref={ref} className={styles.navigation}>
          <div className={styles.marginAround}>
            <div
              className={styles.positionLink}
              onClick={() => setAccordion(!accordion)}
            >
              <h3>Activités</h3>
              <FontAwesomeIcon
                icon={faAngleDown}
                size="lg"
                color="white"
                className={accordion ? styles.rotate : styles.rotate180}
              />
            </div>
            <ul
              className={`${styles.accordion} ${
                accordion ? styles.active : ""
              }`}
            >
              <li>
                <Link
                  href="/couverture"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Couverture</h3>
                </Link>
              </li>
              <li>
                <Link
                  href="/zinguerie"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Zinguerie</h3>
                </Link>
              </li>
              <li>
                <Link
                  href="/nettoyage"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Nettoyage</h3>
                </Link>
              </li>
              <li>
                <Link
                  href="/isolation"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Isolation</h3>
                </Link>
              </li>
              <li>
                <Link
                  href="/charpente"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Charpente</h3>
                </Link>
              </li>
              <li>
                <Link
                  href="/travaux-divers"
                  onClick={() => setBurger(false)}
                  className={styles.positionLink}
                >
                  <h3>Travaux-divers</h3>
                </Link>
              </li>
            </ul>
            <Link
              href="/"
              onClick={() => setBurger(false)}
              className={`${styles.positionLink}`}
            >
              <h3>Avis clients</h3>
            </Link>
            <Link
              href="/"
              onClick={() => setBurger(false)}
              className={`${styles.positionLink}`}
            >
              <h3>Blogs</h3>
            </Link>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavBurger;
