"use client";
import React, { Suspense, useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImageDiaporama from "@/components/home/image/ImageDiaporama";
import Texte from "@/components/home/texte/Texte";
import ImageButton from "@/components/home/button/ImageButton";
import SvgMap from "@/components/logo/MappageLogo";
import TexteButton from "./button/TexteButton";

export default function ComponentsHomePage({ itemData }) {
  const [direction, setDirection] = useState("imageGauche");
  const [index, setIndex] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    const newIndex = index - 1;
    if (newIndex < 0) {
      setIndex(itemData.length - 1);
    } else {
      setIndex(newIndex);
    }
    setDirection("imageGauche");
  };

  const handlePrev = () => {
    setIndex((index + 1) % itemData.length);
    setDirection("imageDroite");
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const childFactory = (direction) => (child) =>
    React.cloneElement(child, {
      classNames: direction,
    });

  const handleEveryImage = (a) => {
    if (a > index) {
      setIndex(a);
      setDirection("imageDroite");
    } else if (a < index) {
      setIndex(a);
      setDirection("imageGauche");
    }
  };

  function handleForm() {
    setAddForm(!addForm);
  }

  let svgName = itemData[index].url.slice(
    itemData[index].url.lastIndexOf("/") + 1
  );
  if (svgName === "travaux-divers")
    svgName = svgName.slice(0, svgName.lastIndexOf("-"));

  const SvgComponent = SvgMap[svgName];
  if (!SvgComponent) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageButton
        itemData={itemData}
        index={index}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleEveryImage={handleEveryImage}
      />
      <TexteButton itemData={itemData} index={index} />
      <div
        className="snap-x snap-mandatory overflow-auto overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Texte
          itemData={itemData}
          index={index}
          handleForm={handleForm}
          SvgComponent={SvgComponent}
        />
        <div className="relative flex">
          <TransitionGroup
            childFactory={childFactory(direction)}
            component={null}
          >
            <CSSTransition key={index} timeout={800} classNames={direction}>
              <ImageDiaporama itemData={itemData} index={index} />
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </Suspense>
  );
}
