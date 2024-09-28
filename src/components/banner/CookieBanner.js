"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

const ConsentBanner = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem("consent_status");
    if (storedConsent) {
      const consentObject = JSON.parse(storedConsent);
      if (new Date(consentObject.expiresAt) < new Date()) {
        localStorage.removeItem("consent_status");
        setConsent("pending");
      } else {
        setConsent(consentObject.status);
        sendGTMEvent({
          event: "consent_update",
          consent_status: consentObject.status,
        });
        if (typeof window.gtag === "function") {
          updateGTMConsent(consentObject.status);
        }
      }
    } else {
      setConsent("pending");
      sendGTMEvent({ event: "default_consent_state" });
    }
  }, []);

  const handleConsent = (status) => {
    const expirationDays = status === "granted" ? 365 : 10;
    const consentData = {
      status,
      expiresAt: new Date(
        Date.now() + expirationDays * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
    localStorage.setItem("consent_status", JSON.stringify(consentData));
    setConsent(status);
    sendGTMEvent({ event: "consent_update", consent_status: status });
    if (typeof window.gtag === "function") {
      updateGTMConsent(status);
    }
  };

  const updateGTMConsent = (status) => {
    const consentSettings = {
      ad_storage: status === "granted" ? "granted" : "denied",
      analytics_storage: status === "granted" ? "granted" : "denied",
      ad_user_data: status === "granted" ? "granted" : "denied",
      ad_personalization: status === "granted" ? "granted" : "denied",
      personalization_storage: status === "granted" ? "granted" : "denied",
      functionality_storage: status === "granted" ? "granted" : "denied",
      security_storage: status === "granted" ? "granted" : "denied",
    };
    window.gtag("consent", "update", consentSettings);
  };

  if (consent !== "pending") {
    return null;
  }

  return (
    <div
      className={` fixed bottom-3 left-3 right-3 z-30 mx-auto max-w-[340px] animate-apparitionBanner flex-col rounded-lg bg-neutral-100 shadow-ha md:mx-0 md:animate-apparitionBannerMd`}
    >
      <div className="p-4">
        <p>
          Nous utilisons Google Analytics voir les{" "}
          <Link
            href="/politique-confidentialite"
            aria-label="Lien vers la page de politique confidentialité"
          >
            <span className="underline md:hover:text-mahogany-950">
              condition générales
            </span>
          </Link>{" "}
          de ce site.
        </p>
      </div>
      <div className="mx-2 mb-4 flex justify-center gap-x-2">
        <button
          className=" flex-1 rounded-lg border-neutral-900 bg-neutral-100 py-2 text-neutral-700"
          onClick={() => handleConsent("denied")}
        >
          Rennoncer
        </button>
        <button
          className="flex-1 rounded-xl bg-neutral-300 transition-all duration-300 hover:md:scale-102 md:hover:bg-supernova-500 md:hover:text-mahogany-950 md:hover:shadow-ha"
          onClick={() => handleConsent("granted")}
        >
          Accepter
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
