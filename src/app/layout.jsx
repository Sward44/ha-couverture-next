"use server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { connectMongoose } from "@/utils/mongodb";
import { MetaModel } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
// import PathNameNow from "@/utils/PathNameNow";
import "@/app/globals.scss";
import Header from "@/components/header/Header";
import AuthProvider from "@/utils/SessionProvider";
import CookieBanner from "@/components/banner/CookieBanner";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export async function generateMetadata() {
    await connectMongoose();
    const data = await MetaModel.findOne({
      _id: process.env.META_ID_HOME,
    }).exec();
  
    return {
      title: data.title,
      description: data.description,
      robots: data.robots,
      keywords: "travaux de couverture, rénovation de toiture, fenêtre de toit, qualibat, faites appel, goutières, isolation thermique, équipe de professionels, eco artisan, installeur, qualifiée, demande de devis, Nantes, Saint-Nazaire, Cholet, la Roche-sur-Yon, Loire-Atlantique, Vendée",
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
        index : true,
        follow:true,
        googleBot: {
          index:true,
          follow:true,
        }
      },
      other: {
        subject: "Professionnel du BTP, spécialisé dans les travaux de couverture, zinguerie, isolation, charpente, nettoyage, travaux divers et pose de fenêtre de toit.",
        language: "fr_FR",
        author:"David Launay",
        owner:["Abraham Hognon", "David Santiago"],
        copyright:"Ha Couverture",
        coverage:["Loire-Atlantique", "Bretagne", "Vendée", "Maine-et-Loire","Pays de la loire"],
        emil: "ha.couverture44@gmail.com",
        phone_number:"+33634266400",
        latitude: "47.12633139433206",
        longitude: "-1.645738623465296",
        street_address: "4 Impasse de Pontrigné",
        postal_code: "44860",
        locality: "Saint-Aignan-Grandlieu",
        region: "Pays de la Loire",
        country:"France",    
      },
    };
  }


export default async function RootLayout( { children }) {
  const gaMesurementId = process.env.NEXT_PUBLIC_GA_MESUREMENT_ID
  const gtmMesurementId = process.env.NEXT_PUBLIC_GTM_MESUREMENT_ID;
  const session = await getServerSession(authOptions)
  
    return (
      <html lang="FR_fr">
        <head>
          <GoogleTagManager gtmId={gtmMesurementId} />
        </head>
        <body>
          <AuthProvider>
            <Header session={session}/>
              <Suspense>
                  {children}
              </Suspense>
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
