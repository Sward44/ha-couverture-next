import connect from "../../Mongoose";
import Meta from "../../models/Meta";
import { mulish, chonburi } from "@/fonts/fonts";
import "./globals.scss";
import Header from "@/components/header/Header";

export async function generateMetadata() {
  await connect();
  const data = await Meta.findOne({ _id: process.env.META_ID }).exec();
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
      url: `${process.env.HOST}`,
      type: data.openGraph.type,
      images: {
        url: `${process.env.HOST}${data.openGraph.images.url}`,
        alt: data.openGraph.images.alt,
        width: data.openGraph.images.width,
        height: data.openGraph.images.height,
      },
    },
    manifest: data.manifest,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${mulish.variable} ${chonburi.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
