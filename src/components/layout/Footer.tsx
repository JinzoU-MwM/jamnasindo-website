import Link from "next/link";
import { serviceCategories, contactInfo } from "@/lib/data";
import { Icon } from "@/components/ui/icon";

export function Footer() {
  return (
    <footer
      className="border-t border-white/5 px-6 py-16"
      style={{ background: "#000" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-400">
                <Icon name="layers" size={24} className="text-black" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-white">
                  MitraSolusi
                </span>
                <span className="block text-[10px] leading-none tracking-[0.2em] uppercase text-neutral-500">
                  Konsultan Travel Ibadah
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-500">
              Solusi terpercaya untuk perizinan dan administrasi bisnis travel
              Umroh & Haji di Indonesia.
            </p>
          </div>

          {/* Service Categories */}
          {serviceCategories.map((category) => (
            <div key={category.id}>
              <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href="/layanan"
                      className="text-sm text-neutral-500 transition-colors hover:text-lime-400"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">
              Kontak
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-lime-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-500">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} MitraSolusi. Seluruh hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-neutral-600 transition-colors hover:text-lime-400"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-xs text-neutral-600 transition-colors hover:text-lime-400"
            >
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
