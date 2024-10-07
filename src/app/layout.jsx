"use server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { connectMongoose } from "@/utils/mongodb";
import { MetaModel } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { headers } from "next/headers";
// import PathNameNow from "@/utils/PathNameNow";
import "@/app/globals.scss";
import AuthProvider from "@/utils/SessionProvider";
import CookieBanner from "@/components/banner/CookieBanner";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { DynamicUrl } from "@/hooks/DynamicUrl";

export async function generateMetadata() {
  const urlBase = headers().get("x-current-path");
  if (!urlBase?.includes("dashboard")) {
    await connectMongoose();
    const data = await MetaModel.findOne({
      _id: process.env.META_ID_HOME,
    }).exec();

    return {
      title: data.title,
      description: data.description,
      keywords:
        "travaux de couverture, rénovation de toiture, fenêtre de toit, qualibat, faites appel, goutières, isolation thermique, équipe de professionels, eco artisan, installeur, qualifiée, demande de devis, Nantes, Saint-Nazaire, Cholet, la Roche-sur-Yon, Loire-Atlantique, Vendée",
      icons: {
        icon: data.icons.icon,
        shortcut: data.icons.shortcut,
        android: data.icons.android,
        apple: data.icons.apple,
      },
      openGraph: {
        title: data.openGraph.title,
        description: data.openGraph.description,
        url: process.env.NEXT_PUBLIC_HOST,
        type: data.openGraph.type,
        images: {
          url: `${process.env.NEXT_PUBLIC_HOST}${data.openGraph.images.url}`,
          alt: data.openGraph.images.alt,
          width: data.openGraph.images.width,
          height: data.openGraph.images.height,
        },
      },
      manifest: data.manifest,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      other: {
        subject:
          "Professionnel du BTP, spécialisé dans les travaux de couverture, zinguerie, isolation, charpente, nettoyage, travaux divers et pose de fenêtre de toit.",
        language: "fr-FR",
        author: "David Launay",
        owner: ["Abraham Hognon", "David Santiago"],
        copyright: "Ha Couverture",
        coverage: [
          "Loire-Atlantique",
          "Bretagne",
          "Vendée",
          "Maine-et-Loire",
          "Pays de la loire",
        ],
        email: "ha.couverture44@gmail.com",
        phone_number: "+33634266400",
        latitude: "47.12633139433206",
        longitude: "-1.645738623465296",
        street_address: "4 Impasse de Pontrigné",
        postal_code: "44860",
        locality: "Saint-Aignan-Grandlieu",
        region: "Pays de la Loire",
        country: "France",
      },
    };
  }
}

export default async function RootLayout({ children }) {
  const gaMesurementId = process.env.NEXT_PUBLIC_GA_MESUREMENT_ID;
  const gtmMesurementId = process.env.NEXT_PUBLIC_GTM_MESUREMENT_ID;
  const session = await getServerSession(authOptions);
  const urlBase = headers().get("x-current-path");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        name: "Couverture",
        position: 1,
        url: `${process.env.NEXT_PUBLIC_HOST}/couverture`,
      },
      {
        "@type": "ListItem",
        name: "Zinguerie",
        position: 2,
        url: `${process.env.NEXT_PUBLIC_HOST}/zinguerie`,
      },
      {
        "@type": "ListItem",
        name: "Nettoyage",
        position: 3,
        url: `${process.env.NEXT_PUBLIC_HOST}/nettoyage`,
      },
      {
        "@type": "ListItem",
        name: "Isolation",
        position: 4,
        url: `${process.env.NEXT_PUBLIC_HOST}/isolation`,
      },
      {
        "@type": "ListItem",
        name: "Charpente",
        position: 5,
        url: `${process.env.NEXT_PUBLIC_HOST}/charpente`,
      },
      {
        "@type": "ListItem",
        name: "Réparations diverses",
        position: 6,
        url: `${process.env.NEXT_PUBLIC_HOST}/travaux-divers`,
      },
    ],
  };

  return (
    <html lang="fr-FR">
      <head>
        {urlBase === "/" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <GoogleTagManager gtmId={gtmMesurementId} />
      </head>
      <body>
        <AuthProvider>
          <DynamicUrl urlBase={urlBase} session={session} />
          <Suspense>{children}</Suspense>
          <ToastContainer />
        </AuthProvider>
        <CookieBanner />
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={gaMesurementId} />
    </html>
  );
}
