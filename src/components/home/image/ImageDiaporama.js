import Image from "next/image";

const ImageDiaporama = ({ itemData, index }) => {
  return (
    <>
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
      />
    </>
  );
};

export default ImageDiaporama;
