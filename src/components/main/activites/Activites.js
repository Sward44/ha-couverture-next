"use server";
import Image from "next/image";
import styles from "@/components/main/activites/Activites.module.scss";

export default async function Activites({ itemDataCouverture }) {
  return (
    <div className="mb-24 grid grid-cols-1 grid-rows-[1fr_260px_1fr_260px_1fr_260px] sm:mx-8 lg:mx-2 lg:my-24 lg:mt-10 lg:grid-cols-2 lg:grid-rows-3 lg:gap-5 ">
      {itemDataCouverture.description.map((item) => (
        <>
          <div
            key={item._id}
            className="flex flex-col items-center justify-center"
          >
            <h2 className="my-6 text-2xl font-bold sm:my-10 md:text-3xl lg:my-[3%]">
              {item.title}
            </h2>
            <p className="mx-4 mb-12 sm:mx-0 sm:mb-16 lg:mx-[13%] lg:my-[3%]">
              {item.description}
            </p>
          </div>
          <div className={`flex items-center justify-center ${styles.image}`}>
            <div
              className={`relative h-full max-h-[260px] w-full shadow-ha lg:mx-4 lg:max-h-[320px] lg:max-w-[560px]`}
            >
              <Image
                src={require(`@/components/${item.urlWebp}`).default}
                alt={item.altWebp}
                fill={item.position}
                style={{
                  objectFit: "cover",
                  objectPosition: `${item.position}`,
                }}
                quality={60}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
