import { contactInfo } from "@/lib/data";
import { Icon } from "@/components/ui/icon";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function ContactSection() {
  return (
    <section
      id="kontak"
      className="px-6 py-32 md:py-40"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Info */}
          <ObservedDiv>
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-lime-400">
              Hubungi Kami
            </span>
            <h2 className="font-heading mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Mari
              <br />
              <span className="text-neutral-500">Berdiskusi</span>
            </h2>
            <p className="mb-10 text-lg font-light leading-relaxed text-neutral-400">
              Kirimkan pertanyaan Anda atau langsung hubungi tim kami untuk
              konsultasi awal yang gratis dan tanpa komitmen.
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
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-neutral-400 transition-colors hover:text-lime-400"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-400">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ObservedDiv>

          {/* Form */}
          <ObservedDiv delay={200}>
            <ContactForm />
          </ObservedDiv>
        </div>
      </div>
    </section>
  );
}
