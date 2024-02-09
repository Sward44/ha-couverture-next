"use client";
import React from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import Nav from "./nav/Nav";
import NavBurger from "./nav/NavBurger";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";
import LogoMobile from "./logo/LogoMobile";

function Header() {
  const { isMobile, isTablet } = useViewport();
  return (
    <header className={styles.header}>
      {isMobile | isTablet ? (
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
