"use client";
import HeaderDashBoard from "@/components/dashboard/header/HeaderDashBoard";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";
import React from "react";

export function DynamicUrl({ urlBase, session }) {
  const pathname = usePathname();
  const [initialUrlBase, setInitialUrlBase] = React.useState(urlBase);

  React.useEffect(() => {
    setInitialUrlBase(pathname);
  }, [pathname]);

  if (initialUrlBase?.includes("dashboard")) {
    return <HeaderDashBoard session={session} />;
  } else {
    return <Header session={session} />;
  }
}

const UrlBaseContext = React.createContext();

export function UrlBaseProvider({ children, initialUrlBase }) {
  const [urlBase, setUrlBase] = React.useState(initialUrlBase);

  return (
    <UrlBaseContext.Provider value={{ urlBase, setUrlBase }}>
      {children}
    </UrlBaseContext.Provider>
  );
}

function useUrlBase() {
  return useContext(UrlBaseContext);
}

export function DynamicMetadata() {
  const { urlBase } = useUrlBase();

  useEffect(() => {
    const updateMetadata = async () => {
      if (!urlBase?.includes("dashboard")) {
        // const response = await fetch("/api/metadata");
        // const data = await response.json();
        // document.title = data.title;
        // document
        //   .querySelector('meta[name="description"]')
        //   .setAttribute("content", data.description);
        // // Mettez à jour d'autres métadonnées ici...
      }
    };

    updateMetadata();
  }, [urlBase]);

  return null;
}
