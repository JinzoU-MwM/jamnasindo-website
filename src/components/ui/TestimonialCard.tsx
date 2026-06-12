import { Testimonial } from "@/types";
import { Icon } from "./icon";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="h-full rounded-2xl border border-white/5 bg-neutral-900 p-8">
      <div className="mb-4 text-lime-400">
        <Icon name="quote" size={32} />
      </div>
      <p className="mb-6 text-sm leading-relaxed text-neutral-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20 font-heading text-sm font-bold text-lime-400">
          {testimonial.initials}
        </div>
        <div>
          <div className="text-sm font-medium text-white">
            {testimonial.name}
          </div>
          <div className="text-xs text-neutral-500">{testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}
