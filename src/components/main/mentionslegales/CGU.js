"use client";
import { itemDataConditionGenerales } from "../../dictonnaries/DataDiaporama";
import styles from "./CGU.module.scss";
import { useViewport } from "@/hooks/viewPort";

function CGU() {
  const { isMobile, isTablet } = useViewport();
  return (
    <>
      {isMobile || isTablet ? (
        <div className={styles.description}>
          <h1 classname={styles.fontH1}>
            {itemDataConditionGenerales[0].title}
          </h1>
        </div>
      ) : (
        <div className={styles.overlay}>
          <div className={styles.description}>
            <h1 classname={styles.fontH1}>
              {itemDataConditionGenerales[0].title}
            </h1>
          </div>
        </div>
      )}
      <div className={styles.grid}>
        <p className={styles.introduction}>
          {itemDataConditionGenerales[0].introduction}
        </p>
        {itemDataConditionGenerales[0].article.map((item, index) => (
          <div key={index} className={styles.item}>
            <h2>{item.title}</h2>
            {item.description.map((item2, index2) => (
              <p key={index2} className={styles.fontP}>
                {item2}
              </p>
            ))}

            <ul>
              {item.intitule.map((item1, index1) => (
                <li
                  key={index1}
                  className={styles.fontLi}
                  dangerouslySetInnerHTML={{ __html: item1 }}
                />
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.conclusion}>
          <p>{itemDataConditionGenerales[0].MAJ}</p>
        </div>
      </div>
    </>
  );
}

export default CGU;
