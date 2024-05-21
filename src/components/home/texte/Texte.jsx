"only server";
import TexteButton from "@/components/home/button/TexteButton";
import styles from "@/components/home/texte/Texte.module.scss";

function Texte({ itemData, index, handleForm, SvgComponent }) {
  return (
    <div
      key={index}
      className="flex z-10 absolute bg-transparent font-sans text-base sm:text-lg min-h-screen min-w-full items-center justify-center text-neutral-100 "
    >
      <div
        key={index}
        className="flex flex-col  rounded-lg max-w-[500px] min-h-[400px] p-4 mx-4"
      >
        <div
          className={`flex justify-center items-center mb-4 fill-neutral-100  ${styles.apparitionTitre}`}
        >
          <div className="h-10 w-10 mr-3">
            <SvgComponent alt={itemData[index].alt} />
          </div>
          <h2 className="font-serif font-bold sm:text-3xl text-2xl">
            {itemData[index].title}
          </h2>
        </div>
        <p className={styles.apparitionTexte}>{itemData[index].description}</p>
        <TexteButton
          handleForm={handleForm}
          itemData={itemData}
          index={index}
        />
      </div>
    </div>
  );
}

export default Texte;
