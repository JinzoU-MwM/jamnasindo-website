"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  // toggle independen per item (boleh buka beberapa sekaligus)
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
        return (
          <div
            key={i}
            className={`rounded-2xl border bg-neutral-950 transition-colors duration-300 ${
              isOpen
                ? "border-lime-400/40"
                : "border-neutral-800 hover:border-lime-400/40"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left font-heading font-bold text-white"
            >
              <span>{item.question}</span>
              <span
                className={`shrink-0 text-2xl leading-none text-lime-400 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {/* grid 0fr→1fr = animasi tinggi yang halus */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-neutral-400">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
