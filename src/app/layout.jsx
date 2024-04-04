import connect from "@/utils/mongodb";
import Meta from "@/models/meta";
import { mulish, chonburi } from "@/fonts/fonts";
import "./globals.scss";
// import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID_HOME }).exec();

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
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body className={`${mulish.variable} ${chonburi.variable}`}>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-S1PS75LLG4" /> */}
    </html>
  );
}
