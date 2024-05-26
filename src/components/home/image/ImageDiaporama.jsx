import Image from "next/image";

const ImageDiaporama = ({ itemData, index }) => {
  return (
    <div className="relative h-screen w-full min-h-[600px] flex flex-nowrap shrink-0 snap-center">
      <Image
        index={index}
        src={require(`@/components/${itemData[index].urlWebp}`).default}
        fill
        alt={itemData[index].altWebp}
        style={{
          objectFit: "cover",
          objectPosition: `${itemData[index].position}`,
        }}
        priority
        quality={60}
        className="brightness-[0.5] h-screen w-full min-h-[600px]"
      />
    </div>
  );
};

export default ImageDiaporama;
