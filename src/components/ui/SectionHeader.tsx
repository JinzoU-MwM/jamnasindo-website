interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.55em] text-lime-400">
        {badge}
      </span>
      <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-neutral-500">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}
