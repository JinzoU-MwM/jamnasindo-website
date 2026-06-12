"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Filter, MoreVertical, Search } from "lucide-react";

interface Client {
  id: number;
  name: string;
  pic: string;
  phone: string;
  active_services: number;
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, string> = {
  Aktif: "bg-lime-400/10 text-lime-400 border-lime-400/20",
  Pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Nonaktif: "bg-zinc-400/10 text-zinc-400 border-zinc-400/20",
};

export default function KlienPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/clients?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setClients(Array.isArray(data.items) ? data.items : []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setError("Gagal memuat data klien.");
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    [],
  );

  const deleteClient = async (id: number) => {
    if (!confirm("Hapus klien ini?")) return;
    await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
    fetchClients();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Manajemen Klien
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Kelola data travel agency dan penanggung jawabnya.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors">
          <Plus size={18} />
          Tambah Klien
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-4 py-2 w-72 border border-white/5">
            <Search size={16} className="text-neutral-500 shrink-0" />
            <input
              type="text"
              placeholder="Cari nama klien..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-2">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Nama Travel
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Penanggung Jawab
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Layanan Aktif
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    {search ? "Tidak ada klien yang sesuai." : "Belum ada data klien."}
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">
                        {client.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {client.pic}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {client.active_services} Layanan
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          STATUS_LABELS[client.status] || STATUS_LABELS.Aktif
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="text-neutral-500 hover:text-red-400"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 disabled:opacity-30"
        >
          Sebelumnya
        </button>
        <span className="text-sm text-neutral-400">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 disabled:opacity-30"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
