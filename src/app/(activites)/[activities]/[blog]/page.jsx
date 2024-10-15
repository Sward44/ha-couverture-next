"use server";
import { connectMongoose } from "@/utils/mongodb";
import Image from "next/image";
import { BlogModel, SousPageModel, MetaModel, PageModel } from "@/models";
import { getEnvVarForBlog } from "@/app/(activites)/layout";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DashBoardMeta } from "@/components/dashboard/DashBoardMeta";
import { DashBoardPageMain } from "@/components/dashboard/DashBoardPage";
import { Header } from "@/components/dashboard/header/Header";

const activityEachPageMap = {
  blog: ["renovation-verenda-pouliguen"],
  dashboard: [
    "couverture",
    "zinguerie",
    "isolation",
    "nettoyage",
    "charpente",
    "travaux-divers",
    "connexion",
    "inscription",
    "avis-clients",
  ],
};

function isValidBlogForActivity(activity, blog) {
  return (
    activityEachPageMap[activity] &&
    activityEachPageMap[activity].includes(blog)
  );
}

export async function generateMetadata({ params }) {
  const { activities: activity, blog } = params;

  if (!isValidBlogForActivity(activity, blog)) {
    notFound(); // Redirige vers la page 404 si le blog n'est pas valide pour cette activité
  } else if (activity.includes("blog")) {
    let formattedBlog = blog;
    if (blog === "renovation-verenda-pouliguen" || blog === "travaux-divers")
      formattedBlog = blog.replaceAll("-", "");
    const metaId = await getEnvVarForBlog(formattedBlog, "meta");

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
}

export default async function blogPage({ params }) {
  const { activities: activity, blog } = params;

  if (!isValidBlogForActivity(activity, blog)) {
    notFound(); // Redirige vers la page 404 si le blog n'est pas valide pour cette activité
  } else if (activity.includes("blog")) {
    let formattedBlog = blog;
    if (blog === "renovation-verenda-pouliguen")
      formattedBlog = blog.replaceAll("-", "");
    const pageId = await getEnvVarForBlog(formattedBlog, "page");

    await connectMongoose();
    const Data = await BlogModel.findOne({
      _id: pageId,
    })
      .lean()
      .exec();
    const DataSousPage = await SousPageModel.find({ blogId: pageId })
      .sort({ index: 1 })
      .lean()
      .exec();

    const itemsData = {
      id: Data._id,
      title: Data.title,
      description: Data.description,
      sousPage: DataSousPage.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        urlWebp: item?.urlWebp || null,
        altWebp: item?.altWebp || null,
      })),
      urlWebp: Data.urlWebp,
      altWebp: Data.altWebp,
    };

    return (
      <div className="relative top-[72px] flex min-h-[calc(100vh-72px)] w-full flex-col md:top-[81px] md:min-h-[calc(100vh-81px)]">
        <div className="mx-auto mb-4 max-w-[1400px] lg:mb-12">
          <div
            key={itemsData.id}
            className="mb-8 grid grid-cols-1 sm:mx-8 lg:mx-2 lg:grid-cols-2"
          >
            <div className="max-w-screen relative size-full min-h-[400px] shadow-ha sm:mt-8 sm:min-h-[440px] lg:min-h-[500px] xl:h-[600px] xl:min-w-[600px]">
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
            <div className="mx-4 mt-6 flex flex-col justify-center sm:mx-0 lg:mx-8">
              <h1 className="flex flex-1 items-end py-4 font-serif text-2xl font-bold sm:py-8 md:text-3xl">
                {itemsData.title}
              </h1>
              <p>{itemsData.description}</p>
              <div className="flex flex-1 justify-center pt-8">
                <Link href="/#encars_devis" scroll={true}>
                  <button className="rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-haDark">
                    <h3>Demande de devis</h3>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:mx-8 lg:mx-2 lg:mt-10 lg:grid-cols-2 lg:gap-5">
            {itemsData.sousPage.map((item) => (
              <>
                <div
                  key={item.id}
                  className={`flex flex-col items-center justify-center ${
                    !item?.urlWebp &&
                    `auto-rows-min lg:col-start-1 lg:col-end-3`
                  }`}
                >
                  <h2 className="pt-4 text-2xl font-bold md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mx-4 pb-8 pt-4 sm:mx-0 sm:pb-4 lg:mx-10 lg:my-4">
                    {item.description}
                  </p>
                </div>

                {item?.urlWebp && (
                  <div
                    key={item.id}
                    className={`imageBlog flex items-center justify-center sm:py-4 lg:my-8`}
                  >
                    <div
                      className={`relative h-[260px] max-h-full w-screen shadow-ha sm:min-h-[380px] lg:mx-4 lg:min-h-[320px] lg:max-w-[560px] `}
                    >
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
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (activity.includes("dashboard")) {
    let formattedBlog = blog;
    if (blog === "travaux-divers" || blog === "avis-clients")
      formattedBlog = blog.replaceAll("-", "");
    const metaId = await getEnvVarForBlog(formattedBlog, "meta");
    await connectMongoose();
    const metaData = await MetaModel.findOne({ _id: metaId }).lean().exec();
    const metaDataId = {
      _id: metaData._id,
      title: metaData.title,
      description: metaData.description,
      keyword: metaData.keywords,
      titleRS: metaData.openGraph.title,
      descriptionRS: metaData.openGraph.description,
      url: metaData.openGraph.images.url,
      alt: metaData.openGraph.images.alt,
      width: metaData.openGraph.images.width,
      height: metaData.openGraph.images.height,
    };

    const metaSearchData = JSON.parse(JSON.stringify(metaDataId));
    const url = metaData.openGraph.url;

    const pageId = await getEnvVarForBlog(formattedBlog, "page");
    const titleData = await PageModel.findOne({ _id: pageId }).lean().exec();
    let view = true;
    if (
      titleData._id.toString() === process.env.PAGE_ID_CONN ||
      titleData._id.toString() === process.env.PAGE_ID_INSC
    ) {
      view = false;
    }

    const Data = await SousPageModel.find({ _pageId: pageId })
      .sort({ index: 1 })
      .lean()
      .exec();

    const pageData = Data.map((item) => ({
      _id: item._id,
      metaId: metaData._id,
      title: item.title,
      description: item.description,
      urlWebp: item.urlWebp,
      position: item.position,
      altWebp: item.altWebp,
    }));

    const pageSearchData = JSON.parse(JSON.stringify(pageData));

    return (
      <>
        <div className="relative top-[72px] flex h-full min-h-[calc(100vh-72px)] w-full flex-col px-4 md:top-[81px] md:min-h-[calc(100vh-81px)] lg:px-0">
          <Header url={url} />
          <div className="my-10 flex h-full w-full flex-col items-center justify-center rounded-xl bg-neutral-100 shadow-ha sm:w-full lg:mx-auto lg:max-w-[960px]  xl:max-w-[1240px] 2xl:max-w-[1500px]">
            <h2 className="my-4 px-6 text-xl font-bold sm:px-2 sm:text-2xl">
              Balises metadonnées pour Google, Bing, etc...{" "}
            </h2>
            <DashBoardMeta meta={metaSearchData} />
          </div>
          {view && (
            <>
              <Header url={url} />
              <div className="my-10 flex h-full w-full flex-col items-center justify-center rounded-xl bg-neutral-100 shadow-ha lg:mx-auto lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1500px]">
                <h2
                  key={titleData._id}
                  className="my-4 px-6 text-xl font-bold sm:px-2 sm:text-2xl"
                >
                  Page {titleData.title}
                </h2>
                {pageSearchData.map((item) => (
                  <div
                    key={item._id}
                    className="mt-8 flex h-full w-full flex-col px-4 lg:min-w-[860px] lg:px-12 xl:min-w-[1160px] 2xl:min-w-[1400px]"
                  >
                    <DashBoardPageMain page={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
