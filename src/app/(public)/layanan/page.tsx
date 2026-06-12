import { serviceCategories } from "@/lib/data";
import { Icon } from "@/components/ui/icon";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

// SEO untuk halaman ini
export const metadata = {
  title: "Layanan Perizinan & Administrasi Travel | Jamnasindo",
  description: "Layanan PPIU, PIHK, IATA, Bank Garansi, dll.",
};

export default function LayananPage() {
  return (
    <div className="pt-20">
      {" "}
      {/* pt-20 untuk offset Navbar fixed */}
      <section className="px-6 py-32" style={{ background: "#000" }}>
        <div className="mx-auto max-w-7xl">
          <ObservedDiv>
            <div className="text-center mb-20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-lime-400 mb-4 block">
                Layanan Kami
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-6">
                Solusi Lengkap{" "}
                <span className="text-neutral-500">Travel Ibadah</span>
              </h1>
            </div>
          </ObservedDiv>

          {serviceCategories.map((category) => (
            <div key={category.id} className="mb-24 last:mb-0">
              <ObservedDiv>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-lime-400/10 rounded-xl flex items-center justify-center border border-lime-400/20">
                    <Icon
                      name={category.icon}
                      size={24}
                      className="text-lime-400"
                    />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-3xl text-white">
                      {category.title}
                    </h2>
                    <p className="text-neutral-500">{category.subtitle}</p>
                  </div>
                </div>
              </ObservedDiv>

              <div
                className={`grid gap-6 ${category.layout === "2col" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"}`}
              >
                {category.services.map((service, i) => (
                  <ObservedDiv key={service.id} delay={i * 100}>
                    {/* Di halaman ini, kartunya bisa punya layout lebih besar/detail */}
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
    </div>
  );
}
