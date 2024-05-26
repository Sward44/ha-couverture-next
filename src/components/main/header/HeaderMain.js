"use server"
import Image from "next/image";
import SvgMap from "@/components/logo/MappageLogo"

export default async function HeaderMain({ itemDataCouverture }) {
  const svgName = itemDataCouverture.urlSvg
  const SvgComponent = SvgMap[svgName]
  return (
    <>
      <div className={`top-[72px] md:top-[81px] w-full h-[80px] md:h-[150px] relative`}>
          <Image
          src={require(`@/components/${itemDataCouverture.urlWebp}`).default}
          alt={itemDataCouverture.altWebp}
          fill={itemDataCouverture.position}
          style={{
            objectFit: "cover",
            objectPosition: `${itemDataCouverture.position}`,
          }}
          className="brightness-[0.3]"
        />
      </div>
      <div className="flex relative md:-top-[26px] h-[65px] w-full justify-center items-center text-neutral-100 font-bold z-10">
        <div className="size-12 md:size-16 fill-neutral-100 mr-2">
          <SvgComponent
          alt={itemDataCouverture.altSvg}
          />
        </div>
        <h1 className="text-[32px] md:text-[42px]">{itemDataCouverture.title}</h1>
      </div>
    </>
  );
}