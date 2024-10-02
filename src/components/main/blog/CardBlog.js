"use server";
import Image from "next/image";
import Link from "next/link";

export async function CardBlogPage({ itemsData }) {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 grid-rows-2 sm:mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
      <div className="m-4 size-[320px] rounded-lg bg-neutral-100 shadow-ha transition duration-300 sm:m-8 sm:size-[240px] lg:hover:scale-105">
        {itemsData.map((item) => (
          <div key={item.id}>
            <Link href={`/blog/${item.url}`}>
              <span className="relative mx-4 mt-4 flex h-[208px] max-h-[248px] w-[288px] max-w-[328px] items-center justify-center overflow-hidden rounded-md shadow-ha sm:mx-auto sm:h-[118px] sm:w-[208px]">
                <Image
                  src={require(`@/components/${item.urlWebp}`).default}
                  alt={item.altWebp}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: `center`,
                  }}
                  quality={60}
                />
              </span>
              <h2 className="pt-2 text-center text-sm font-bold">
                {item.title.slice(0, 27)}...
              </h2>
              <p className=" px-6 text-[11px]">
                {item.description.slice(0, 93)}...
              </p>
              <p className="mb-1 pr-4 pt-1 text-right text-[11px] text-neutral-900 sm:mb-0">
                {item.createdAt}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
