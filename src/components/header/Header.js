"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import Nav from "./nav/Nav";
import NavBurger from "./nav/NavBurger";
import { useViewport } from "@/hooks/viewPort";

function Header() {
  const { isMobile } = useViewport();
  return (
    <header className={`${styles.headerBox}`}>
      <div className={`${styles.largeurHeader}`}>
        <div
          className={`dFlex flexRow  ${
            isMobile ? `py-5 px-10 justifyBetween` : `p-10`
          }`}
        >
          <div
            className={`dFlex ${!isMobile && `flexFill`} align-items-center`}
          >
            <Link to="/">
              {isMobile ? (
                <Image
                  src={require(`../img/header/ha-couverture-logo.svg`).default}
                  width={200}
                  height={80}
                  alt="Logo de HA Couverture"
                />
              ) : (
                <Image
                  src={
                    require(`../../../public/ha-couverture-favicon.svg`).default
                  }
                  width={50}
                  height={50}
                  alt="Logo de HA Couverture"
                />
              )}
            </Link>
          </div>

          {isMobile ? (
            <div>
              <h2>HA COUVERTURE</h2>
            </div>
          ) : (
            <Nav />
          )}
          <NavBurger />
        </div>
      </div>
    </header>
  );
}

export default Header;
