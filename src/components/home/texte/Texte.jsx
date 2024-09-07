"only server";


function Texte({ itemData, index, SvgComponent }) {
  return (
    <div
      key={index}
      className="absolute left-1/2 bottom-1/2 sm:bottom-1/3 md:bottom-1/2 translate-y-8 sm:translate-y-0 -translate-x-1/2 bg-transparent font-sans text-base sm:text-lg text-neutral-100 z-20"
    >
      <div
        key={index}
        className="flex flex-col flex-auto max-w-[620px] min-w-[320px]"
      >
        <div
          className="flex justify-center items-center mb-4 fill-neutral-100  apparitionTitre"
        >
          <div className="h-10 w-10 mr-3">
            <SvgComponent alt={itemData[index].alt} />
          </div>
          <h1 className="font-serif font-bold sm:text-3xl text-2xl">
            {itemData[index].title}
          </h1>
        </div>
        <p className="apparitionTexte">{itemData[index].description}</p>
      </div>
    </div>
  );
}

export default Texte;
