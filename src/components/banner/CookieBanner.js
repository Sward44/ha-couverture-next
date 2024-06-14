'use client';

import Link from 'next/link'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';

export default function CookieBanner(){

    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    
    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

    }, [cookieConsent]);

    return (        
        <div className={`${cookieConsent !== null ? "hidden" : "flex"} max-w-[340px] flex-col fixed bottom-3 left-3 right-3 z-30 mx-auto md:mx-0 bg-neutral-100 rounded-lg shadow-ha animate-apparitionBanner md:animate-apparitionBannerMd`}>
                <div className='p-4'>
                    <p>Nous utilisons Google Analytics voir les <Link href="/politique-confidentialite"><span className='underline md:hover:text-mahogany-950'>condition générales</span></Link> de ce site.</p>
                </div>
                <div className='flex justify-center gap-x-2 mb-4 mx-2'>
                    <button className=' py-2 text-neutral-700 bg-neutral-100 rounded-lg border-neutral-900 flex-1' onClick={() => setCookieConsent(false)}>Rennoncer</button>
                    <button className='bg-neutral-300 rounded-xl hover:md:scale-102 md:hover:bg-supernova-500 transition-all duration-300 flex-1 md:hover:shadow-ha md:hover:text-mahogany-950' onClick={() => setCookieConsent(true)}>Accepter</button>
                </div>
 
        </div>
    )}
