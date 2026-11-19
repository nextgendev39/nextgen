import Script from "next/script";
import { integrations } from "@/lib/site";

/**
 * Google Tag Manager or Google Analytics 4, loaded after the page is
 * interactive so they never block rendering. Set NEXT_PUBLIC_GTM_ID to use
 * GTM (configure GA4 inside the container), or NEXT_PUBLIC_GA_ID for GA4 on
 * its own. With neither set, nothing is loaded.
 *
 * Note: if you serve visitors in the UK/EU, add a consent banner and Google
 * Consent Mode before enabling these in production.
 */
export function Analytics() {
  const { gtmId, gaId } = integrations;

  if (gtmId) {
    return (
      <>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      </>
    );
  }

  if (gaId) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
        </Script>
      </>
    );
  }

  return null;
}
