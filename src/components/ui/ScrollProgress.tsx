"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] transition-[width] duration-75"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #129447, #84cc16)",
      }}
    />
  );
}
