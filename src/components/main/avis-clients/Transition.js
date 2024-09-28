"use client";
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CardAvisUseClients from "@/components/main/avis-clients/CardAvisUseClients";
import { Circle } from "@/components/logo/Logo";

export function Transition({ item }) {
  const [direction, setDirection] = React.useState("cardGauche");
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const intervalRef = React.useRef(null);

  const childFactory = (direction) => (child) =>
    React.cloneElement(child, {
      classNames: direction,
    });

  const handleHoverEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleHoverLeave = () => {
    intervalRef.current = setInterval(incrementTime, Math.round(8000 / 100));
  };

  const incrementTime = () => {
    setCount((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (count >= 100) {
      const newIndex = (index + 1) % item.length;
      setIndex(newIndex);
      setDirection("cardDroite");
      setCount(0);
    }

    intervalRef.current = setInterval(incrementTime, Math.round(8000 / 100));
    return () => clearInterval(intervalRef.current);
  }, [count, direction, index, item]);

  const handleEveryCart = (a) => {
    if (a > index) {
      setIndex(a);
      setDirection("cardDroite");
    } else if (a < index) {
      setIndex(a);
      setDirection("cardGauche");
    }
    setCount(0);
  };

  return (
    <>
      <div
        className="relative mx-4 flex w-full items-center overflow-hidden sm:mx-8 md:w-[768px] lg:mx-20 lg:w-[880px]"
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        onTouchStart={handleHoverEnter}
        onTouchEnd={handleHoverLeave}
      >
        <TransitionGroup
          childFactory={childFactory(direction)}
          component={null}
        >
          <CSSTransition key={index} timeout={800} classNames={direction}>
            <CardAvisUseClients itemData={item[index]} count={count} />
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className="mb-6 mt-2 flex items-center justify-center">
        {item.map((itemPoint, i) => {
          return (
            <span
              key={itemPoint.id}
              onClick={() => handleEveryCart(i)}
              className={`size-4 ${
                i === index ? "fill-supernova-500" : "fill-neutral-500"
              } mr-3`}
            >
              <Circle />
            </span>
          );
        })}
      </div>
    </>
  );
}
