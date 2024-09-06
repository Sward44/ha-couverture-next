"use client";
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ImageDiaporama from '@/components/home/image/ImageDiaporama';
import Texte from '@/components/home/texte/Texte';
import ImageButton from '@/components/home/button/ImageButton';
import { MultiForm } from '@/components/form/MultiForm';
import SvgMap from '@/components/logo/MappageLogo';

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
          { "@type": "ListItem", "name": "Couverture", "position": 1, "url": "http://localhost:3001/couverture" },
          { "@type": "ListItem", "name": "Zinguerie", "position": 2, "url": "http://localhost:3001/zinguerie" },
          { "@type": "ListItem", "name": "Nettoyage", "position": 3, "url": "http://localhost:3001/nettoyage" },
          { "@type": "ListItem", "name": "Isolation", "position": 4, "url": "http://localhost:3001/isolation" },
          { "@type": "ListItem", "name": "Charpente", "position": 5, "url": "http://localhost:3001/charpente" },
          { "@type": "ListItem", "name": "Réparations diverses", "position": 6, "url": "http://localhost:3001/travaux-divers" }
        ]
      })}
    </script>
  </Helmet>
    <div 
      className="overflow-auto overflow-x-hidden snap-x snap-mandatory"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <Texte itemData={itemData} index={index} handleForm={handleForm} SvgComponent={SvgComponent} />
      <ImageButton
        itemData={itemData}
        index={index}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleEveryImage={handleEveryImage}
      />
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