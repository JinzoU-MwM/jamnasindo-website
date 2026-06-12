import { contactInfo } from "@/lib/data";
import { Icon } from "@/components/ui/icon";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export const metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi Jamnasindo untuk konsultasi gratis perizinan travel Umroh & Haji. Jl. Condet Raya No. 103E, Kramat Jati, Jakarta Timur — Telp/WA +62 812-1397-2604.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <div className="pt-20">
      <section className="px-6 py-32" style={{ background: "#09090b" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <ObservedDiv>
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-lime-400">
                Hubungi Kami
              </span>
              <h1 className="font-heading mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Mari
                <br />
                <span className="text-neutral-500">Berdiskusi</span>
              </h1>
              <p className="mb-10 text-lg font-light leading-relaxed text-neutral-400">
                Kirimkan pertanyaan Anda atau langsung hubungi tim kami.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-lime-400">
                      <Icon name={item.icon} size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.label}
                      </div>
                      <span className="text-sm text-neutral-400">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ObservedDiv>

            <ObservedDiv delay={200}>
              <ContactForm />
            </ObservedDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
