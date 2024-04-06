"use client";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewport } from "@/hooks/viewPort";
import {
  faPhone,
  faRightToBracket,
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
import styles from "@/components/header/nav/Nav.module.scss";

function Nav() {
  const { isMobile } = useViewport();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  const { data: session } = useSession();

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
        <Link href="/avis-clients" className={`mr-20 ${styles.link}`}>
          Avis clients
        </Link>
        <Link href="/blog" className={`mr-85 ${styles.link}`}>
          Blogs
        </Link>
      </div>
      <a href="tel:+33634266400" target="_blank " rel="noopener noreferrer">
        <div className={styles.paragraphe}>
          <FontAwesomeIcon icon={faPhone} className={styles.tailleIcon} />
          {isMobile ? "" : <p className={`mr-10`}>06 34 26 64 00</p>}
        </div>
      </a>

      {session ? (
        <Link href="/signin">
          <button>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={styles.tailleIcon}
              style={{ padding: "0" }}
            />
          </button>
        </Link>
      ) : (
        <button>
          {session?.user?.image ? (
            <Image src={session.user.image} alt={session.user.name} fill />
          ) : (
            <FontAwesomeIcon icon={faD} size="2x" />
          )}
        </button>
      )}
    </div>
  );
}

export default Nav;
