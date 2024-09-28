"use server";

export default async function Conditions({ itemData }) {
  return (
    <>
      <div className="min-h-screen w-full">
        <div className="relative top-[72px] flex w-full flex-col md:top-[81px]">
          <div className="my-4 flex justify-center">
            <h1 className="text-center text-[32px] font-bold text-neutral-950 md:text-[42px]">
              {itemData[0].title}
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid-rows-auto mb-8 mt-[72px] grid max-w-[940px] px-5 md:mt-[81px]">
            <div className="mb-4">
              <p>{itemData[0].introduction}</p>
            </div>
            {itemData[0].article.map((item, index) => (
              <div key={index} className="my-2">
                <h2 className="pb-2 text-xl font-bold">{item.title}</h2>
                {item.description.map((item2, index2) => (
                  <p key={index2}>{item2}</p>
                ))}

                <ul>
                  {item.intitule.map((item1, index1) => (
                    <li key={index1} className="pl-6 pt-2">
                      {item1}
                    </li>
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
