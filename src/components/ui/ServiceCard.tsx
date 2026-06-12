import { ServiceItem } from "@/types";
import { Icon } from "./icon";

interface ServiceCardProps {
  service: ServiceItem;
  showTags?: boolean;
  variant?: "detailed" | "compact";
}

export function ServiceCard({
  service,
  showTags = true,
  variant = "detailed",
}: ServiceCardProps) {
  if (variant === "compact") {
    return (
      <div className="service-card rounded-2xl border border-white/5 bg-neutral-900 p-8">
        <div className="service-icon mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white">
          <Icon name={service.icon} size={28} />
        </div>
        <h4 className="mb-3 text-lg font-bold text-white">{service.title}</h4>
        <p className="mb-4 text-sm leading-relaxed text-neutral-400">
          {service.description}
        </p>
        <div className="service-arrow mt-auto">
          <Icon name="arrow-right" size={20} className="text-lime-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="service-card rounded-2xl border border-white/5 bg-neutral-900 p-8">
      <div className="mb-6 flex items-start justify-between">
        <div className="service-icon flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white">
          <Icon name={service.icon} size={28} />
        </div>
        <div className="service-arrow">
          <Icon name="arrow-right" size={20} className="text-lime-400" />
        </div>
      </div>
      <h4 className="mb-3 text-xl font-bold text-white">{service.title}</h4>
      <p className="mb-4 text-sm leading-relaxed text-neutral-400">
        {service.description}
      </p>
      {showTags && service.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
