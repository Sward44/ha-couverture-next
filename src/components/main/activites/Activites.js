"use server"
import Image from "next/image";
import styles from "@/components/main/activites/Activites.module.scss"

export default async function Activites({ itemDataCouverture }) {
  return (

<div className="grid grid-rows-[1fr_260px_1fr_260px_1fr_260px] grid-cols-1 lg:grid-rows-3 lg:grid-cols-2 lg:gap-5 sm:mx-8 lg:mt-10 mb-24 lg:mx-2 lg:my-24 ">
{itemDataCouverture.description.map((item) => (
  <>
    <div key={item._id} className="flex flex-col justify-center items-center">
      <h2 className="my-6 sm:my-10 lg:my-[3%] text-2xl md:text-3xl font-bold">{item.title}</h2>
      <p className="mx-4 mb-12 sm:mx-0 sm:mb-16 lg:my-[3%] lg:mx-[13%]">{item.description}</p>
    </div>
    <div className={`flex justify-center items-center ${styles.image}`}>
      <div className={`relative h-full w-full max-h-[260px] lg:max-w-[560px] lg:max-h-[320px] shadow-ha lg:mx-4`}>
        <Image
        src={require(`@/components/${item.urlWebp}`).default}
        alt={item.altWebp}
        fill={item.position}
        style={{
          objectFit: "cover",
          objectPosition: `${item.position}`,
        }}
      />
      </div>
      
    </div>
  </>
))}
</div> );
}