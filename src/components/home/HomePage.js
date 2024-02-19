"use client";
import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImageDiaporama from "./image/ImageDiaporama";
import Texte from "./texte/Texte";
import ImageButton from "./button/ImageButton";
import FormAdd from "../form/FormAdd";

function HomePage({ itemData }) {
  const [direction, setDirection] = useState("imageGauche");
  const [index, setIndex] = useState(0);
  const [addForm, setAddForm] = useState(false);

  const handleNext = () => {
    const handleNext = index - 1;
    if (handleNext < 0) {
      setIndex(itemData.length - 1);
    } else {
      setIndex(handleNext);
    }
    setDirection("imageGauche");
  };

  const handlePrev = () => {
    setIndex((index + 1) % itemData.length);
    setDirection("imageDroite");
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

  const handleForm = () => {
    setAddForm(!addForm);
  };

  return (
    <>
      <Texte itemData={itemData} index={index} handleForm={handleForm} />
      <ImageButton
        itemData={itemData}
        index={index}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleEveryImage={handleEveryImage}
      />

      <TransitionGroup childFactory={childFactory(direction)}>
        <CSSTransition
          in={false}
          key={index}
          timeout={800}
          classNames={{ direction }}
          en
        >
          <ImageDiaporama itemData={itemData} index={index} />
        </CSSTransition>
      </TransitionGroup>
      {addForm && <FormAdd handleForm={handleForm} />}
    </>
  );
}

export default HomePage;
