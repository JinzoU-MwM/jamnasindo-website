import { testimonials } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="relative px-6 py-32 md:py-40"
      style={{ background: "#09090b" }}
    >
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #A3E635, transparent)",
          filter: "blur(80px)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <ObservedDiv>
          <SectionHeader
            badge="Testimoni"
            title="Kata Mereka"
            description="Dengarkan pengalaman klien yang telah mempercayakan pengurusan izin dan administrasi travel ibadah mereka kepada kami."
          />
        </ObservedDiv>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <ObservedDiv key={testimonial.name} delay={i * 100}>
              <TestimonialCard testimonial={testimonial} />
            </ObservedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
