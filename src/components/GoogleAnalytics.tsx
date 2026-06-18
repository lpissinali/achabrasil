"use client";

import Script from "next/script";

/**
 * GA4 with Google Consent Mode v2. Analytics storage defaults to "denied"
 * and is granted only after the user accepts in the cookie banner
 * (CookieConsent writes ab_consent_v1 and calls gtag consent update).
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set.
 */
export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var __c='denied';try{var s=JSON.parse(localStorage.getItem('ab_consent_v1')||'null');if(s&&s.value==='all')__c='granted';}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:__c});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
