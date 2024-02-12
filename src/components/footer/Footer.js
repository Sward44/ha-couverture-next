"use client";
import Link from "next/link";
import LogoFooter from "../logo/LogoFooter";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className={styles.containerFooter}>
      <div className={styles.footer}>
        <div className={styles.containerDiv}>
          <div className={styles.item}>
            <Link href="/">
              <LogoFooter />
            </Link>
            <p>Notre histoire bla bla</p>
          </div>
          <div className={styles.item}>
            <h3> Notre support</h3>
          </div>
          <div className={styles.item}>
            <h3>Inscrivez-vous</h3>
            <p>
              Inscrivez-vous à nos emails d'informations liéés au batiments.
            </p>
            <input
              type="text"
              placeholder="Votre email"
              className={styles.input}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              color={`var(--text-dark)`}
              className={styles.icon}
              onClick={() => console.log("click")}
            />
          </div>
          <div className={styles.item}>
            <h3>Rejoignez-nous</h3>
            <FontAwesomeIcon
              icon={faSquareFacebook}
              size="2xl"
              style={{ paddingTop: "1rem" }}
            />
          </div>
        </div>
      </div>
      <p style={{ margin: "2rem 0" }}>
        2024-Copyright@
        <a
          href="https://david-launay.com"
          target="_blank "
          rel="noopener noreferrer"
        >
          David Launay
        </a>
      </p>
    </footer>
  );
}

export default Footer;
