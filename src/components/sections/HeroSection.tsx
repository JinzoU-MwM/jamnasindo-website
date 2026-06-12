import { Icon } from "@/components/ui/icon";

export function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/makkah-hajj/1920/1080.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), #000)",
          }}
        />
      </div>

      {/* Decorative */}
      <div
        className="absolute left-10 top-1/4 h-64 w-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #A3E635, transparent)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-10 h-80 w-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #A3E635, transparent)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div
          className="animate-fade-up"
          style={{
            opacity: 0,
            animationDelay: "0.2s",
            animationFillMode: "forwards",
          }}
        >
          <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.45em] text-lime-400">
            Konsultan Travel Umroh & Haji Terpercaya
          </span>
        </div>

        <h1
          className="font-heading mb-8 text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-9xl animate-fade-up"
          style={{
            opacity: 0,
            animationDelay: "0.4s",
            animationFillMode: "forwards",
          }}
        >
          Solusi <span className="shimmer-text">Lengkap</span>
          <br />
          <span className="text-neutral-400">Penyelenggara</span>
          <br />
          Ibadah Anda
        </h1>

        <p
          className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-neutral-400 md:text-xl animate-fade-up"
          style={{
            opacity: 0,
            animationDelay: "0.6s",
            animationFillMode: "forwards",
          }}
        >
          Dari perizinan resmi hingga administrasi keuangan — kami hadir
          memudahkan setiap langkah bisnis travel Umroh dan Haji Anda.
        </p>

        <div
          className="flex flex-col justify-center gap-4 sm:flex-row animate-fade-up"
          style={{
            opacity: 0,
            animationDelay: "0.8s",
            animationFillMode: "forwards",
          }}
        >
          <a
            href="#layanan"
            className="cta-glow flex h-14 items-center justify-center gap-2 rounded-lg bg-lime-400 px-8 text-base font-bold text-black transition-all duration-300 hover:bg-lime-300"
          >
            Lihat Layanan Kami
            <Icon name="arrow-right" size={20} />
          </a>
          <a
            href="#kontak"
            className="flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 px-8 text-base font-bold text-white transition-all duration-300 hover:bg-white/5"
          >
            <Icon name="phone" size={20} />
            Hubungi Kami
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 pt-2">
          <div className="h-2 w-1 animate-pulse rounded-full bg-lime-400" />
        </div>
      </div>
    </section>
  );
}
