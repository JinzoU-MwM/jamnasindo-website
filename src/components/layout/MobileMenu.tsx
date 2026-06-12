"use client";

import Link from "next/link";
import { navItems } from "@/lib/data";
import { Icon } from "@/components/ui/icon";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 transition-transform duration-400 md:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center text-white"
      >
        <Icon name="x" size={24} />
      </button>

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="font-heading text-2xl font-bold text-white transition-colors hover:text-lime-400"
        >
          {item.label}
        </Link>
      ))}

      <Link
        href="/kontak"
        onClick={onClose}
        className="mt-4 flex h-14 items-center gap-2 rounded-lg bg-lime-400 px-10 text-base font-bold text-black"
      >
        Konsultasi Gratis
      </Link>
    </div>
  );
}
