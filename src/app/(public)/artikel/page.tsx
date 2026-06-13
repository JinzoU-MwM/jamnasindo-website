import Link from "next/link";
import { articles } from "@/lib/articles";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

// SEO untuk halaman ini
export const metadata = {
  title: "Artikel & Panduan Perizinan Travel Umroh dan Haji",
  description:
    "Kumpulan artikel dan panduan praktis seputar izin PPIU, PIHK, akreditasi, IATA, bank garansi, dan cara memulai bisnis travel umroh & haji — ditulis oleh tim Jamnasindo.",
  alternates: { canonical: "/artikel" },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

export default function ArtikelPage() {
  return (
    <div className="pt-20">
      {/* pt-20 untuk offset Navbar fixed */}
      <section className="px-6 py-32" style={{ background: "#000" }}>
        <div className="mx-auto max-w-7xl">
          <ObservedDiv>
            <div className="text-center mb-20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400 mb-4 block">
                Artikel & Panduan
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-6">
                Pusat Informasi{" "}
                <span className="text-neutral-500">Travel Ibadah</span>
              </h1>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Panduan praktis seputar perizinan PPIU & PIHK, akreditasi,
                keanggotaan IATA, hingga strategi memulai bisnis travel umroh
                dan haji.
              </p>
            </div>
          </ObservedDiv>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ObservedDiv key={article.slug} delay={i * 100}>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-950 p-8 transition-colors hover:border-lime-400/40"
                >
                  <div className="mb-4 flex items-center gap-3 text-xs text-neutral-500">
                    <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 font-medium text-lime-400">
                      {article.category}
                    </span>
                    <span>{article.readingMinutes} menit baca</span>
                  </div>
                  <h2 className="font-heading font-bold text-xl text-white mb-3 transition-colors group-hover:text-lime-400">
                    {article.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    <span className="font-medium text-lime-400">
                      Baca artikel →
                    </span>
                  </div>
                </Link>
              </ObservedDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
