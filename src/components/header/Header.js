"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import Nav from "./nav/Nav";
import NavBurger from "./nav/NavBurger";
import styles from "./Header.module.scss";
import Logo from "../logo/Logo";
import LogoMobile from "../logo/LogoMobile";

function Header() {
  const { isMobile, isTablet } = useViewport();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <header className={`${styles.header} ${!visible ? styles.hidden : ""}`}>
      {isMobile || isTablet ? (
        <div className={styles.entete}>
          <Link href="/">
            <LogoMobile />
          </Link>
          <h3 style={{ fontFamily: "var(--font-chonburi)" }}>HA COUVERTURE</h3>
          <NavBurger />
        </div>
      ) : (
        <>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <Nav />
        </>
      )}
    </header>
  );
}

export default Header;
