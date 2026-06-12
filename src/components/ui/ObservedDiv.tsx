"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ReactNode } from "react";

interface ObservedDivProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ObservedDiv({
  children,
  delay = 0,
  className = "",
}: ObservedDivProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`observe-fade ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
