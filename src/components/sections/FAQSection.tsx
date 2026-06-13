import Link from "next/link";
import { faqItems } from "@/lib/faq";
import { ObservedDiv } from "@/components/ui/ObservedDiv";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function FAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="px-6 py-32"
      style={{ background: "#000" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <ObservedDiv>
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400 mb-4 block">
              Pertanyaan Umum
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-4">
              Yang Sering <span className="text-neutral-500">Ditanyakan</span>
            </h2>
            <p className="text-neutral-400">
              Seputar perizinan dan administrasi travel umroh & haji.
            </p>
          </div>
        </ObservedDiv>

        <ObservedDiv>
          <FaqAccordion items={faqItems} />
        </ObservedDiv>

        <ObservedDiv>
          <p className="mt-10 text-center text-neutral-400">
            Masih ada pertanyaan? Baca{" "}
            <Link href="/artikel" className="text-lime-400 hover:underline">
              artikel panduan kami
            </Link>{" "}
            atau{" "}
            <Link href="/kontak" className="text-lime-400 hover:underline">
              hubungi tim Jamnasindo
            </Link>
            .
          </p>
        </ObservedDiv>
      </div>
    </section>
  );
}
