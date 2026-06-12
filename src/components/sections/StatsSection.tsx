"use client";

import { useEffect, useRef, useState } from "react";
import { ObservedDiv } from "@/components/ui/ObservedDiv";

interface StatItem {
  value: string;
  label: string;
  numericValue: number;
  suffix: string;
}

const stats: StatItem[] = [
  { value: "500+", label: "Klien Terbantu", numericValue: 500, suffix: "+" },
  {
    value: "98%",
    label: "Tingkat Keberhasilan",
    numericValue: 98,
    suffix: "%",
  },
  { value: "12+", label: "Tahun Pengalaman", numericValue: 12, suffix: "+" },
  { value: "24", label: "Kota Jangkauan", numericValue: 24, suffix: "" },
];

function useCounter(target: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, shouldStart]);

  return count;
}

function StatCounter({
  stat,
  isVisible,
}: {
  stat: StatItem;
  isVisible: boolean;
}) {
  const count = useCounter(stat.numericValue, isVisible);

  return (
    <div className="stat-item text-center">
      <div className="stat-number font-heading mb-2 text-4xl font-bold text-white md:text-5xl">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm uppercase tracking-wide text-neutral-500">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-y border-white/5 py-16"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <ObservedDiv key={stat.label} delay={i * 100}>
              <StatCounter stat={stat} isVisible={visible} />
            </ObservedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
