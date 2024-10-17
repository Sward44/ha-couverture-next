"use client";
import React from "react";
import {
  Star,
  StarTroisHuitieme,
  StarUnQuart,
  StarUnDemi,
  StarTroisQuart,
  StarCinqHuitieme,
  Trophy,
  StarUnHuitieme,
  StarSeptHuitieme,
} from "@/components/logo/Logo";
import { useSession } from "next-auth/react";
import { useViewport } from "@/hooks/viewPort";
import FormAvisClients from "@/components/form/FormAvisClients";
import Link from "next/link";

export default function AvisGlobal({
  Note,
  NoteEntiere,
  NoteDecimal,
  NoteAvis,
}) {
  const { isMobile, isTablet } = useViewport();
  const { data: session, status } = useSession();
  const [addForm, setAddForm] = React.useState(false);

  function handleForm(e) {
    if (e) {
      e.preventDefault();
    }

    setAddForm(!addForm);
  }

  return (
    <>
      <div className="mb-2 mt-6 w-full md:mb-6 md:mt-12 md:w-auto">
        <div className="w-full rounded-lg bg-neutral-100 px-6 py-4 shadow-ha md:w-[720px]">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-serif">
            Note moyenne de Ha Couverture
          </h2>
          <p className="mb-6 text-center text-sm">
            Découvrez tous les avis de nos clients
          </p>

          {isMobile || isTablet ? (
            <>
              <div className="mx-auto mb-8 flex max-w-[320px] items-center justify-between sm:max-w-[420px]">
                <div className="flex size-24 flex-col items-center justify-center rounded-full bg-supernova-500 p-6 sm:size-32">
                  <span className="size-8 fill-neutral-950 sm:size-10">
                    <Trophy />
                  </span>
                  <span className="text-xs font-bold text-neutral-950 sm:text-sm">
                    {Note}/5
                  </span>
                  <span className="text-xs font-bold text-neutral-950 sm:text-sm">
                    {NoteAvis} avis
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className=" mb-2 text-sm md:text-lg ">
                    Note globale :{" "}
                    <span className="text-lg font-bold md:text-xl">{Note}</span>
                    /5
                  </span>
                  <div className="sm:mb-none flex justify-center">
                    {[...Array(5)].map((_, index) => {
                      if (NoteEntiere > index) {
                        return (
                          <span
                            key={index}
                            className="mr-1 size-6 fill-supernova-500 md:size-8"
                          >
                            <Star />
                          </span>
                        );
                      } else if (NoteEntiere === index) {
                        if (NoteDecimal < (1 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (1 / 4) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnQuart />
                            </span>
                          );
                        } else if (NoteDecimal < (3 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarTroisHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (1 / 2) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnDemi />
                            </span>
                          );
                        } else if (NoteDecimal < (5 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarCinqHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (3 / 4) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarTroisQuart />
                            </span>
                          );
                        } else if (NoteDecimal < (7 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarSeptHuitieme />
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-supernova-500 md:size-8"
                            >
                              <Star />
                            </span>
                          );
                        }
                      } else {
                        return (
                          <span
                            key={index}
                            className="mr-1 size-6 fill-neutral-500 md:size-8"
                          >
                            <Star />
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                {status === "authenticated" && session ? (
                  <button
                    onClick={handleForm}
                    className="rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-ha"
                  >
                    Ajouter votre avis
                  </button>
                ) : (
                  <Link
                    href="/connexion"
                    className="rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-ha"
                  >
                    Ajouter votre avis
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex size-24 flex-col items-center justify-center rounded-full bg-supernova-500 p-6 sm:size-32">
                  <span className="size-8 fill-neutral-950 sm:size-10">
                    <Trophy />
                  </span>
                  <span className="text-xs font-bold text-neutral-950 sm:text-sm">
                    {Note}/5
                  </span>
                  <span className="text-xs font-bold text-neutral-950 sm:text-sm">
                    {NoteAvis} avis
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className=" mb-2 text-sm sm:mr-4 md:text-lg">
                    Note globale :{" "}
                    <span className="text-lg font-bold md:text-xl">{Note}</span>
                    /5
                  </span>
                  <div className="sm:mb-none mb-6 flex justify-center">
                    {[...Array(5)].map((_, index) => {
                      if (NoteEntiere > index) {
                        return (
                          <span
                            key={index}
                            className="mr-1 size-6 fill-supernova-500 md:size-8"
                          >
                            <Star />
                          </span>
                        );
                      } else if (NoteEntiere === index) {
                        if (NoteDecimal < (1 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (1 / 4) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnQuart />
                            </span>
                          );
                        } else if (NoteDecimal < (3 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarTroisHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (1 / 2) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarUnDemi />
                            </span>
                          );
                        } else if (NoteDecimal < (5 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarCinqHuitieme />
                            </span>
                          );
                        } else if (NoteDecimal < (3 / 4) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarTroisQuart />
                            </span>
                          );
                        } else if (NoteDecimal < (7 / 8) * 100) {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-neutral-500 md:size-8"
                            >
                              <StarSeptHuitieme />
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={index}
                              className="mr-1 size-6 fill-supernova-500 md:size-8"
                            >
                              <Star />
                            </span>
                          );
                        }
                      } else {
                        return (
                          <span
                            key={index}
                            className="mr-1 size-6 fill-neutral-500 md:size-8"
                          >
                            <Star />
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className={`flex justify-center`}>
                  {status === "authenticated" && session ? (
                    <button
                      onClick={handleForm}
                      className="rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-ha"
                    >
                      Ajouter votre avis
                    </button>
                  ) : (
                    <Link
                      href="/connexion"
                      className="rounded-xl bg-neutral-300 px-4 py-2 text-neutral-950 transition-all duration-300 md:hover:scale-101 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-ha"
                    >
                      Ajouter votre avis
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {addForm && <FormAvisClients handleForm={handleForm} session={session} />}
    </>
  );
}
