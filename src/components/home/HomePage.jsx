"use client";
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ImageDiaporama from '@/components/home/image/ImageDiaporama';
import Texte from '@/components/home/texte/Texte';
import ImageButton from '@/components/home/button/ImageButton';
import { MultiForm } from '@/components/form/MultiForm';
import SvgMap from '@/components/logo/MappageLogo';
import TexteButton from './button/TexteButton';

function ComponentsHomePage({ itemData, devis, imagesDevis }) {
  const [direction, setDirection] = useState('imageGauche');
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
    setDirection('imageGauche');
  };

  const handlePrev = () => {
    setIndex((index + 1) % itemData.length);
    setDirection('imageDroite');
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
      setDirection('imageDroite');
    } else if (a < index) {
      setIndex(a);
      setDirection('imageGauche');
    }
  };

  function handleForm() {
    setAddForm(!addForm);
  }

  let svgName = itemData[index].url.slice(itemData[index].url.lastIndexOf('/') + 1);
  if (svgName === 'travaux-divers') svgName = svgName.slice(0, svgName.lastIndexOf('-'));

  const SvgComponent = SvgMap[svgName];
  if (!SvgComponent) return null;

  return (
    <>
    <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "name": "Couverture", "position": 1, "url": `${process.env.NEXT_PUBLIC_HOST}/couverture` },
          { "@type": "ListItem", "name": "Zinguerie", "position": 2, "url": `${process.env.NEXT_PUBLIC_HOST}/zinguerie` },
          { "@type": "ListItem", "name": "Nettoyage", "position": 3, "url": `${process.env.NEXT_PUBLIC_HOST}/nettoyage` },
          { "@type": "ListItem", "name": "Isolation", "position": 4, "url": `${process.env.NEXT_PUBLIC_HOST}/isolation` },
          { "@type": "ListItem", "name": "Charpente", "position": 5, "url": `${process.env.NEXT_PUBLIC_HOST}/charpente` },
          { "@type": "ListItem", "name": "Réparations diverses", "position": 6, "url": `${process.env.NEXT_PUBLIC_HOST}/travaux-divers` }
        ]
      })}
    </script>
  </Helmet>
  <ImageButton
    itemData={itemData}
    index={index}
    handleNext={handleNext}
    handlePrev={handlePrev}
    handleEveryImage={handleEveryImage}
  />
  <TexteButton
    handleForm={handleForm}
    itemData={itemData}
    index={index}
  />
  <div 
      className="overflow-auto overflow-x-hidden snap-x snap-mandatory"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <Texte itemData={itemData} index={index} handleForm={handleForm} SvgComponent={SvgComponent} />
      <div
        className="relative flex">
        <TransitionGroup childFactory={childFactory(direction)} component={null}>
          <CSSTransition
            key={index}
            timeout={800}
            classNames={direction}
          >
            <ImageDiaporama itemData={itemData} index={index} />
          </CSSTransition>
        </TransitionGroup>
      </div>
      {addForm && <MultiForm handleForm={handleForm} devis={devis} imagesDevis={imagesDevis} />}
    </div>
  </>
  );
}

export default ComponentsHomePage;