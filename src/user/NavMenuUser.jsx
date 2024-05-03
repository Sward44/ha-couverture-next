"use client";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/user/NavMenuUser.module.scss";

const NavMenuUser = () => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const ref = useRef(null);
  const { data: session, status } = useSession();
  const handleShowMenuUser = (e) => {
    e.stopPropagation();
    setShowMenuUser(!showMenuUser);
  };
  return (
    <div
      className={styles.link}
      onMouseEnter={handleShowMenuUser}
      onMouseLeave={handleShowMenuUser}
    >
      <button className={styles.image}>
        {session?.user?.image ? (
          <Image src={session.user.image} alt={session?.user?.name} fill />
        ) : (
          <FontAwesomeIcon icon={faUser} size="2x" />
        )}
      </button>
      <CSSTransition
        nodeRef={ref}
        in={showMenuUser}
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
              <div className={styles.linkBlock}>
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session?.user?.name}
                    width={32}
                    height={32}
                    style={{ marginRight: "0.5rem", borderRadius: "50%" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    alt="User Image"
                    color="#000000"
                    style={{ marginRight: "1rem" }}
                  />
                )}
                <div className={styles.linkName}>
                  <p className={styles.user}>
                    {session?.user?.name ? session.user.name : "Utilisateur"}
                  </p>
                  <p className={styles.email}>{session.user.email}</p>
                  <p className={styles.email}>{session.user.role}</p>
                </div>
              </div>
            </li>
            <li style={{ padding: "0 20px 10px" }}>
              <Link href="/couverture" className={styles.link}>
                <FontAwesomeIcon
                  icon={faUserGear}
                  color="#000000"
                  style={{ marginRight: "0.5rem" }}
                />
                Paramètres
              </Link>
            </li>
            <li style={{ padding: "0 20px 10px" }}>
              <span onClick={() => signOut()} className={styles.link}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color="#000000"
                  style={{ marginRight: "0.5rem" }}
                />
                Deconnexion
              </span>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NavMenuUser;
