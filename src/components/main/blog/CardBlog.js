"use server";
import Image from 'next/image';
import Link from 'next/link'

export async function CardBlogPage({itemsData}) {
console.log(itemsData)
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-2 lg:grid-rows-3 max-w-[1400px] mx-auto sm:mx-auto'>
      <div className="m-4 sm:m-8 size-[320px] sm:size-[240px] bg-neutral-100 shadow-ha rounded-lg duration-300 transition lg:hover:scale-105">
      {itemsData.map((item) =>( 
        <div key={item.id}>  
            <Link href={`/blog/${item.url}`}>
          <span className='relative flex mx-4 w-[288px] h-[208px] max-w-[328px] max-h-[248px] sm:w-[208px] sm:h-[118px] justify-center items-center mt-4 sm:mx-auto rounded-md overflow-hidden shadow-ha'>
              <Image
                    src={require(`@/components/${item.urlWebp}`).default}
                    alt={item.altWebp}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: `center`,
                    }}
                  />
            </span>
            <h2 className='text-center font-bold text-sm pt-2'>{item.title.slice(0, 27)}...</h2>
            <p className=' text-[11px] px-6'>{item.description.slice(0, 93)}...</p>
            <p className='text-right text-[11px] text-neutral-900 pr-4 pt-1 mb-1 sm:mb-0'>{item.createdAt}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 