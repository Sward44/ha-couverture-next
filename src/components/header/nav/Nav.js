"use client";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.scss";

function Nav() {
  const { isMobile } = useViewport();
  return (
    <>
      <div className={` ${isMobile ? "" : "m-20"} ${styles.header}`}>
        <div className={`${styles.linkNav}`}>
          <Link href="/" className={`mr-20 ${styles.link}`}>
            Activités
          </Link>
          <Link href="/" className={`mr-20 ${styles.link}`}>
            Avis clients
          </Link>
          <Link href="/" className={`mr-85 ${styles.link}`}>
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
    </>
  );
}

export default Nav;
