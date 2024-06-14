"use server"
import Image from "next/image";
import SvgMap from "@/components/logo/MappageLogo"

export default async function HeaderMain({ itemDataCouverture }) {
  const svgName = itemDataCouverture.urlSvg
  const SvgComponent = SvgMap[svgName]
  return (
    <>
      <div className="relative w-full h-[80px] md:h-[150px]">
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
      <div className="flex absolute h-[80px] md:h-[150px] w-full justify-center items-center text-neutral-100 font-bold z-10">
        <div className="size-12 md:size-16 fill-neutral-100 mr-2">
          <SvgComponent />
        </div>
        <h1 className="text-[32px] md:text-[42px]">{itemDataCouverture.title}</h1>
      </div>
    </>
  );
}