import Image from "next/image";

export default function ImageDiaporama({ itemData, index }) {
  return (
    <div className="relative flex h-[calc(100vh-72px)] min-h-[600px] w-full shrink-0 snap-center flex-nowrap md:h-[calc(100vh-81px)]">
      <Image
        index={index}
        src={require(`@/components/${itemData[index].urlWebp}`).default}
        fill
        alt={itemData[index].altWebp}
        style={{
          objectFit: "cover",
          objectPosition: `${itemData[index].position}`,
        }}
        priority
        quality={60}
        className="h-screen min-h-[600px] w-full brightness-[0.5]"
        title={""}
      />
    </div>
  );
}
