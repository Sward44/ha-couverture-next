import Image from "next/image";
import styles from "./ImageDiaporama.module.scss";

const ImageDiaporama = ({ itemData, index }) => {
  return (
    <div className={styles.format}>
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
      />
    </div>
  );
};

export default ImageDiaporama;
