import type { Metadata } from "next";
import "./globals.css";

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
  authors: [{ name: "PT. Jaminan Nasional Indonesia", url: SITE_URL }],
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
        url: "/og.png",
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
    images: ["/og.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  legalName: "PT. Jaminan Nasional Indonesia",
  alternateName: "Jamnasindo",
  slogan: "Grow ur business with us",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og.png`,
  description: SITE_DESCRIPTION,
  telephone: "+6281213972604",
  email: "info@jamnas.id",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Condet Raya No. 103E",
    addressLocality: "Kramat Jati, Jakarta Timur",
    addressRegion: "DKI Jakarta",
    postalCode: "13520",
    addressCountry: "ID",
  },
  areaServed: "Indonesia",
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
