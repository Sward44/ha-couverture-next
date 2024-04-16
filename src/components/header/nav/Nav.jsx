"use client";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession } from "next-auth/react";
// import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewport } from "@/hooks/viewPort";
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
import couverture from "@/components/img/home/couverture.svg";
import zinguerie from "@/components/img/home/zinguerie.svg";
import nettoyage from "@/components/img/home/nettoyage.svg";
import isolation from "@/components/img/home/isolation.svg";
import charpente from "@/components/img/home/charpente.svg";
import travauxDivers from "@/components/img/home/travaux-divers.svg";
import styles from "@/components/header/nav/Nav.module.scss";

function Nav() {
  const { isMobile } = useViewport();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  const { data: session, status } = useSession();

  // function handleShowMenuUser(e) {
  //   e.preventDefault();
  //   if (status === "unauthenticated" && usePathname() !== "/signin") {
  //     const path = usePathname();
  //       redirect("/signin?callbackUrl=" + path)}
  //   }
  // }
  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className={` ${isMobile ? "" : "m-20"} ${styles.header}`}>
      <div className={`${styles.linkNav}`}>
        <div
          className={`mr-20 ${styles.link}`}
          onMouseEnter={handleShowMenu}
          onMouseLeave={handleShowMenu}
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
                    <Image
                      src={couverture}
                      alt={"Illustration d'un toit imagé"}
                      width={30}
                      height={18}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Couverture
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/zinguerie" className={styles.link}>
                    <Image
                      src={zinguerie}
                      alt={"Illustration d'une goutière imagée"}
                      width={30}
                      height={17}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Zinguerie
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/nettoyage" className={styles.link}>
                    <Image
                      src={nettoyage}
                      alt={"Illustration d'un nettoyage de maison imagée"}
                      width={30}
                      height={18}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Nettoyage
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/isolation" className={styles.link}>
                    <Image
                      src={isolation}
                      alt={"Illustration d'une isolation de toit imagée"}
                      width={30}
                      height={18}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Isolation
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/charpente" className={styles.link}>
                    <Image
                      src={charpente}
                      alt={"Illustaion d'une charpente imagée"}
                      width={30}
                      height={18}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Charpente
                  </Link>
                </li>
                <li style={{ padding: "0 20px 10px" }}>
                  <Link href="/travaux-divers" className={styles.link}>
                    <Image
                      src={travauxDivers}
                      alt={"Illustration de travaux divers imagée"}
                      width={28}
                      height={18}
                      style={{ marginRight: "0.5rem" }}
                    />
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
        <NavMenuUser />
      ) : (
        <Link href="/signin">
          <button>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={styles.tailleIcon}
              style={{ padding: "0" }}
            />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Nav;
