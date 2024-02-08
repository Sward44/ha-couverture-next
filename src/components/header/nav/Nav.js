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
      <ul
        className={`dFlex flexRow ${isMobile ? "" : "m-20"} alignItemsCenter`}
      >
        <div className={`${styles.displayFlex} flexRow nav-link`}>
          <Link to="/" className={`mr-20 `}>
            <h3>Blogs</h3>
          </Link>
          <Link to="/" className="mr-20">
            <h3>Avis clients</h3>
          </Link>
          <Link to="/" className="mr-85">
            <h3>Nous rejoindre</h3>
          </Link>
        </div>
        <a href="tel:+33634266400" target="_blank " rel="noopener noreferrer">
          <div
            // onMouseLeave={handleOut}
            // onMouseEnter={() => setPhone(false)}
            className={`dFlex flexRow no-wrap mr-20 alignItemsCenter justifyContentCenter ${styles.paragraphe}`}
          >
            <FontAwesomeIcon icon={faPhone} className={styles.taillePhone} />
            {isMobile ? "" : <p className={`mr-10 `}>06 34 26 64 00</p>}
          </div>
        </a>
        <Link to="/">
          <button className={isMobile && styles.displayButton}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.tailleLocation}
            />
          </button>
        </Link>
      </ul>
    </>
  );
}

export default Nav;
