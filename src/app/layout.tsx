import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - Passagens aereas baratas pelo Brasil`,
    template: `%s - ${SITE.name}`,
  },
  description:
    "Acha as passagens aereas mais baratas do Brasil. Compare voos da GOL, LATAM e Azul, descubra o melhor dia para voar e receba alertas de preco - tudo em portugues.",
  keywords: [
    "passagens aereas baratas",
    "voos baratos brasil",
    "comparar voos",
    "passagens GOL LATAM Azul",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    url: SITE.url,
  },
  alternates: { canonical: SITE.url },
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
        {/* Travelpayouts affiliate loader - runs on every page */}
        <Script id="travelpayouts" strategy="afterInteractive">
          {`(function () { var s = document.createElement("script"); s.async = 1; s.src = "https://emrld.ltd/NTM5NTQ0.js?t=539544"; document.head.appendChild(s); })();`}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
