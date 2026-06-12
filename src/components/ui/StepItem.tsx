import { ProcessStep } from "@/types";

interface StepItemProps {
  step: ProcessStep;
}

export function StepItem({ step }: StepItemProps) {
  const isFilled = step.variant === "filled";

  return (
    <div className="mb-12 flex gap-6 last:mb-0 sm:mb-14">
      <div
        className={`z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold ${
          isFilled
            ? "bg-lime-400 text-black"
            : "border border-lime-400/35 bg-lime-400/20 text-lime-400"
        }`}
      >
        {step.step}
      </div>
      <div className="max-w-[600px] pt-1">
        <h4 className="mb-2 text-[21px] font-bold leading-tight text-white">
          {step.title}
        </h4>
        <p className="text-sm leading-[1.7] text-neutral-400">
          {step.description}
        </p>
      </div>
    </div>
  );
}
