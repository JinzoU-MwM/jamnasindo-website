import { serviceCategories } from "@/lib/data";
import { Icon } from "@/components/ui/icon";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="px-6 py-32 md:py-40"
      style={{ background: "#000" }}
    >
      <div className="mx-auto max-w-7xl">
        <ObservedDiv>
          <SectionHeader
            badge="Layanan Kami"
            title="Layanan Profesional"
            highlight="untuk Travel Ibadah"
            description="Kami menyediakan layanan komprehensif untuk memastikan bisnis travel Umroh dan Haji Anda berjalan sesuai regulasi dan efisien secara administratif."
          />
        </ObservedDiv>

        {serviceCategories.map((category) => (
          <div key={category.id} className="mb-20 last:mb-0">
            <ObservedDiv>
              <div className="mb-12 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10">
                  <Icon
                    name={category.icon}
                    size={24}
                    className="text-lime-400"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {category.title}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </ObservedDiv>

            <div
              className={`grid gap-6 ${
                category.layout === "2col"
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {category.services.map((service, i) => (
                <ObservedDiv key={service.id} delay={i * 100}>
                  <ServiceCard
                    service={service}
                    variant={
                      category.layout === "2col" ? "detailed" : "compact"
                    }
                  />
                </ObservedDiv>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
