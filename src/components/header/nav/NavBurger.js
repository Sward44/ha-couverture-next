"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import styles from "./NavBurger.module.scss";

function NavBurger() {
  const [burger, setBurger] = useState(false);
  const ref = useRef(null);

  const handleBurger = () => {
    setBurger(!burger);
  };

  return (
    <div className="dFlex alignItemsCenter">
      {burger ? (
        <div
          onClick={handleBurger}
          className={` ${styles.burger} ${styles.burgerActive}`}
        >
          <span></span>
        </div>
      ) : (
        <div onClick={handleBurger} className={`${styles.burger}`}>
          <span></span>
        </div>
      )}
      <CSSTransition
        in={burger}
        nodeRef={ref}
        unmountOnExit
        timeout={800}
        classNames={styles}
      >
        <div ref={ref} className={`${styles.navigation} zIndex`}>
          <div className={styles.marginAround}>
            <Link to="/" className={`${styles.positionLink}`}>
              <h3>Blogs</h3>
            </Link>
            <Link to="/" className={`${styles.positionLink}`}>
              <h3>Avis clients</h3>
            </Link>
            <Link to="/" className={`${styles.positionLink}`}>
              <h3>Nous rejoindre</h3>
            </Link>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavBurger;
