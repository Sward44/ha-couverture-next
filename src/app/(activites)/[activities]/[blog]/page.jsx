"use server";
import { connectMongoose } from "@/utils/mongodb";
import Image from "next/image";
import { BlogModel, SousPageModel, MetaModel } from "@/models";
import { getEnvVarForBlog } from "@/app/(activites)/layout";import Link from "next/link";

export async function generateMetadata({ params }) {
  let { blog } = params;
  if ( blog === "renovation-verenda-pouliguen") blog = blog.replaceAll("-","");
  const metaId = await getEnvVarForBlog(blog, "meta");

  await connectMongoose();
  const data = await MetaModel.findOne({
    _id: metaId,
  })
    .lean()
    .exec();
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.url}`,
      images: {
        url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
  };
}

export default async function blogPage({params}) {
  let { blog } = params;
  if ( blog === "renovation-verenda-pouliguen") blog = blog.replaceAll("-","");
  const pageId = await getEnvVarForBlog(blog, "page");
  await connectMongoose();
  const Data = await BlogModel.findOne({
    _id: pageId,
  })
    .lean()
    .exec();
  const DataSousPage = await SousPageModel.find({blogId : pageId}).sort({index : 1}).lean().exec();


    const itemsData = {
      id: Data._id,
      title: Data.title,
      description: Data.description,
      sousPage : DataSousPage.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        urlWebp: item?.urlWebp || null,
        altWebp: item?.altWebp || null,
      })),
      urlWebp: Data.urlWebp,
      altWebp: Data.altWebp
    };
    
  return(
  <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]">
    <div className="max-w-[1400px] mx-auto mb-4 lg:mb-12">
    <div key={itemsData.id} className="grid grid-cols-1 lg:grid-cols-2 sm:mx-8 mb-8 lg:mx-2">
      <div className="relative size-full max-w-screen min-h-[400px] sm:min-h-[440px] sm:mt-8 lg:min-h-[500px] xl:min-w-[600px] xl:h-[600px] shadow-ha">
            <Image
            src={require(`@/components/${itemsData.urlWebp}`).default}
            alt={itemsData.altWebp}
            fill
            style={{
              objectFit: "cover",
              objectPosition: `center`,
            }}
            quality={60}
          />
        </div>
        <div className="flex flex-col justify-center mx-4 sm:mx-0 mt-6 lg:mx-8">
          <h1 className="flex flex-1 items-end font-bold font-serif text-2xl md:text-3xl py-4 sm:py-8">{itemsData.title}</h1>
          <p>{itemsData.description}</p>
          <div className="flex flex-1 justify-center pt-8">
            <Link href="/#encars_devis" scroll={true}>
              <button
                className="bg-neutral-300 text-neutral-950 py-2 px-4 rounded-xl md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark"
              >
                <h3>Demande de devis</h3>
              </button>
            </Link>
          </div>
        </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 sm:mx-8 lg:mt-10 lg:mx-2">
      {itemsData.sousPage.map((item) => (
        <>
          <div key={item.id} className={`flex flex-col justify-center items-center ${!item?.urlWebp && `lg:col-start-1 lg:col-end-3 auto-rows-min`}`}>
              <h2 className="text-2xl md:text-3xl font-bold pt-4">{item.title}</h2>
              <p className="mx-4 pt-4 pb-8 sm:mx-0 sm:pb-4 lg:my-4 lg:mx-10">{item.description}</p>            
          </div>

          {item?.urlWebp &&
            <div key={item.id} className={`flex justify-center items-center sm:py-4 lg:my-8 imageBlog`}>
            <div className={`relative w-screen max-h-full h-[260px] sm:min-h-[380px] lg:min-h-[320px] lg:max-w-[560px] shadow-ha lg:mx-4 `}>
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
            </div>
            </div>
          }
        </>
      ))}
    </div>
    </div>
  </div>
  )
}