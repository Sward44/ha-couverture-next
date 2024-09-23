"use server";
import Footer from "@/components/footer/Footer";
import { notFound } from "next/navigation";

export async function getEnvVarForActivity(activity, type) {
  const mapping = {
    couverture: {
      meta: process.env.META_ID_COUV,
      page: process.env.PAGE_ID_COUV,
    },
    zinguerie: {
      meta: process.env.META_ID_ZING,
      page: process.env.PAGE_ID_ZING,
    },
    nettoyage: {
      meta: process.env.META_ID_NETT,
      page: process.env.PAGE_ID_NETT,
    },
    isolation: {
      meta: process.env.META_ID_ISOL,
      page: process.env.PAGE_ID_ISOL,
    },
    charpente: {
      meta: process.env.META_ID_CHAR,
      page: process.env.PAGE_ID_CHAR,
    },
    travaux: {
      meta: process.env.META_ID_TRAV,
      page: process.env.PAGE_ID_TRAV,
    },
    avis: {
      meta: process.env.META_ID_AVIS,
      page: process.env.PAGE_ID_AVIS,
    },
    connexion: {
      meta: process.env.META_ID_CONN,
      page: process.env.PAGE_ID_CONN,
    },
    inscription: {
      meta: process.env.META_ID_INSC,
      page: process.env.PAGE_ID_INSC,
    },
    mot: {
      meta: process.env.META_ID_PASS,
      page: process.env.PAGE_ID_PASS,
    },
    user: {
      meta: process.env.META_ID_USER,
      page: process.env.PAGE_ID_USER,
    },
    blog: {
      meta: process.env.META_ID_BLOG,
      page: process.env.PAGE_ID_BLOG,
    }

  };

  if (!mapping[activity] ) {
    notFound();
  }

  return mapping[activity][type];
}



export default async function ActivitesLayout({ children }) {
  return (
    <>
    {children}
    <Footer />
    </>
  )
}