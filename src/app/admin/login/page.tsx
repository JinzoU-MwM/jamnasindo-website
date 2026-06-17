"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const next = new URLSearchParams(window.location.search).get("next");
        router.replace(next && next.startsWith("/admin") ? next : "/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Gagal masuk.");
    } catch {
      setError("Terjadi kesalahan jaringan.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 font-body">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400">
            <LayoutDashboard size={24} className="text-black" />
          </div>
          <h1 className="font-heading text-xl font-bold text-white">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Jamnasindo — masuk untuk melanjutkan
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/5 bg-zinc-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-400">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                placeholder="Masukkan kata sandi admin"
                className="w-full rounded-lg border border-white/10 bg-zinc-800/50 py-2.5 pl-9 pr-4 text-sm text-white placeholder-neutral-600 transition-colors focus:border-lime-400/50 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-lime-300 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Lock size={18} />
            )}
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
