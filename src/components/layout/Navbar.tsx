"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/lib/data";
import { Icon } from "@/components/ui/icon";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
              <img
                src="/logo-mark.png"
                alt="Jamnasindo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white">
                Jamnasindo
              </span>
              <span className="block text-[10px] leading-none tracking-[0.2em] uppercase text-neutral-500">
                Grow Ur Business With Us
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm text-neutral-400 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontak"
              className="flex h-10 items-center gap-2 rounded-lg bg-lime-400 px-5 text-sm font-medium text-black transition-all duration-300 hover:bg-lime-300"
            >
              Konsultasi Gratis
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
            aria-label="Buka menu"
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
