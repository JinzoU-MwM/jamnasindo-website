"use client";

import { useState, useEffect, useCallback } from "react";
import { Building2, ShieldCheck, Bell, Save } from "lucide-react";

interface Settings {
  company_name?: string;
  company_email?: string;
  company_phone?: string;
  company_website?: string;
  company_address?: string;
}

export default function PengaturanPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<Settings>({});

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data.data || {});
    } catch {
      setMessage("Gagal memuat pengaturan.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      setMessage("Pengaturan berhasil disimpan.");
    } catch {
      setMessage("Gagal menyimpan pengaturan.");
    }
    setSaving(false);
  };

  const setField = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Pengaturan</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Kelola informasi perusahaan, keamanan, dan preferensi notifikasi.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-lime-400/10 text-lime-400">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-white text-lg">
                  Profil Perusahaan
                </h2>
                <p className="text-sm text-neutral-500">
                  Informasi dasar konsultan travel Anda.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    value={settings.company_name || ""}
                    onChange={setField("company_name")}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={settings.company_email || ""}
                    onChange={setField("company_email")}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={settings.company_phone || ""}
                    onChange={setField("company_phone")}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={settings.company_website || ""}
                    onChange={setField("company_website")}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Alamat Kantor
                </label>
                <textarea
                  rows={3}
                  value={settings.company_address || ""}
                  onChange={setField("company_address")}
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-white text-lg">
                  Keamanan Akun
                </h2>
                <p className="text-sm text-neutral-500">
                  Ubah kata sandi administrator secara berkala.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Kata Sandi Saat Ini
                </label>
                <input
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                />
              </div>
              <div />
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="Min. 8 karakter"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="Ulangi kata sandi"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-white text-lg">
                  Preferensi Notifikasi
                </h2>
                <p className="text-sm text-neutral-500">
                  Atur pemberitahuan yang ingin Anda terima via email.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <ToggleSetting
                title="Klien Baru Mendaftar"
                description="Dapatkan notifikasi saat ada travel agency baru yang terdaftar."
                defaultChecked={true}
              />
              <ToggleSetting
                title="Update Status Layanan"
                description="Pemberitahuan saat status perizinan (Diproses, Revisi, Selesai) berubah."
                defaultChecked={true}
              />
              <ToggleSetting
                title="Laporan Keuangan Bulanan"
                description="Terima ringkasan laporan keuangan konsultan setiap awal bulan."
                defaultChecked={false}
              />
            </div>
          </div>

          {message && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                message.includes("berhasil")
                  ? "border-lime-400/30 bg-lime-400/5 text-lime-400"
                  : "border-red-500/30 bg-red-500/5 text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold text-sm px-6 py-3 rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-70"
            >
              <Save size={18} />
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ToggleSetting({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-xs text-neutral-500 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400" />
      </label>
    </div>
  );
}
