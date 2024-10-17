"use server";
import Image from "next/image";
import SvgMap from "@/components/logo/MappageLogo";

export default async function HeaderMain({ itemDataCouverture }) {
  const svgName = itemDataCouverture.urlSvg;
  const SvgComponent = SvgMap[svgName];
  return (
    <>
      <div className="relative h-[80px] w-full md:h-[150px]">
        <Image
          src={require(`@/components/${itemDataCouverture.urlWebp}`).default}
          alt={itemDataCouverture.altWebp}
          fill={itemDataCouverture.position}
          style={{
            objectFit: "cover",
            objectPosition: `${itemDataCouverture.position}`,
          }}
          className="brightness-[0.3]"
          quality={60}
        />
      </div>
      <div className="absolute z-10 flex h-[80px] w-full items-center justify-center font-bold text-neutral-100 md:h-[150px]">
        <div className="mr-2 size-12 fill-neutral-100 md:size-16">
          <SvgComponent />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif">
          {itemDataCouverture.title}
        </h1>
      </div>
    </>
  );
}
