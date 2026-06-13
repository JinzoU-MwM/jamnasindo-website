import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  articles,
  getArticle,
  getRelatedArticles,
  type ArticleSection,
} from "@/lib/articles";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

const SITE_URL = "https://jamnas.id";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/artikel/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/artikel/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

// Renderer untuk tiap tipe section artikel
function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mt-12 mb-4">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-heading font-bold text-xl text-white mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-neutral-300 leading-relaxed mb-6">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-neutral-300 leading-relaxed mb-6">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div className="my-8 rounded-xl border border-lime-400/30 bg-lime-400/5 p-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-lime-400 block mb-2">
            Tips Jamnasindo
          </span>
          <p className="text-neutral-200 leading-relaxed">{section.text}</p>
        </div>
      );
    default:
      return (
        <p className="text-neutral-300 leading-relaxed mb-6">{section.text}</p>
      );
  }
}

export default function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "id-ID",
        image: `${SITE_URL}/og.png`,
        keywords: article.keywords.join(", "),
        articleSection: article.category,
        mainEntityOfPage: `${SITE_URL}/artikel/${article.slug}`,
        author: {
          "@type": "Organization",
          name: "Jamnasindo",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "PT. Jaminan Nasional Indonesia",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Artikel",
            item: `${SITE_URL}/artikel`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${SITE_URL}/artikel/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-20">
      {/* pt-20 untuk offset Navbar fixed */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="px-6 py-32" style={{ background: "#000" }}>
        <div className="mx-auto max-w-3xl">
          <ObservedDiv>
            <nav className="mb-8 text-sm text-neutral-500">
              <Link href="/artikel" className="hover:text-lime-400">
                ← Semua Artikel
              </Link>
            </nav>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
              <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 font-medium text-lime-400">
                {article.category}
              </span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>·</span>
              <span>{article.readingMinutes} menit baca</span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
              {article.title}
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-lime-400 pl-5 mb-12">
              {article.description}
            </p>
          </ObservedDiv>

          <ObservedDiv>
            <article>
              {article.sections.map((section, i) => (
                <Section key={i} section={section} />
              ))}
            </article>
          </ObservedDiv>

          {/* CTA */}
          <ObservedDiv>
            <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
              <h2 className="font-heading font-bold text-2xl text-white mb-3">
                Butuh Bantuan Mengurus Perizinan?
              </h2>
              <p className="text-neutral-400 mb-6">
                Tim Jamnasindo siap mendampingi proses perizinan dan
                administrasi travel umroh & haji Anda dari awal sampai terbit.
              </p>
              <Link
                href="/kontak"
                className="inline-block rounded-full bg-lime-400 px-8 py-3 font-medium text-black transition-colors hover:bg-lime-300"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </ObservedDiv>

          {/* Artikel terkait */}
          {related.length > 0 && (
            <ObservedDiv>
              <div className="mt-16">
                <h2 className="font-heading font-bold text-2xl text-white mb-6">
                  Artikel Terkait
                </h2>
                <div className="grid gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/artikel/${rel.slug}`}
                      className="group rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-lime-400/40"
                    >
                      <span className="text-xs text-lime-400">
                        {rel.category}
                      </span>
                      <h3 className="font-heading font-bold text-white mt-1 transition-colors group-hover:text-lime-400">
                        {rel.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </ObservedDiv>
          )}
        </div>
      </section>
    </div>
  );
}
