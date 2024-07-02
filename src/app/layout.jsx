"use server";
import { connect } from "@/utils/mongodb";
import { MetaModel } from "@/models";
import "@/app/globals.scss";
import Header from "@/components/header/Header";
import AuthProvider from "@/utils/SessionProvider";
// import CookieBanner from "@/components/banner/CookieBanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export async function generateMetadata() {
  await connect();
  const data = await MetaModel.findOne({
    _id: process.env.META_ID_HOME,
  }).exec();

  return {
    title: data.title,
    description: data.description,
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
  };
}

export default async function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Header />
            <Suspense>
                {children}
            </Suspense>
          <ToastContainer />
        </AuthProvider>
        {/* <CookieBanner /> */}
      </body>
    </html>
  );
}
