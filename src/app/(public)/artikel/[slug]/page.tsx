import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticles, getPublishedArticleBySlug } from "@/lib/db";
import { renderMarkdown } from "@/lib/articleMarkdown";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

const SITE_URL = "https://jamnas.id";

// ISR safety net; instant updates come via revalidatePath from the admin API.
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

function parseKeywords(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getPublishedArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: parseKeywords(article.keywords),
    alternates: { canonical: `/artikel/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/artikel/${article.slug}`,
      type: "article",
      publishedTime: article.date,
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

interface Cta {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getPublishedArticleBySlug(params.slug);
  if (!article) notFound();

  const html = renderMarkdown(article.content_md);

  let cta: Cta | null = null;
  if (article.cta) {
    try {
      cta = JSON.parse(article.cta) as Cta;
    } catch {
      cta = null;
    }
  }

  const others = getPublishedArticles().filter((a) => a.slug !== article.slug);
  const related = [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ].slice(0, 3);

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
        keywords: parseKeywords(article.keywords).join(", "),
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
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
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
              <span>{article.reading_minutes} menit baca</span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
              {article.title}
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-lime-400 pl-5 mb-12">
              {article.description}
            </p>
          </ObservedDiv>

          <ObservedDiv>
            <article
              className="prose prose-invert max-w-none
                prose-headings:font-heading prose-headings:text-white
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-neutral-300 prose-p:leading-relaxed
                prose-li:text-neutral-300 prose-li:marker:text-lime-400
                prose-a:text-lime-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-blockquote:border-lime-400 prose-blockquote:bg-lime-400/5
                prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-neutral-200
                prose-code:text-lime-300
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </ObservedDiv>

          {/* CTA */}
          <ObservedDiv>
            <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
              <h2 className="font-heading font-bold text-2xl text-white mb-3">
                {cta?.title ?? "Butuh Bantuan Mengurus Perizinan?"}
              </h2>
              <p className="text-neutral-400 mb-6">
                {cta?.text ??
                  "Tim Jamnasindo siap mendampingi proses perizinan dan administrasi travel umroh & haji Anda dari awal sampai terbit."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={cta?.primaryHref ?? "/kontak"}
                  className="inline-block rounded-full bg-lime-400 px-8 py-3 font-medium text-black transition-colors hover:bg-lime-300"
                >
                  {cta?.primaryLabel ?? "Konsultasi Gratis"}
                </Link>
                {cta?.secondaryHref && (
                  <Link
                    href={cta.secondaryHref}
                    className="inline-block rounded-full border border-neutral-700 px-8 py-3 font-medium text-white transition-colors hover:border-lime-400/50"
                  >
                    {cta.secondaryLabel}
                  </Link>
                )}
              </div>
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
