import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceCategories } from "@/lib/data";
import { getServiceDetail } from "@/lib/serviceDetails";
import type { ArticleSection } from "@/lib/articles";
import { Icon } from "@/components/ui/icon";
import { ObservedDiv } from "@/components/ui/ObservedDiv";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const SITE_URL = "https://jamnas.id";

// Cari service + kategori-nya berdasar slug (id)
function findService(slug: string) {
  for (const category of serviceCategories) {
    const service = category.services.find((s) => s.id === slug);
    if (service) return { service, category };
  }
  return null;
}

export function generateStaticParams() {
  return serviceCategories.flatMap((c) => c.services.map((s) => ({ slug: s.id })));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const found = findService(params.slug);
  if (!found) return {};
  const detail = getServiceDetail(params.slug);
  const title = detail?.metaTitle ?? `Layanan ${found.service.title}`;
  const description = detail?.metaDescription ?? found.service.description;
  return {
    title,
    description,
    keywords: detail?.keywords,
    alternates: { canonical: `/layanan/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/layanan/${params.slug}`,
      type: "article",
      images: [{ url: "/og.png?v=2", width: 1200, height: 630 }],
    },
  };
}

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

export default async function LayananDetailPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const found = findService(params.slug);
  if (!found) notFound();
  const { service, category } = found;
  const detail = getServiceDetail(params.slug);

  // layanan lain dalam kategori yang sama (internal linking)
  const related = category.services.filter((s) => s.id !== service.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: detail?.metaDescription ?? service.description,
        category: category.title,
        url: `${SITE_URL}/layanan/${service.id}`,
        areaServed: { "@type": "Country", name: "Indonesia" },
        provider: {
          "@type": "Organization",
          name: "Jamnasindo",
          legalName: "PT. Jaminan Nasional Indonesia",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Layanan",
            item: `${SITE_URL}/layanan`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE_URL}/layanan/${service.id}`,
          },
        ],
      },
      ...(detail?.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: detail.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="px-6 py-32" style={{ background: "#000" }}>
        <div className="mx-auto max-w-3xl">
          <ObservedDiv>
            <nav className="mb-8 text-sm text-neutral-500">
              <Link href="/layanan" className="hover:text-lime-400">
                ← Semua Layanan
              </Link>
            </nav>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 text-lime-400">
                <Icon name={service.icon} size={28} />
              </div>
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400">
                {category.title}
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
              {service.title}
            </h1>
            {detail?.summary && (
              <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-lime-400 pl-5 mb-6">
                {detail.summary}
              </p>
            )}
            {service.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </ObservedDiv>

          {detail && (
            <ObservedDiv>
              <article>
                {detail.sections.map((section, i) => (
                  <Section key={i} section={section} />
                ))}
              </article>
            </ObservedDiv>
          )}

          {/* FAQ */}
          {detail?.faq?.length ? (
            <ObservedDiv>
              <div className="mt-16">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-6">
                  Pertanyaan Umum tentang {service.title}
                </h2>
                <FaqAccordion items={detail.faq} />
              </div>
            </ObservedDiv>
          ) : null}

          {/* CTA */}
          <ObservedDiv>
            <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
              <h2 className="font-heading font-bold text-2xl text-white mb-3">
                Butuh Bantuan untuk {service.title}?
              </h2>
              <p className="text-neutral-400 mb-6">
                Tim Jamnasindo siap mendampingi proses {service.title} travel
                umroh & haji Anda dari awal sampai selesai.
              </p>
              <Link
                href="/kontak"
                className="inline-block rounded-full bg-lime-400 px-8 py-3 font-medium text-black transition-colors hover:bg-lime-300"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </ObservedDiv>

          {/* Layanan terkait */}
          {related.length > 0 && (
            <ObservedDiv>
              <div className="mt-16">
                <h2 className="font-heading font-bold text-2xl text-white mb-6">
                  Layanan {category.title} Lainnya
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/layanan/${rel.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-lime-400/40"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lime-400">
                        <Icon name={rel.icon} size={20} />
                      </div>
                      <h3 className="font-heading font-bold text-white transition-colors group-hover:text-lime-400">
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
