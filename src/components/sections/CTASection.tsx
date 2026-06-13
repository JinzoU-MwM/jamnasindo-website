import { Icon } from "@/components/ui/icon";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-32 md:py-40"
      style={{ background: "#000" }}
    >
      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(163,230,53,0.1) 50px, rgba(163,230,53,0.1) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(163,230,53,0.1) 50px, rgba(163,230,53,0.1) 51px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <ObservedDiv>
          <div className="animate-float mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
            <Icon name="chat" size={40} className="text-lime-400" />
          </div>

          <h2 className="font-heading mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
            Siap Memulai?
            <br />
            <span className="shimmer-text">Konsultasi Gratis</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-neutral-400">
            Dapatkan konsultasi awal tanpa biaya. Tim kami siap menganalisis
            kebutuhan perizinan dan administrasi travel ibadah Anda.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#kontak"
              className="cta-glow flex h-14 items-center justify-center gap-2 rounded-lg bg-lime-400 px-8 text-base font-bold text-black transition-all duration-300 hover:bg-lime-300"
            >
              Konsultasi Sekarang
              <Icon name="arrow-right" size={20} />
            </a>
            <a
              href="https://wa.me/6281213972604?text=Halo%20Jamnasindo%2C%20saya%20ingin%20konsultasi%20perizinan%20travel%20umroh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 px-8 text-base font-bold text-white transition-all duration-300 hover:bg-white/5"
            >
              <Icon name="whatsapp" size={20} />
              WhatsApp Kami
            </a>
          </div>
        </ObservedDiv>
      </div>
    </section>
  );
}
