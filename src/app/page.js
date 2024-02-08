import React from "react";
import HomePage from "../components/home/HomePage";
import styles from "./page.module.scss";
import { itemData } from "@/components/dictonnaries/DataDiaporama";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <HomePage itemData={itemData} />
    </div>
  );
}
