import { testimonials } from "@/lib/data";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export const metadata = {
  title: "Testimoni Klien",
  description:
    "Apa kata klien Jamnasindo: pengalaman travel Umroh & Haji yang berhasil mengurus PPIU, PIHK, IATA, dan administrasi bisnisnya bersama kami.",
  alternates: { canonical: "/testimoni" },
};

export default function TestimoniPage() {
  return (
    <div className="pt-20">
      <section className="px-6 py-32" style={{ background: "#09090b" }}>
        <div className="mx-auto max-w-7xl">
          <ObservedDiv>
            <div className="text-center mb-20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400 mb-4 block">
                Testimoni
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight">
                Kata <span className="text-neutral-500">Mereka</span>
              </h1>
            </div>
          </ObservedDiv>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <ObservedDiv key={testimonial.name} delay={i * 100}>
                <TestimonialCard testimonial={testimonial} />
              </ObservedDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
