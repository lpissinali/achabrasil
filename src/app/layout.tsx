import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const DESCRIPTION =
  "Acha as passagens aéreas mais baratas do Brasil. Compare voos da GOL, LATAM e Azul, descubra o melhor dia para voar e receba alertas de preço - tudo em português e em reais.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - Passagens aéreas baratas pelo Brasil`,
    template: `%s - ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  keywords: [
    "passagens aéreas baratas",
    "voos baratos brasil",
    "comparar voos",
    "passagens GOL LATAM Azul",
    "promoção de passagens",
    "voos em promoção",
    "achar passagem barata",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} - Passagens aéreas baratas pelo Brasil`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Passagens aéreas baratas`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE.url },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#0e9b8e",
  width: "device-width",
  initialScale: 1,
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  description: DESCRIPTION,
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "pt-BR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }} />
        {/* Travelpayouts AchaBrasil verification loader - runs on every page */}
        <Script id="travelpayouts" strategy="afterInteractive">
          {`(function () { var s = document.createElement("script"); s.async = 1; s.src = "https://emrld.ltd/NTQwMzMx.js?t=540331"; document.head.appendChild(s); })();`}
        </Script>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
