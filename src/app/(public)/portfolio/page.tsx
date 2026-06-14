import type { Metadata } from "next";
import { portfolioItems } from "@/lib/portfolio";
import { PortfolioSection } from "@/components/sections/PortfolioSection";

const SITE_URL = "https://jamnas.id";

export const metadata: Metadata = {
  title: "Portofolio Website Travel Umrah & Haji | Jamnasindo",
  description:
    "Lihat portofolio website travel umrah & haji buatan Jamnasindo — enam demo live yang bisa Anda kunjungi langsung. Bukti nyata kualitas jasa pembuatan website kami.",
  keywords: [
    "portofolio website travel",
    "contoh website travel umroh",
    "jasa pembuatan website umroh",
    "website travel haji",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portofolio Website Travel Umrah & Haji | Jamnasindo",
    description:
      "Enam demo website travel umrah & haji yang bisa Anda kunjungi langsung.",
    url: `${SITE_URL}/portfolio`,
    type: "website",
    images: [{ url: "/og.png?v=2", width: 1200, height: 630 }],
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portofolio",
            item: `${SITE_URL}/portfolio`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Portofolio Website Travel Umrah & Haji Jamnasindo",
        itemListElement: portfolioItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.url,
          description: item.description,
        })),
      },
    ],
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="px-6 pt-24 pb-4" style={{ background: "#000" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400">
            Portofolio
          </span>
          <h1 className="mt-4 font-heading font-bold text-3xl md:text-5xl tracking-tight text-white">
            Website Travel yang{" "}
            <span className="text-lime-400">Sudah Kami Buat</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-400">
            Enam contoh website travel umrah &amp; haji — semuanya demo{" "}
            <strong className="text-neutral-200">live</strong> yang bisa Anda
            kunjungi langsung. Inilah standar desain dan kualitas yang akan Anda
            dapatkan bersama Jamnasindo.
          </p>
        </div>
      </section>

      <PortfolioSection withHeader={false} />
    </div>
  );
}
