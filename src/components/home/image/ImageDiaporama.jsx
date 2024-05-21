import Image from "next/image";

const ImageDiaporama = ({ itemData, index }) => {
  return (
    <div className="relative h-screen w-full min-h-[600px]">
      <Image
        index={index}
        src={require(`../../${itemData[index].urlWebp}`).default}
        fill
        alt={itemData[index].altWebp}
        style={{
          objectFit: "cover",
          objectPosition: `${itemData[index].position}`,
        }}
        priority
        quality={60}
        className="brightness-[0.5]"
      />
    </div>
  );
};

export default ImageDiaporama;
