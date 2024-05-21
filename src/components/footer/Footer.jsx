"use server";
import Link from "next/link";
import { LogoMobile } from "@/components/logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

async function Footer() {
  return (
    <footer className="flex flex-col items-center bg-neutral-950 text-neutral-100">
      <div className="my-4 mx-8 sm:mx-2 lg:mx-6 xl:mx-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-2 sm:gap-x-16 md:gap-6 xl:gap-8">
          <div className="max-w-80 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:max-w-none lg:m-2">
            <Link href="/">
              <div className="flex mb-3 items-center justify-center sm:justify-normal transition duration-300 fill-neutral-100">
                <div className="h-7 w-7 mr-2 "><LogoMobile /></div>
                <h3 className="font-bold text-lg font-serif transition duration-300 sm:hover:text-supernova-500 hover:scale-102">HA Couverture</h3>
                
              </div>
            </Link>
            <p>Notre histoire de Ha-couverture...</p>
          </div>
          <div className="max-w-80 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:max-w-none lg:m-2 ">
            <h3 className="text-center sm:text-left font-bold text-lg mb-3">Notre support</h3>
            <p className="mb-1">
              <Link href="/politique-confidentialite">
                Politique de confidentialité
              </Link>
            </p>
            <p className="mb-1">
              <Link href="/politique-generale-utilisateur">CGU</Link>
            </p>
          </div>
          <div className="max-w-80 sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:max-w-none lg:m-2 row-start-2 sm:col-start-2 sm:row-start-1 lg:col-start-3">
            <h3 className="text-center sm:text-left font-bold text-lg mb-3">Inscrivez-vous</h3>
            <p className="mb-2">
              Inscrivez-vous à nos emails d&apos;informations liéés au
              batiments.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Votre email"
                className="my-2 py-2 px-4 w-full rounded-lg text-neutral-950"
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className=" absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-950"
              />
            </div>
          </div>
          <div className="max-w-80  sm:max-w-[230px] md:max-w-[300px] md:pl-8 lg:max-w-none lg:m-2">
            <h3 className="font-bold text-lg mb-3 text-center sm:text-left">Rejoignez-nous</h3>
            <a
              href="https://facebook.com/ha.couverture"
              target="_blank "
              rel="noopener noreferrer"
              alt="Lien vers Facebook"
            >
              <div className="text-center sm:text-left">
              <FontAwesomeIcon
                icon={faSquareFacebook}
                className="size-7"
              />
              </div>
            </a>
          </div>
        </div>
      </div>
      <p className="my-4">
        2024-Copyright@
        <a
          href="https://david-launay.com"
          target="_blank "
          rel="noopener noreferrer"
        >
          David Launay
        </a>
      </p>
    </footer>
  );
}

export default Footer;
