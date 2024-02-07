import Image from "next/image";

const ImageDiaporama = ({ itemData, index }) => {
  console.log(itemData);
  return (
    <>
      <Image
        index={index}
        src={require(`../../${itemData[index].urlWebp}`).default}
        fill
        alt={itemData[index].altWebp}
        style={{ objectFit: "cover" }}
      />
    </>
  );
};

export default ImageDiaporama;
