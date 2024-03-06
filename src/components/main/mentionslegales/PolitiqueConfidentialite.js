"use client";
import { itemDataMentionsLegales } from "../../dictonnaries/DataDiaporama";
import styles from "./PolitiqueConfidentialite.module.scss";
import { useViewport } from "@/hooks/viewPort";

function PolitiqueConfidentialite() {
  const { isMobile, isTablet } = useViewport();
  return (
    <>
      {isMobile || isTablet ? (
        <div className={styles.description}>
          <h1 classname={styles.fontH1}>{itemDataMentionsLegales[0].title}</h1>
        </div>
      ) : (
        <div className={styles.overlay}>
          <div className={styles.description}>
            <h1 classname={styles.fontH1}>
              {itemDataMentionsLegales[0].title}
            </h1>
          </div>
        </div>
      )}
      <div className={styles.grid}>
        <p className={styles.introduction}>
          {itemDataMentionsLegales[0].introduction}
        </p>
        {itemDataMentionsLegales[0].article.map((item, index) => (
          <div key={index} className={styles.item}>
            <h2>{item.title}</h2>
            {item.description.map((item2, index2) => (
              <p
                key={index2}
                className={styles.fontP}
                dangerouslySetInnerHTML={{ __html: item2 }}
              />
            ))}

            <ul>
              {item.intitule.map((item1, index1) => (
                <li key={index1} className={styles.fontLi}>
                  {item1}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default PolitiqueConfidentialite;
