"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import Nav from "./nav/Nav";
import NavBurger from "./nav/NavBurger";
import styles from "./Header.module.scss";
import Logo from "../logo/Logo";
import LogoMobile from "@/components/logo/LogoMobile";
import Login from "@/components/header/login/Login";

function Header() {
  const { isMobile, isTablet } = useViewport();
  const [burger, setBurger] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const handleBurger = () => {
    setBurger(!burger);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          !visible && !burger ? styles.hidden : ""
        }`}
      >
        {isMobile || isTablet ? (
          <div className={styles.entete}>
            <Link href="/">
              <LogoMobile />
            </Link>
            <h3 style={{ fontFamily: "var(--font-chonburi)" }}>
              HA COUVERTURE
            </h3>
            <NavBurger handleBurger={handleBurger} burger={burger} />
          </div>
        ) : (
          <>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
            <Nav handleLogin={handleLogin} />
          </>
        )}
      </header>
      {login && <Login handleLogin={handleLogin} />}
    </>
  );
}

export default Header;
