'use client';
import { setCookie, hasCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import Link from 'next/link';

export default function CookieBanner(){
    const gaMesurementId = process.env.NEXT_PUBLIC_GA_MESUREMENT_ID;
    const gaDataLayerName = 'dataLayer';
    const ga = new GoogleAnalytics(gaMesurementId, gaDataLayerName);
    
    const [showConsent, setShowConsent] = useState(false);

    const handleConsent = (consent) => {
        if (consent === 'true') {
          sendEvent('accept_cookies', {
            'cookie_category': 'necessary',
          });
        } else {
          sendEvent('decline_cookies', {
            'cookie_category': 'non-necessary',
          });
        }
      };

    const acceptConsent = () => {
        setShowConsent(false);
        setCookie("consent", "true", {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)});
            
        handleConsent('true');
    };

    const refuseConsent = () => {
        setShowConsent(false);
        setCookie("consent", "false", {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)});
        handleConsent('false');
    };

    useEffect (() => {
        if(!hasCookie("consent")) {
            setShowConsent(true);
        }
    }, [])

    if(!showConsent) return null;


    const sendEvent = (event, data) => {
        ga.sendEvent(event, data);
    };

    return (        
        <div className={` max-w-[340px] flex-col fixed bottom-3 left-3 right-3 z-30 mx-auto md:mx-0 bg-neutral-100 rounded-lg shadow-ha animate-apparitionBanner md:animate-apparitionBannerMd`}>
                <div className='p-4'>
                    <p>Nous utilisons Google Analytics voir les <Link href="/politique-confidentialite" aria-label="Lien vers la page de politique confidentialité"><span className='underline md:hover:text-mahogany-950'>condition générales</span></Link> de ce site.</p>
                </div>
                <div className='flex justify-center gap-x-2 mb-4 mx-2'>
                    <button className=' py-2 text-neutral-700 bg-neutral-100 rounded-lg border-neutral-900 flex-1' onClick={refuseConsent}>Rennoncer</button>
                    <button className='bg-neutral-300 rounded-xl hover:md:scale-102 md:hover:bg-supernova-500 transition-all duration-300 flex-1 md:hover:shadow-ha md:hover:text-mahogany-950' onClick={acceptConsent}>Accepter</button>
                </div>
 
        </div>
    )};
