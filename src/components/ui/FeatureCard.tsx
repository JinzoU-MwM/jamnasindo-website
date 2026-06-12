import { Feature } from "@/types";
import { Icon } from "./icon";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="feature-card h-full rounded-2xl border border-white/5 bg-neutral-900 p-8 transition-all duration-300">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10">
        <Icon name={feature.icon} size={24} className="text-lime-400" />
      </div>
      <h4 className="mb-3 text-lg font-bold text-white">{feature.title}</h4>
      <p className="text-sm leading-relaxed text-neutral-400">
        {feature.description}
      </p>
    </div>
  );
}
