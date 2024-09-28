"only server";
export default function Texte({ itemData, index, SvgComponent }) {
  return (
    <div
      key={index}
      className="absolute bottom-1/2 left-1/2 z-20 -translate-x-1/2 translate-y-8 bg-transparent font-sans text-base text-neutral-100 sm:bottom-1/3 sm:translate-y-0 sm:text-lg md:bottom-1/2"
    >
      <div
        key={index}
        className="flex min-w-[320px] max-w-[620px] flex-auto flex-col"
      >
        <div className="apparitionTitre mb-4 flex items-center justify-center  fill-neutral-100">
          <div className="mr-3 h-10 w-10">
            <SvgComponent alt={itemData[index].alt} />
          </div>
          <h1 className="font-serif text-2xl font-bold sm:text-3xl">
            {itemData[index].title}
          </h1>
        </div>
        <p className="apparitionTexte">{itemData[index].description}</p>
      </div>
    </div>
  );
}
