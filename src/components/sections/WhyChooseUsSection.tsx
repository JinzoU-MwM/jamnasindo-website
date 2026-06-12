import { features } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function WhyChooseUsSection() {
  return (
    <section
      id="keunggulan"
      className="px-6 py-32 md:py-40"
      style={{ background: "#000" }}
    >
      <div className="mx-auto max-w-7xl">
        <ObservedDiv>
          <SectionHeader
            badge="Mengapa Kami"
            title="Keunggulan"
            highlight="Jamnasindo"
          />
        </ObservedDiv>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <ObservedDiv key={feature.title} delay={i * 100}>
              <FeatureCard feature={feature} />
            </ObservedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
