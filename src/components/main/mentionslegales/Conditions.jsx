"use server";

export default async function Conditions({itemData}) {

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="relative flex flex-col w-full top-[72px] md:top-[81px]">
          <div className="flex justify-center my-4">
            <h1 className="font-bold text-neutral-950 text-[32px] md:text-[42px] text-center">
            {itemData[0].title}
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid max-w-[940px] grid-rows-auto mt-[72px] md:mt-[81px] px-5 mb-8">
            <div className="mb-4">
              <p>
                {itemData[0].introduction}
              </p>
            </div>
            {itemData[0].article.map((item, index) => (
              <div key={index} className="my-2">
                <h2 className="font-bold text-xl pb-2">{item.title}
                </h2>
                {item.description.map((item2, index2) => (
                  <p key={index2}>
                    {item2}
                  </p>
                ))}

                <ul>
                  {item.intitule.map((item1, index1) => (
                    <li
                      key={index1}
                      className="pl-6 pt-2"
                    >{item1}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="my-4 text-right">
              <p>{itemData[0].MAJ}</p>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
