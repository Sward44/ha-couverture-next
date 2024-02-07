import ImageDiaporama from "../components/home/image/ImageDiaporama";
import HomePage from "../components/home/HomePage";
import styles from "./page.module.scss";
import { itemData } from "../components/dictonnaries/DataDiaporama";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomePage itemData={itemData} />
    </div>
  );
}
