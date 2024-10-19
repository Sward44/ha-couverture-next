"use client";
import Image from "next/image";
import { useViewport } from "@/hooks/viewPort";

export function DashBoardImages({ meta }) {
  const { isMobile, isTablet, isLaptop } = useViewport();
  return (
    <div className="relative mb-4 flex h-full min-h-[180px] min-w-full sm:min-h-[360px] md:min-h-[420px] lg:min-h-[451px] lg:min-w-[860px] xl:min-h-[597px] xl:min-w-[1140px] 2xl:min-h-[734px] 2xl:min-w-[1400px]">
      <Image
        src={`${meta.url}`}
        fill
        alt={meta.alt}
        style={{
          objectFit: isMobile || isTablet || isLaptop ? "cover" : "contain",
          objectPosition: `center`,
        }}
        className="absolute shadow-ha"
        priority
        title="Image en pixel: 1200x633"
      />
    </div>
  );
}

export default DashBoardImages;
