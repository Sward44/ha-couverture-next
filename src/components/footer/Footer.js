"use server";
import Link from "next/link";
import { Facebook, LinkedIn, LogoMobile, Send } from "@/components/logo/Logo";

export default async function Footer() {
  return (
    <footer className="relative top-[72px] flex flex-col items-center bg-neutral-950 text-neutral-100 md:top-[81px]">
      <div className="mx-8 my-4 sm:mx-2 lg:mx-6 xl:mx-8">
        <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-2 md:gap-6 lg:grid-cols-4 xl:gap-8">
          <div className="max-w-80 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:m-2 lg:max-w-none">
            <Link href="/" aria-label="Lien vers la page d'accueil">
              <span className="mb-3 flex items-center justify-center fill-neutral-100 transition duration-300 sm:justify-normal">
                <span className="mr-2 h-7 w-7 ">
                  <LogoMobile />
                </span>
                <h3 className="font-serif text-lg font-bold transition duration-300 hover:scale-102 sm:hover:text-supernova-500">
                  HA Couverture
                </h3>
              </span>
            </Link>
            <p>Notre histoire de Ha-couverture...</p>
          </div>
          <div className="max-w-80 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:m-2 lg:max-w-none ">
            <h3 className="mb-3 text-center text-lg font-serif sm:text-left">
              Mentions légales
            </h3>
            <p className="mb-1  transition-all duration-300 md:hover:text-supernova-500">
              <Link
                href="/politique-confidentialite"
                aria-label="Lien vers la page de politique confidentialité"
              >
                Politique de confidentialité
              </Link>
            </p>
            <p className="mb-1  transition-all duration-300 md:hover:text-supernova-500">
              <Link
                href="/politique-generale-utilisateur"
                aria-label="Lien vers la page de politique générale utilisateur"
              >
                CGU
              </Link>
            </p>
          </div>
          <div className="row-start-2 max-w-80 sm:col-start-2 sm:row-start-1 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:col-start-3 lg:m-2 lg:max-w-none">
            <h3 className="mb-3 text-center text-lg font-serif sm:text-left">
              Inscrivez-vous
            </h3>
            <p className="mb-2">
              Inscrivez-vous à nos emails d&apos;informations liéés au
              batiments.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Votre email"
                className="my-2 w-full rounded-lg px-4 py-2 text-neutral-950"
              />
              <div className="absolute right-3 top-1/2 size-4 -translate-y-1/2 fill-neutral-950">
                <Send />
              </div>
            </div>
          </div>
          <div className="max-w-80  sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:m-2 lg:max-w-none">
            <h3 className="mb-3 text-center text-lg font-serif sm:text-left">
              Rejoignez-nous
            </h3>
            <div className="flex justify-center sm:justify-start">
              <Link
                href="https://facebook.com/ha.couverture"
                target="_blank "
                rel="noopener noreferrer"
                alt="Lien vers Facebook"
                aria-label="Lien vers la page de profil Facebook de HA Couverture"
                className="mr-2 size-8 fill-neutral-100 transition-all duration-300 sm:text-left md:hover:scale-105 md:hover:fill-supernova-500"
              >
                <Facebook />
              </Link>
              <Link
                href="https://www.linkedin.com/company/ha-couverture"
                target="_blank "
                rel="noopener noreferrer"
                alt="Lien vers Facebook"
                aria-label="Lien vers la page de profil LinkedIn de HA Couverture"
                className="size-7 fill-neutral-100 transition-all duration-300 sm:text-left md:hover:scale-105 md:hover:fill-supernova-500"
              >
                <LinkedIn />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4">
        2024-Copyright@
        <a
          href="https://david-launay.com"
          target="_blank "
          rel="noopener noreferrer"
          className="transition-all duration-300 md:hover:text-supernova-500"
        >
          David Launay
        </a>
      </p>
      <p className="mb-4">N° de siret : 53366955200036</p>
    </footer>
  );
}
