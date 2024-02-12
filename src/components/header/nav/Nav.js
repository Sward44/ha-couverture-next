"use client";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.scss";

function Nav() {
  const { isMobile } = useViewport();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  return (
    <div className={` ${isMobile ? "" : "m-20"} ${styles.header}`}>
      <div className={`${styles.linkNav}`}>
        <div
          className={`mr-20 ${styles.link}`}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          Activités
          <CSSTransition
            nodeRef={ref}
            in={showMenu}
            timeout={{ enter: 400, exit: 400 }}
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
            <div ref={ref} className={styles.menu}>
              <ul>
                <li style={{ padding: "10px 20px" }}>
                  <Link href="/couverture" className={styles.link}>
                    Couverture
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/zinguerie" className={styles.link}>
                    Zinguerie
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/nettoyage" className={styles.link}>
                    Nettoyage
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/isolation" className={styles.link}>
                    Isolation
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/charpente" className={styles.link}>
                    Charpente
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/travaux-divers" className={styles.link}>
                    Travaux-divers
                  </Link>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>
        <Link href="/" className={`mr-20 ${styles.link}`}>
          Avis clients
        </Link>
        <Link href="/blog" className={`mr-85 ${styles.link}`}>
          Blogs
        </Link>
      </div>
      <a href="tel:+33634266400" target="_blank " rel="noopener noreferrer">
        <div
          // onMouseLeave={handleOut}
          // onMouseEnter={() => setPhone(false)}
          className={styles.paragraphe}
        >
          <FontAwesomeIcon icon={faPhone} className={styles.tailleIcon} />
          {isMobile ? "" : <p className={`mr-10`}>06 34 26 64 00</p>}
        </div>
      </a>

      <Link href="/" className={styles.link}>
        <button>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles.tailleIcon}
            style={{ padding: "0" }}
          />
        </button>
      </Link>
    </div>
  );
}

export default Nav;
