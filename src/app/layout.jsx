import connect from "@/utils/mongodb";
import { MetaModel } from "@/models";
import { mulish, chonburi } from "@/fonts/fonts";
import "./globals.scss";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/utils/SessionProvider";

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
      <body className={`${mulish.variable} ${chonburi.variable}`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-S1PS75LLG4" />
    </html>
  );
}
