import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0d7334",
};

const SITE_URL = "https://jamnas.id";
const SITE_NAME = "Jamnasindo";
const SITE_DESCRIPTION =
  "Jamnasindo (PT. Jaminan Nasional Indonesia) — konsultan perizinan dan administrasi bisnis travel Umroh & Haji: PPIU, PIHK, IATA, akreditasi, bank garansi, surety bond, dan laporan keuangan. Grow ur business with us.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jamnasindo — Konsultan Perizinan Travel Umroh & Haji",
    template: "%s | Jamnasindo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "konsultan PPIU",
    "perizinan PPIU",
    "perizinan PIHK",
    "akreditasi PPIU",
    "konsultan travel umroh",
    "konsultan travel haji",
    "IATA travel agent",
    "bank garansi umroh",
    "surety bond travel",
    "izin travel umroh",
    "Jamnasindo",
  ],
  applicationName: SITE_NAME,
  category: "business",
  authors: [{ name: "PT. Jaminan Nasional Indonesia", url: SITE_URL }],
  creator: "PT. Jaminan Nasional Indonesia",
  publisher: "PT. Jaminan Nasional Indonesia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Jamnasindo — Konsultan Perizinan Travel Umroh & Haji",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png?v=2",
        width: 1200,
        height: 630,
        alt: "Jamnasindo — grow ur business with us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamnasindo — Konsultan Perizinan Travel Umroh & Haji",
    description: SITE_DESCRIPTION,
    images: ["/og.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const ORG_ID = `${SITE_URL}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: SITE_NAME,
      legalName: "PT. Jaminan Nasional Indonesia",
      alternateName: "Jamnasindo",
      slogan: "Grow ur business with us",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/og.png`,
      description: SITE_DESCRIPTION,
      telephone: "+6281213972604",
      email: "admin@jamnas.id",
      priceRange: "$$",
      sameAs: ["https://www.google.com/search?kgmid=/g/11v51xwqhz"],
      hasMap: "https://share.google/X29XOELokrZ70DiSa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Condet Raya No. 103E",
        addressLocality: "Kramat Jati, Jakarta Timur",
        addressRegion: "DKI Jakarta",
        postalCode: "13520",
        addressCountry: "ID",
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+6281213972604",
          contactType: "customer service",
          areaServed: "ID",
          availableLanguage: ["Indonesian"],
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      knowsAbout: [
        "Perizinan PPIU",
        "Perizinan PIHK",
        "Akreditasi PPIU",
        "IATA",
        "Bank Garansi",
        "Surety Bond",
        "Laporan Keuangan Travel",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "id-ID",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
