"use client";
import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ImageDiaporama from '@/components/home/image/ImageDiaporama';
import Texte from '@/components/home/texte/Texte';
import ImageButton from '@/components/home/button/ImageButton';
import FormAdd from '@/components/form/FormAdd';
import SvgMap from '@/components/logo/MappageLogo';

function ComponentsHomePage({ itemData }) {
  const [direction, setDirection] = useState('imageGauche');
  const [index, setIndex] = useState(0);
  const [addForm, setAddForm] = useState(false);

  const handleNext = () => {
    const newIndex = index - 1;
    if (newIndex < 0) {
      setIndex(itemData.length - 1);
    } else {
      setIndex(newIndex);
    }
    setDirection('imageGauche');
  };

  const handlePrev = () => {
    setIndex((index + 1) % itemData.length);
    setDirection('imageDroite');
  };

  const childFactory = (direction) => (child) =>
    React.cloneElement(child, {
      classNames: direction,
    });

  const handleEveryImage = (a) => {
    if (a > index) {
      setIndex(a);
      setDirection('imageDroite');
    } else if (a < index) {
      setIndex(a);
      setDirection('imageGauche');
    }
  };

  function handleForm(e) {
    e.preventDefault();
    setAddForm(!addForm);
  }

  let svgName = itemData[index].url.slice(itemData[index].url.lastIndexOf('/') + 1);
  if (svgName === 'travaux-divers') svgName = svgName.slice(0, svgName.lastIndexOf('-'));

  const SvgComponent = SvgMap[svgName];
  if (!SvgComponent) return null;

  return (
    <div>
      <Texte itemData={itemData} index={index} handleForm={handleForm} SvgComponent={SvgComponent} />
      <ImageButton
        itemData={itemData}
        index={index}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleEveryImage={handleEveryImage}
      />
      <div className="relative flex overflow-auto overflow-x-hidden snap-x snap-mandatory">
        <TransitionGroup childFactory={childFactory(direction)} component={null}>
          <CSSTransition
            // in={false}
            key={index}
            timeout={800}
            classNames={direction}
            // en
          >
            <ImageDiaporama itemData={itemData} index={index} />
          </CSSTransition>
        </TransitionGroup>
      </div>
      {addForm && <FormAdd handleForm={handleForm} />}
    </div>

  );

}



export default ComponentsHomePage;