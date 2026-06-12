"use client";

import { Bell, Search, Menu } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/5 bg-black px-6">
      {/* Mobile Menu Button */}
      <button className="md:hidden text-neutral-400 hover:text-white">
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-3 bg-zinc-900 rounded-lg px-4 py-2.5 w-96 border border-white/5 focus-within:border-lime-400/30 transition-colors">
        <Search size={16} className="text-neutral-500" />
        <input
          type="text"
          placeholder="Cari klien, layanan, atau dokumen..."
          className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-lime-400 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="w-9 h-9 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-heading font-bold text-sm">
            <Bell size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
