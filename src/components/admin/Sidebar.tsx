"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Klien & Travel", href: "/admin/klien", icon: Users },
  { label: "Tracking Layanan", href: "/admin/layanan", icon: FileCheck },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-black">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6 border-b border-white/5">
        <div className="w-9 h-9 bg-lime-400 rounded-lg flex items-center justify-center">
          <LayoutDashboard size={20} className="text-black" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-white text-sm">
            MitraSolusi
          </h1>
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-white/5">
        <button className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
