"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useViewport } from "@/hooks/viewPort";
import Nav from "@/components/header/nav/Nav";
import NavBurger from "@/components/header/nav/NavBurger";
import { Logo, LogoMobile } from "@/components/logo/Logo";
import styles from "@/components/header/Header.module.scss";

function Header() {
  const { isMobile, isTablet } = useViewport();
  const [burger, setBurger] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
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

  const handleBurger = (e) => {
    e.preventDefault();
    setBurger(!burger);
  };

  function handleLogin(e) {
    e.preventDefault();
    setLogin(!login);
  }

  return (
    <>
      <header
        className={` 2xl:px-16 lg:px-8 md:px-4 md:py-2 shadow-ha fixed flex w-full z-20 bg-neutral-100 transition-transform duration-300 ${
          !visible && !burger ? styles.maskBarreNavigation : ""
        }`}
      >
        {isMobile || isTablet ? (
          <div className="flex w-full justify-between items-center px-3 py-2">
            <Link href="/" className="size-14">
              <LogoMobile />
            </Link>
            <h3 className="font-serif text-xl font-bold">HA COUVERTURE</h3>
            <NavBurger handleBurger={handleBurger} burger={burger} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="flex">
              <span className="h-[65px] w-[147px] transition duration-300 fill-neutral-950 hover:scale-102 hover:drop-shadow hover:fill-mahogany-950">
                <Logo />
              </span>
            </Link>
            <Nav />
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
