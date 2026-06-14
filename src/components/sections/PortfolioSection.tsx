import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function PortfolioSection({
  withHeader = true,
}: {
  withHeader?: boolean;
}) {
  return (
    <section id="portfolio" className="px-6 py-32 md:py-40" style={{ background: "#000" }}>
      <div className="mx-auto max-w-7xl">
        {withHeader && (
          <ObservedDiv>
            <SectionHeader
              badge="Portofolio"
              title="Contoh Website Travel"
              highlight="Buatan Jamnasindo"
              description="Bukan sekadar mockup — ini website travel umrah & haji yang kami bangun dan bisa Anda kunjungi langsung. Inilah standar desain dan kualitas yang akan Anda dapatkan."
            />
          </ObservedDiv>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <ObservedDiv key={item.domain} delay={i * 80}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition-colors hover:border-lime-400/40"
              >
                {/* Browser mockup */}
                <div className="border-b border-neutral-800">
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-neutral-500">
                      {item.domain}
                    </span>
                  </div>
                  <div
                    className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.accent}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={`Tampilan website ${item.name} — ${item.segment}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-lime-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Icon name="external-link" size={11} /> Live Demo
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-lime-400">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-lime-400">
                    Kunjungi Demo
                    <Icon name="arrow-right" size={15} />
                  </span>
                </div>
              </a>
            </ObservedDiv>
          ))}
        </div>

        <ObservedDiv>
          <div className="mt-14 text-center">
            <p className="text-neutral-400">
              Ingin website seperti ini untuk travel Anda?
            </p>
            <Link
              href="/kontak"
              className="mt-4 inline-block rounded-full bg-lime-400 px-8 py-3 font-medium text-black transition-colors hover:bg-lime-300"
            >
              Konsultasi Pembuatan Website
            </Link>
          </div>
        </ObservedDiv>
      </div>
    </section>
  );
}
