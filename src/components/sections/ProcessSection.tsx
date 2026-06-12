import { processSteps } from "@/lib/data";
import { StepItem } from "@/components/ui/StepItem";
import { Icon } from "@/components/ui/icon";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

export function ProcessSection() {
  return (
    <section
      id="proses"
      className="relative flex min-h-[665px] items-center overflow-hidden px-6 py-24 sm:py-28 lg:py-0"
      style={{ background: "#050607" }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/4 opacity-50"
        style={{
          background:
            "linear-gradient(270deg, rgba(163, 230, 53, 0.06), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] xl:gap-20">
          <ObservedDiv>
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.55em] text-lime-400">
                Cara Kerja
              </p>
              <h2 className="mb-7 font-heading text-[44px] font-bold leading-[0.98] tracking-normal text-white sm:text-[56px] lg:text-[60px]">
                Proses Kami
                <br />
                <span className="whitespace-normal text-neutral-500 sm:whitespace-nowrap">
                  Mudah & Transparan
                </span>
              </h2>
              <p className="mb-8 max-w-[560px] text-lg font-light leading-[1.65] text-neutral-400">
                Empat langkah sederhana untuk memulai perjalanan bisnis travel
                ibadah Anda bersama kami.
              </p>
              <a
                href="#kontak"
                className="inline-flex h-12 items-center gap-3 rounded-lg bg-lime-400 px-6 text-sm font-medium text-black transition-all duration-300 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-black"
              >
                Mulai Sekarang
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </ObservedDiv>

          <div className="relative lg:pl-2">
            <div className="process-line" />
            {processSteps.map((step, i) => (
              <ObservedDiv key={step.step} delay={i * 100}>
                <StepItem step={step} />
              </ObservedDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
